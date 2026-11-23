/**
 * featured-projects.js
 * Catalogue enrichi de projets d'ingénierie et de réalisations professionnelles de Walid Djellali
 * Inclut les études de cas approfondies : contexte industriel, architecture technique, défis, métriques d'impact.
 */

const featuredProjects = [
  {
    id: 101,
    title: "My Orion — Plateforme Intégrée de Gestion IT & Opérations SAP",
    category: "software",
    category_label: "Full-Stack & IT Management",
    tagline: "Système centralisé de gouvernance IT, suivi des incidents SAP S/4HANA et traçabilité du parc d'équipements industriels.",
    description: "Plateforme d'entreprise centralisant la gestion des tickets IT et flux SAP PM/MM, la planification Kanban des tâches d'ingénierie, la cartographie du parc informatique et le suivi des achats/ventes avec traçabilité complète.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 18", "TypeScript", "Ant Design", "Node.js", "Express", "Sequelize", "MySQL", "PowerShell", "SAP BAPI"],
    github_url: "https://github.com/youcefsenouci/my-orion",
    demo_url: "https://github.com/youcefsenouci/my-orion",
    repository_note: "Projet d'entreprise — architecture de production et modules opérationnels.",
    features: [
      "Gestion centralisée des tickets IT & incidents SAP PM/MM avec SLA et priorisation dynamique",
      "Tableau de bord Kanban temps réel pour la planification des interventions et sprints techniques",
      "Inventaire automatisé du parc informatique, affectations des postes et historique des décharges",
      "Module de traçabilité des achats et commandes de maintenance synchronisé avec les flux SAP",
      "Gestion granulaire des rôles et autorisations (RBAC) avec audit logging des actions critiques",
      "Base de connaissances intégrée (KB) et documentation des procédures d'exploitation IT"
    ],
    case_study: {
      client: "Orionlab / Industrie Pharmaceutique & IT",
      role: "Lead Full-Stack Developer & SAP Business Analyst",
      period: "2024 - 2025",
      kpis: [
        { label: "Temps de résolution incidents", value: "-42%", icon: "clock" },
        { label: "Équipements tracés", value: "650+", icon: "hard-drive" },
        { label: "Disponibilité système", value: "99.8%", icon: "shield-check" }
      ],
      context: "Face à la démultiplication des demandes de support IT et des interactions avec l'ERP SAP S/4HANA, l'entreprise nécessitait une plateforme unique pour orchestrer les interventions de maintenance, l'allocation des équipements et le suivi rigoureux des tickets selon les standards GxP.",
      architecture: "Architecture multi-niveaux articulée autour d'un client React / Ant Design typé en TypeScript, d'un backend REST Express modulaire avec ORM Sequelize, et d'une persistance MySQL relationnelle. Des scripts d'automatisation PowerShell interagissent avec l'infrastructure locale et les services Windows.",
      challenges: [
        "Réconciliation des données de tickets avec la nomenclature des Postes Techniques et Équipements SAP S/4HANA.",
        "Gestion stricte de la traçabilité et conformité réglementaire (pistes d'audit infalsifiables des modifications).",
        "Optimisation des temps de réponse lors du filtrage dynamique sur des milliers d'équipements et logs d'activité."
      ],
      solution: "Conception d'un middleware d'indexation et de mise en cache, normalisation des schémas de données relationnels avec clés étrangères strictes, et intégration d'une interface utilisateur bilingue (FR/EN) favorisant une adoption immédiate par les équipes terrain et administratives.",
      impact: "Suppression totale des demandes informelles par messagerie, traçabilité exhaustive à 100% des postes informatiques attribués, et accélération de la coordination entre équipes techniques et gestionnaires SAP."
    }
  },
  {
    id: 102,
    title: "Restaurant POS — Nesto (Caisse Offline-First & Sync Cloud)",
    category: "software",
    category_label: "Desktop & Cloud Architecture",
    tagline: "Système de caisse moderne pour la restauration haute cadence, fonctionnant 100% hors ligne avec synchronisation bidirectionnelle cloud.",
    description: "Solution logicielle complète pour points de vente : application desktop locale Electron rapide et résiliente, moteur de commande tactile, impression automatique tickets cuisine/bar, et API cloud Fastify avec dashboard analytique pour gérants.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    tags: ["Electron", "React", "TypeScript", "Node.js", "Fastify", "SQLite Local", "PostgreSQL Cloud", "Prisma", "Redis", "ESC/POS"],
    github_url: "https://github.com/Waliddjla/restaurant-pos-v2",
    demo_url: "https://github.com/Waliddjla/restaurant-pos-v2",
    repository_note: "Architecture hybride développée pour la haute disponibilité en restauration.",
    features: [
      "Fonctionnement hors-ligne autonome sans coupure en cas de perte de connexion Internet",
      "Prise de commande intuitive tactile avec variantes, suppléments et formules de menus",
      "Routage d'impression simultané en cuisine et au bar via protocole thermique ESC/POS",
      "Synchronisation différentielle automatique dès la restauration du réseau (stratégie multi-nœuds)",
      "Gestion des modes de paiement mixtes (espèces, CB, cartes fidélité) et clôture de caisse Z",
      "Dashboard web pour le gérant avec rapports de vente, panier moyen et suivi des stocks"
    ],
    case_study: {
      client: "Établissements de Restauration & Franchises",
      role: "Architecte Logiciel & Développeur Principal",
      period: "2024",
      kpis: [
        { label: "Vitesse d'encaissement", value: "< 5s", icon: "zap" },
        { label: "Tolérance aux pannes réseau", value: "100%", icon: "wifi-off" },
        { label: "Temps de réponse local", value: "< 50ms", icon: "activity" }
      ],
      context: "Dans un environnement de restauration rapide ou traditionnelle, une panne d'Internet ne doit jamais bloquer les commandes ni les cuisines. Le client nécessitait un terminal de caisse ultra-rapide capable d'encaisser localement tout en centralisant les statistiques pour la direction.",
      architecture: "Architecture hybride 'Offline-First' : le terminal client tourne sur Electron avec React et une base SQLite embarquée. Les transactions sont écrites en microsecondes localement. Un worker de synchronisation en tâche de fond pousse les données par paquets vers une API cloud Fastify + PostgreSQL dès que la connectivité est confirmée.",
      challenges: [
        "Résolution déterministe des conflits de données lors de synchronisations asynchrones multi-caisses.",
        "Communication matérielle fiable avec les imprimantes thermiques de reçus via ports série/USB et réseau local (trames ESC/POS).",
        "Performance maximale de l'UI même lors de rushs de 300+ commandes à l'heure."
      ],
      solution: "Mise en place d'un modèle d'événements idempotents avec horodatage vectoriel, pool de connexions matérielles surveillé par heartbeat, et architecture React avec state management optimisé évitant tout re-rendu superflu.",
      impact: "Zéro interruption de service constatée lors des coupures de réseau télécom, gain de 35% de rapidité lors des pointes d'affluence et visibilité financière consolidée en temps réel pour les propriétaires."
    }
  },
  {
    id: 107,
    title: "SAP-Tools — Suite d'Automatisation & Audit du Parc Windows",
    category: "sap",
    category_label: "DevOps & Infrastructure IT",
    tagline: "Plateforme d'automatisation des déploiements, inventaire matériel à chaud et sécurisation de parcs industriels Windows.",
    description: "Boîte à outils d'administration système distribuée utilisant Ansible, WinRM et PowerShell. Permet l'audit matériel/logiciel exhaustif à distance, le déploiement silencieux d'applications métier et le durcissement de la sécurité sans interruption utilisateur.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ansible", "PowerShell", "WinRM", "Python", "Bash", "Docker", "Windows Server", "Active Directory"],
    github_url: "https://github.com/Waliddjla/SAP-Tools",
    demo_url: "https://github.com/Waliddjla/SAP-Tools",
    repository_note: "Outil d'administration conçu pour les environnements industriels et pharmaceutiques.",
    features: [
      "Inventaire matériel et logiciel automatisé sans installation d'agent lourd (Agentless via WinRM)",
      "Déploiement massif et silencieux des suites logicielles, certificats et clients SAP GUI",
      "Génération de rapports d'audit de conformité sécurité et détection des versions obsolètes",
      "Exécution de playbooks Ansible avec menus de pilotage interactifs pour techniciens support",
      "Gestion centralisée des correctifs système et conformité des postes de travail d'usine"
    ],
    case_study: {
      client: "Infrastructures Industrielles & Postes SAP",
      role: "Ingénieur Systèmes & Automatisation",
      period: "2024",
      kpis: [
        { label: "Temps d'audit parc", value: "-80%", icon: "timer" },
        { label: "Postes administrés", value: "200+", icon: "monitor" },
        { label: "Taux de conformité", value: "100%", icon: "check-circle-2" }
      ],
      context: "La maintenance manuelle d'un parc informatique distribué connecté aux postes de fabrication et terminaux SAP engendrait des retards et des risques de disparité logicielle. Un outil d'orchestration rapide et non intrusif était requis.",
      architecture: "Conteneur Docker maître sous Linux hébergeant les playbooks Ansible et scripts d'orchestration Python. Communication sécurisée HTTPS/TLS via WinRM (Windows Remote Management) avec les serveurs et stations de travail Windows cibles.",
      challenges: [
        "Traversée des pare-feux et gestion des autorisations Kerberos / Active Directory sans compromettre la sécurité.",
        "Prise en charge de versions hétérogènes de Windows (Windows 10, 11, Windows Server 2016 à 2022).",
        "Garantie de non-régression et exécution sans redémarrage intempestif des machines de production."
      ],
      solution: "Scripts PowerShell idempotents validant l'état cible avant chaque modification, gestion centralisée des inventaires dynamiques et génération automatique de rapports HTML/CSV exploitables par la direction IT.",
      impact: "Réduction drastique du temps d'inventaire de 3 jours à moins de 20 minutes, élimination des failles de sécurité liées aux logiciels non mis à jour et standardisation totale du parc."
    }
  },
  {
    id: 103,
    title: "HSE Platform — Plateforme Hygiène, Sécurité & Environnement",
    category: "software",
    category_label: "Application Métier HSE",
    tagline: "Plateforme web de digitalisation des protocoles de sécurité industrielle, gestion des risques et audits environnementaux.",
    description: "Application d'entreprise conçue pour rationaliser les démarches HSE : déclaration d'incidents et presqu'accidents, suivi des actions correctives (CAPA), matrices de conformité réglementaire et génération automatisée de reportings pour les comités de direction.",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MySQL", "i18next", "Recharts", "ExcelJS"],
    github_url: "https://github.com/Waliddjla/hse-platform",
    demo_url: "https://github.com/Waliddjla/hse-platform",
    repository_note: "Solution métier industrielle pour la conformité et la prévention des risques.",
    features: [
      "Formulaire d'enregistrement des incidents et déclarations de presqu'accidents avec preuves photo",
      "Matrice d'évaluation des risques professionnels et criticité selon les normes ISO 14001 / 45001",
      "Plan d'actions correctives et préventives (CAPA) avec relances par email et jalons",
      "Génération automatique en 1 clic de rapports d'audit Excel et présentations de synthèse",
      "Interface multilingue (Français, Anglais, Arabe) adaptée aux équipes de terrain",
      "Tableaux de bord visuels des indicateurs clés (Taux de fréquence TF, Taux de gravité TG)"
    ],
    case_study: {
      client: "Sites Industriels & Unités de Production",
      role: "Développeur Full-Stack & Modélisateur Métier",
      period: "2023 - 2024",
      kpis: [
        { label: "Délai de déclaration incident", value: "< 2 min", icon: "alert-triangle" },
        { label: "Actions CAPA clôturées", value: "96%", icon: "target" },
        { label: "Gain temps administratif", value: "15h / sem", icon: "trending-up" }
      ],
      context: "Les déclarations d'incidents et la gestion des risques reposaient sur des tableurs disparates et des fiches papier, ralentissant le traitement des situations dangereuses et compliquant les audits de certification qualité.",
      architecture: "Application React responsive avec Tailwind CSS et graphiques interactifs Recharts. Backend REST Express sécurisé par JWT, moteur de validation de schéma Joi, et persistance MySQL avec transactions pour l'intégrité des données d'audit.",
      challenges: [
        "Faciliter la saisie sur mobile par les opérateurs en atelier tout en capturant des données structurées fiables.",
        "Garantir l'export haute fidélité vers des formats institutionnels (tableaux Excel complexes et fiches PDF signées).",
        "Calcul en temps réel des statistiques d'accidentologie pour le comité HSE."
      ],
      solution: "Conception d'un tunnel de saisie pas-à-pas ergonomique avec support offline léger, intégration d'un moteur de génération de classeurs ExcelJS stylisés et mise en cache des indicateurs mensuels.",
      impact: "Amélioration spectaculaire de la réactivité face aux anomalies matérielles, engagement accru des équipes terrain et succès sans réserve lors des audits de conformité ISO."
    }
  },
  {
    id: 104,
    title: "DoctorSIM — Système Médical du Travail & Infirmerie",
    category: "software",
    category_label: "Santé au Travail & RGPD",
    tagline: "Gestion informatisée des visites d'aptitude médicale, infirmerie d'entreprise et suivi épidémiologique des collaborateurs.",
    description: "Dossier médical d'entreprise sécurisé : planification des convocations de visites périodiques ou d'embauche, gestion des dispenses et aptitudes au poste, ordonnancement des soins d'infirmerie et statistiques anonymisées de santé au travail.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express", "MySQL", "JWT", "Chart.js", "PDFMake"],
    github_url: "https://github.com/Waliddjla/DoctorSIM",
    demo_url: "https://github.com/Waliddjla/DoctorSIM",
    repository_note: "Système conforme aux exigences de confidentialité médicale du travail.",
    features: [
      "Dossier médical informatisé avec antécédents, vaccinations et contre-indications de poste",
      "Planification des visites obligatoires (embauche, reprise, annuelle) avec rappels automatiques",
      "Journal des soins infirmiers quotidiens et suivi des consommations de pharmacie",
      "Édition instantanée des certificats d'aptitude médicale signés avec QR Code de vérification",
      "Cloisonnement strict des données de santé (séparation secret médical / données RH)",
      "Statistiques épidémiologiques et analyse des postes à risque pour la médecine préventive"
    ],
    case_study: {
      client: "Service Médical & Direction des Ressources Humaines",
      role: "Lead Developer Full-Stack",
      period: "2024",
      kpis: [
        { label: "Visites à jour", value: "99.4%", icon: "calendar-check" },
        { label: "Temps d'édition certificat", value: "3 secondes", icon: "file-text" },
        { label: "Sécurité & Secret Médical", value: "100%", icon: "lock" }
      ],
      context: "Le suivi de centaines de collaborateurs exigeait un système rigoureux pour anticiper les renouvellements de certificats d'aptitude tout en préservant le secret médical le plus strict vis-à-vis de l'administration RH.",
      architecture: "Front-end React modulaire avec TypeScript, architecture d'API Node.js/Express avec chiffrement des champs médicaux sensibles, contrôle d'accès basé sur les rôles (Médecin, Infirmier, Administrateur RH).",
      challenges: [
        "Conformité avec les règles de protection des données de santé personnelles.",
        "Automatisation intelligente du calendrier de convocation en fonction des postes à risques (travail en hauteur, chimie, bruit).",
        "Génération de fiches PDF sécurisées et infalsifiables."
      ],
      solution: "Chiffrement AES au repos des diagnostics médicaux, interface RH anonymisée n'affichant que l'aptitude binaire (Apte / Inapte), et moteur PDF vectoriel intégré au navigateur.",
      impact: "Suppression totale des retards de visites médicales, traçabilité exemplaire des soins d'urgence et sérénité absolue lors des contrôles de l'inspection du travail."
    }
  },
  {
    id: 108,
    title: "Plateforme IoT de Géolocalisation & Télématique Flotte",
    category: "software",
    category_label: "Node.js, IoT & Télématique",
    tagline: "Ingestion temps réel de données GPS et boîtiers CAN industriels pour le suivi et l'éco-conduite de flottes de véhicules.",
    description: "Système télématique de haute précision développé chez Ide-Net : écoute de flux de paquets télématiques de centaines de boîtiers GPS/CAN, détection de consommation de carburant, freinages brusques, géofencing et restitution cartographique temps réel.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "TypeScript", "TCP/UDP Sockets", "GPS & CAN Bus", "PostgreSQL", "GIS / Leaflet", "Docker", "REST API"],
    github_url: "https://github.com/Waliddjla",
    demo_url: "https://github.com/Waliddjla",
    repository_note: "Développé en environnement industriel chez SARL Ide-Net Géolocalisation.",
    features: [
      "Serveur d'ingestion TCP/UDP haut débit traitant les trames binaires GPS et signaux du bus CAN",
      "Décodage en microsecondes des paramètres véhicule (vitesse, régime moteur, jauge carburant, température)",
      "Moteur de géofencing spatial avec déclenchement d'alertes instantanées (sorties de zone, excès de vitesse)",
      "Cartographie interactive temps réel avec affichage de l'historique précis des trajets parcourus",
      "Rapports automatisés de consommation, score d'éco-conduite et temps d'arrêt moteur allumé",
      "Architecture distribuée conteneurisée prête pour la montée en charge multi-clients"
    ],
    case_study: {
      client: "SARL Ide-Net Géolocalisation / Flottes Logistiques",
      role: "Ingénieur Logiciel Full-Stack & Systèmes IoT",
      period: "2023 - 2024",
      kpis: [
        { label: "Fréquence ingestion données", value: "10 000+ trames/min", icon: "activity" },
        { label: "Économie carburant client", value: "-18%", icon: "fuel" },
        { label: "Latence affichage carte", value: "< 250ms", icon: "map-pin" }
      ],
      context: "Les transporteurs et gestionnaires de flotte avaient besoin d'une vue continue et sans faille sur la localisation, l'état mécanique et la consommation de carburant de leurs véhicules pour réduire les coûts et sécuriser les marchandises.",
      architecture: "Pipeline d'ingestion Node.js asynchrone écoutant sur des sockets réseau bas niveau, parseur binaire écrit en TypeScript, stockage optimisé time-series dans PostgreSQL, et API REST alimentant une interface cartographique interactive Leaflet.",
      challenges: [
        "Gestion des déconnexions réseau en zones blanches et bufferisation des trames sur le boîtier embarqué.",
        "Parsing sans blocage d'un flux massif de messages de protocoles variés (Teltonika, Ruptela, Queclink).",
        "Calcul géométrique performant d'inclusion dans des polygones complexes pour les alertes de zones."
      ],
      solution: "Traitement par flux asynchrones (Node.js Streams), indexation spatiale avec requêtes géographiques optimisées, et mise en file d'attente résiliente assurant zéro perte de télémétrie.",
      impact: "Suivi fiable de plusieurs centaines de véhicules 24h/24, réduction prouvée de 18% des dépenses de carburant grâce à l'éco-conduite et gain précieux de réactivité lors des incidents de livraison."
    }
  },
  {
    id: 109,
    title: "IA & Prédiction d'Irrigation — Master Data Science & IoT",
    category: "data",
    category_label: "Python, IA & Agronomie",
    tagline: "Modèle de Machine Learning prédisant les besoins hydriques optimaux des cultures agricoles via le calcul de l'évapotranspiration.",
    description: "Projet de recherche de Master en Informatique : algorithme d'apprentissage automatique entraîné sur des séries chronologiques climatiques (température, humidité, vent, ensoleillement) pour prédire précisément l'évapotranspiration (ET0) et automatiser l'irrigation agricole de précision.",
    image: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?auto=format&fit=crop&w=1200&q=80",
    tags: ["Python 3", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Random Forest", "Penman-Monteith", "Data Science"],
    github_url: "https://github.com/Waliddjla/master-project",
    demo_url: "https://github.com/Waliddjla/master-project",
    repository_note: "Projet de fin d'études de Master (Spécialité Informatique Parallèle et Embarquée).",
    features: [
      "Calcul de l'évapotranspiration de référence (ET0) selon l'équation standardisée FAO-56 Penman-Monteith",
      "Entraînement et comparaison de modèles de régression (Random Forest, SVR, Gradient Boosting)",
      "Pipeline de nettoyage de données météorologiques historiques, imputation des valeurs aberrantes et normalisation",
      "Génération prédictive des calendriers d'arrosage économisant les ressources en eau",
      "Visualisations statistiques des corrélations climatiques et analyse d'importance des variables (Feature Importance)"
    ],
    case_study: {
      client: "Université d'Oran 1 / Recherche en Systèmes Embarqués & IA",
      role: "Chercheur en Informatique & Développeur IA",
      period: "2022",
      kpis: [
        { label: "Précision prédictive R²", value: "0.94", icon: "brain" },
        { label: "Économie d'eau simulée", value: "32%", icon: "droplets" },
        { label: "Vitesse d'inférence", value: "< 15ms", icon: "cpu" }
      ],
      context: "Le stress hydrique croissant exige des stratégies d'irrigation scientifiques pour maximiser les rendements agricoles tout en préservant les nappes phréatiques. L'approche traditionnelle par calendrier fixe gaspille d'importantes quantités d'eau.",
      architecture: "Pipeline de données complet en Python exploitant Pandas et NumPy pour le feature engineering météorologique, Scikit-Learn pour la modélisation et l'évaluation prédictive, et Seaborn/Matplotlib pour les rapports de performance.",
      challenges: [
        "Manque ou discontinuité de certaines mesures de capteurs solaires dans les jeux de données bruts.",
        "Complexité non-linéaire de la dynamique d'évaporation liée aux variations couplées de température et d'humidité relative.",
        "Conception d'un modèle suffisamment léger pour être embarqué sur un microcontrôleur d'irrigation IoT basse consommation."
      ],
      solution: "Modèle ensembliste Random Forest optimisé par validation croisée, réduction du nombre de features aux variables atmosphériques les plus accessibles, et calibration rigoureuse contre les données agronomiques du terrain.",
      impact: "Validation avec mention d'excellence du Master en Informatique, prédiction du besoin en eau avec un coefficient de corrélation R² de 0.94, et potentiel d'économie d'eau démontré de plus de 30%."
    }
  },
  {
    id: 110,
    title: "Walid Dashboard — Panneau d'Administration Analytique",
    category: "react",
    category_label: "React & Analytics UI",
    tagline: "Tableau de bord de gestion d'entreprise responsive avec graphiques dynamiques, widgets KPI et gestion d'état moderne.",
    description: "Application web d'administration développée avec React et Tailwind CSS. Intègre des graphiques de performance temps réel, un système de filtres multicritères, la gestion de profil utilisateur et des tables de données triables et paginées.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 18", "JavaScript ES6+", "Tailwind CSS", "Recharts", "Lucide Icons", "Responsive UI"],
    github_url: "https://github.com/Waliddjla/walid-dashboard",
    demo_url: "https://github.com/Waliddjla/walid-dashboard",
    repository_note: "Dépôt open-source disponible sur le profil GitHub @Waliddjla.",
    features: [
      "Widgets KPI avec calcul de progression en pourcentage et indicateurs graphiques de tendance",
      "Graphiques interactifs de ventes et métriques opérationnelles avec infobulles personnalisées",
      "Table de données avec recherche instantanée, tri par colonne et pagination fluide",
      "Interface utilisateur entièrement adaptative (Mobile, Tablette, Écran large) avec support Dark Mode"
    ],
    case_study: {
      client: "Projet Personnel & Vitrine Technique",
      role: "Frontend Engineer",
      period: "2023",
      kpis: [
        { label: "Score Google Lighthouse", value: "98/100", icon: "gauge" },
        { label: "Compatibilité Mobile", value: "100%", icon: "smartphone" },
        { label: "Zéro dépendance lourde", value: "Optimisé", icon: "feather" }
      ],
      context: "Démonstrateur d'ergonomie et d'expérience utilisateur pour applications de gestion d'entreprise (ERP/CRM dashboards).",
      architecture: "Composants fonctionnels React avec hooks avancés (useMemo, useCallback), mise en page utilitaire Tailwind CSS, et rendu SVG ultra-rapide des graphiques.",
      challenges: ["Assurer un rendu parfaitement fluide à 60 FPS lors de la mise à jour dynamique des visualisations."],
      solution: "Optimisation de l'arbre DOM, découpage des composants en atomes réutilisables et gestion modulaire des thèmes clairs/sombres.",
      impact: "Sert de référence de design system pour les projets métiers internes et les applications de supervision."
    }
  }
];

if (typeof module !== "undefined" && module.exports) module.exports = featuredProjects;
if (typeof window !== "undefined") window.featuredProjects = featuredProjects;
