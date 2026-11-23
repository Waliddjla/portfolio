/**
 * projects-data.js
 * Données structurées des projets de Walid Djellali
 * Modifiez ou ajoutez facilement des projets ici.
 */

const projectsData = [
  {
    id: 1,
    title: "Plateforme SaaS Analytics",
    category: "web",
    categoryLabel: "Web App",
    description: "Tableau de bord d'analyse de métriques en temps réel avec visualisation de données complexes, authentification sécurisée et export de rapports personnalisés.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Chart.js"],
    demoUrl: "https://example.com/demo-saas",
    githubUrl: "https://github.com/waliddjellali/saas-analytics",
    featured: true
  },
  {
    id: 2,
    title: "API Microservices E-Commerce",
    category: "backend",
    categoryLabel: "Cloud & Backend",
    description: "Architecture backend distribuée gérant le panier, le paiement sécurisé via Stripe, l'inventaire en temps réel et la messagerie asynchrone avec RabbitMQ.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
    tags: ["Node.js", "Express", "PostgreSQL", "Docker", "Redis", "Stripe API"],
    demoUrl: "https://example.com/api-docs",
    githubUrl: "https://github.com/waliddjellali/ecommerce-microservices",
    featured: true
  },
  {
    id: 3,
    title: "Pipeline de Données & ETL Automatisé",
    category: "data",
    categoryLabel: "Data & IA",
    description: "Système de collecte, nettoyage et transformation automatisée de données volumineuses avec intégration dans un entrepôt de données et alertes automatisées.",
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "Pandas", "PostgreSQL", "Airflow", "Docker"],
    demoUrl: "https://example.com/etl-dashboard",
    githubUrl: "https://github.com/waliddjellali/automated-data-pipeline",
    featured: true
  },
  {
    id: 4,
    title: "Gestionnaire de Tâches Collaboratif",
    category: "web",
    categoryLabel: "Web App",
    description: "Application interactive de gestion de projets agile avec glisser-déposer (Kanban), synchronisation WebSocket en direct et permissions multi-utilisateurs.",
    image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?auto=format&fit=crop&w=800&q=80",
    tags: ["Vue.js", "Tailwind CSS", "Firebase", "WebSockets"],
    demoUrl: "https://example.com/task-manager",
    githubUrl: "https://github.com/waliddjellali/collaborative-kanban",
    featured: false
  },
  {
    id: 5,
    title: "Passerelle d'Authentification OAuth2 & JWT",
    category: "backend",
    categoryLabel: "Cloud & Backend",
    description: "Service d'authentification centralisé sécurisé implémentant SSO, gestion des rôles (RBAC), hachage argon2 et révocation de tokens basée sur Redis.",
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    tags: ["TypeScript", "NestJS", "JWT", "OAuth2", "Redis"],
    demoUrl: "https://example.com/auth-service",
    githubUrl: "https://github.com/waliddjellali/secure-auth-gateway",
    featured: false
  },
  {
    id: 6,
    title: "Assistant Intelligent & Intégration IA",
    category: "data",
    categoryLabel: "Data & IA",
    description: "Interface web conversationnelle connectée à un LLM avec recherche sémantique (RAG) sur documentation technique et historique de sessions chiffré.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800&q=80",
    tags: ["Python", "FastAPI", "OpenAI / Gemini API", "ChromaDB", "React"],
    demoUrl: "https://example.com/ai-assistant",
    githubUrl: "https://github.com/waliddjellali/rag-ai-assistant",
    featured: true
  }
];

// Catégories disponibles pour les filtres
const categoriesData = [
  { id: "all", label: "Tous les projets" },
  { id: "web", label: "Applications Web" },
  { id: "backend", label: "Cloud & Backend" },
  { id: "data", label: "Data & IA" }
];
