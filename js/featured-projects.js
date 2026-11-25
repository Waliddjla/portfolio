/**
 * featured-projects.js
 * Catalogue enrichi de 11 projets d'ingénierie et réalisations professionnelles de Walid Djellali
 * Inclut pour chaque projet : identification (client, rôle, période), fonctionnalités, et étude de cas complète FR/EN.
 */

const featuredProjects = [
  {
    id: 101,
    title: "My Orion — Plateforme Intégrée de Gestion IT & Opérations SAP",
    category: "software",
    category_label: "Full-Stack & IT Management",
    tagline: "Système centralisé de gouvernance IT, suivi des incidents SAP S/4HANA et traçabilité du parc d'équipements industriels.",
    description: "Plateforme d'entreprise centralisant la gestion des tickets IT et flux SAP PM/MM, la planification Kanban des tâches d'ingénierie, la cartographie du parc informatique et le suivi des achats/ventes avec traçabilité complète.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    tags: ["React 18", "TypeScript", "Ant Design", "Node.js", "Express", "Sequelize", "MySQL", "PowerShell", "SAP BAPI"],
    github_url: "https://github.com/youcefsenouci/my-orion",
    demo_url: "https://github.com/youcefsenouci/my-orion",
    repository_note: "Projet d'entreprise — architecture de production et modules opérationnels chez Orionlab.",
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
      period: "2024 – 2025",
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
    id: 107,
    title: "SAP-Tools — Suite d'Automatisation & Audit du Parc Windows",
    category: "sap",
    category_label: "SAP, DevOps & Infrastructure IT",
    tagline: "Plateforme d'automatisation des déploiements SAP GUI, inventaire matériel à chaud et sécurisation Active Directory.",
    description: "Boîte à outils d'administration système distribuée utilisant Ansible, WinRM et PowerShell. Permet l'audit matériel/logiciel exhaustif à distance, le déploiement silencieux des clients SAP GUI et le durcissement Active Directory sans interruption utilisateur.",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=80",
    tags: ["Ansible", "PowerShell", "WinRM", "SAP GUI", "Python", "Docker", "Windows Server", "Active Directory"],
    github_url: "https://github.com/Waliddjla/SAP-Tools",
    demo_url: "https://github.com/Waliddjla/SAP-Tools",
    repository_note: "Outil d'administration conçu pour les environnements industriels et postes SAP.",
    features: [
      "Inventaire matériel et logiciel automatisé sans installation d'agent lourd (Agentless via WinRM)",
      "Déploiement massif et silencieux des suites logicielles, certificats et clients SAP GUI",
      "Génération de rapports d'audit de conformité sécurité et détection des versions obsolètes",
      "Exécution de playbooks Ansible avec menus de pilotage interactifs pour techniciens support",
      "Gestion centralisée des correctifs système, GPO et conformité des postes de travail d'usine"
    ],
    case_study: {
      client: "Orionlab / Infrastructures Industrielles & Postes SAP",
      role: "Ingénieur Systèmes & Automatisation",
      period: "2024 – 2025",
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
      impact: "Réduction drastique du temps d'inventaire de 3 jours à moins de 20 minutes, élimination des failles de sécurité liées aux logiciels non mis à jour et standardisation totale du parc SAP."
    }
  },
  {
    id: 111,
    title: "SAPAN / DA Analyse — Pilotage Achats SAP MM via OData",
    category: "sap",
    category_label: "SAP MM & OData Analytics",
    tagline: "Tableau de bord décisionnel connecté en temps réel aux services OData SAP pour le suivi des demandes et commandes d'achat.",
    description: "Application analytique développée pour les équipes approvisionnement et direction chez ACG SIM : extraction temps réel des Demandes d'Achat (DA) et Commandes (MM) via API OData SAP, détection des goulots d'étranglement et analyse des délais fournisseurs.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    tags: ["SAP MM", "SAP OData", "React", "TypeScript", "Node.js", "REST API", "Analytics", "Procurement"],
    github_url: null,
    demo_url: null,
    repository_note: "Application métier interne développée en environnement de production SAP chez ACG SIM SPA.",
    features: [
      "Consommation directe des flux SAP OData pour synchroniser Demandes d'Achat (PR) et Commandes (PO)",
      "Suivi du cycle de validation hiérarchique (Release Strategy) et alertes sur dossiers bloqués",
      "Calcul automatique des délais moyens entre création DA, approbation et réception marchandise (MIGO)",
      "Filtres dynamiques par groupe d'acheteurs, division, fournisseur et statut de livraison",
      "Export instantané des indicateurs achats pour les comités de pilotage direction"
    ],
    case_study: {
      client: "ACG SIM SPA — Direction Achats & Supply Chain",
      role: "SAP Functional Support & Full-Stack Developer",
      period: "2024",
      kpis: [
        { label: "Visibilité flux achats", value: "Temps réel", icon: "activity" },
        { label: "Dossiers DA suivis", value: "1 500+", icon: "package" },
        { label: "Délai validation réduit", value: "-35%", icon: "clock" }
      ],
      context: "Les responsables achats et demandeurs manquaient de visibilité consolidée sur l'état d'avancement des Demandes d'Achat (ME51N/ME5A) dans SAP MM sans multiplier les extractions Excel manuelles.",
      architecture: "Passerelle Node.js sécurisée interrogeant les services OData exposés par SAP, avec mise en cache intelligente et normalisation JSON vers une interface analytique React interactive.",
      challenges: [
        "Authentification sécurisée et pagination efficace des volumes importants d'entités OData SAP.",
        "Modélisation claire des statuts de validation multi-niveaux et des écarts entre quantités commandées et réceptionnées."
      ],
      solution: "Création d'un connecteur OData modulaire avec agrégation côté serveur et vue consolidée par étape du workflow d'approvisionnement SAP MM.",
      impact: "Suppression des extractions manuelles quotidiennes, identification immédiate des retards d'approbation et meilleure coordination entre maintenance, magasin et acheteurs."
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
    id: 108,
    title: "Plateforme IoT de Géolocalisation & Télématique Flotte",
    category: "software",
    category_label: "Node.js, IoT & Télématique",
    tagline: "Ingestion temps réel de données GPS et boîtiers CAN industriels pour le suivi et l'éco-conduite de flottes de véhicules.",
    description: "Système télématique de haute précision développé chez Ide-Net : écoute de flux de paquets télématiques de centaines de boîtiers GPS/CAN, détection de consommation de carburant, freinages brusques, géofencing et restitution cartographique temps réel.",
    image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=1200&q=80",
    tags: ["Node.js", "TypeScript", "TCP/UDP Sockets", "GPS & CAN Bus", "PostgreSQL", "GIS / Leaflet", "Docker", "REST API"],
    github_url: null,
    demo_url: null,
    repository_note: "Plateforme propriétaire développée en environnement industriel chez SARL Ide-Net Géolocalisation.",
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
      period: "2023 – 2024",
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
    id: 112,
    title: "SIMswitch — Gestion du Parc Informatique & Infrastructure",
    category: "sap",
    category_label: "Infrastructure IT & CMDB",
    tagline: "Inventaire centralisé des équipements réseau, serveurs, postes utilisateurs et suivi des décharges matérielles.",
    description: "Application complète de gestion du parc IT développée pour ACG SIM SPA : cartographie des switchs, serveurs, imprimantes, postes et pointeuses, suivi des procédures d'installation et génération des fiches de décharge matériel.",
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "JavaScript", "Datta Able UI", "Node.js", "MySQL", "IT Inventory", "Networking", "CMDB"],
    github_url: "https://github.com/Waliddjla/SIMswitch_react",
    demo_url: "https://github.com/Waliddjla/SIMswitch_react",
    repository_note: "Application CMDB & gestion d'actifs IT déployée pour l'infrastructure d'ACG SIM SPA.",
    features: [
      "Inventaire exhaustif des équipements IT (Switchs Cisco, Serveurs, PC, Imprimantes, Écrans, Pointeuses)",
      "Affectation nominative aux collaborateurs avec génération et traçabilité des fiches de décharge",
      "Base de procédures techniques d'installation, plan d'adressage IP et affectation des ports switch",
      "Tableau de bord global de santé et répartition du parc par site et catégorie d'équipement",
      "Gestion des accès utilisateurs et historique complet des mouvements et maintenances matérielles"
    ],
    case_study: {
      client: "ACG SIM SPA — Département Systèmes & Réseaux",
      role: "IT Systems Engineer & Full-Stack Developer",
      period: "2024",
      kpis: [
        { label: "Actifs IT tracés", value: "400+", icon: "server" },
        { label: "Précision inventaire", value: "100%", icon: "check-circle-2" },
        { label: "Temps recherche panne", value: "-50%", icon: "zap" }
      ],
      context: "L'inventaire du parc informatique et des baies de brassage reposait sur des fichiers dispersés, compliquant le diagnostic réseau, le suivi des attributions de matériel et les audits annuels d'actifs.",
      architecture: "Interface React construite autour d'une ergonomie modulaire type Datta Able, couplée à une API REST et une base relationnelle structurant les équipements, affectations employés, ports réseau et procédures.",
      challenges: [
        "Modéliser fidèlement les liens entre équipements réseau (switchs/VLAN), serveurs et postes finaux.",
        "Centraliser la traçabilité juridique des remises et restitutions d'équipements (décharges signées)."
      ],
      solution: "Création d'un référentiel CMDB unifié avec fiches équipements détaillées, historique d'attribution et accès rapide aux procédures de configuration.",
      impact: "Visibilité immédiate sur l'ensemble du parc matériel, réduction de moitié du temps de diagnostic d'incidents réseau et fiabilisation des décharges de matériel."
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
    repository_note: "Solution métier industrielle pour la conformité ISO 14001 / 45001 et la prévention des risques.",
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
      period: "2023 – 2024",
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
      client: "ACG SIM SPA — Service Médical & DRH",
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
    id: 113,
    title: "Best Employe — Plateforme de Vote & Reconnaissance RH",
    category: "react",
    category_label: "React, TypeScript & App RH",
    tagline: "Application full-stack sécurisée pour l'élection du collaborateur du mois avec authentification JWT et analytique temps réel.",
    description: "Application d'entreprise associant une interface React + TypeScript animée à un backend Express et MySQL. Intègre le vote sécurisé par jetons JWT, la prévention des votes multiples, et la visualisation en direct des classements par département.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    tags: ["React", "TypeScript", "Express.js", "MySQL", "JWT Auth", "Charts", "Animations UI"],
    github_url: "https://github.com/Waliddjla/best-employe",
    demo_url: "https://github.com/Waliddjla/best-employe",
    repository_note: "Projet Full-Stack React/TypeScript + Node.js/MySQL disponible sur @Waliddjla.",
    features: [
      "Authentification sécurisée des collaborateurs par JWT avec gestion stricte d'unicité de vote par campagne",
      "Interface React + TypeScript fluide avec animations de transition et feedback visuel immédiat",
      "Tableau de bord administrateur pour lancer/clôturer les campagnes et consulter les résultats par service",
      "Graphiques dynamiques de répartition des votes et export des classements de fin de période"
    ],
    case_study: {
      client: "Direction des Ressources Humaines / Engagement Interne",
      role: "Full-Stack Developer",
      period: "2024",
      kpis: [
        { label: "Unicité & Intégrité vote", value: "100%", icon: "shield-check" },
        { label: "Stack typée", value: "React + TS", icon: "code-2" },
        { label: "Restitution résultats", value: "Temps réel", icon: "bar-chart-2" }
      ],
      context: "Digitaliser les campagnes internes de reconnaissance des collaborateurs pour remplacer les urnes papier ou formulaires non sécurisés et offrir une expérience engageante aux équipes.",
      architecture: "Frontend React typé en TypeScript communiquant avec une API REST Express.js sécurisée par middleware JWT et persistée sous MySQL avec contraintes d'unicité par session de vote.",
      challenges: [
        "Garantir l'anonymat des votants tout en empêchant techniquement tout double vote.",
        "Proposer une interface dynamique et ludique tout en respectant la confidentialité des résultats jusqu'à clôture."
      ],
      solution: "Validation transactionnelle côté MySQL liée au jeton JWT utilisateur, séparation des rôles Votant / Admin RH et restitution graphique dynamique.",
      impact: "Participation accrue des équipes aux campagnes trimestrielles et automatisation complète du dépouillement RH."
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
    image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1200&q=80",
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

const englishProjects = {
  101: {
    title_en: "My Orion — Integrated IT Management & SAP Operations Platform",
    tagline_en: "Centralized IT governance, SAP S/4HANA incident tracking, and traceability for industrial equipment.",
    description_en: "Enterprise platform for IT tickets and SAP PM/MM workflows, Kanban planning for engineering tasks, IT asset mapping, and purchasing and sales tracking with full traceability.",
    category_label_en: "Full-Stack & IT Management",
    repository_note_en: "Enterprise project covering production architecture and operational modules at Orionlab.",
    features_en: [
      "Centralized tracking of IT tickets and SAP PM/MM incidents with SLAs and dynamic prioritization",
      "Real-time Kanban board for scheduling interventions and technical sprints",
      "Automated IT inventory, workstation assignments, and asset handover history",
      "Purchasing and maintenance order traceability synchronized with SAP workflows",
      "Granular role-based access control (RBAC) with audit logging for critical actions",
      "Built-in knowledge base and documentation for IT operating procedures"
    ],
    case_study_en: {
      client: "Orionlab / Pharmaceutical Manufacturing & IT",
      role: "Lead Full-Stack Developer & SAP Business Analyst",
      period: "2024 – 2025",
      kpis: [
        { label_en: "Incident resolution time" },
        { label_en: "Tracked assets" },
        { label_en: "System availability" }
      ],
      context: "As IT support requests and interactions with SAP S/4HANA grew, the company needed one platform to coordinate maintenance, allocate equipment, and track tickets in line with GxP standards.",
      architecture: "The multi-tier architecture uses a TypeScript client built with React and Ant Design, a modular Express REST backend with Sequelize, and a relational MySQL database. PowerShell scripts automate interactions with local infrastructure and Windows services.",
      challenges: [
        "Reconcile ticket data with SAP S/4HANA functional location and equipment hierarchies.",
        "Maintain strict traceability and regulatory compliance through tamper-resistant audit trails.",
        "Optimize response times for dynamic filtering across thousands of assets and activity logs."
      ],
      solution: "Implemented indexing and caching middleware, normalized relational schemas with strict foreign keys, and provided a bilingual FR/EN interface for field and administrative teams.",
      impact: "Eliminated informal requests via messaging, achieved 100% traceability of assigned workstations, and accelerated coordination between technical teams and SAP administrators."
    }
  },
  107: {
    title_en: "SAP-Tools — Windows Fleet Automation & Auditing Suite",
    tagline_en: "Deployment automation for SAP GUI, live hardware inventory, and Active Directory security hardening.",
    description_en: "Distributed administration toolkit built with Ansible, WinRM, and PowerShell for comprehensive remote hardware and software audits, silent SAP GUI deployments, and Active Directory hardening without end-user interruption.",
    category_label_en: "SAP, DevOps & IT Infrastructure",
    repository_note_en: "Administration toolkit designed for industrial and SAP workstation environments.",
    features_en: [
      "Automated agentless hardware and software inventory via WinRM",
      "Silent bulk deployment of software suites, certificates, and SAP GUI clients",
      "Security compliance audit reports and detection of outdated software versions",
      "Ansible playbook execution via interactive operator menus for support technicians",
      "Centralized patch management, GPO enforcement, and compliance monitoring for factory workstations"
    ],
    case_study_en: {
      client: "Orionlab / Industrial Infrastructure & SAP Workstations",
      role: "Systems & Automation Engineer",
      period: "2024 – 2025",
      kpis: [
        { label_en: "Fleet audit time" },
        { label_en: "Managed workstations" },
        { label_en: "Compliance rate" }
      ],
      context: "Manual maintenance of a distributed fleet connected to manufacturing stations and SAP terminals caused delays and inconsistent software versions. The team needed fast orchestration with minimal disruption.",
      architecture: "A Linux Docker controller hosts Ansible playbooks and Python orchestration scripts. WinRM uses HTTPS/TLS to communicate with Windows servers and workstations.",
      challenges: [
        "Handle firewall traversal and Kerberos / Active Directory permissions while maintaining security.",
        "Support Windows 10, Windows 11, and Windows Server 2016 through 2022.",
        "Prevent regressions and avoid unexpected restarts on production machines."
      ],
      solution: "Used idempotent PowerShell scripts that validate target state before changes, centralized dynamic inventories, and generated HTML and CSV reports for IT management.",
      impact: "Reduced inventory time from 3 days to under 20 minutes, eliminated security gaps linked to outdated software, and standardized the SAP workstation fleet."
    }
  },
  111: {
    title_en: "SAPAN / PR Analysis — SAP MM Purchasing Dashboard via OData",
    tagline_en: "Real-time procurement analytics dashboard powered by SAP OData services for Purchase Requisitions and Orders.",
    description_en: "Analytics application built for procurement teams and management at ACG SIM: real-time SAP OData extraction of Purchase Requisitions (PR) and Purchase Orders (PO) in SAP MM, bottleneck tracking, and supplier lead-time analysis.",
    category_label_en: "SAP MM & OData Analytics",
    repository_note_en: "Internal business application built for production SAP workflows at ACG SIM SPA.",
    features_en: [
      "Direct SAP OData consumption synchronizing Purchase Requisitions (PR) and Purchase Orders (PO)",
      "Approval workflow tracking (Release Strategy) with alerts on stalled requisitions",
      "Automated lead-time calculations from PR creation to approval and goods receipt (MIGO)",
      "Dynamic filtering by purchasing group, plant, vendor, and delivery status",
      "One-click export of procurement KPIs for executive review meetings"
    ],
    case_study_en: {
      client: "ACG SIM SPA — Procurement & Supply Chain",
      role: "SAP Functional Support & Full-Stack Developer",
      period: "2024",
      kpis: [
        { label_en: "Procurement visibility", value_en: "Real-time" },
        { label_en: "Tracked requisitions" },
        { label_en: "Approval lead time" }
      ],
      context: "Procurement officers and requesters lacked consolidated visibility into SAP MM Purchase Requisition status (ME51N/ME5A) without running repetitive manual Excel exports.",
      architecture: "Secure Node.js gateway querying SAP OData services, applying caching and JSON normalization before feeding an interactive React analytics dashboard.",
      challenges: [
        "Authenticated SAP OData integration with efficient pagination across large requisition datasets.",
        "Clear modeling of multi-level release strategies and open quantities between POs and goods receipts."
      ],
      solution: "Built a modular OData connector with server-side aggregation and a step-by-step view of the SAP MM procurement cycle.",
      impact: "Eliminated daily manual exports, exposed approval bottlenecks immediately, and aligned maintenance, warehouse, and purchasing teams."
    }
  },
  102: {
    title_en: "Restaurant POS — Nesto (Offline-First POS & Cloud Sync)",
    tagline_en: "Point-of-sale system for high-volume restaurants with 100% offline operation and bidirectional cloud synchronization.",
    description_en: "Full point-of-sale solution featuring a fast, resilient Electron desktop app, touchscreen ordering, automatic kitchen and bar ticket printing, and a Fastify cloud API with a management analytics dashboard.",
    category_label_en: "Desktop & Cloud Architecture",
    repository_note_en: "Hybrid architecture designed for high availability in food service.",
    features_en: [
      "Standalone offline operation that continues through Internet outages",
      "Touchscreen ordering with variants, add-ons, and meal deals",
      "Simultaneous print routing to the kitchen and bar via the ESC/POS thermal printing protocol",
      "Automatic incremental synchronization across nodes when connectivity returns",
      "Split payments across cash, card, and loyalty cards, with end-of-day Z reports",
      "Web dashboard for managers with sales reports, average order value, and inventory tracking"
    ],
    case_study_en: {
      client: "Restaurants & Franchises",
      role: "Software Architect & Lead Developer",
      period: "2024",
      kpis: [
        { label_en: "Checkout time" },
        { label_en: "Network outage tolerance" },
        { label_en: "Local response time" }
      ],
      context: "Internet outages cannot interrupt ordering or kitchen operations. The client needed a fast terminal that could process payments locally and centralize statistics for management.",
      architecture: "The offline-first Electron terminal uses React and embedded SQLite, with local transaction writes in microseconds. A background worker sends data in batches to a Fastify and PostgreSQL cloud API once connectivity returns.",
      challenges: [
        "Resolve data conflicts deterministically during asynchronous synchronization across registers.",
        "Communicate reliably with thermal receipt printers over serial, USB, and LAN connections using ESC/POS frames.",
        "Keep the interface responsive during peaks of 300+ orders per hour."
      ],
      solution: "Implemented idempotent events with vector timestamps, a hardware connection pool monitored by heartbeats, and optimized React state management to avoid unnecessary renders.",
      impact: "Recorded zero service interruptions during network outages, improved checkout speed by 35% at peak times, and provided consolidated real-time financial reporting for owners."
    }
  },
  108: {
    title_en: "IoT Platform for Fleet Tracking & Telematics",
    tagline_en: "Real-time ingestion from GPS devices and industrial CAN modules for vehicle tracking and fuel-efficient driving.",
    description_en: "High-precision telematics system developed at Ide-Net. Processes packet streams from hundreds of GPS/CAN devices, monitors fuel consumption and harsh braking, and provides geofencing and real-time mapping.",
    category_label_en: "Node.js, IoT & Telematics",
    repository_note_en: "Proprietary enterprise platform developed at SARL Ide-Net Géolocalisation.",
    features_en: [
      "High-throughput TCP/UDP ingestion server for binary GPS frames and CAN bus signals",
      "Microsecond decoding of vehicle parameters including speed, RPM, fuel level, and temperature",
      "Geofencing with immediate alerts for zone exits and speeding",
      "Real-time interactive maps with detailed trip history",
      "Automated fuel consumption, eco-driving score, and engine idling reports",
      "Containerized distributed architecture built to scale across customers"
    ],
    case_study_en: {
      client: "SARL Ide-Net Géolocalisation / Logistics Fleets",
      role: "Full-Stack Software & IoT Systems Engineer",
      period: "2023 – 2024",
      kpis: [
        { label_en: "Data ingestion throughput", value_en: "10,000+ frames/min" },
        { label_en: "Customer fuel savings" },
        { label_en: "Map display latency" }
      ],
      context: "Carriers and fleet managers needed continuous visibility into vehicle locations, mechanical condition, and fuel consumption to reduce costs and protect cargo.",
      architecture: "An asynchronous Node.js ingestion pipeline listens on low-level network sockets. A TypeScript binary parser and optimized PostgreSQL time-series storage back the REST API used by an interactive Leaflet map.",
      challenges: [
        "Handle network outages in coverage gaps by buffering frames on the onboard device.",
        "Parse high-volume traffic from Teltonika, Ruptela, and Queclink devices without blocking ingestion.",
        "Run efficient point-in-polygon calculations for complex geofence alerts."
      ],
      solution: "Used asynchronous Node.js Streams, spatial indexes and optimized geographic queries, and durable queues to prevent telemetry loss.",
      impact: "Tracked hundreds of vehicles around the clock, demonstrated an 18% reduction in fuel spending through eco-driving, and shortened response times to delivery incidents."
    }
  },
  112: {
    title_en: "SIMswitch — IT Asset & Network Infrastructure Management",
    tagline_en: "Centralized inventory for network switches, servers, workstations, and signed employee asset handover records.",
    description_en: "IT infrastructure management platform developed at ACG SIM SPA covering switches, servers, printers, workstations, and time clocks, complete with installation procedures and hardware handover tracking.",
    category_label_en: "IT Infrastructure & CMDB",
    repository_note_en: "CMDB & IT asset management application built for ACG SIM SPA.",
    features_en: [
      "Full hardware inventory covering Cisco switches, servers, PCs, printers, displays, and time clocks",
      "Employee equipment assignments with printable and traceable handover records",
      "Technical knowledge base with installation procedures, IP plans, and switch port mappings",
      "Live infrastructure dashboard summarizing equipment health and site distribution",
      "Role-based user administration and complete hardware lifecycle audit trail"
    ],
    case_study_en: {
      client: "ACG SIM SPA — Systems & Networking Department",
      role: "IT Systems Engineer & Full-Stack Developer",
      period: "2024",
      kpis: [
        { label_en: "Tracked IT assets" },
        { label_en: "Inventory accuracy" },
        { label_en: "Fault lookup time" }
      ],
      context: "Tracking network switches, servers, and employee workstations across spreadsheets slowed down incident diagnosis and annual IT asset audits.",
      architecture: "React frontend built on a modular Datta Able layout connected to a REST API and relational database structuring assets, employee assignments, switch ports, and procedures.",
      challenges: [
        "Accurately map dependencies between network switches, VLANs, servers, and end-user devices.",
        "Keep signed employee handover and return records centralized and easy to audit."
      ],
      solution: "Built a unified CMDB repository with detailed asset views, assignment histories, and linked technical setup guides.",
      impact: "Delivered immediate visibility across the IT estate, cut network troubleshooting lookup time in half, and standardized asset accountability."
    }
  },
  103: {
    title_en: "HSE Platform — Health, Safety & Environment",
    tagline_en: "Web platform for digitizing industrial safety protocols, managing risks, and conducting environmental audits.",
    description_en: "Enterprise application for submitting incident and near-miss reports, tracking corrective actions (CAPA), maintaining regulatory compliance matrices, and generating management reports automatically.",
    category_label_en: "HSE Business Application",
    repository_note_en: "Industrial ISO 14001 / 45001 compliance and risk prevention solution.",
    features_en: [
      "Incident and near-miss reporting with photographic evidence",
      "Occupational risk and severity assessment matrix aligned with ISO 14001 / 45001",
      "Corrective and preventive action (CAPA) plans with email reminders and milestones",
      "One-click generation of Excel audit reports and summary presentations",
      "Multilingual interface for field teams in French, English, and Arabic",
      "Visual dashboards for key indicators, including frequency and severity rates"
    ],
    case_study_en: {
      client: "Industrial Sites & Production Units",
      role: "Full-Stack Developer & Business Process Modeler",
      period: "2023 – 2024",
      kpis: [
        { label_en: "Incident reporting time" },
        { label_en: "CAPA closure rate" },
        { label_en: "Administrative time saved", value_en: "15h / week" }
      ],
      context: "Incident reports and risk management relied on separate spreadsheets and paper forms, delaying responses to hazards and complicating quality certification audits.",
      architecture: "Responsive React application with Tailwind CSS and Recharts. An Express REST backend uses JWT authentication and Joi schema validation, with MySQL transactions to protect audit data integrity.",
      challenges: [
        "Make mobile data entry easy for shop-floor operators while collecting reliable structured data.",
        "Preserve layout and content when exporting complex Excel workbooks and signed PDF forms.",
        "Calculate incident statistics in real time for the HSE committee."
      ],
      solution: "Designed a guided form with lightweight offline support, integrated styled Excel workbook generation with ExcelJS, and cached monthly indicators.",
      impact: "Improved response times to equipment issues, increased field team participation, and passed ISO compliance audits without reservations."
    }
  },
  104: {
    title_en: "DoctorSIM — Occupational Health & Workplace Clinic System",
    tagline_en: "Digital management of fitness-for-work examinations, workplace clinic care, and employee health trends.",
    description_en: "Secure occupational health records with scheduling for periodic and pre-employment examinations, workplace exemptions and fitness decisions, clinic care scheduling, and anonymized health statistics.",
    category_label_en: "Occupational Health & GDPR",
    repository_note_en: "System designed to meet occupational health confidentiality requirements.",
    features_en: [
      "Electronic health records with medical history, vaccinations, and job-specific contraindications",
      "Scheduling and automatic reminders for mandatory pre-employment, return-to-work, and annual examinations",
      "Daily nursing care logs and tracking of pharmacy stock usage",
      "Immediate generation of signed fitness-for-work certificates with QR code verification",
      "Strict segregation of confidential medical records from HR data",
      "Epidemiological statistics and analysis of high-risk roles for preventive care"
    ],
    case_study_en: {
      client: "ACG SIM SPA — Occupational Health & HR",
      role: "Lead Full-Stack Developer",
      period: "2024",
      kpis: [
        { label_en: "Examinations up to date" },
        { label_en: "Certificate generation time", value_en: "3 seconds" },
        { label_en: "Security & medical confidentiality" }
      ],
      context: "Tracking hundreds of employees required a reliable way to anticipate fitness certificate renewals and keep confidential medical information out of HR workflows.",
      architecture: "Modular React and TypeScript frontend with a Node.js / Express API, encryption for sensitive medical fields, and role-based access for clinicians, nurses, and HR administrators.",
      challenges: [
        "Comply with rules governing personal health data.",
        "Automate examination scheduling for high-risk roles involving heights, chemicals, or noise.",
        "Generate secure, tamper-resistant PDF forms."
      ],
      solution: "Implemented AES encryption at rest for diagnoses, an anonymized HR interface showing only fit or unfit status, and browser-based vector PDF generation.",
      impact: "Eliminated overdue examinations, made emergency care fully traceable, and eased labor inspection reviews."
    }
  },
  113: {
    title_en: "Best Employe — Employee Voting & HR Recognition Platform",
    tagline_en: "Full-stack React & TypeScript voting platform with JWT authentication and real-time department analytics.",
    description_en: "Enterprise recognition web app combining an animated React and TypeScript interface with an Express and MySQL backend, JWT authentication, duplicate-vote protection, and live ranking charts.",
    category_label_en: "React, TypeScript & HR App",
    repository_note_en: "Full-stack React/TypeScript + Node.js/MySQL project available on @Waliddjla.",
    features_en: [
      "JWT-authenticated employee voting with strict single-vote enforcement per campaign",
      "Smooth React and TypeScript UI featuring interactive animations and instant feedback",
      "Admin panel to launch or close voting campaigns and review department breakdowns",
      "Live ranking charts and period-end result exports for HR teams"
    ],
    case_study_en: {
      client: "Human Resources / Employee Engagement",
      role: "Full-Stack Developer",
      period: "2024",
      kpis: [
        { label_en: "Vote integrity & uniqueness" },
        { label_en: "Typed stack" },
        { label_en: "Result reporting", value_en: "Real-time" }
      ],
      context: "Digitize internal employee-of-the-month campaigns to replace paper ballots and deliver a transparent, engaging experience across departments.",
      architecture: "TypeScript React frontend paired with an Express.js REST API using JWT verification and MySQL uniqueness constraints per voting cycle.",
      challenges: [
        "Guarantee ballot secrecy while strictly preventing duplicate votes from any account.",
        "Keep the voting UI engaging while withholding final rankings until campaign closure."
      ],
      solution: "Transactional vote recording in MySQL tied to authenticated JWT claims, separated Voter/HR Admin roles, and animated chart views.",
      impact: "Boosted employee participation in quarterly recognition campaigns and eliminated manual vote counting."
    }
  },
  109: {
    title_en: "AI & Irrigation Forecasting — Master's Research in Data Science & IoT",
    tagline_en: "Machine learning model that estimates optimal crop water needs through evapotranspiration.",
    description_en: "Computer science master's research project using machine learning trained on weather time series covering temperature, humidity, wind, and sunshine to predict reference evapotranspiration (ET0) and automate precision irrigation.",
    category_label_en: "Python, AI & Agronomy",
    repository_note_en: "Master's capstone project in Parallel and Embedded Computing.",
    features_en: [
      "Reference evapotranspiration (ET0) calculation using the FAO-56 Penman-Monteith equation",
      "Training and comparison of regression models including Random Forest, SVR, and Gradient Boosting",
      "Historical weather data pipeline for cleaning, outlier imputation, and normalization",
      "Forecasting of irrigation schedules to conserve water",
      "Statistical visualization of climate correlations and analysis of feature importance"
    ],
    case_study_en: {
      client: "University of Oran 1 / Embedded Systems & AI Research",
      role: "Computer Science Researcher & AI Developer",
      period: "2022",
      kpis: [
        { label_en: "Prediction R²" },
        { label_en: "Simulated water savings" },
        { label_en: "Inference time" }
      ],
      context: "Growing water stress called for irrigation strategies that maximize crop yields and preserve groundwater. Fixed irrigation schedules waste substantial amounts of water.",
      architecture: "Python data pipeline using Pandas and NumPy for weather feature engineering, Scikit-Learn for predictive modeling and evaluation, and Seaborn and Matplotlib for performance reporting.",
      challenges: [
        "Address missing and discontinuous solar sensor readings in raw datasets.",
        "Model the nonlinear interaction of temperature and relative humidity in evaporation.",
        "Keep the model small enough to run on a low-power IoT irrigation microcontroller."
      ],
      solution: "Optimized a Random Forest ensemble through cross-validation, reduced inputs to the most accessible weather variables, and calibrated the model against field agronomic data.",
      impact: "The computer science master's project earned a distinction, predicted water requirements with an R² of 0.94, and demonstrated potential water savings of over 30%."
    }
  },
  110: {
    title_en: "Walid Dashboard — Administration & Analytics",
    tagline_en: "Responsive business dashboard with dynamic charts, KPI widgets, and modern state management.",
    description_en: "React and Tailwind CSS administration app with real-time performance charts, multi-criteria filters, user profile management, and sortable, paginated data tables.",
    category_label_en: "React & Analytics UI",
    repository_note_en: "Open-source repository available on the @Waliddjla GitHub profile.",
    features_en: [
      "KPI widgets with percentage progress and visual trend indicators",
      "Interactive sales and operations charts with custom tooltips",
      "Searchable data table with column sorting and pagination",
      "Responsive interface for phones, tablets, and large screens with dark mode"
    ],
    case_study_en: {
      client: "Personal Project & Technical Showcase",
      role: "Frontend Engineer",
      period: "2023",
      kpis: [
        { label_en: "Google Lighthouse score" },
        { label_en: "Mobile compatibility" },
        { label_en: "No heavyweight dependencies", value_en: "Optimized" }
      ],
      context: "A usability and user experience demonstration for ERP and CRM dashboards.",
      architecture: "React function components with useMemo and useCallback hooks, Tailwind CSS utility layouts, and high-speed SVG chart rendering.",
      challenges: ["Maintain smooth 60 FPS rendering while charts update dynamically."],
      solution: "Optimized the DOM tree, extracted reusable UI components, and built modular light and dark themes.",
      impact: "Provides a design system reference for internal business projects and monitoring applications."
    }
  }
};

for (const project of featuredProjects) {
  const translation = englishProjects[project.id];
  translation.case_study_en.kpis = translation.case_study_en.kpis.map((kpi, index) => {
    const { value, icon } = project.case_study.kpis[index];
    return { value, ...kpi, icon };
  });
  Object.assign(project, translation);
}

if (typeof module !== "undefined" && module.exports) module.exports = featuredProjects;
if (typeof window !== "undefined") window.featuredProjects = featuredProjects;
