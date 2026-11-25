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

const DB_PATH = process.env.PORTFOLIO_DB_PATH || path.join(__dirname, 'portfolio.db');
const db = new DatabaseSync(DB_PATH);

const projectTranslationFields = [
  'title_en', 'tagline_en', 'description_en', 'category_label_en', 'features_en', 'case_study_en', 'repository_note_en'
];

function addTranslationColumns(table, fields) {
  const existing = new Set(db.prepare(`PRAGMA table_info(${table})`).all().map(column => column.name));
  for (const field of fields) {
    if (!existing.has(field)) db.exec(`ALTER TABLE ${table} ADD COLUMN ${field} TEXT`);
  }
}

function parseJson(value, fallback) {
  try {
    return value ? JSON.parse(value) ?? fallback : fallback;
  } catch {
    return fallback;
  }
}

function serializeList(value, delimiter) {
  if (value == null) return null;
  const items = Array.isArray(value) ? value : value.split(delimiter).map(item => item.trim()).filter(Boolean);
  return JSON.stringify(items);
}

function serializeCaseStudy(value) {
  return typeof value === 'string' ? value : value == null ? null : JSON.stringify(value);
}

function translatedProjectValues(project) {
  return [
    project.title_en ?? null,
    project.tagline_en ?? null,
    project.description_en ?? null,
    project.category_label_en ?? null,
    serializeList(project.features_en, '\n'),
    serializeCaseStudy(project.case_study_en),
    project.repository_note_en ?? null
  ];
}

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

    CREATE TABLE IF NOT EXISTS featured_project_sync (
      catalog_id INTEGER PRIMARY KEY,
      project_id INTEGER NOT NULL
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

    CREATE TABLE IF NOT EXISTS sap_modules (
      id TEXT PRIMARY KEY,
      code TEXT NOT NULL,
      title TEXT NOT NULL,
      title_en TEXT,
      icon TEXT NOT NULL,
      color TEXT NOT NULL,
      summary TEXT NOT NULL,
      summary_en TEXT,
      orion_bullets TEXT NOT NULL,
      orion_bullets_en TEXT,
      acg_bullets TEXT NOT NULL,
      acg_bullets_en TEXT,
      order_index INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS sap_flow (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      step_number TEXT NOT NULL,
      label TEXT NOT NULL,
      label_en TEXT NOT NULL,
      note TEXT NOT NULL,
      note_en TEXT NOT NULL,
      order_index INTEGER DEFAULT 0
    );
  `);

  // Migrations douces pour les tables existantes
  try { db.exec("ALTER TABLE projects ADD COLUMN tagline TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE projects ADD COLUMN features TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE projects ADD COLUMN case_study TEXT;"); } catch (e) {}
  try { db.exec("ALTER TABLE messages ADD COLUMN read INTEGER DEFAULT 0;"); } catch (e) {}
  addTranslationColumns('profile', ['title_en', 'bio_en', 'availability_en', 'location_en', 'avatar']);
  addTranslationColumns('experiences', ['role_en', 'description_en', 'bullets_en', 'period_en']);
  addTranslationColumns('skills', ['name_en']);
  addTranslationColumns('education', ['degree_en', 'details_en']);
  addTranslationColumns('projects', ['repository_note', ...projectTranslationFields]);

  // Mettre à jour l'avatar de profil
  try {
    db.prepare(`UPDATE profile SET avatar = COALESCE(avatar, '/img/walid.jpg') WHERE id = 1`).run();
  } catch (e) {}

  // Seeder le profil s'il n'existe pas
  const profileCount = db.prepare('SELECT COUNT(*) as count FROM profile').get().count;
  if (profileCount === 0) {
    seedData();
  }

  // Seeder les modules SAP et le flux s'ils n'existent pas
  const sapModulesCount = db.prepare('SELECT COUNT(*) as count FROM sap_modules').get().count;
  if (sapModulesCount === 0) {
    seedSapData();
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

  backfillTranslations();
  syncSkills();
  syncFeaturedProjects();
}

const curatedSkills = [
  // 1. SAP & ERP
  { cat: 'SAP & ERP', name: 'SAP S/4HANA 2023', name_en: 'SAP S/4HANA 2023', order: 1 },
  { cat: 'SAP & ERP', name: 'SAP PM (Plant Maintenance)', name_en: 'SAP PM (Plant Maintenance)', order: 2 },
  { cat: 'SAP & ERP', name: 'SAP MM (Materials Management)', name_en: 'SAP MM (Materials Management)', order: 3 },
  { cat: 'SAP & ERP', name: 'SAP QM (Quality Management)', name_en: 'SAP QM (Quality Management)', order: 4 },
  { cat: 'SAP & ERP', name: 'SAP Fiori', name_en: 'SAP Fiori', order: 5 },
  { cat: 'SAP & ERP', name: 'OData Services & Intégration', name_en: 'OData Services & Integration', order: 6 },
  { cat: 'SAP & ERP', name: 'Business Blueprint (BBP)', name_en: 'Business Blueprint (BBP)', order: 7 },
  { cat: 'SAP & ERP', name: 'Maintenance Préventive & Étalonnage', name_en: 'Preventive Maintenance & Calibration', order: 8 },
  { cat: 'SAP & ERP', name: 'Migration & Données de Base', name_en: 'Master Data Migration', order: 9 },

  // 2. Frontend & Desktop
  { cat: 'Frontend', name: 'React', name_en: 'React', order: 1 },
  { cat: 'Frontend', name: 'Next.js', name_en: 'Next.js', order: 2 },
  { cat: 'Frontend', name: 'TypeScript', name_en: 'TypeScript', order: 3 },
  { cat: 'Frontend', name: 'JavaScript (ES6+)', name_en: 'JavaScript (ES6+)', order: 4 },
  { cat: 'Frontend', name: 'Electron (Desktop Apps)', name_en: 'Electron (Desktop Apps)', order: 5 },
  { cat: 'Frontend', name: 'Tailwind CSS', name_en: 'Tailwind CSS', order: 6 },
  { cat: 'Frontend', name: 'HTML5 & CSS3', name_en: 'HTML5 & CSS3', order: 7 },
  { cat: 'Frontend', name: 'Bootstrap', name_en: 'Bootstrap', order: 8 },

  // 3. Backend & APIs
  { cat: 'Backend & Languages', name: 'Node.js', name_en: 'Node.js', order: 1 },
  { cat: 'Backend & Languages', name: 'NestJS', name_en: 'NestJS', order: 2 },
  { cat: 'Backend & Languages', name: 'Fastify', name_en: 'Fastify', order: 3 },
  { cat: 'Backend & Languages', name: 'Express.js', name_en: 'Express.js', order: 4 },
  { cat: 'Backend & Languages', name: 'RESTful APIs', name_en: 'RESTful APIs', order: 5 },
  { cat: 'Backend & Languages', name: 'PHP & Laravel', name_en: 'PHP & Laravel', order: 6 },
  { cat: 'Backend & Languages', name: 'Python & Django', name_en: 'Python & Django', order: 7 },
  { cat: 'Backend & Languages', name: 'Java', name_en: 'Java', order: 8 },

  // 4. Databases & Storage
  { cat: 'Databases & Storage', name: 'SQLite', name_en: 'SQLite', order: 1 },
  { cat: 'Databases & Storage', name: 'MySQL', name_en: 'MySQL', order: 2 },
  { cat: 'Databases & Storage', name: 'SQL Server', name_en: 'SQL Server', order: 3 },
  { cat: 'Databases & Storage', name: 'MongoDB', name_en: 'MongoDB', order: 4 },
  { cat: 'Databases & Storage', name: 'Firebase', name_en: 'Firebase', order: 5 },

  // 5. Systems, AD, Synology & Networking
  { cat: 'Systems & Infrastructure', name: 'Active Directory (AD / GPO / DNS)', name_en: 'Active Directory (AD / GPO / DNS)', order: 1 },
  { cat: 'Systems & Infrastructure', name: 'Windows Server', name_en: 'Windows Server', order: 2 },
  { cat: 'Systems & Infrastructure', name: 'Synology NAS (DSM / RAID / Backups)', name_en: 'Synology NAS (DSM / RAID / Backups)', order: 3 },
  { cat: 'Systems & Infrastructure', name: 'IT Troubleshooting (Systèmes & Réseau)', name_en: 'IT Troubleshooting (Systems & Network)', order: 4 },
  { cat: 'Systems & Infrastructure', name: 'Linux Ubuntu', name_en: 'Linux Ubuntu', order: 5 },
  { cat: 'Systems & Infrastructure', name: 'Cisco Networking (CCNA)', name_en: 'Cisco Networking (CCNA)', order: 6 },

  // 6. DevOps & Deployment
  { cat: 'DevOps & Deployment', name: 'PM2 (Process Manager)', name_en: 'PM2 (Process Manager)', order: 1 },
  { cat: 'DevOps & Deployment', name: 'Nginx (Reverse Proxy)', name_en: 'Nginx (Reverse Proxy)', order: 2 },
  { cat: 'DevOps & Deployment', name: 'SSL / TLS (HTTPS & Certbot)', name_en: 'SSL / TLS (HTTPS & Certbot)', order: 3 },
  { cat: 'DevOps & Deployment', name: 'Docker', name_en: 'Docker', order: 4 },
  { cat: 'DevOps & Deployment', name: 'Git & GitHub', name_en: 'Git & GitHub', order: 5 }
];

function syncSkills() {
  const renames = [
    ['Express / REST APIs', 'Express.js'],
    ['Maintenance Préventive & Ordres de Travail', 'Maintenance Préventive & Étalonnage'],
    ['Migration & Master Data', 'Migration & Données de Base']
  ];
  const renameStmt = db.prepare('UPDATE skills SET name = ? WHERE name = ?');
  const findSkill = db.prepare('SELECT id FROM skills WHERE name = ? ORDER BY id');
  const updateSkill = db.prepare('UPDATE skills SET category = ?, name_en = ?, order_index = ? WHERE id = ?');
  const insertSkill = db.prepare('INSERT INTO skills (category, name, name_en, order_index) VALUES (?, ?, ?, ?)');

  db.exec('BEGIN IMMEDIATE');
  try {
    for (const [oldName, newName] of renames) {
      if (!findSkill.get(newName)) {
        renameStmt.run(newName, oldName);
      }
    }
    for (const s of curatedSkills) {
      const existing = findSkill.get(s.name);
      if (existing) {
        updateSkill.run(s.cat, s.name_en, s.order, existing.id);
      } else {
        insertSkill.run(s.cat, s.name, s.name_en, s.order);
      }
    }
    db.exec('COMMIT');
  } catch (err) {
    db.exec('ROLLBACK');
    throw err;
  }
}

function backfillTranslations() {
  db.prepare(`
    UPDATE profile SET
      title_en = COALESCE(title_en, title),
      bio_en = COALESCE(bio_en, ?),
      availability_en = COALESCE(availability_en, ?),
      location_en = COALESCE(location_en, CASE WHEN location = 'Oran, Algérie' THEN 'Oran, Algeria' ELSE location END)
    WHERE id = 1
  `).run(
    'SAP Functional Analyst and Software Engineer with a Master’s degree in Computer Science. Experienced in SAP S/4HANA deployments (PM and MM), IT systems administration and full-stack development (Node.js, TypeScript, React). Combines business analysis with technical expertise to design maintainable digital solutions.',
    'Available for SAP and full-stack development opportunities'
  );

  const experienceTranslations = [
    ['Orionlab', 'Support and integration of SAP S/4HANA 2023 processes, with a focus on Plant Maintenance (PM) and Materials Management (MM).', [
      'Handle SAP S/4HANA functional activities, lead the PM module and support users across MM workflows.',
      'Work with engineering, validation and the SAP implementation partner to clarify specifications and review the PM Business Blueprint (BBP).',
      'Validate and cleanse equipment and functional location master data before migration, correcting formats, hierarchies and references.',
      'Manage preventive maintenance, calibration, qualifications, task lists and work order scheduling.',
      'Coordinate maintenance order forms and integrate QM inspection characteristics with business teams.',
      'Administer user authorizations and Fiori roles, and develop internal applications to digitize workflows.'
    ]],
    ['ACG SIM SPA', 'IT systems management and security, with contributions to an SAP ERP rollout.', [
      'Administered and maintained IT systems, managed backups and ensured infrastructure integrity and security.',
      'Contributed to SAP ERP implementation and support, aligning business needs with system capabilities.',
      'Diagnosed hardware and software issues, optimized infrastructure and developed internal software solutions.'
    ]],
    ['SARL Ide-Net Géolocalisation', 'Designed and developed IoT tracking and fleet telematics platforms.', [
      'Designed and developed geolocation and fleet tracking platforms using Node.js and TypeScript REST APIs.',
      'Integrated GPS devices and CAN units into tracking systems, and optimized backend algorithms and queries.',
      'Worked closely with cross-functional teams to translate operational requirements into reliable software features.'
    ]],
    ['SARL Gesco Climatisation', 'Network infrastructure administration, user support and IT deployments.', [
      'Administered and monitored network infrastructure, resolved system and network incidents, and provided help desk support.',
      'Contributed to infrastructure improvements and strategic IT deployments.'
    ]]
  ];
  const translateExperience = db.prepare(`
    UPDATE experiences SET
      role_en = COALESCE(role_en, role),
      description_en = COALESCE(description_en, ?),
      bullets_en = COALESCE(bullets_en, ?),
      period_en = COALESCE(period_en, CASE WHEN period = 'Poste actuel' THEN 'Current role' ELSE period END)
    WHERE company = ?
  `);
  for (const [company, description, bullets] of experienceTranslations) {
    translateExperience.run(description, JSON.stringify(bullets), company);
  }

  const educationTranslations = [
    ['Master en Informatique (Informatique Parallèle et Embarquée)', 'Master’s Degree in Computer Science (Parallel and Embedded Computing)', 'Distributed systems, parallel processing, high-performance computing and embedded systems.'],
    ['Licence en Systèmes Informatiques', 'Bachelor’s Degree in Computer Systems', 'Algorithms, software engineering, computer networks, databases and modeling.'],
    ['Certification Cisco CCNA v7 (Réseaux & Routage)', 'Cisco CCNA v7 Certification (Networking and Routing)', 'Switch and router configuration, IP protocols, VLANs, OSPF routing and network security.']
  ];
  const translateEducation = db.prepare(`
    UPDATE education SET degree_en = COALESCE(degree_en, ?), details_en = COALESCE(details_en, ?)
    WHERE degree = ?
  `);
  for (const [degree, title, details] of educationTranslations) {
    translateEducation.run(title, details, degree);
  }

  // Older databases also contain projects outside the featured catalog.
  const legacyTranslations = [
    ['walid-store', 'Walid Store — E-Commerce Application', 'An online store with a product catalog, a dynamic cart, advanced filters and persistent orders.', 'Full-Stack Web'],
    ['the-github-reherche', 'The GitHub Recherche — API Explorer', 'An interactive search application that uses the GitHub API to explore developer profiles, statistics, repositories and activity.', 'JavaScript & API'],
    ['connect-walid', 'Connect Walid — Interactive React Game', 'A React implementation of Connect Four with state management via useState and useEffect, win detection and an interactive interface.', 'React Game'],
    ['infinite-gallery', 'Infinite Gallery — Infinite-Scroll Image Gallery', 'A responsive image gallery with progressive asynchronous loading, DOM manipulation and caching.', 'JavaScript UI'],
    ['meteo-js', 'Météo-JS — Live Weather Application', 'A responsive weather app with a live weather API, automatic geolocation and forecasts.', 'JavaScript API'],
    ['Multi-langues-react', 'Multilingual React Component Suite', 'A suite of React modules covering internationalization (Multi-langues-react), a stopwatch (Chrono-React) and a carousel (Slider-react).', 'React & i18n'],
    ['SIMswitch_react', 'SIMswitch — IT Asset Management', 'An application for managing switches, computers, printers, servers, displays and time clocks. Its React interface uses the Datta Able template and includes a dashboard, user management, installation procedures and asset handover records.', 'React & IT Inventory'],
    ['best-employe', 'Best Employe — Employee Voting', 'A full-stack employee recognition voting application with a React and TypeScript interface, an Express server and MySQL. It uses libraries for JWT authentication, results visualization and animation.', 'React & HR Application']
  ];
  const translateLegacyProject = db.prepare(`
    UPDATE projects SET title_en = COALESCE(title_en, ?), description_en = COALESCE(description_en, ?),
      category_label_en = COALESCE(category_label_en, ?)
    WHERE github_url = ?
  `);
  for (const [repo, title, description, category] of legacyTranslations) {
    translateLegacyProject.run(title, description, category, `https://github.com/Waliddjla/${repo}`);
  }
}

// Synchroniser les projets enrichis dans la base SQLite
function syncFeaturedProjects() {
  const synced = db.prepare('SELECT project_id FROM featured_project_sync WHERE catalog_id = ?');
  const record = db.prepare('INSERT OR REPLACE INTO featured_project_sync (catalog_id, project_id) VALUES (?, ?)');
  const findByUrl = db.prepare('SELECT id FROM projects WHERE github_url = ? ORDER BY id');
  const findByTitle = db.prepare('SELECT id FROM projects WHERE title = ? ORDER BY id');
  const existsById = db.prepare('SELECT id FROM projects WHERE id = ?');
  const englishColumns = projectTranslationFields.join(', ');
  const englishPlaceholders = projectTranslationFields.map(() => '?').join(', ');
  const englishAssignments = projectTranslationFields.map(field => `${field} = ?`).join(', ');

  const insert = db.prepare(`
    INSERT INTO projects
    (title, category, category_label, description, image, tags, demo_url, tagline, features, case_study, repository_note, github_url, order_index, ${englishColumns})
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${englishPlaceholders})
  `);
  const update = db.prepare(`
    UPDATE projects
    SET title = ?, category = ?, category_label = ?, description = ?, image = ?, tags = ?,
        demo_url = ?, tagline = ?, features = ?, case_study = ?, repository_note = ?,
        github_url = ?, order_index = ?, ${englishAssignments}
    WHERE id = ?
  `);

  db.exec('BEGIN IMMEDIATE');
  try {
    // 1. Nettoyage des doublons IoT et des anciens exercices sans étude de cas (déjà présents dans le Hub GitHub)
    const syncedIoT = synced.get(108);
    if (syncedIoT) {
      db.prepare('DELETE FROM projects WHERE title LIKE ? AND id != ?').run('%Plateforme IoT%', syncedIoT.project_id);
    }
    const deprecatedExercises = ['walid-store', 'the-github-reherche', 'connect-walid', 'infinite-gallery', 'meteo-js', 'Multi-langues-react'];
    const deleteDeprecated = db.prepare('DELETE FROM projects WHERE github_url = ? AND case_study IS NULL');
    for (const repo of deprecatedExercises) {
      deleteDeprecated.run(`https://github.com/Waliddjla/${repo}`);
    }

    // 2. Synchronisation du catalogue pro
    featuredProjects.forEach((p, index) => {
      const translations = translatedProjectValues(p);
      const fields = [
        p.title,
        p.category,
        p.category_label,
        p.description,
        p.image,
        JSON.stringify(p.tags || []),
        p.demo_url || null,
        p.tagline || '',
        serializeList(p.features, '\n'),
        serializeCaseStudy(p.case_study),
        p.repository_note || null
      ];
      const orderIndex = index + 1;

      const existing = synced.get(p.id);
      if (existing && existsById.get(existing.project_id)) {
        update.run(...fields, p.github_url || null, orderIndex, ...translations, existing.project_id);
        return;
      }

      const rows = (p.github_url ? findByUrl.all(p.github_url) : []).concat(findByTitle.all(p.title));
      const matchedId = rows.length ? rows[0].id : null;

      if (matchedId) {
        update.run(...fields, p.github_url || null, orderIndex, ...translations, matchedId);
        record.run(p.id, matchedId);
      } else {
        const { lastInsertRowid } = insert.run(...fields, p.github_url || null, orderIndex, ...translations);
        record.run(p.id, lastInsertRowid);
      }
    });
    db.exec('COMMIT');
  } catch (error) {
    db.exec('ROLLBACK');
    throw error;
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
    INSERT INTO skills (category, name, name_en, order_index)
    VALUES (?, ?, ?, ?)
  `);

  for (const s of curatedSkills) {
    insertSkill.run(s.cat, s.name, s.name_en, s.order);
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

// Seeder les modules SAP et leur flux d'intégration
function seedSapData() {
  const insertModule = db.prepare(`
    INSERT INTO sap_modules
    (id, code, title, title_en, icon, color, summary, summary_en, orion_bullets, orion_bullets_en, acg_bullets, acg_bullets_en, order_index)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const modules = [
    {
      id: "pm",
      code: "PM",
      title: "Plant Maintenance",
      title_en: "Plant Maintenance",
      icon: "wrench",
      color: "blue",
      summary: "Maintenance des équipements : avis, ordres de travail, plans préventifs, gammes.",
      summary_en: "Equipment maintenance: notifications, work orders, preventive plans, task lists.",
      orion: [
        "Revue du Business Blueprint (BBP) PM avec l'intégrateur SAP",
        "Validation des données de base (Equipment, Functional Locations) avant migration",
        "Planification préventive, calibration, Task Lists et ordonnancement des OT",
        "Modèle d'impression des avis et ordres de maintenance"
      ],
      orion_en: [
        "Review of the PM Business Blueprint (BBP) with the SAP integrator",
        "Validation of master data (Equipment, Functional Locations) prior to migration",
        "Preventive scheduling, calibration, Task Lists and work order dispatching",
        "Print layout design for maintenance notifications and orders"
      ],
      acg: [
        "Support au déploiement SAP S/4HANA dans les processus de maintenance",
        "Gestion des utilisateurs, rôles et accès Fiori"
      ],
      acg_en: [
        "Support for SAP S/4HANA rollout across maintenance business processes",
        "User administration, role authorisations and Fiori launchpad access"
      ],
      order: 1
    },
    {
      id: "mm",
      code: "MM",
      title: "Materials Management",
      title_en: "Materials Management",
      icon: "package",
      color: "indigo",
      summary: "Articles, stocks, réservations, demandes d'achat et commandes.",
      summary_en: "Materials, inventory, reservations, purchase requisitions, and orders.",
      orion: [
        "Support utilisateurs sur les flux MM (pièces de rechange, réservations)",
        "Lien entre ordres PM et disponibilité des pièces en magasin"
      ],
      orion_en: [
        "End-user support on MM procurement flows (spare parts, warehouse reservations)",
        "Bridging PM work orders with real-time warehouse spare parts availability"
      ],
      acg: [
        "Contribution à l'implémentation de l'ERP SAP côté approvisionnement",
        "Tableau de bord achats (SAPAN / DA Analyse) alimenté par OData SAP"
      ],
      acg_en: [
        "Contribution to SAP ERP implementation on the procurement & supply side",
        "Purchasing analytics dashboard (SAPAN / PR Analysis) powered by SAP OData"
      ],
      order: 2
    },
    {
      id: "qm",
      code: "QM",
      title: "Quality Management",
      title_en: "Quality Management",
      icon: "gauge",
      color: "emerald",
      summary: "Lots de contrôle, caractéristiques, étalonnage et décision d'utilisation.",
      summary_en: "Inspection lots, master characteristics, calibration, and usage decision.",
      orion: [
        "Coordination des caractéristiques QM avec les équipes métier",
        "Articulation calibration / métrologie avec les plans d'entretien PM"
      ],
      orion_en: [
        "Coordination of QM inspection characteristics with cross-functional teams",
        "Integration of calibration & metrology with PM preventive maintenance plans"
      ],
      acg: [
        "Alignement des besoins qualité avec les processus SAP"
      ],
      acg_en: [
        "Alignment of operational quality requirements with SAP ERP processes"
      ],
      order: 3
    }
  ];

  for (const m of modules) {
    insertModule.run(
      m.id,
      m.code,
      m.title,
      m.title_en,
      m.icon,
      m.color,
      m.summary,
      m.summary_en,
      JSON.stringify(m.orion),
      JSON.stringify(m.orion_en),
      JSON.stringify(m.acg),
      JSON.stringify(m.acg_en),
      m.order
    );
  }

  const insertFlow = db.prepare(`
    INSERT INTO sap_flow (step_number, label, label_en, note, note_en, order_index)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  const flow = [
    { step: "01", label: "Avis PM", label_en: "PM Notification", note: "Panne ou besoin signalé", note_en: "Breakdown or need reported", order: 1 },
    { step: "02", label: "Ordre PM", label_en: "PM Work Order", note: "Réservation / achat de pièces (MM)", note_en: "Spare parts reservation / purchase (MM)", order: 2 },
    { step: "03", label: "Plan préventif PM", label_en: "PM Preventive Plan", note: "Déclenche les lots de contrôle (QM)", note_en: "Triggers inspection lots (QM)", order: 3 },
    { step: "04", label: "Exécution", label_en: "Execution", note: "Sortie de pièces (MM) + mesures (QM)", note_en: "Goods issue (MM) + measurements (QM)", order: 4 },
    { step: "05", label: "Clôture TECO", label_en: "TECO Completion", note: "Décision d'utilisation (QM)", note_en: "Usage decision (QM)", order: 5 }
  ];

  for (const f of flow) {
    insertFlow.run(f.step, f.label, f.label_en, f.note, f.note_en, f.order);
  }

  console.log('✅ Base de données SQLite amorcée avec les modules SAP S/4HANA (PM • MM • QM) !');
}

// Récupération complète des données du portfolio
function getPortfolioData() {
  const profile = db.prepare('SELECT * FROM profile WHERE id = 1').get() || {};
  const experiences = db.prepare('SELECT * FROM experiences ORDER BY order_index ASC').all().map(exp => ({
    ...exp,
    bullets: parseJson(exp.bullets, []),
    bullets_en: parseJson(exp.bullets_en, [])
  }));
  const skills = db.prepare('SELECT * FROM skills ORDER BY order_index ASC').all();
  
  const projects = db.prepare('SELECT * FROM projects ORDER BY order_index ASC').all().map(p => ({
    ...p,
    tagline: p.tagline ?? '',
    tags: parseJson(p.tags, []),
    features: parseJson(p.features, []),
    features_en: parseJson(p.features_en, []),
    case_study: parseJson(p.case_study, null),
    case_study_en: parseJson(p.case_study_en, null)
  }));

  const education = db.prepare('SELECT * FROM education ORDER BY order_index ASC').all();

  // Modules SAP et flux d'intégration depuis SQLite
  let sap_modules = [];
  try {
    sap_modules = db.prepare('SELECT * FROM sap_modules ORDER BY order_index ASC').all().map(m => ({
      ...m,
      orion: JSON.parse(m.orion_bullets || '[]'),
      orion_en: JSON.parse(m.orion_bullets_en || '[]'),
      acg: JSON.parse(m.acg_bullets || '[]'),
      acg_en: JSON.parse(m.acg_bullets_en || '[]')
    }));
  } catch (e) {
    sap_modules = [];
  }

  let sap_flow = [];
  try {
    sap_flow = db.prepare('SELECT * FROM sap_flow ORDER BY order_index ASC').all();
  } catch (e) {
    sap_flow = [];
  }

  return {
    profile,
    experiences,
    skills,
    projects,
    education,
    sap_modules,
    sap_flow
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
  const editable = [
    'title', 'location', 'email', 'phone', 'bio', 'availability', 'avatar',
    'title_en', 'location_en', 'bio_en', 'availability_en'
  ];
  const assignments = editable.map(field => `${field} = COALESCE(?, ${field})`).join(', ');
  db.prepare(`UPDATE profile SET ${assignments} WHERE id = 1`)
    .run(...editable.map(field => fields[field] ?? null));
  return db.prepare('SELECT * FROM profile WHERE id = 1').get();
}

// Ajouter un nouveau projet via l'Administration
function addProject(project) {
  const englishColumns = projectTranslationFields.join(', ');
  const englishPlaceholders = projectTranslationFields.map(() => '?').join(', ');
  const stmt = db.prepare(`
    INSERT INTO projects (title, category, category_label, description, image, tags, demo_url, github_url, tagline, features, case_study, repository_note, order_index, ${englishColumns})
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ${englishPlaceholders})
  `);

  const result = stmt.run(
    project.title,
    project.category || 'software',
    project.category_label || 'Full-Stack',
    project.description || '',
    project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    serializeList(project.tags ?? [], ','),
    project.demo_url || null,
    project.github_url || null,
    project.tagline || '',
    serializeList(project.features ?? [], '\n'),
    serializeCaseStudy(project.case_study),
    project.repository_note || null,
    project.order_index || 0,
    ...translatedProjectValues(project)
  );

  return { success: true, id: result.lastInsertRowid };
}

// Modifier un projet
function updateProject(id, project) {
  const editable = [
    'title', 'category', 'category_label', 'description', 'image', 'tags', 'demo_url',
    'github_url', 'tagline', 'features', 'case_study', 'repository_note', ...projectTranslationFields
  ];
  const fields = editable.filter(field => Object.hasOwn(project, field));
  if (fields.length) {
    const values = fields.map(field => {
      const value = project[field];
      if (field === 'tags') return serializeList(value ?? [], ',');
      if (field === 'features' || field === 'features_en') return serializeList(value ?? [], '\n');
      if (field === 'case_study' || field === 'case_study_en') return serializeCaseStudy(value);
      return value;
    });
    const assignments = fields.map(field => `${field} = ?`).join(', ');
    db.prepare(`UPDATE projects SET ${assignments} WHERE id = ?`).run(...values, id);
  }

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
  const profile = db.prepare('SELECT availability, availability_en, title, title_en FROM profile WHERE id = 1').get() || {};

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
    availability_en: profile.availability_en,
    title: profile.title,
    title_en: profile.title_en,
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
