/**
 * server.js
 * Serveur Full-Stack Node.js avec API REST et base de données SQLite native
 * Espace d'administration complet et gestion des projets enrichis
 * Fonctionne immédiatement avec Node 24 sans aucune dépendance npm !
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const { createHash, createHmac, randomBytes, timingSafeEqual } = require('node:crypto');
const {
  getPortfolioData,
  saveContactMessage,
  getMessages,
  setMessageReadStatus,
  deleteMessage,
  updateProfile,
  addProject,
  updateProject,
  deleteProject,
  getAdminStats
} = require('./database.js');

const PORT = process.env.PORT || 3000;

const adminPin = process.env.ADMIN_PIN;
const signingKey = randomBytes(32);
const jwtHeader = Buffer.from(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).toString('base64url');
const loginWindow = 15 * 60 * 1000;
const loginAttempts = new Map();

function sign(input) {
  return createHmac('sha256', signingKey).update(input).digest();
}

function createAdminToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload = Buffer.from(JSON.stringify({
    sub: 'admin',
    iat: issuedAt,
    exp: issuedAt + 2 * 60 * 60
  })).toString('base64url');
  const input = `${jwtHeader}.${payload}`;
  return `${input}.${sign(input).toString('base64url')}`;
}

function requireAuth(req, res) {
  const match = /^Bearer ([\w-]+)\.([\w-]+)\.([\w-]+)$/i.exec(req.headers.authorization || '');
  if (match && match[1] === jwtHeader) {
    const received = Buffer.from(match[3], 'base64url');
    const expected = sign(`${match[1]}.${match[2]}`);
    if (received.length === expected.length && timingSafeEqual(received, expected)) {
      const { sub, exp } = JSON.parse(Buffer.from(match[2], 'base64url').toString('utf8'));
      if (sub === 'admin' && exp > Math.floor(Date.now() / 1000)) return true;
    }
  }

  res.writeHead(401, {
    'Content-Type': 'application/json',
    'WWW-Authenticate': 'Bearer',
    'Cache-Control': 'no-store'
  });
  res.end(JSON.stringify({ error: 'Authentication required' }));
  return false;
}

setInterval(() => {
  const cutoff = Date.now() - loginWindow;
  for (const [ip, attempts] of loginAttempts) {
    if (attempts[attempts.length - 1] <= cutoff) loginAttempts.delete(ip);
  }
}, loginWindow).unref();

function checkLoginLimit(req, res) {
  const ip = req.socket.remoteAddress;
  const now = Date.now();
  const recent = (loginAttempts.get(ip) || []).filter(time => time > now - loginWindow);
  if (recent.length >= 5) {
    res.writeHead(429, {
      'Content-Type': 'application/json',
      'Retry-After': Math.ceil((recent[0] + loginWindow - now) / 1000)
    });
    res.end(JSON.stringify({ error: 'Too many login attempts' }));
    return false;
  }

  recent.push(now);
  loginAttempts.set(ip, recent);
  return true;
}

function digest(value) {
  return createHash('sha256').update(value).digest();
}

// Types MIME pour les fichiers statiques
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.jsx': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

// Helper pour lire le corps JSON d'une requête
function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const json = body ? JSON.parse(body) : {};
        resolve(json);
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', err => reject(err));
  });
}

const server = http.createServer(async (req, res) => {
  // En-têtes CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const parsedUrl = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
  const pathname = parsedUrl.pathname;

  // ==========================================
  // ROUTES D'API PUBLIQUES
  // ==========================================

  // 1. Obtenir toutes les données du portfolio
  if (req.method === 'GET' && pathname === '/api/portfolio') {
    try {
      const data = getPortfolioData();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(data));
    } catch (err) {
      console.error('Erreur API portfolio:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la récupération des données' }));
    }
    return;
  }

  // 2. Envoyer un message de contact
  if (req.method === 'POST' && pathname === '/api/contact') {
    try {
      const payload = await parseJsonBody(req);
      if (!payload.name || !payload.email || !payload.message) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Les champs nom, email et message sont obligatoires.' }));
        return;
      }

      const result = saveContactMessage(payload.name, payload.email, payload.subject, payload.message);
      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, message: 'Message enregistré dans SQLite avec succès !', id: result.id }));
    } catch (err) {
      console.error('Erreur enregistrement message:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Impossible d’enregistrer le message dans la base.' }));
    }
    return;
  }

  // 3. Obtenir les dépôts GitHub de Walid Djellali (@Waliddjla)
  if (req.method === 'GET' && pathname === '/api/github-repos') {
    try {
      const reposFile = path.join(__dirname, 'github_repos.json');
      if (fs.existsSync(reposFile)) {
        const reposData = fs.readFileSync(reposFile, 'utf8');
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(reposData);
      } else {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end('[]');
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la lecture des dépôts GitHub' }));
    }
    return;
  }

  // ==========================================
  // ROUTES D'ADMINISTRATION
  // ==========================================

  // Connexion Admin (Vérification du code PIN / Mot de passe)
  if (req.method === 'POST' && pathname === '/api/admin/login') {
    res.setHeader('Cache-Control', 'no-store');
    if (!checkLoginLimit(req, res)) return;
    if (!adminPin) {
      res.writeHead(503, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Admin login is not configured' }));
      return;
    }
    try {
      const { pin } = await parseJsonBody(req);
      if (typeof pin === 'string' && timingSafeEqual(digest(pin), digest(adminPin))) {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          authenticated: true,
          token: createAdminToken(),
          user: 'Walid Djellali',
          message: 'Authentification administrateur réussie.'
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Invalid access code' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur serveur lors de la connexion' }));
    }
    return;
  }

  if (/^\/api\/(?:admin|messages)(?:\/|$)/.test(pathname)) {
    res.setHeader('Cache-Control', 'no-store');
    if (!requireAuth(req, res)) return;
  }

  // Statistiques en direct pour l'administration
  if (req.method === 'GET' && pathname === '/api/admin/stats') {
    try {
      const stats = getAdminStats();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(stats));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Impossible de calculer les statistiques' }));
    }
    return;
  }

  // Liste des messages reçus
  if (req.method === 'GET' && pathname === '/api/messages') {
    try {
      const messages = getMessages();
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(messages));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la lecture des messages' }));
    }
    return;
  }

  // Marquer un message comme lu
  if (req.method === 'PATCH' && pathname.startsWith('/api/messages/') && pathname.endsWith('/read')) {
    try {
      const idMatch = pathname.match(/\/api\/messages\/(\d+)\/read/);
      if (idMatch) {
        const id = parseInt(idMatch[1], 10);
        const { read = 1 } = await parseJsonBody(req);
        setMessageReadStatus(id, read);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: 'Statut du message mis à jour' }));
        return;
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la mise à jour du message' }));
      return;
    }
  }

  // Supprimer un message
  if (req.method === 'DELETE' && pathname.startsWith('/api/messages/')) {
    try {
      const id = parseInt(pathname.split('/')[3], 10);
      if (id) {
        deleteMessage(id);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: `Message #${id} supprimé avec succès` }));
        return;
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la suppression du message' }));
      return;
    }
  }

  // Mettre à jour le statut du profil (Disponibilité, titre, bio)
  if (req.method === 'PUT' && pathname === '/api/admin/profile') {
    try {
      const payload = await parseJsonBody(req);
      const updatedProfile = updateProfile(payload);
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, profile: updatedProfile, message: 'Profil mis à jour dans SQLite avec succès !' }));
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la mise à jour du profil' }));
    }
    return;
  }

  // Ajouter un projet
  if (req.method === 'POST' && pathname === '/api/admin/projects') {
    try {
      const payload = await parseJsonBody(req);
      if (!payload.title) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Le titre du projet est requis' }));
        return;
      }
      const result = addProject(payload);
      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify({ success: true, id: result.id, message: 'Projet créé dans SQLite !' }));
    } catch (err) {
      console.error('Erreur ajout projet:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de l’ajout du projet' }));
    }
    return;
  }

  // Modifier un projet
  if (req.method === 'PUT' && pathname.startsWith('/api/admin/projects/')) {
    try {
      const id = parseInt(pathname.split('/')[4], 10);
      const payload = await parseJsonBody(req);
      if (id) {
        updateProject(id, payload);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: `Projet #${id} mis à jour dans SQLite !` }));
        return;
      }
    } catch (err) {
      console.error('Erreur modification projet:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la modification du projet' }));
    }
    return;
  }

  // Supprimer un projet
  if (req.method === 'DELETE' && pathname.startsWith('/api/admin/projects/')) {
    try {
      const id = parseInt(pathname.split('/')[4], 10);
      if (id) {
        deleteProject(id);
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: true, message: `Projet #${id} supprimé de SQLite` }));
        return;
      }
    } catch (err) {
      console.error('Erreur suppression projet:', err);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur lors de la suppression du projet' }));
    }
    return;
  }

  // ==========================================
  // SERVEUR DE FICHIERS STATIQUES (Frontend)
  // ==========================================
  const publicPath = pathname === '/' ? '/index.html' : pathname;
  if (publicPath !== '/index.html' && !/^\/(?:css|js)\/[\w.-]+\.(?:css|js|jsx)$/.test(publicPath)) {
    res.writeHead(404);
    res.end();
    return;
  }
  const filePath = path.join(__dirname, publicPath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.writeHead(404);
      res.end();
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(filePath, (readErr, content) => {
      if (readErr) {
        res.writeHead(500);
        res.end('Erreur interne du serveur');
        return;
      }

      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    });
  });
});

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 Portfolio Dynamique de Walid Djellali démarré !`);
  console.log(`🔗 Accès Web : http://localhost:${PORT}`);
  console.log(`🗄️  Base de données : SQLite native (portfolio.db)`);
  console.log(adminPin ? '🛡️  Espace Administration activé' : '🛡️  Définissez ADMIN_PIN pour activer la connexion administrateur');
  console.log(`======================================================\n`);
});
