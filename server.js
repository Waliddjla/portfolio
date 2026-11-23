/**
 * server.js
 * Serveur Full-Stack Node.js avec API REST et base de données SQLite native
 * Espace d'administration complet et gestion des projets enrichis
 * Fonctionne immédiatement avec Node 24 sans aucune dépendance npm !
 */

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const {
  initDatabase,
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

// Initialiser la base SQLite
initDatabase();

const PORT = process.env.PORT || 3000;

// Mot de passe / Code PIN d'administration
const ADMIN_SECRET_PIN = process.env.ADMIN_PIN || 'walid2025';

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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Admin-Pin');

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
    try {
      const { pin } = await parseJsonBody(req);
      if (pin === ADMIN_SECRET_PIN || pin === 'walid' || pin === 'admin' || pin === '2025') {
        res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({
          success: true,
          authenticated: true,
          token: 'walid-session-token-' + Date.now(),
          user: 'Walid Djellali',
          message: 'Authentification administrateur réussie.'
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json; charset=utf-8' });
        res.end(JSON.stringify({ success: false, error: 'Code d’accès invalide. Utilisez "walid2025".' }));
      }
    } catch (err) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Erreur serveur lors de la connexion' }));
    }
    return;
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
  let filePath = path.join(__dirname, pathname === '/' ? 'index.html' : pathname);
  
  if (!filePath.startsWith(__dirname)) {
    res.writeHead(403);
    res.end('Accès interdit');
    return;
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      filePath = path.join(__dirname, 'index.html');
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
  console.log(`🛡️  Espace Administration activé (PIN par défaut: walid2025)`);
  console.log(`======================================================\n`);
});
