/**
 * database.js
 * Gestion de la base de données SQLite native avec node:sqlite (Node.js 24)
 * Données réelles extraites du CV et projets de Walid Djellali
 * Support complet de l'administration et des études de cas détaillées
 */

const { DatabaseSync } = require('node:sqlite');
const fs = require('node:fs');
const path = require('node:path');
const featuredProjects = require('./js/featured-projects.js');

const DB_PATH = path.join(__dirname, 'portfolio.db');
const db = new DatabaseSync(DB_PATH);

// Initialisation et migration des tables
function initDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      title TEXT NOT NULL,
      location TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      linkedin TEXT,
      github TEXT,
      bio TEXT,
      availability TEXT
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      role TEXT NOT NULL,
      company TEXT NOT NULL,
      period TEXT NOT NULL,
      description TEXT,
      bullets TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category TEXT NOT NULL,
      name TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      category_label TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT NOT NULL,
      tags TEXT NOT NULL,
      demo_url TEXT,
      github_url TEXT,
      tagline TEXT,
      features TEXT,
      case_study TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS education (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      degree TEXT NOT NULL,
      institution TEXT NOT NULL,
      period TEXT NOT NULL,
      details TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      read INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Migrations douces pour les tables existantes
  try { db.exec("ALTER TABLE projects ADD COLUMN tagline TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE projects ADD COLUMN features TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE projects ADD COLUMN case_study TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE messages ADD COLUMN read INTEGER DEFAULT 0;"); } catch (e) {}

  // Seeder le profil s'il n'existe pas
  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get().count;
  if (profileCount === 0) {
    seedData();
  }

  // Garantir que les URLs officielles LinkedIn et GitHub sont toujours à jour
  try {
    db.prepare(`
      UPDATE profile 
      SET linkedin = 'https://www.linkedin.com/in/waliddjellali/',
          github = 'https://github.com/Waliddjla'
      WHERE id = 1
    `).run();
  } catch (e) {}

  syncFeaturedProjects();
}

// Synchroniser les projets enrichis dans la base SQLite
function syncFeaturedProjects() {
  const find = db.prepare('SELECT id FROM projects WHERE github_url = ?');
  const insert = db.prepare(`
    INSERT INTO projects
    (title, category, category_label, description, image, tags, demo_url, github_url, tagline, features, case_study, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);
  const update = db.prepare(`
    UPDATE projects 
    SET title = ?, category = ?, category_label = ?, description = ?, image = ?, 
        tags = ?, demo_url = ?, tagline = ?, features = ?, case_study = ?, order_index = ? 
    WHERE id = ?
  `);

  db.exec('BEGIN');
  try {
    featuredProjects.forEach((p, index) => {
      const rows = find.all(p.github_url);
      const fields = [
        p.title,
        p.category,
        p.category_label,
        p.description,
        p.image,
        JSON.stringify(p.tags || []),
        p.demo_url || null,
        p.tagline || '',
        JSON.stringify(p.features || []),
        JSON.stringify(p.case_study || null)
      ];

      if (rows.length) {
        for (const row of rows) {
          update.run(...fields, index - featuredProjects.length, row.id);
        }
      } else {
        insert.run(...fields, p.github_url, index - featuredProjects.length);
      }
    });
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    console.error('Erreur synchronisation projets enrichis:', error);
  }
}

function seedData() {
  // 1. Profil de Walid Djellali
  const insertProfile = db.prepare(`
    INSERT INTO profile (id, name, title, location, email, phone, linkedin, github, bio, availability)
    VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  insertProfile.run(
    'Walid Djellali',
    'SAP Functional Analyst | Full Stack Software Engineer',
    'Oran, Algérie',
    'walidjellali32@gmail.com',
    '+213 676 958 671',
    'https://www.linkedin.com/in/waliddjellali/',
    'https://github.com/Waliddjla',
    'Analyste fonctionnel SAP et ingénieur logiciel diplômé d’un Master en informatique. Expérience confirmée dans le déploiement d’ERP SAP S/4HANA (PM & MM), l’administration de systèmes IT et le développement Full-Stack (Node.js, TypeScript, React). Combine rigueur analytique métier et maîtrise technique pour concevoir des solutions numériques pérennes.',
    'Disponible pour opportunités SAP & Développement Full-Stack'
  );

  // 2. Expériences professionnelles (CV de Walid)
  const insertExp = db.prepare(`
    INSERT INTO experiences (role, company, period, description, bullets, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const experiences = [
    {
      role: 'SAP Functional Analyst',
      company: 'Orionlab',
      period: 'Poste actuel',
      description: 'Support et intégration des processus SAP S/4HANA 2023 avec focus Plant Maintenance (PM) et Materials Management (MM).',
      bullets: JSON.stringify([
        'Prise en charge des activités fonctionnelles SAP S/4HANA, pilotage du module PM et support utilisateurs sur les flux MM.',
        'Collaboration avec l’ingénierie, la validation et l’intégrateur SAP pour clarifier les spécifications et réviser le Business Blueprint (BBP) PM.',
        'Validation et nettoyage des données de base (Equipment, Functional Locations) avant migration (corrections de formats, hiérarchies et références).',
        'Gestion de la maintenance préventive, calibration, qualifications, gammes d’opérations (Task Lists) et ordonnancement des ordres de travail.',
        'Coordination des formulaires d’ordres de maintenance et intégration des caractéristiques QM avec les équipes métier.',
        'Administration des autorisations utilisateurs, rôles Fiori, et développement d’applications internes de digitalisation.'
      ]),
      order: 1
    },
    {
      role: 'IT Systems Engineer',
      company: 'ACG SIM SPA',
      period: '2024',
      description: 'Gestion, sécurisation des systèmes d’information et contribution au déploiement ERP SAP.',
      bullets: JSON.stringify([
        'Administration et maintien opérationnel des systèmes IT, gestion des sauvegardes, intégrité et sécurité des infrastructures.',
        'Contribution active à l’implémentation et au support de l’ERP SAP en alignant les besoins métiers avec les fonctionnalités du système.',
        'Diagnostic matériel/logiciel, optimisation de l’infrastructure et développement de solutions logicielles internes adaptées.'
      ]),
      order: 2
    },
    {
      role: 'Full Stack Software Engineer',
      company: 'SARL Ide-Net Géolocalisation',
      period: '2023 – 2024',
      description: 'Conception et développement de plateformes de suivi et géolocalisation IoT / télématique.',
      bullets: JSON.stringify([
        'Conception et développement de plateformes de géolocalisation et de suivi de flotte avec APIs REST en Node.js et TypeScript.',
        'Intégration d’appareils GPS et boîtiers CAN dans les solutions de tracking, optimisation des algorithmes backend et des requêtes.',
        'Collaboration étroite avec des équipes pluridisciplinaires pour traduire les exigences opérationnelles en fonctionnalités logicielles robustes.'
      ]),
      order: 3
    },
    {
      role: 'IT Engineer – Network and Support',
      company: 'SARL Gesco Climatisation',
      period: '2023',
      description: 'Administration de l’infrastructure réseau, support utilisateur et déploiements IT.',
      bullets: JSON.stringify([
        'Administration et supervision de l’infrastructure réseau, résolution des incidents systèmes/réseau et assistance support utilisateurs (helpdesk).',
        'Participation aux améliorations d’infrastructures et aux déploiements informatiques stratégiques.'
      ]),
      order: 4
    }
  ];

  for (const exp of experiences) {
    insertExp.run(exp.role, exp.company, exp.period, exp.description, exp.bullets, exp.order);
  }

  // 3. Compétences (Skills)
  const insertSkill = db.prepare(`
    INSERT INTO skills (category, name, order_index)
    VALUES (?, ?, ?)
  `);

  const skillsList = [
    { cat: 'SAP & ERP', name: 'SAP S/4HANA 2023', order: 1 },
    { cat: 'SAP & ERP', name: 'SAP PM (Plant Maintenance)', order: 2 },
    { cat: 'SAP & ERP', name: 'SAP MM (Materials Management)', order: 3 },
    { cat: 'SAP & ERP', name: 'SAP Fiori', order: 4 },
    { cat: 'SAP & ERP', name: 'Business Blueprint (BBP)', order: 5 },
    { cat: 'SAP & ERP', name: 'Maintenance Préventive & Ordres de Travail', order: 6 },
    { cat: 'SAP & ERP', name: 'Migration & Master Data', order: 7 },
    { cat: 'Frontend', name: 'React', order: 1 },
    { cat: 'Frontend', name: 'Next.js', order: 2 },
    { cat: 'Frontend', name: 'TypeScript', order: 3 },
    { cat: 'Frontend', name: 'JavaScript (ES6+)', order: 4 },
    { cat: 'Frontend', name: 'Tailwind CSS', order: 5 },
    { cat: 'Frontend', name: 'HTML5 & CSS3', order: 6 },
    { cat: 'Frontend', name: 'Bootstrap', order: 7 },
    { cat: 'Backend & Languages', name: 'Node.js', order: 1 },
    { cat: 'Backend & Languages', name: 'Express / REST APIs', order: 2 },
    { cat: 'Backend & Languages', name: 'PHP & Laravel', order: 3 },
    { cat: 'Backend & Languages', name: 'Python & Django', order: 4 },
    { cat: 'Backend & Languages', name: 'Java', order: 5 },
    { cat: 'Databases & Systems', name: 'SQLite', order: 1 },
    { cat: 'Databases & Systems', name: 'MySQL', order: 2 },
    { cat: 'Databases & Systems', name: 'SQL Server', order: 3 },
    { cat: 'Databases & Systems', name: 'MongoDB', order: 4 },
    { cat: 'Databases & Systems', name: 'Firebase', order: 5 },
    { cat: 'Databases & Systems', name: 'Docker', order: 6 },
    { cat: 'Databases & Systems', name: 'Linux Ubuntu', order: 7 },
    { cat: 'Databases & Systems', name: 'Windows Server', order: 8 },
    { cat: 'Databases & Systems', name: 'Git & GitHub', order: 9 },
    { cat: 'Databases & Systems', name: 'Cisco Networking (CCNA)', order: 10 }
  ];

  for (const s of skillsList) {
    insertSkill.run(s.cat, s.name, s.order);
  }

  // 4. Éducation & Certifications
  const insertEdu = db.prepare(`
    INSERT INTO education (degree, institution, period, details, order_index)
    VALUES (?, ?, ?, ?, ?)
  `);

  const educationList = [
    {
      degree: 'Master en Informatique (Informatique Parallèle et Embarquée)',
      institution: 'Université d’Oran 1 Ahmed Ben Bella',
      period: '2020 – 2022',
      details: 'Systèmes distribués, parallélisme, calcul haute performance et systèmes embarqués.',
      order: 1
    },
    {
      degree: 'Licence en Systèmes Informatiques',
      institution: 'Université d’Oran 1 Ahmed Ben Bella',
      period: '2016 – 2020',
      details: 'Algorithmique, génie logiciel, réseaux informatiques, bases de données et modélisation.',
      order: 2
    },
    {
      degree: 'Certification Cisco CCNA v7 (Réseaux & Routage)',
      institution: 'Cisco Networking Academy',
      period: '2023',
      details: 'Configuration de switchs/routeurs, protocoles IP, VLAN, routage OSPF et sécurité réseau.',
      order: 3
    }
  ];

  for (const edu of educationList) {
    insertEdu.run(edu.degree, edu.institution, edu.period, edu.details, edu.order);
  }

  console.log('✅ Base de données SQLite amorcée avec le profil de Walid Djellali !');
}

// Récupération complète des données du portfolio
function getPortfolioData() {
  const profile = db.prepare('SELECT * FROM profile WHERE id = 1').get() || {};
  const experiences = db.prepare('SELECT * FROM experiences ORDER BY order_index ASC').all().map(exp => ({
    ...exp,
    bullets: JSON.parse(exp.bullets || '[]')
  }));
  const skills = db.prepare('SELECT * FROM skills ORDER BY order_index ASC').all();
  
  const rawProjects = db.prepare('SELECT * FROM projects ORDER BY order_index ASC').all();
  const projects = rawProjects.map(p => {
    let parsedTags = [];
    let parsedFeatures = [];
    let parsedCaseStudy = null;
    try { parsedTags = JSON.parse(p.tags || '[]'); } catch (e) { parsedTags = []; }
    try { parsedFeatures = JSON.parse(p.features || '[]'); } catch (e) { parsedFeatures = []; }
    try { parsedCaseStudy = JSON.parse(p.case_study || 'null'); } catch (e) { parsedCaseStudy = null; }

    // Fallback dynamique sur featuredProjects si les colonnes SQLite étaient vides
    const catalogMatch = featuredProjects.find(fp => fp.github_url === p.github_url || fp.title === p.title);
    if (!parsedCaseStudy && catalogMatch && catalogMatch.case_study) {
      parsedCaseStudy = catalogMatch.case_study;
    }
    if ((!parsedFeatures || parsedFeatures.length === 0) && catalogMatch && catalogMatch.features) {
      parsedFeatures = catalogMatch.features;
    }
    const tagline = p.tagline || (catalogMatch ? catalogMatch.tagline : "");

    return {
      ...p,
      tagline,
      tags: parsedTags,
      features: parsedFeatures,
      case_study: parsedCaseStudy
    };
  });

  const education = db.prepare('SELECT * FROM education ORDER BY order_index ASC').all();

  return {
    profile,
    experiences,
    skills,
    projects,
    education
  };
}

// Sauvegarde d'un message reçu
function saveContactMessage(name, email, subject, message) {
  const stmt = db.prepare(`
    INSERT INTO messages (name, email, subject, message)
    VALUES (?, ?, ?, ?)
  `);
  const result = stmt.run(name, email, subject || 'Sans objet', message);
  return { success: true, id: result.lastInsertRowid };
}

// Liste des messages reçus
function getMessages() {
  return db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
}

// Marquer un message comme lu / non-lu
function setMessageReadStatus(id, readState = 1) {
  return db.prepare('UPDATE messages SET read = ? WHERE id = ?').run(readState ? 1 : 0, id);
}

// Supprimer un message
function deleteMessage(id) {
  return db.prepare('DELETE FROM messages WHERE id = ?').run(id);
}

// Mise à jour des informations du profil (Administration)
function updateProfile(fields) {
  const { title, location, email, phone, bio, availability } = fields;
  const stmt = db.prepare(`
    UPDATE profile
    SET title = COALESCE(?, title),
        location = COALESCE(?, location),
        email = COALESCE(?, email),
        phone = COALESCE(?, phone),
        bio = COALESCE(?, bio),
        availability = COALESCE(?, availability)
    WHERE id = 1
  `);
  stmt.run(title, location, email, phone, bio, availability);
  return db.prepare('SELECT * FROM profile WHERE id = 1').get();
}

// Ajouter un nouveau projet via l'Administration
function addProject(project) {
  const stmt = db.prepare(`
    INSERT INTO projects (title, category, category_label, description, image, tags, demo_url, github_url, tagline, features, case_study, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const tags = JSON.stringify(Array.isArray(project.tags) ? project.tags : (project.tags || '').split(',').map(s => s.trim()).filter(Boolean));
  const features = JSON.stringify(Array.isArray(project.features) ? project.features : (project.features || '').split('\n').map(s => s.trim()).filter(Boolean));
  const caseStudy = typeof project.case_study === 'object' ? JSON.stringify(project.case_study) : (project.case_study || null);

  const result = stmt.run(
    project.title,
    project.category || 'software',
    project.category_label || 'Full-Stack',
    project.description || '',
    project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    tags,
    project.demo_url || null,
    project.github_url || 'https://github.com/Waliddjla',
    project.tagline || '',
    features,
    caseStudy,
    project.order_index || 0
  );

  return { success: true, id: result.lastInsertRowid };
}

// Modifier un projet
function updateProject(id, project) {
  const stmt = db.prepare(`
    UPDATE projects
    SET title = ?,
        category = ?,
        category_label = ?,
        description = ?,
        image = ?,
        tags = ?,
        demo_url = ?,
        github_url = ?,
        tagline = ?,
        features = ?,
        case_study = ?
    WHERE id = ?
  `);

  const tags = JSON.stringify(Array.isArray(project.tags) ? project.tags : (project.tags || '').split(',').map(s => s.trim()).filter(Boolean));
  const features = JSON.stringify(Array.isArray(project.features) ? project.features : (project.features || '').split('\n').map(s => s.trim()).filter(Boolean));
  const caseStudy = typeof project.case_study === 'object' ? JSON.stringify(project.case_study) : (project.case_study || null);

  stmt.run(
    project.title,
    project.category,
    project.category_label,
    project.description,
    project.image,
    tags,
    project.demo_url,
    project.github_url,
    project.tagline || '',
    features,
    caseStudy,
    id
  );

  return { success: true };
}

// Supprimer un projet
function deleteProject(id) {
  return db.prepare('DELETE FROM projects WHERE id = ?').run(id);
}

// Statistiques administratives en temps réel
function getAdminStats() {
  const messagesCount = db.prepare('SELECT COUNT(*) as count FROM messages').get().count;
  const unreadCount = db.prepare('SELECT COUNT(*) as count FROM messages WHERE read = 0').get().count;
  const projectsCount = db.prepare('SELECT COUNT(*) as count FROM projects').get().count;
  const skillsCount = db.prepare('SELECT COUNT(*) as count FROM skills').get().count;
  const experiencesCount = db.prepare('SELECT COUNT(*) as count FROM experiences').get().count;
  const profile = db.prepare('SELECT availability, title FROM profile WHERE id = 1').get() || {};

  let dbSizeKb = 0;
  try {
    const stats = fs.statSync(DB_PATH);
    dbSizeKb = Math.round(stats.size / 1024);
  } catch (e) {}

  return {
    messagesCount,
    unreadCount,
    projectsCount,
    skillsCount,
    experiencesCount,
    availability: profile.availability,
    title: profile.title,
    dbSizeKb,
    uptimeSeconds: Math.round(process.uptime()),
    nodeVersion: process.version
  };
}

// Initialiser automatiquement
initDatabase();

module.exports = {
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
  getAdminStats,
  db
};
