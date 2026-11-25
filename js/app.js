/**
 * app.jsx
 * Application React 18 pour le Portfolio Dynamique de Walid Djellali
 * Données réelles extraites du CV et de ses dépôts GitHub (@Waliddjla)
 * Inclut :
 * - Console d'Administration complète (Auth PIN, Stats SQLite, Messagerie, Profil, CRUD Projets)
 * - Études de cas approfondies & architectures techniques détaillées
 * - Workflow interactif SAP S/4HANA (PM & MM)
 * - Explorateur de code GitHub
 * - CV interactif prêt à l'impression / export PDF
 */

const {
  useState,
  useEffect,
  useLayoutEffect,
  useRef
} = React;
function Icon({
  name,
  className
}) {
  const container = useRef(null);
  useLayoutEffect(() => {
    const placeholder = document.createElement("i");
    placeholder.dataset.lucide = name;
    placeholder.className = className;
    container.current.replaceChildren(placeholder);
  }, [name, className]);
  return /*#__PURE__*/React.createElement("span", {
    ref: container,
    className: "inline-flex shrink-0",
    "aria-hidden": "true"
  });
}

// Composants d'icônes SVG haute définition pour LinkedIn et GitHub
const LinkedInIcon = ({
  className = "w-4 h-4"
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  fill: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6 1.6 1.6 0 0 0-1.6-1.6Z"
}));
const GitHubIcon = ({
  className = "w-4 h-4"
}) => /*#__PURE__*/React.createElement("svg", {
  className: className,
  fill: "currentColor",
  viewBox: "0 0 24 24",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  fillRule: "evenodd",
  clipRule: "evenodd",
  d: "M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
}));

// Dictionnaire bilingue Français / Anglais (i18n)
const translations = {
  fr: {
    nav: {
      journey: "Parcours",
      sap: "Modules SAP",
      skills: "Compétences",
      projects: "Projets",
      github: "Hub GitHub",
      education: "Formations",
      contact: "Contact",
      resume: "Mon CV",
      admin: "Admin",
      sqlite_active: "SQLite Actif"
    },
    hero: {
      header_role: "Analyste SAP & Full-Stack",
      badge: "Disponible pour opportunités SAP & Développement Full-Stack",
      contact_linkedin: "Me contacter sur LinkedIn",
      view_resume: "Consulter mon CV (PDF)",
      explore_projects: "Explorer mes Projets",
      highlights: [{
        icon: "layers",
        value: "SAP S/4HANA",
        label: "Modules PM • MM • QM",
        color: "text-blue-600 dark:text-blue-400"
      }, {
        icon: "code-2",
        value: "Full-Stack",
        label: "Node.js • TypeScript • React",
        color: "text-indigo-600 dark:text-indigo-400"
      }, {
        icon: "briefcase",
        value: "Orionlab & ACG",
        label: "Intégration ERP & Systèmes IT",
        color: "text-emerald-600 dark:text-emerald-400"
      }, {
        icon: "graduation-cap",
        value: "Master Info",
        label: "& Certification Cisco CCNA v7",
        color: "text-purple-600 dark:text-purple-400"
      }]
    },
    sap: {
      badge: "Intégration ERP SAP S/4HANA",
      title: "Modules SAP Intégrés : PM • MM • QM",
      subtitle: "Présentation des modules SAP S/4HANA intégrés et déployés par Walid dans le cadre de ses missions chez Orion Lab et ACG SIM.",
      all_modules: "Tous les modules",
      module_prefix: "Module",
      role_orion: "Rôle chez Orion Lab",
      role_acg: "Rôle chez ACG SIM",
      flow_title: "Flux d'intégration, en une ligne",
      flow_subtitle: "Communication transversale continue entre PM, MM et QM",
      flow_badge: "Flux Inter-Modules SAP"
    },
    skills: {
      names: {
        "Preventive Maintenance & Calibration": "Maintenance préventive et étalonnage",
        "Master Data Migration": "Migration des données de base",
        "Migration & Master Data": "Migration et données de base"
      },
      badge: "Stack Technique & Métier",
      title: "Compétences Clés & Expertise"
    },
    projects: {
      badge: "Portfolio & Réalisations",
      title: "Projets Phares & Applications Métier"
    },
    common: {
      linkedin: "LinkedIn",
      github: "GitHub",
      close: "Fermer",
      delete: "Supprimer",
      cancel: "Annuler",
      edit: "Modifier",
      resume: "CV (PDF)",
      top: "Haut",
      linkedin_profile: "Profil LinkedIn",
      github_repositories: "Dépôts GitHub",
      copyright: "Tous droits réservés."
    },
    navigation: {
      linkedin: "Consulter le profil LinkedIn de Walid",
      github: "Explorer le GitHub de Walid (@Waliddjla)",
      resume: "Consulter et imprimer le CV en PDF",
      admin: "Console d'Administration du Portfolio",
      database: "Base SQLite native connectée",
      theme: "Basculer le thème",
      menu: "Ouvrir le menu",
      language: "Langue / Language",
      language_toggle: "Switch to English"
    },
    experience: {
      badge: "Expérience Professionnelle",
      title: "Parcours & Réalisations Métier",
      subtitle: "Expérience confirmée alliant la maîtrise fonctionnelle des processus SAP et le développement d'applications critiques."
    },
    education: {
      badge: "Diplômes & Certifications",
      title: "Formation Académique & Accréditations"
    },
    portfolio: {
      subtitle: "Chaque projet intègre une analyse technique approfondie : contexte industriel, architecture système, défis surmontés et indicateurs de performance (KPIs).",
      case_study: "Étude de cas",
      detail: "Détails & Architecture",
      code: "Code source",
      sap: "Modules SAP Intégrés"
    },
    repos: {
      descriptions: {
        "Waliddjla": "README de profil",
        "portfolio": "Portfolio de Walid Djellali",
        "connect-walid": "Jeu de connexion réalisé en React",
        "quizz": "Quiz simple en HTML et CSS",
        "walid": "Application web d’information sur la connexion Wi-Fi",
        "brookly": "Conception UX pour une librairie",
        "master-project": "Prévision d’un plan d’irrigation par intelligence artificielle à partir de l’évapotranspiration",
        "authentification": "Projet d’authentification en JavaScript, HTML et CSS",
        "mpi-matrix-multiplication": "Multiplication de matrices avec MPI"
      },
      badge: "Écosystème Open Source",
      title: "Explorateur de Code GitHub (@Waliddjla)",
      subtitle: "Recherchez et filtrez en direct parmi l'ensemble des dépôts créés par Walid Djellali sur GitHub.",
      search: "Rechercher un dépôt (react, dashboard, api, iot...)...",
      open: "Explorer le code",
      all: "Voir l'ensemble des dépôts sur GitHub (@Waliddjla)",
      untagged: "Projet",
      description: "Dépôt de développement hébergé sur le profil de Walid Djellali."
    },
    contact: {
      badge: "Opportunités & Missions",
      title: "Prendre Contact avec Walid",
      subtitle: "Disponible pour échanger sur des opportunités en intégration SAP S/4HANA (PM & MM) ou en développement Full-Stack.",
      name: "Votre Nom / Entreprise *",
      email: "Votre Email *",
      subject: "Objet de votre demande",
      message: "Message détaillé *",
      name_placeholder: "Ex: Direction IT / Recruteur",
      email_placeholder: "nom@entreprise.com",
      subject_placeholder: "Opportunité SAP S/4HANA / Projet Full-Stack...",
      message_placeholder: "Présentez brièvement vos besoins ou le poste envisagé...",
      sending: "Envoi en cours...",
      send: "Envoyer le message"
    },
    modal: {
      certified: "Étude de cas certifiée",
      kpis: "Indicateurs de Performance Clés (KPIs)",
      client: "Client / Organisation :",
      role: "Rôle de Walid :",
      period: "Période :",
      context: "Contexte & Enjeux Métier",
      architecture: "Architecture Technique & Flux de Données",
      features: "Fonctionnalités Majeures Développées",
      challenges: "Défis Complexes & Résolutions Techniques",
      solution: "Approche & Résolution :",
      impact: "Impact Opérationnel & Valeur Ajoutée",
      technologies: "Technologies & Outils Employés",
      source: "Explorer le code source"
    },
    admin: {
      mobile: "Console d'Administration Portfolio",
      title: "Console d'Administration",
      lock: "Verrouiller",
      logout: "Se déconnecter",
      online: "En ligne",
      subtitle: "Gestion directe de la base de données SQLite (portfolio.db)",
      private: "Espace Réservé à Walid Djellali",
      instructions: "Veuillez saisir le code PIN d'administration pour gérer vos messages, votre statut de disponibilité et vos projets SQLite.",
      pin: "Code PIN d’accès",
      unlock: "Déverrouiller la Console",
      messages: "Messages Reçus",
      projects: "Projets Enregistrés",
      db_size: "Taille BDD SQLite",
      runtime: "Moteur Node.js",
      quick: "Changement Rapide du Statut de Disponibilité",
      current: "Statut actuel :",
      refresh: "Actualiser",
      empty_inbox: "Aucun message dans la table SQLite pour le moment.",
      recent: "Récemment",
      reply: "Répondre par email",
      reply_subject: "Votre message",
      mark_read: "Marquer lu",
      mark_unread: "Marquer non-lu",
      profile_title: "Titre Professionnel",
      availability: "Statut de Disponibilité",
      phone: "Téléphone",
      email: "Email",
      location: "Localisation",
      bio: "Bio / Résumé de Présentation",
      save_profile: "Enregistrer les Modifications dans SQLite",
      add_project: "Ajouter un Projet",
      new_project: "Ajouter un Nouveau Projet",
      edit_project: "Modifier le Projet",
      project_title: "Titre du Projet",
      category: "Catégorie",
      category_label: "Label Catégorie",
      tagline: "Phrase d'accroche (Tagline)",
      description: "Description",
      image: "Image URL",
      github_link: "Lien GitHub",
      demo_link: "Lien Démo",
      tags: "Technologies (séparées par virgule)",
      features: "Fonctionnalités clés (1 par ligne)",
      category_example: "Ex: Full-Stack & IT Management",
      tagline_example: "Une phrase résumant l'impact du projet...",
      features_example: "Fonctionnalité 1\nFonctionnalité 2",
      save: "Enregistrer dans SQLite",
      inbox: "Boîte de Réception",
      catalog: "Catalogue des Projets SQLite",
      db_messages: "messages dans portfolio.db",
      size_unit: "Ko",
      overview: "Vue d'ensemble",
      profile_tab: "Profil & Disponibilité",
      projects_tab: "Gestion des Projets",
      avatar_url: "Photo de profil (URL)",
      session_badge: "Mode Admin actif"
    },
    cv: {
      title: "Curriculum Vitae",
      subtitle: "Format professionnel prêt à l'impression ou sauvegarde PDF",
      print: "Imprimer / PDF",
      summary: "Synthèse Professionnelle",
      experience: "Parcours Professionnel",
      skills: "Compétences & Outils",
      education: "Formations & Certifications"
    },
    toasts: {
      confirm_message: id => `Confirmer la suppression du message #${id} ?`,
      message_deleted: id => `🗑️ Message #${id} supprimé.`,
      confirm_project: title => `Supprimer le projet « ${title} » de la base SQLite ?`,
      project_deleted: title => `🗑️ Projet « ${title} » supprimé de SQLite.`,
      status_saved: status => `🟢 Statut mis à jour : ${status.fr}`,
      login: "🔓 Authentification réussie ! Bienvenue dans l'administration.",
      logout: "Verrouillage de l'espace administration.",
      session_expired: "Session expirée. Reconnectez-vous.",
      invalid_pin: "Code PIN incorrect.",
      admin_unconfigured: "ADMIN_PIN non configuré côté serveur (définissez la variable d'environnement ADMIN_PIN).",
      login_limit: "Trop de tentatives. Réessayez plus tard.",
      login_error: "Erreur de connexion au serveur.",
      message_error: "Erreur lors de la suppression du message.",
      profile_saved: "✅ Profil et disponibilité mis à jour dans SQLite !",
      profile_error: "Erreur lors de la mise à jour du profil.",
      project_delete_error: "Erreur lors de la suppression du projet.",
      project_save_error: "Erreur lors de l'enregistrement du projet.",
      project_updated: "✅ Projet modifié dans SQLite.",
      project_added: "✅ Projet ajouté dans SQLite.",
      contact_sent: "✅ Message envoyé avec succès ! Walid vous répondra sous 24h.",
      contact_error: "Impossible d’envoyer le message. Réessayez."
    },
    nav_items: [{
      anchor: "experience",
      label: "Parcours",
      icon: "briefcase"
    }, {
      anchor: "sap-workflow",
      label: "Modules SAP",
      icon: "workflow"
    }, {
      anchor: "skills",
      label: "Compétences",
      icon: "layers"
    }, {
      anchor: "projects",
      label: "Projets",
      icon: "folder-code"
    }, {
      anchor: "github-explorer",
      label: "Hub GitHub",
      icon: "github"
    }, {
      anchor: "education",
      label: "Formations",
      icon: "graduation-cap"
    }, {
      anchor: "contact",
      label: "Contact",
      icon: "mail"
    }],
    skill_groups: [{
      category: "SAP & ERP",
      label: "SAP & Processus ERP",
      icon: "cpu",
      frame: "border-blue-500/20",
      badge: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      pill: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    }, {
      category: "Frontend",
      label: "Frontend, React & Desktop",
      icon: "layout",
      frame: "border-indigo-500/20",
      badge: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
      pill: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
    }, {
      category: "Backend & Languages",
      label: "Backend, NestJS, Fastify & APIs",
      icon: "server",
      frame: "border-purple-500/20",
      badge: "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
      pill: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
    }, {
      category: "Databases & Storage",
      label: "Bases de Données & Stockage",
      icon: "database",
      frame: "border-emerald-500/20",
      badge: "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
      pill: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
    }, {
      category: "Systems & Infrastructure",
      label: "Systèmes, AD, Synology & Réseau",
      icon: "hard-drive",
      frame: "border-sky-500/20",
      badge: "bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400",
      pill: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
    }, {
      category: "DevOps & Deployment",
      label: "Déploiement, PM2, Nginx & SSL",
      icon: "terminal",
      frame: "border-amber-500/20",
      badge: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
      pill: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
    }],
    project_filters: [{
      id: "all",
      label: "Tous les projets"
    }, {
      id: "software",
      label: "Full-Stack & Systèmes"
    }, {
      id: "sap",
      label: "SAP & Infrastructure"
    }, {
      id: "data",
      label: "Data Science & IA"
    }, {
      id: "react",
      label: "React & UI"
    }],
    repo_filters: [{
      id: "all",
      label: "Tous"
    }, {
      id: "javascript",
      label: "JavaScript"
    }, {
      id: "html",
      label: "HTML/CSS"
    }, {
      id: "python",
      label: "Python"
    }]
  },
  en: {
    nav: {
      journey: "Experience",
      sap: "SAP Modules",
      skills: "Skills",
      projects: "Projects",
      github: "GitHub Hub",
      education: "Education",
      contact: "Contact",
      resume: "My Resume",
      admin: "Admin",
      sqlite_active: "SQLite Active"
    },
    hero: {
      header_role: "SAP Analyst & Full-Stack",
      badge: "Available for SAP & Full-Stack Development opportunities",
      contact_linkedin: "Contact me on LinkedIn",
      view_resume: "View my Resume (PDF)",
      explore_projects: "Explore my Projects",
      highlights: [{
        icon: "layers",
        value: "SAP S/4HANA",
        label: "PM • MM • QM Modules",
        color: "text-blue-600 dark:text-blue-400"
      }, {
        icon: "code-2",
        value: "Full-Stack",
        label: "Node.js • TypeScript • React",
        color: "text-indigo-600 dark:text-indigo-400"
      }, {
        icon: "briefcase",
        value: "Orionlab & ACG",
        label: "ERP Rollout & IT Systems",
        color: "text-emerald-600 dark:text-emerald-400"
      }, {
        icon: "graduation-cap",
        value: "M.Sc. CS",
        label: "& Cisco CCNA v7 Certified",
        color: "text-purple-600 dark:text-purple-400"
      }]
    },
    sap: {
      badge: "SAP S/4HANA ERP Integration",
      title: "Integrated SAP Modules: PM • MM • QM",
      subtitle: "Overview of SAP S/4HANA modules integrated and deployed by Walid during his missions at Orion Lab and ACG SIM.",
      all_modules: "All modules",
      module_prefix: "Module",
      role_orion: "Role at Orion Lab",
      role_acg: "Role at ACG SIM",
      flow_title: "Integration flow, in a single line",
      flow_subtitle: "Continuous transversal communication between PM, MM, and QM",
      flow_badge: "SAP Inter-Module Flow"
    },
    skills: {
      names: {
        "Maintenance Préventive & Ordres de Travail": "Preventive Maintenance & Work Orders"
      },
      badge: "Technical & Functional Stack",
      title: "Key Skills & Expertise"
    },
    projects: {
      badge: "Portfolio & Deliverables",
      title: "Featured Projects & Business Apps"
    },
    common: {
      linkedin: "LinkedIn",
      github: "GitHub",
      close: "Close",
      delete: "Delete",
      cancel: "Cancel",
      edit: "Edit",
      resume: "Résumé (PDF)",
      top: "Back to top",
      linkedin_profile: "LinkedIn profile",
      github_repositories: "GitHub repositories",
      copyright: "All rights reserved."
    },
    navigation: {
      linkedin: "View Walid’s LinkedIn profile",
      github: "Explore Walid’s GitHub (@Waliddjla)",
      resume: "View and print the résumé as PDF",
      admin: "Portfolio administration console",
      database: "Connected to SQLite",
      theme: "Toggle theme",
      menu: "Open menu",
      language: "Language / Langue",
      language_toggle: "Passer en français"
    },
    experience: {
      badge: "Professional experience",
      title: "Career & Business Achievements",
      subtitle: "Experience spanning functional SAP process expertise and the development of business-critical applications."
    },
    education: {
      badge: "Degrees & Certifications",
      title: "Education & Credentials"
    },
    portfolio: {
      subtitle: "Each project includes an in-depth technical analysis covering industry context, system architecture, engineering challenges and key performance indicators.",
      case_study: "Case study",
      detail: "Details & Architecture",
      code: "Source code",
      sap: "Integrated SAP Modules"
    },
    repos: {
      descriptions: {
        "Waliddjla": "Profile README",
        "portfolio": "Walid Djellali’s portfolio",
        "connect-walid": "Connect game built with React",
        "quizz": "Simple quiz built with HTML and CSS",
        "walid": "Web app for Wi-Fi connection information",
        "brookly": "UX design for a bookstore",
        "master-project": "AI-based irrigation scheduling using evapotranspiration",
        "authentification": "Authentication project using JavaScript, HTML and CSS",
        "mpi-matrix-multiplication": "Matrix multiplication using MPI"
      },
      badge: "Open Source Ecosystem",
      title: "GitHub Code Explorer (@Waliddjla)",
      subtitle: "Search and filter repositories created by Walid Djellali on GitHub.",
      search: "Search repositories (React, dashboard, API, IoT…)",
      open: "Explore the code",
      all: "View all repositories on GitHub (@Waliddjla)",
      untagged: "Project",
      description: "Development repository hosted on Walid Djellali’s GitHub profile."
    },
    contact: {
      badge: "Opportunities & Engagements",
      title: "Get in touch with Walid",
      subtitle: "Available to discuss opportunities in SAP S/4HANA integration (PM & MM) or full-stack development.",
      name: "Your name / Company *",
      email: "Your email *",
      subject: "Subject",
      message: "Message *",
      name_placeholder: "E.g. IT department / Recruiter",
      email_placeholder: "name@company.com",
      subject_placeholder: "SAP S/4HANA opportunity / Full-stack project…",
      message_placeholder: "Briefly describe your needs or the role…",
      sending: "Sending…",
      send: "Send message"
    },
    modal: {
      certified: "Certified case study",
      kpis: "Key Performance Indicators (KPIs)",
      client: "Client / Organization:",
      role: "Walid’s role:",
      period: "Period:",
      context: "Business Context & Objectives",
      architecture: "Technical Architecture & Data Flows",
      features: "Key Features",
      challenges: "Engineering Challenges & Solutions",
      solution: "Approach & Resolution:",
      impact: "Operational Impact & Business Value",
      technologies: "Technologies & Tools",
      source: "Explore the source code"
    },
    admin: {
      mobile: "Portfolio administration console",
      title: "Administration console",
      lock: "Lock",
      logout: "Sign out",
      online: "Online",
      subtitle: "Manage the SQLite database (portfolio.db)",
      private: "Private area for Walid Djellali",
      instructions: "Enter the administrator PIN to manage your messages, availability and projects.",
      pin: "Access PIN",
      unlock: "Unlock console",
      messages: "Received messages",
      projects: "Saved projects",
      db_size: "SQLite database size",
      runtime: "Node.js runtime",
      quick: "Quick availability update",
      current: "Current status:",
      refresh: "Refresh",
      empty_inbox: "No messages yet.",
      recent: "Recently",
      reply: "Reply by email",
      reply_subject: "Your message",
      mark_read: "Mark as read",
      mark_unread: "Mark as unread",
      profile_title: "Professional title",
      availability: "Availability status",
      phone: "Phone",
      email: "Email",
      location: "Location",
      bio: "Bio / Professional summary",
      save_profile: "Save profile changes to SQLite",
      add_project: "Add project",
      new_project: "Add a new project",
      edit_project: "Edit project",
      project_title: "Project title",
      category: "Category",
      category_label: "Category label",
      tagline: "Tagline",
      description: "Description",
      image: "Image URL",
      github_link: "GitHub link",
      demo_link: "Demo link",
      tags: "Technologies (comma-separated)",
      features: "Key features (one per line)",
      category_example: "E.g. Full-Stack & IT Management",
      tagline_example: "A sentence summarizing the project’s impact…",
      features_example: "Feature 1\nFeature 2",
      save: "Save to SQLite",
      inbox: "Inbox",
      catalog: "SQLite project catalog",
      db_messages: "messages in portfolio.db",
      size_unit: "KB",
      overview: "Overview",
      profile_tab: "Profile & Availability",
      projects_tab: "Project Management",
      avatar_url: "Profile photo (URL)",
      session_badge: "Admin mode active"
    },
    cv: {
      title: "Résumé",
      subtitle: "Professional layout ready for printing or saving as PDF",
      print: "Print / PDF",
      summary: "Professional Summary",
      experience: "Professional Experience",
      skills: "Skills & Tools",
      education: "Education & Certifications"
    },
    toasts: {
      confirm_message: id => `Delete message #${id}?`,
      message_deleted: id => `🗑️ Message #${id} deleted.`,
      confirm_project: title => `Delete the project “${title}” from SQLite?`,
      project_deleted: title => `🗑️ Project “${title}” deleted from SQLite.`,
      status_saved: status => `🟢 Status updated: ${status.en}`,
      login: "🔓 Signed in successfully.",
      logout: "Administration console locked.",
      session_expired: "Session expired. Please sign in again.",
      invalid_pin: "Incorrect PIN.",
      admin_unconfigured: "ADMIN_PIN is not configured on the server (set the ADMIN_PIN environment variable).",
      login_limit: "Too many attempts. Try again later.",
      login_error: "Unable to connect to the server.",
      message_error: "Could not delete the message.",
      profile_saved: "✅ Profile and availability saved to SQLite.",
      profile_error: "Could not update the profile.",
      project_delete_error: "Could not delete the project.",
      project_save_error: "Could not save the project.",
      project_updated: "✅ Project updated in SQLite.",
      project_added: "✅ Project added to SQLite.",
      contact_sent: "✅ Message received. Walid will get back to you within 24 hours.",
      contact_error: "Could not send the message. Please try again."
    },
    nav_items: [{
      anchor: "experience",
      label: "Experience",
      icon: "briefcase"
    }, {
      anchor: "sap-workflow",
      label: "SAP Modules",
      icon: "workflow"
    }, {
      anchor: "skills",
      label: "Skills",
      icon: "layers"
    }, {
      anchor: "projects",
      label: "Projects",
      icon: "folder-code"
    }, {
      anchor: "github-explorer",
      label: "GitHub Hub",
      icon: "github"
    }, {
      anchor: "education",
      label: "Education",
      icon: "graduation-cap"
    }, {
      anchor: "contact",
      label: "Contact",
      icon: "mail"
    }],
    skill_groups: [{
      category: "SAP & ERP",
      label: "SAP & ERP Processes",
      icon: "cpu",
      frame: "border-blue-500/20",
      badge: "bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
      pill: "bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    }, {
      category: "Frontend",
      label: "Frontend, React & Desktop",
      icon: "layout",
      frame: "border-indigo-500/20",
      badge: "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400",
      pill: "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300"
    }, {
      category: "Backend & Languages",
      label: "Backend, NestJS, Fastify & APIs",
      icon: "server",
      frame: "border-purple-500/20",
      badge: "bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400",
      pill: "bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300"
    }, {
      category: "Databases & Storage",
      label: "Databases & Storage",
      icon: "database",
      frame: "border-emerald-500/20",
      badge: "bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400",
      pill: "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
    }, {
      category: "Systems & Infrastructure",
      label: "Systems, AD, Synology & Networking",
      icon: "hard-drive",
      frame: "border-sky-500/20",
      badge: "bg-sky-100 dark:bg-sky-950 text-sky-600 dark:text-sky-400",
      pill: "bg-sky-50 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300"
    }, {
      category: "DevOps & Deployment",
      label: "Deployment, PM2, Nginx & SSL",
      icon: "terminal",
      frame: "border-amber-500/20",
      badge: "bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400",
      pill: "bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300"
    }],
    project_filters: [{
      id: "all",
      label: "All projects"
    }, {
      id: "software",
      label: "Full-Stack & Systems"
    }, {
      id: "sap",
      label: "SAP & Infrastructure"
    }, {
      id: "data",
      label: "Data Science & AI"
    }, {
      id: "react",
      label: "React & UI"
    }],
    repo_filters: [{
      id: "all",
      label: "All"
    }, {
      id: "javascript",
      label: "JavaScript"
    }, {
      id: "html",
      label: "HTML/CSS"
    }, {
      id: "python",
      label: "Python"
    }]
  }
};
const availabilityOptions = [{
  fr: "Disponible pour opportunités SAP & Développement Full-Stack",
  en: "Available for SAP & full-stack development opportunities"
}, {
  fr: "En poste chez Orionlab (À l'écoute d'opportunités)",
  en: "Currently at Orionlab (open to opportunities)"
}, {
  fr: "Disponible pour missions d'ingénierie & Consulting",
  en: "Available for engineering and consulting engagements"
}];
const fallbackData = {
  profile: {
    name: "Walid Djellali",
    title: "SAP Functional Analyst | Full Stack Software Engineer",
    title_en: "SAP Functional Analyst | Full Stack Software Engineer",
    location: "Oran, Algérie",
    location_en: "Oran, Algeria",
    availability_en: "Available for SAP and full-stack development opportunities",
    bio_en: "SAP Functional Analyst and Software Engineer with a Master’s degree in Computer Science. Experienced in SAP S/4HANA deployments (PM and MM), IT systems administration and full-stack development (Node.js, TypeScript, React). Combines business analysis with technical expertise to design maintainable digital solutions.",
    email: "walidjellali32@gmail.com",
    phone: "+213 676 958 671",
    linkedin: "https://www.linkedin.com/in/waliddjellali/",
    github: "https://github.com/Waliddjla",
    bio: "Analyste fonctionnel SAP et ingénieur logiciel diplômé d’un Master en informatique. Expérience confirmée dans le déploiement d’ERP SAP S/4HANA (PM & MM), l’administration de systèmes IT et le développement Full-Stack (Node.js, TypeScript, React). Combine rigueur analytique métier et maîtrise technique pour concevoir des solutions numériques pratiques et pérennes.",
    availability: "Disponible pour opportunités SAP & Développement Full-Stack",
    avatar: "/img/walid.jpg"
  },
  experiences: [],
  skills: [],
  projects: window.featuredProjects || [],
  education: [],
  sap_modules: [{
    id: "pm",
    code: "PM",
    title: "Plant Maintenance",
    title_en: "Plant Maintenance",
    icon: "wrench",
    color: "blue",
    summary: "Maintenance des équipements : avis, ordres de travail, plans préventifs, gammes.",
    summary_en: "Equipment maintenance: notifications, work orders, preventive plans, task lists.",
    orion: ["Revue du Business Blueprint (BBP) PM avec l'intégrateur SAP", "Validation des données de base (Equipment, Functional Locations) avant migration", "Planification préventive, calibration, Task Lists et ordonnancement des OT", "Modèle d'impression des avis et ordres de maintenance"],
    orion_en: ["Review of the PM Business Blueprint (BBP) with the SAP systems integrator", "Validation of master data (Equipment, Functional Locations) prior to migration", "Preventive maintenance scheduling, calibration, Task Lists, and work order dispatching", "Layout design for maintenance notifications and work order printouts"],
    acg: ["Support au déploiement SAP S/4HANA dans les processus de maintenance", "Gestion des utilisateurs, rôles et accès Fiori"],
    acg_en: ["Support for SAP S/4HANA rollout across maintenance business processes", "Management of user authorizations, role assignments, and SAP Fiori access"]
  }, {
    id: "mm",
    code: "MM",
    title: "Materials Management",
    title_en: "Materials Management",
    icon: "package",
    color: "indigo",
    summary: "Articles, stocks, réservations, demandes d'achat et commandes.",
    summary_en: "Materials, inventory, reservations, purchase requisitions, and purchase orders.",
    orion: ["Support utilisateurs sur les flux MM (pièces de rechange, réservations)", "Lien entre ordres PM et disponibilité des pièces en magasin"],
    orion_en: ["Key-user support on MM flows (spare parts management, stock reservations)", "Cross-functional alignment between PM work orders and warehouse stock availability"],
    acg: ["Contribution à l'implémentation de l'ERP SAP côté approvisionnement", "Tableau de bord achats (SAPAN / DA Analyse) alimenté par OData SAP"],
    acg_en: ["Active contribution to SAP ERP implementation on procurement & inventory workflows", "Procurement & purchasing analytics dashboard powered by SAP OData services"]
  }, {
    id: "qm",
    code: "QM",
    title: "Quality Management",
    title_en: "Quality Management",
    icon: "gauge",
    color: "emerald",
    summary: "Lots de contrôle, caractéristiques, étalonnage et décision d'utilisation.",
    summary_en: "Inspection lots, master inspection characteristics, calibration, and usage decision.",
    orion: ["Coordination des caractéristiques QM avec les équipes métier", "Articulation calibration / métrologie avec les plans d'entretien PM"],
    orion_en: ["Coordination of Master Inspection Characteristics (MIC) with business teams", "Seamless alignment between calibration / metrology and PM preventive maintenance plans"],
    acg: ["Alignement des besoins qualité avec les processus SAP"],
    acg_en: ["Alignment of quality compliance requirements with SAP standard processes"]
  }],
  sap_flow: [{
    step_number: "01",
    label: "Avis PM",
    label_en: "PM Notification",
    note: "Panne ou besoin signalé",
    note_en: "Breakdown or need reported"
  }, {
    step_number: "02",
    label: "Ordre PM",
    label_en: "PM Order",
    note: "Réservation / achat de pièces (MM)",
    note_en: "Spare parts reservation / purchasing (MM)"
  }, {
    step_number: "03",
    label: "Plan préventif PM",
    label_en: "Preventive Plan (PM)",
    note: "Déclenche les lots de contrôle (QM)",
    note_en: "Triggers inspection lots (QM)"
  }, {
    step_number: "04",
    label: "Exécution",
    label_en: "Execution",
    note: "Sortie de pièces (MM) + mesures (QM)",
    note_en: "Goods issue (MM) + measurements (QM)"
  }, {
    step_number: "05",
    label: "Clôture TECO",
    label_en: "TECO & Settlement",
    note: "Décision d'utilisation (QM)",
    note_en: "Usage decision (QM) & settlement"
  }]
};
function App() {
  const [data, setData] = useState(fallbackData);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Gestion bilingue Français (fr) / Anglais (en)
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem("portfolio_lang") === "en" ? "en" : "fr";
    } catch (e) {
      return "fr";
    }
  });
  const toggleLang = () => {
    const next = lang === "fr" ? "en" : "fr";
    setLang(next);
    try {
      localStorage.setItem("portfolio_lang", next);
    } catch (e) {}
  };
  const isEn = lang === "en";
  const t = translations[lang] || translations.fr;
  const languageToggle = /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggleLang,
    title: t.navigation.language_toggle,
    "aria-label": t.navigation.language_toggle,
    className: "px-2.5 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
  }, isEn ? "EN" : "FR");
  const tr = (obj, key) => isEn && obj?.[`${key}_en`] || obj?.[key];
  const trList = (obj, key) => {
    const translated = isEn && obj?.[`${key}_en`];
    return Array.isArray(translated) && translated.length ? translated : obj?.[key] || [];
  };
  const profileLocation = tr(data.profile, "location");
  const skillName = skill => {
    const dbTranslated = tr(skill, "name");
    if (isEn && skill?.name_en) return skill.name_en;
    return Object.hasOwn(t.skills.names, dbTranslated) ? t.skills.names[dbTranslated] : dbTranslated;
  };
  const experiencePeriod = exp => tr(exp, "period");
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  // Données SAP dynamiques (Loop Database First)
  const sapModules = data.sap_modules && data.sap_modules.length > 0 ? data.sap_modules : fallbackData.sap_modules || [];
  const sapFlow = data.sap_flow && data.sap_flow.length > 0 ? data.sap_flow : fallbackData.sap_flow || [];

  // Modal d'Étude de Cas Détaillée pour les projets
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);
  const caseStudy = tr(selectedProjectModal, "case_study");
  const modalFeatures = trList(selectedProjectModal, "features");

  // Nouveautés interactives : Modal CV, Explorateur GitHub et Workflow SAP
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [repoSearchQuery, setRepoSearchQuery] = useState("");
  const [repoLanguageFilter, setRepoLanguageFilter] = useState("all");
  const [selectedSapModule, setSelectedSapModule] = useState("all");

  // Scroll progress & Back-to-top
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Espace d'Administration (accès dédié via /admin, #admin ou Ctrl+Shift+A)
  const [adminModalOpen, setAdminModalOpen] = useState(() => {
    try {
      const path = window.location.pathname;
      const hash = window.location.hash;
      const search = window.location.search;
      return path === "/admin" || path === "/admin/" || hash === "#admin" || search.includes("admin=1");
    } catch (e) {
      return false;
    }
  });
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem("portfolio_admin_token"));
  const isAdminAuth = Boolean(adminToken);
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState("");
  const [adminTab, setAdminTab] = useState("stats"); // 'stats', 'inbox', 'profile', 'projects'
  const [adminStats, setAdminStats] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [editingProfileForm, setEditingProfileForm] = useState({
    title: "",
    title_en: "",
    availability: "",
    availability_en: "",
    bio: "",
    bio_en: "",
    phone: "",
    email: "",
    location: "",
    location_en: "",
    avatar: ""
  });
  const [projectFormModalOpen, setProjectFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({});

  // Formulaire de contact public
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Initialiser le thème Dark / Light
  useEffect(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialDark = savedTheme === "dark" || !savedTheme && systemDark;
    setIsDarkMode(initialDark);
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);
  const toggleTheme = () => {
    const nextDark = !isDarkMode;
    setIsDarkMode(nextDark);
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("portfolio-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("portfolio-theme", "light");
    }
  };

  // 2. Charger les données du portfolio depuis SQLite
  const fetchPortfolio = () => {
    fetch("/api/portfolio").then(res => {
      if (!res.ok) throw new Error("API non accessible");
      return res.json();
    }).then(apiData => {
      if (apiData && apiData.profile) {
        setData(apiData);
        setIsDbConnected(true);
        setEditingProfileForm({
          title: apiData.profile.title || "",
          title_en: apiData.profile.title_en || "",
          availability: apiData.profile.availability || "",
          availability_en: apiData.profile.availability_en || "",
          bio: apiData.profile.bio || "",
          bio_en: apiData.profile.bio_en || "",
          phone: apiData.profile.phone || "",
          email: apiData.profile.email || "",
          location: apiData.profile.location || "",
          location_en: apiData.profile.location_en || "",
          avatar: apiData.profile.avatar || "/img/walid.jpg"
        });
      }
    }).catch(() => {
      setIsDbConnected(false);
    });
  };
  useEffect(() => {
    fetchPortfolio();
  }, []);

  // 3. Charger la liste complète des dépôts GitHub (@Waliddjla)
  useEffect(() => {
    fetch("/api/github-repos").then(res => res.json()).then(repos => {
      if (Array.isArray(repos) && repos.length > 0) {
        setGithubRepos(repos);
      }
    }).catch(() => {});
  }, []);

  // Réinitialiser les icônes Lucide à chaque re-render
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // ── Scroll-reveal global — IntersectionObserver ──────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    });
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    targets.forEach(el => {
      if (!el.classList.contains('visible')) {
        observer.observe(el);
      }
    });
    return () => observer.disconnect();
  }, [data, selectedCategory, selectedSapModule, repoSearchQuery, repoLanguageFilter, githubRepos]);

  // ── Barre de progression de scroll + Back to Top ─────────────────
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.round(scrollTop / docHeight * 100)) : 0;
      setScrollProgress(progress);
      setShowBackToTop(scrollTop > 420);
    };
    window.addEventListener("scroll", handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ── Raccourci clavier privé pour la Console Admin (Ctrl+Shift+A ou Alt+Shift+A) ──
  useEffect(() => {
    const handleKeyDown = e => {
      if ((e.ctrlKey || e.altKey) && e.shiftKey && e.key.toLowerCase() === "a") {
        e.preventDefault();
        setAdminModalOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  const toastTimeout = useRef(null);
  useEffect(() => () => clearTimeout(toastTimeout.current), []);
  const showToast = (key, ...args) => {
    setToastMessage({
      key,
      args
    });
    clearTimeout(toastTimeout.current);
    toastTimeout.current = setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };
  const toastLabel = toastMessage && t.toasts[toastMessage.key];

  // Charger les stats administratives et messages
  const clearAdminSession = () => {
    setAdminToken(null);
    sessionStorage.removeItem("portfolio_admin_token");
    setAdminStats(null);
    setMessagesList([]);
    setProjectFormModalOpen(false);
    setEditingProject(null);
  };
  const adminFetch = async (url, options = {}) => {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${adminToken}`
      }
    });
    if (res.status === 401 && sessionStorage.getItem("portfolio_admin_token") === adminToken) {
      clearAdminSession();
      setAdminPinError("session_expired");
    }
    if (!res.ok) throw new Error(res.status);
    return res;
  };
  const fetchAdminData = () => {
    adminFetch("/api/admin/stats").then(res => res.json()).then(stats => setAdminStats(stats)).catch(() => {});
    adminFetch("/api/messages").then(res => res.json()).then(msgs => setMessagesList(msgs || [])).catch(() => {});
  };
  useEffect(() => {
    if (adminModalOpen && adminToken) fetchAdminData();
  }, [adminModalOpen, adminToken]);
  const handleAdminLogin = async e => {
    e.preventDefault();
    setAdminPinError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pin: adminPinInput
        })
      });
      if (!res.ok) {
        setAdminPinError(res.status === 503 ? "admin_unconfigured" : res.status === 429 ? "login_limit" : res.status === 401 ? "invalid_pin" : "login_error");
        return;
      }
      const {
        token
      } = await res.json();
      if (typeof token !== "string" || !token) throw new Error("Missing admin token");
      sessionStorage.setItem("portfolio_admin_token", token);
      setAdminToken(token);
      setAdminPinInput("");
      showToast("login");
    } catch (error) {
      setAdminPinError("login_error");
    }
  };
  const handleAdminLogout = () => {
    clearAdminSession();
    setAdminPinError("");
    showToast("logout");
  };
  const openAdminModal = () => {
    setAdminModalOpen(true);
  };
  const closeAdminModal = () => {
    setAdminModalOpen(false);
    try {
      if (window.location.pathname === "/admin" || window.location.pathname === "/admin/") {
        window.history.replaceState({}, "", "/");
      } else if (window.location.hash === "#admin") {
        window.history.replaceState({}, "", window.location.pathname + window.location.search);
      }
    } catch (e) {}
  };

  // Actions d'administration : Suppression de message
  const handleDeleteMessage = async id => {
    if (!confirm(t.toasts.confirm_message(id))) return;
    try {
      const res = await adminFetch(`/api/messages/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setMessagesList(prev => prev.filter(m => m.id !== id));
        fetchAdminData();
        showToast("message_deleted", id);
      }
    } catch (err) {
      showToast("message_error");
    }
  };

  // Marquer un message comme lu
  const handleToggleMessageRead = async (id, currentRead) => {
    try {
      const nextState = currentRead ? 0 : 1;
      const res = await adminFetch(`/api/messages/${id}/read`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          read: nextState
        })
      });
      if (res.ok) {
        setMessagesList(prev => prev.map(m => m.id === id ? {
          ...m,
          read: nextState
        } : m));
        fetchAdminData();
      }
    } catch (err) {}
  };

  // Mettre à jour le profil
  const handleSaveProfile = async e => {
    e.preventDefault();
    try {
      const res = await adminFetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editingProfileForm)
      });
      const resData = await res.json();
      if (resData.success) {
        fetchPortfolio();
        fetchAdminData();
        showToast("profile_saved");
      }
    } catch (err) {
      showToast("profile_error");
    }
  };

  // Changer rapidement la disponibilité
  const handleQuickAvailabilityChange = async newStatus => {
    try {
      const res = await adminFetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          availability: newStatus.fr,
          availability_en: newStatus.en
        })
      });
      if (res.ok) {
        setEditingProfileForm(prev => ({
          ...prev,
          availability: newStatus.fr,
          availability_en: newStatus.en
        }));
        fetchPortfolio();
        fetchAdminData();
        showToast("status_saved", newStatus);
      }
    } catch (e) {}
  };

  // Supprimer un projet
  const handleDeleteProject = async (id, title) => {
    if (!confirm(t.toasts.confirm_project(title))) return;
    try {
      const res = await adminFetch(`/api/admin/projects/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchPortfolio();
        fetchAdminData();
        showToast("project_deleted", title);
      }
    } catch (e) {
      showToast("project_delete_error");
    }
  };

  // Sauvegarder un projet (ajout ou édition)
  const handleSaveProjectForm = async e => {
    e.preventDefault();
    try {
      const isEdit = !!editingProject;
      const endpoint = isEdit ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await adminFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectFormData)
      });
      const json = await res.json();
      if (json.success) {
        fetchPortfolio();
        fetchAdminData();
        setProjectFormModalOpen(false);
        setEditingProject(null);
        showToast(isEdit ? "project_updated" : "project_added");
      }
    } catch (e) {
      showToast("project_save_error");
    }
  };
  const openNewProjectForm = () => {
    setEditingProject(null);
    setProjectFormData({
      title: "",
      title_en: "",
      category: "software",
      category_label: "Full-Stack",
      category_label_en: "Full-Stack",
      tagline: "",
      tagline_en: "",
      description: "",
      description_en: "",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: "React, Node.js, SQLite",
      github_url: "https://github.com/Waliddjla",
      demo_url: "",
      features: "",
      features_en: ""
    });
    setProjectFormModalOpen(true);
  };
  const openEditProjectForm = p => {
    setEditingProject(p);
    setProjectFormData({
      title: p.title || "",
      title_en: p.title_en || "",
      category: p.category || "software",
      category_label: p.category_label || "Full-Stack",
      category_label_en: p.category_label_en || "Full-Stack",
      tagline: p.tagline || "",
      tagline_en: p.tagline_en || "",
      description: p.description || "",
      description_en: p.description_en || "",
      image: p.image || "",
      tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "",
      github_url: p.github_url || "",
      demo_url: p.demo_url || "",
      features: Array.isArray(p.features) ? p.features.join("\n") : p.features || "",
      features_en: Array.isArray(p.features_en) ? p.features_en.join("\n") : p.features_en || ""
    });
    setProjectFormModalOpen(true);
  };

  // Soumission du formulaire de contact public
  const handleFormSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });
      if (res.ok) {
        showToast("contact_sent");
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        throw new Error();
      }
    } catch (err) {
      showToast("contact_error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrage des projets
  const filteredProjects = selectedCategory === "all" ? data.projects : data.projects.filter(p => p.category === selectedCategory);

  // Filtrage des dépôts GitHub réels
  const repoDescription = repo => Object.hasOwn(t.repos.descriptions, repo.name) ? t.repos.descriptions[repo.name] : repo.description;
  const filteredGithubRepos = githubRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(repoSearchQuery.toLowerCase()) || repoDescription(repo)?.toLowerCase().includes(repoSearchQuery.toLowerCase());
    const matchesLang = repoLanguageFilter === "all" || repo.language && repo.language.toLowerCase() === repoLanguageFilter.toLowerCase();
    return matchesSearch && matchesLang;
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 glass border-b border-slate-200/60 dark:border-slate-800/80 transition-colors"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden ring-2 ring-blue-500/40 shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0 bg-slate-200 dark:bg-slate-800"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.profile.avatar || "/img/walid.jpg",
    alt: data.profile.name,
    className: "w-full h-full object-cover object-top"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col shrink-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold tracking-tight text-base sm:text-lg text-slate-900 dark:text-white leading-tight whitespace-nowrap"
  }, data.profile.name), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold whitespace-nowrap"
  }, t.hero.header_role))), /*#__PURE__*/React.createElement("nav", {
    className: "hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-medium shrink-0"
  }, t.nav_items.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.anchor,
    href: `#${item.anchor}`,
    className: item.anchor === "sap-workflow" ? "flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all whitespace-nowrap" : "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
  }, item.anchor === "sap-workflow" && /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-blue-600 animate-ping"
  }), item.label))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 sm:gap-2 shrink-0"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    title: t.navigation.linkedin,
    className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/60 text-[#0A66C2] dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all shrink-0"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-4 h-4 sm:w-4.5 sm:h-4.5"
  })), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    title: t.navigation.github,
    className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shrink-0"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-4 h-4 sm:w-4.5 sm:h-4.5"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCvModalOpen(true),
    title: t.navigation.resume,
    className: "hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm shadow-blue-500/25 hover:opacity-95 hover:scale-105 transition-all shrink-0 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.nav.resume)), /*#__PURE__*/React.createElement("button", {
    onClick: toggleLang,
    title: t.navigation.language_toggle,
    className: "inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-black bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all shrink-0 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "languages",
    className: "w-3.5 h-3.5 text-blue-600 dark:text-blue-400"
  }), /*#__PURE__*/React.createElement("span", null, isEn ? "EN" : "FR")), /*#__PURE__*/React.createElement("button", {
    onClick: toggleTheme,
    "aria-label": t.navigation.theme,
    className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: isDarkMode ? "sun" : "moon",
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
    "aria-label": t.navigation.menu,
    className: "lg:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: mobileMenuOpen ? "x" : "menu",
    className: "w-5 h-5"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "h-[2px] w-full bg-transparent overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-pink-500 transition-[width] duration-150 ease-out",
    style: {
      width: `${scrollProgress}%`
    }
  })), mobileMenuOpen && /*#__PURE__*/React.createElement("div", {
    className: "lg:hidden px-4 pt-3 pb-6 glass border-b border-slate-200 dark:border-slate-800 flex flex-col gap-2 max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-fade-in shadow-2xl"
  }, t.nav_items.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.anchor,
    href: `#${item.anchor}`,
    onClick: () => setMobileMenuOpen(false),
    className: `px-3.5 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${item.anchor === "sap-workflow" ? "text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40" : "hover:bg-slate-100 dark:hover:bg-slate-800"}`
  }, item.label, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon,
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("button", {
    onClick: toggleLang,
    className: "px-3.5 py-2.5 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "languages",
    className: "w-4 h-4 text-blue-500"
  }), /*#__PURE__*/React.createElement("span", null, t.navigation.language)), /*#__PURE__*/React.createElement("span", {
    className: "font-black px-2 py-0.5 rounded bg-blue-600 text-white"
  }, isEn ? "EN" : "FR")), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex-1 py-2.5 text-center rounded-xl text-xs font-bold bg-[#0A66C2] text-white flex items-center justify-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.common.linkedin)), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "flex-1 py-2.5 text-center rounded-xl text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.common.github)), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setMobileMenuOpen(false);
      setCvModalOpen(true);
    },
    className: "flex-1 py-2.5 text-center rounded-xl text-xs font-bold bg-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.nav.resume))))), /*#__PURE__*/React.createElement("section", {
    id: "hero",
    className: "relative pt-14 pb-20 md:pt-20 md:pb-24 overflow-hidden bg-grid-pattern"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -top-40 left-1/2 -translate-x-1/2 w-[780px] h-[440px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 blur-[130px] rounded-full pointer-events-none -z-10"
  }), /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left order-2 lg:order-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 mb-5 animate-float shadow-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping"
  }), /*#__PURE__*/React.createElement("span", null, tr(data.profile, "availability") || t.hero.badge)), /*#__PURE__*/React.createElement("h1", {
    className: "text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] mb-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name-shimmer"
  }, data.profile.name)), /*#__PURE__*/React.createElement("div", {
    className: "inline-block px-4 sm:px-5 py-2 rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950/60 dark:via-indigo-950/60 dark:to-purple-950/60 text-blue-900 dark:text-blue-200 font-extrabold text-sm sm:text-base md:text-xl mb-5 shadow-sm border border-blue-200/50 dark:border-blue-800/50 max-w-full"
  }, tr(data.profile, "title")), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base md:text-lg font-normal text-slate-600 dark:text-slate-300 max-w-2xl mb-6 leading-relaxed"
  }, tr(data.profile, "bio")), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs sm:text-sm mb-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    className: "w-3.5 h-3.5 text-rose-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, profileLocation)), /*#__PURE__*/React.createElement("a", {
    href: `tel:${data.profile.phone}`,
    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    className: "w-3.5 h-3.5 text-emerald-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, data.profile.phone)), /*#__PURE__*/React.createElement("a", {
    href: `mailto:${data.profile.email}`,
    className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    className: "w-3.5 h-3.5 text-blue-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, data.profile.email))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-3 w-full"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setCvModalOpen(true),
    className: "w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 btn-magnetic flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    className: "w-4 h-4 sm:w-5 sm:h-5"
  }), /*#__PURE__*/React.createElement("span", null, t.hero.view_resume)), /*#__PURE__*/React.createElement("a", {
    href: "#projects",
    className: "w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-4 h-4 sm:w-5 sm:h-5"
  }), /*#__PURE__*/React.createElement("span", null, t.hero.explore_projects, " (", data.projects.length, ")")), /*#__PURE__*/React.createElement("a", {
    href: "#contact",
    className: "w-full sm:w-auto px-5 py-3.5 rounded-2xl text-sm sm:text-base font-semibold glass hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-100 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    className: "w-4 h-4 sm:w-5 sm:h-5 text-blue-500"
  }), /*#__PURE__*/React.createElement("span", null, t.nav.contact)))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 flex flex-col items-center justify-center order-1 lg:order-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -inset-2 bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 rounded-full blur-xl opacity-65 group-hover:opacity-95 transition duration-500 animate-pulse-glow"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full p-2 bg-white dark:bg-slate-900 shadow-2xl ring-4 ring-blue-500/20 overflow-hidden"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.profile.avatar || "/img/walid.jpg",
    alt: data.profile.name,
    className: "w-full h-full object-cover object-top rounded-full group-hover:scale-105 transition-transform duration-500"
  })), /*#__PURE__*/React.createElement("div", {
    className: "absolute bottom-3 right-5 w-5 h-5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full shadow-md",
    title: tr(data.profile, "availability") || t.hero.badge
  }), /*#__PURE__*/React.createElement("a", {
    href: "#sap-workflow",
    className: "hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl glass border border-blue-200/80 dark:border-blue-800/80 shadow-xl absolute -left-8 top-8 animate-float text-xs font-extrabold text-slate-900 dark:text-white hover:scale-105 transition-transform"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-6 h-6 rounded-lg bg-blue-600 text-white flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "wrench",
    className: "w-3.5 h-3.5"
  })), /*#__PURE__*/React.createElement("span", null, "SAP S/4HANA")), /*#__PURE__*/React.createElement("a", {
    href: "#skills",
    className: "hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl glass border border-indigo-200/80 dark:border-indigo-800/80 shadow-xl absolute -right-6 bottom-12 animate-float text-xs font-extrabold text-slate-900 dark:text-white hover:scale-105 transition-transform",
    style: {
      animationDelay: "1.2s"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-6 h-6 rounded-lg bg-indigo-600 text-white flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "code-2",
    className: "w-3.5 h-3.5"
  })), /*#__PURE__*/React.createElement("span", null, "Full-Stack"))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-14 stagger-children"
  }, (t.hero.highlights || []).map((item, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "reveal p-4 sm:p-5 rounded-2xl glass border border-slate-200/70 dark:border-slate-800/80 flex items-center gap-3.5 card-hover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-slate-100 dark:bg-slate-800/80 flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: item.icon,
    className: `w-5 h-5 ${item.color}`
  })), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("span", {
    className: "block text-sm sm:text-base font-extrabold text-slate-900 dark:text-white truncate"
  }, item.value), /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate"
  }, item.label))))))), /*#__PURE__*/React.createElement("section", {
    id: "experience",
    className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block"
  }, t.experience.badge), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.experience.title), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-slate-600 dark:text-slate-400"
  }, t.experience.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "relative md:pl-8 space-y-8 stagger-children"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hidden md:block absolute left-3 top-4 bottom-4 w-0.5 bg-gradient-to-b from-blue-500 via-indigo-500/50 to-transparent"
  }), data.experiences.map((exp, idx) => /*#__PURE__*/React.createElement("div", {
    key: exp.id || idx,
    className: "reveal-left relative p-7 sm:p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 card-hover transition-all"
  }, /*#__PURE__*/React.createElement("span", {
    className: `hidden md:block absolute -left-[26px] top-9 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 shadow-sm ${idx === 0 ? "bg-blue-600 timeline-dot-ping" : "bg-slate-400 dark:bg-slate-600"}`
  }), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, tr(exp, "role")), /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600 dark:text-blue-400 font-extrabold"
  }, "@ ", exp.company))), /*#__PURE__*/React.createElement("span", {
    className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-fit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, experiencePeriod(exp)))), /*#__PURE__*/React.createElement("p", {
    className: "text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic"
  }, tr(exp, "description")), /*#__PURE__*/React.createElement("ul", {
    className: "space-y-3"
  }, trList(exp, "bullets").map((bullet, bIdx) => /*#__PURE__*/React.createElement("li", {
    key: bIdx,
    className: "flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    className: "w-3.5 h-3.5"
  })), /*#__PURE__*/React.createElement("span", null, bullet))))))))), /*#__PURE__*/React.createElement("section", {
    id: "sap-workflow",
    className: "py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-14"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.sap.badge)), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.sap.title), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-slate-600 dark:text-slate-400 text-sm sm:text-base"
  }, t.sap.subtitle), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center gap-2 mt-8"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedSapModule("all"),
    className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${selectedSapModule === "all" ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-md" : "glass hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"}`
  }, t.sap.all_modules, " (", sapModules.length, ")"), sapModules.map(m => {
    const isActive = selectedSapModule === m.id;
    const mTitle = tr(m, "title");
    return /*#__PURE__*/React.createElement("button", {
      key: m.id,
      onClick: () => setSelectedSapModule(m.id),
      className: `px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 ${isActive ? m.color === "blue" ? "bg-blue-600 text-white shadow-md shadow-blue-500/20" : m.color === "indigo" ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20" : "bg-emerald-600 text-white shadow-md shadow-emerald-500/20" : "glass hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300"}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.icon,
      className: "w-3.5 h-3.5"
    }), /*#__PURE__*/React.createElement("span", null, m.code, " - ", mTitle));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 stagger-children"
  }, sapModules.filter(m => selectedSapModule === "all" || selectedSapModule === m.id).map(mod => {
    const isBlue = mod.color === "blue";
    const isIndigo = mod.color === "indigo";
    const badgeBg = isBlue ? "bg-blue-600 text-white" : isIndigo ? "bg-indigo-600 text-white" : "bg-emerald-600 text-white";
    const cardBorder = isBlue ? "hover:border-blue-500/50" : isIndigo ? "hover:border-indigo-500/50" : "hover:border-emerald-500/50";
    const iconBox = isBlue ? "bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-900" : isIndigo ? "bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-900" : "bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-900";
    const modTitle = tr(mod, "title");
    const modSummary = tr(mod, "summary");
    const orionItems = trList(mod, "orion");
    const acgItems = trList(mod, "acg");
    return /*#__PURE__*/React.createElement("div", {
      key: mod.id,
      className: `fade-in p-6 sm:p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-slate-900/5 hover:-translate-y-1 ${cardBorder}`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-3"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-11 h-11 rounded-2xl flex items-center justify-center border shrink-0 ${iconBox}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: mod.icon,
      className: "w-5 h-5"
    })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
      className: `text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md ${badgeBg}`
    }, t.sap.module_prefix, " ", mod.code), /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-extrabold text-slate-900 dark:text-white mt-1 leading-snug"
    }, modTitle)))), /*#__PURE__*/React.createElement("p", {
      className: "text-xs sm:text-sm text-slate-600 dark:text-slate-300 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 mb-6 leading-relaxed"
    }, modSummary), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2.5 mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full bg-blue-500"
    }), /*#__PURE__*/React.createElement("span", null, t.sap.role_orion)), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2 pl-2"
    }, orionItems.map((item, idx) => /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: "flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5"
    }), /*#__PURE__*/React.createElement("span", null, item))))), /*#__PURE__*/React.createElement("div", {
      className: "space-y-2.5 pt-4 border-t border-slate-200/60 dark:border-slate-800/60"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider"
    }, /*#__PURE__*/React.createElement("span", {
      className: "w-2 h-2 rounded-full bg-emerald-500"
    }), /*#__PURE__*/React.createElement("span", null, t.sap.role_acg)), /*#__PURE__*/React.createElement("ul", {
      className: "space-y-2 pl-2"
    }, acgItems.map((item, idx) => /*#__PURE__*/React.createElement("li", {
      key: idx,
      className: "flex items-start gap-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      className: "w-4 h-4 text-emerald-500 shrink-0 mt-0.5"
    }), /*#__PURE__*/React.createElement("span", null, item)))))));
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-6 sm:p-8 rounded-3xl glass border border-blue-500/30 shadow-2xl space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200/70 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-merge",
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-sm sm:text-base font-extrabold text-slate-900 dark:text-white"
  }, t.sap.flow_title), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, t.sap.flow_subtitle))), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 self-start sm:self-auto"
  }, t.sap.flow_badge)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative stagger-children"
  }, sapFlow.map((step, idx) => {
    const stepLabel = tr(step, "label");
    const stepNote = tr(step, "note");
    const stepNumber = step.step_number || (idx < 9 ? `0${idx + 1}` : `${idx + 1}`);
    return /*#__PURE__*/React.createElement("div", {
      key: step.id || idx,
      className: "reveal p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between relative group hover:border-blue-500/50 transition-all shadow-sm"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-black px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-mono"
    }, stepNumber), idx < sapFlow.length - 1 && /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      className: "w-3.5 h-3.5 text-slate-400 hidden lg:block"
    })), /*#__PURE__*/React.createElement("h5", {
      className: "text-sm font-bold text-slate-900 dark:text-white"
    }, stepLabel), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug"
    }, stepNote)));
  }))))), /*#__PURE__*/React.createElement("section", {
    id: "skills",
    className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block"
  }, t.skills.badge), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.skills.title)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children"
  }, t.skill_groups.map(group => {
    const items = data.skills.filter(skill => skill.category === group.category);
    return /*#__PURE__*/React.createElement("div", {
      key: group.category,
      className: `reveal-scale p-7 rounded-3xl glass border card-hover flex flex-col ${group.frame}`
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-5"
    }, /*#__PURE__*/React.createElement("div", {
      className: `w-12 h-12 rounded-2xl flex items-center justify-center ${group.badge}`
    }, /*#__PURE__*/React.createElement(Icon, {
      name: group.icon,
      className: "w-6 h-6"
    })), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
    }, items.length)), /*#__PURE__*/React.createElement("h3", {
      className: "text-lg font-bold text-slate-900 dark:text-white mb-4"
    }, group.label), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-2"
    }, items.map(skill => /*#__PURE__*/React.createElement("span", {
      key: skill.name,
      className: `px-3 py-1.5 rounded-xl text-xs font-semibold transition-transform hover:scale-105 ${group.pill}`
    }, skillName(skill)))));
  })))), /*#__PURE__*/React.createElement("section", {
    id: "projects",
    className: "py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "layers",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.projects.badge)), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.projects.title), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-slate-600 dark:text-slate-400"
  }, t.portfolio.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap justify-center items-center gap-2 mb-12"
  }, t.project_filters.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat.id,
    onClick: () => setSelectedCategory(cat.id),
    className: `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat.id ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"}`
  }, cat.label, cat.id === "all" && ` (${data.projects.length})`))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-8"
  }, filteredProjects.map((p, idx) => {
    const projectCaseStudy = tr(p, "case_study");
    return /*#__PURE__*/React.createElement("article", {
      key: p.id || idx,
      className: "fade-in card-hover rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 flex flex-col group"
    }, /*#__PURE__*/React.createElement("div", {
      className: "relative h-60 overflow-hidden bg-slate-900"
    }, /*#__PURE__*/React.createElement("img", {
      src: p.image,
      alt: tr(p, "title"),
      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
      loading: "lazy"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
    }), /*#__PURE__*/React.createElement("div", {
      className: "absolute top-4 left-4 flex flex-wrap gap-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md bg-blue-600/90 text-white shadow-sm"
    }, tr(p, "category_label") || p.category), projectCaseStudy && /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-bold px-2.5 py-1.5 rounded-xl backdrop-blur-md bg-amber-500/90 text-white flex items-center gap-1 shadow-sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      className: "w-3 h-3"
    }), /*#__PURE__*/React.createElement("span", null, t.portfolio.case_study)))), /*#__PURE__*/React.createElement("div", {
      className: "p-7 flex-1 flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
      className: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors"
    }, tr(p, "title")), tr(p, "tagline") && /*#__PURE__*/React.createElement("p", {
      className: "text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 italic"
    }, "\"", tr(p, "tagline"), "\""), /*#__PURE__*/React.createElement("p", {
      className: "text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6"
    }, tr(p, "description")), projectCaseStudy?.kpis?.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40"
    }, projectCaseStudy.kpis.map((kpi, kIdx) => /*#__PURE__*/React.createElement("div", {
      key: kIdx,
      className: "text-center"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-black text-blue-600 dark:text-blue-400 block"
    }, tr(kpi, "value")), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] text-slate-500 dark:text-slate-400 block truncate"
    }, tr(kpi, "label"))))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap gap-1.5 mb-6"
    }, (p.tags || []).slice(0, 6).map((tag, tIdx) => /*#__PURE__*/React.createElement("span", {
      key: tIdx,
      className: "text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300"
    }, tag)))), /*#__PURE__*/React.createElement("div", {
      className: "flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-200/60 dark:border-slate-800"
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setSelectedProjectModal(p),
      className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "sparkles",
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, t.portfolio.detail)), /*#__PURE__*/React.createElement("a", {
      href: p.github_url,
      target: "_blank",
      rel: "noopener noreferrer",
      className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all"
    }, /*#__PURE__*/React.createElement(GitHubIcon, {
      className: "w-4 h-4"
    }), /*#__PURE__*/React.createElement("span", null, t.portfolio.code), /*#__PURE__*/React.createElement(Icon, {
      name: "external-link",
      className: "w-3 h-3 opacity-60"
    })))));
  })))), /*#__PURE__*/React.createElement("section", {
    id: "github-explorer",
    className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-12"
  }, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 mb-3"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.repos.badge)), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.repos.title), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-slate-600 dark:text-slate-400"
  }, t.repos.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "max-w-3xl mx-auto mb-10 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    className: "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: repoSearchQuery,
    onChange: e => setRepoSearchQuery(e.target.value),
    placeholder: t.repos.search,
    className: "w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
  }), repoSearchQuery && /*#__PURE__*/React.createElement("button", {
    onClick: () => setRepoSearchQuery(""),
    className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 sm:gap-2 justify-center shrink-0"
  }, t.repo_filters.map(lang => /*#__PURE__*/React.createElement("button", {
    key: lang.id,
    onClick: () => setRepoLanguageFilter(lang.id),
    className: `px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${repoLanguageFilter === lang.id ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "glass text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50"}`
  }, lang.label)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
  }, filteredGithubRepos.slice(0, 9).map((repo, rIdx) => /*#__PURE__*/React.createElement("a", {
    key: rIdx,
    href: repo.html_url || `https://github.com/Waliddjla/${repo.name}`,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "fade-in p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 flex flex-col justify-between card-hover group transition-all"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "folder-git-2",
    className: "w-4 h-4"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
  }, repo.language || t.repos.untagged)), /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2"
  }, repo.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4"
  }, repoDescription(repo) || t.repos.description)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("span", {
    className: "flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400"
  }, /*#__PURE__*/React.createElement("span", null, t.repos.open), /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
  })), /*#__PURE__*/React.createElement("span", null, "@Waliddjla"))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-12 text-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://github.com/Waliddjla",
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-95 shadow-md shadow-slate-900/10 hover:scale-105 transition-all"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.repos.all), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    className: "w-4 h-4"
  }))))), /*#__PURE__*/React.createElement("section", {
    id: "education",
    className: "py-24"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block"
  }, t.education.badge), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.education.title)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children"
  }, data.education.map((edu, idx) => /*#__PURE__*/React.createElement("div", {
    key: edu.id || idx,
    className: "reveal-scale p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col card-hover"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "graduation-cap",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-blue-600 dark:text-blue-400 mb-1"
  }, edu.period), /*#__PURE__*/React.createElement("h3", {
    className: "text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug"
  }, tr(edu, "degree")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3"
  }, edu.institution), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 dark:text-slate-300 mt-auto leading-relaxed"
  }, tr(edu, "details"))))))), /*#__PURE__*/React.createElement("section", {
    id: "contact",
    className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
  }, /*#__PURE__*/React.createElement("div", {
    className: "reveal text-center max-w-3xl mx-auto mb-16"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block"
  }, t.contact.badge), /*#__PURE__*/React.createElement("h2", {
    className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight"
  }, t.contact.title), /*#__PURE__*/React.createElement("p", {
    className: "mt-3 text-slate-600 dark:text-slate-400"
  }, t.contact.subtitle)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
  }, /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-5 space-y-4"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-6 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/80 flex items-center justify-between card-hover group transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-md"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
  }, t.common.linkedin_profile), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-700 dark:text-blue-300 font-medium"
  }, "/in/waliddjellali"))), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    className: "w-5 h-5 text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
  })), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "p-6 rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 flex items-center justify-between card-hover group transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-md"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-6 h-6"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors"
  }, t.common.github_repositories), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-600 dark:text-slate-300 font-medium"
  }, "@Waliddjla"))), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right",
    className: "w-5 h-5 text-slate-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
  })), /*#__PURE__*/React.createElement("div", {
    className: "p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "map-pin",
    className: "w-4 h-4 text-rose-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, profileLocation)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail",
    className: "w-4 h-4 text-blue-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, data.profile.email)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "phone",
    className: "w-4 h-4 text-emerald-500 shrink-0"
  }), /*#__PURE__*/React.createElement("span", null, data.profile.phone)))), /*#__PURE__*/React.createElement("div", {
    className: "lg:col-span-7"
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: handleFormSubmit,
    className: "p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
  }, t.contact.name), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    value: formState.name,
    onChange: e => setFormState({
      ...formState,
      name: e.target.value
    }),
    placeholder: t.contact.name_placeholder,
    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
  }, t.contact.email), /*#__PURE__*/React.createElement("input", {
    type: "email",
    required: true,
    value: formState.email,
    onChange: e => setFormState({
      ...formState,
      email: e.target.value
    }),
    placeholder: t.contact.email_placeholder,
    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
  }, t.contact.subject), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: formState.subject,
    onChange: e => setFormState({
      ...formState,
      subject: e.target.value
    }),
    placeholder: t.contact.subject_placeholder,
    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5"
  }, t.contact.message), /*#__PURE__*/React.createElement("textarea", {
    rows: 4,
    required: true,
    value: formState.message,
    onChange: e => setFormState({
      ...formState,
      message: e.target.value
    }),
    placeholder: t.contact.message_placeholder,
    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "w-full py-3.5 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, isSubmitting ? t.contact.sending : t.contact.send))))))), /*#__PURE__*/React.createElement("footer", {
    className: "border-t border-slate-200 dark:border-slate-800 py-12 bg-white/40 dark:bg-slate-950/40"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl overflow-hidden ring-1 ring-blue-500/40 shadow-md shadow-blue-500/20 shrink-0 bg-slate-200 dark:bg-slate-800"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.profile.avatar || "/img/walid.jpg",
    alt: data.profile.name,
    className: "w-full h-full object-cover object-top"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-slate-900 dark:text-white block text-sm"
  }, data.profile.name), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, "© ", new Date().getFullYear(), " Walid Djellali. ", t.common.copyright))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600 dark:text-slate-400"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors font-medium"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-4 h-4 text-[#0A66C2]"
  }), /*#__PURE__*/React.createElement("span", null, t.common.linkedin)), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors font-medium"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.common.github)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCvModalOpen(true),
    className: "hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors font-medium"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "file-text",
    className: "w-4 h-4 text-indigo-500"
  }), /*#__PURE__*/React.createElement("span", null, t.common.resume)), /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    className: "hover:text-blue-600 flex items-center gap-1 transition-colors font-medium"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.common.top))))), selectedProjectModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300"
  }, tr(selectedProjectModal, "category_label") || selectedProjectModal.category), caseStudy && /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "award",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.certified))), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
  }, tr(selectedProjectModal, "title")), tr(selectedProjectModal, "tagline") && /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1"
  }, tr(selectedProjectModal, "tagline"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, languageToggle, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": t.common.close,
    onClick: () => setSelectedProjectModal(null),
    className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all shrink-0"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto pr-1 sm:pr-2 py-4 space-y-6 text-sm text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-900"
  }, /*#__PURE__*/React.createElement("img", {
    src: selectedProjectModal.image,
    alt: tr(selectedProjectModal, "title"),
    className: "w-full h-full object-cover"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-white font-medium drop-shadow-md"
  }, tr(selectedProjectModal, "description")))), caseStudy && caseStudy.kpis && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trending-up",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.kpis)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3"
  }, (caseStudy.kpis || []).map((kpi, kIdx) => /*#__PURE__*/React.createElement("div", {
    key: kIdx,
    className: "p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: kpi.icon || "activity",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-lg font-black text-slate-900 dark:text-white block"
  }, tr(kpi, "value")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, tr(kpi, "label"))))))), caseStudy && /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, t.modal.client), " ", caseStudy.client), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, t.modal.role), " ", caseStudy.role), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", null, t.modal.period), " ", caseStudy.period)), /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white pt-1"
  }, t.modal.context), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm leading-relaxed"
  }, caseStudy.context)), caseStudy && caseStudy.architecture && /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "cpu",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.architecture)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm leading-relaxed"
  }, caseStudy.architecture)), modalFeatures && modalFeatures.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2",
    className: "w-4 h-4 text-emerald-500"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.features)), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5"
  }, modalFeatures.map((feat, fIdx) => /*#__PURE__*/React.createElement("div", {
    key: fIdx,
    className: "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5"
  }), /*#__PURE__*/React.createElement("span", null, feat))))), caseStudy && caseStudy.challenges && /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-circle",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.challenges)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-2"
  }, caseStudy.challenges.map((chal, cIdx) => /*#__PURE__*/React.createElement("div", {
    key: cIdx,
    className: "p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm flex items-start gap-2.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5"
  }, cIdx + 1), /*#__PURE__*/React.createElement("span", null, chal)))), caseStudy.solution && /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement("strong", {
    className: "text-emerald-800 dark:text-emerald-300 block mb-1"
  }, t.modal.solution), /*#__PURE__*/React.createElement("p", null, caseStudy.solution))), caseStudy && caseStudy.impact && /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-2xl bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-800 space-y-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "zap",
    className: "w-4 h-4 text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.impact)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm leading-relaxed text-slate-200"
  }, caseStudy.impact)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2"
  }, t.modal.technologies), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5"
  }, (selectedProjectModal.tags || []).map((tag, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold"
  }, tag))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: selectedProjectModal.github_url,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.modal.source), /*#__PURE__*/React.createElement(Icon, {
    name: "external-link",
    className: "w-3.5 h-3.5 opacity-60"
  })), /*#__PURE__*/React.createElement("button", {
    onClick: () => setSelectedProjectModal(null),
    className: "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
  }, t.common.close)))), adminModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "w-5 h-5"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("span", null, t.admin.title), isAdminAuth && /*#__PURE__*/React.createElement("span", {
    className: "text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold"
  }, t.admin.online)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, t.admin.subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, isAdminAuth && /*#__PURE__*/React.createElement("button", {
    onClick: handleAdminLogout,
    title: t.admin.logout,
    className: "px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.lock)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, languageToggle, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": t.common.close,
    onClick: closeAdminModal,
    className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))))), !isAdminAuth ? /*#__PURE__*/React.createElement("div", {
    className: "flex-1 flex flex-col items-center justify-center py-10 px-4 text-center max-w-md mx-auto"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/10"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    className: "w-8 h-8"
  })), /*#__PURE__*/React.createElement("h4", {
    className: "text-xl font-bold text-slate-900 dark:text-white mb-2"
  }, t.admin.private), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6"
  }, t.admin.instructions), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleAdminLogin,
    className: "w-full space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "password",
    autoFocus: true,
    required: true,
    value: adminPinInput,
    onChange: e => setAdminPinInput(e.target.value),
    placeholder: t.admin.pin,
    className: "w-full text-center px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500 tracking-widest"
  }), adminPinError && /*#__PURE__*/React.createElement("p", {
    role: "alert",
    className: "text-xs font-semibold text-rose-500 mt-2"
  }, t.toasts[adminPinError])), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "w-full py-3.5 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.unlock)))) :
  /*#__PURE__*/
  /* Si AUTHENTIFIÉ : Dashboard avec Onglets */
  React.createElement("div", {
    className: "flex-1 flex flex-col min-h-0 pt-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0"
  }, [{
    id: "stats",
    label: t.admin.overview,
    icon: "activity"
  }, {
    id: "inbox",
    label: `${t.admin.inbox} (${messagesList.length})`,
    icon: "mail"
  }, {
    id: "profile",
    label: t.admin.profile_tab,
    icon: "user-cog"
  }, {
    id: "projects",
    label: `${t.admin.projects_tab} (${data.projects.length})`,
    icon: "folder-plus"
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setAdminTab(tab.id),
    className: `px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${adminTab === tab.id ? "bg-amber-500 text-white shadow-md shadow-amber-500/25" : "glass text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`
  }, /*#__PURE__*/React.createElement(Icon, {
    name: tab.icon,
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, tab.label)))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto py-5 pr-1 space-y-6"
  }, adminTab === "stats" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-6"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-4 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-600 dark:text-blue-400 font-bold block"
  }, t.admin.messages), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block"
  }, adminStats ? adminStats.messagesCount : messagesList.length)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-emerald-600 dark:text-emerald-400 font-bold block"
  }, t.admin.projects), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block"
  }, adminStats ? adminStats.projectsCount : data.projects.length)), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-purple-600 dark:text-purple-400 font-bold block"
  }, t.admin.db_size), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block"
  }, adminStats ? `${adminStats.dbSizeKb} ${t.admin.size_unit}` : "—")), /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-amber-600 dark:text-amber-400 font-bold block"
  }, t.admin.runtime), /*#__PURE__*/React.createElement("span", {
    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block"
  }, adminStats ? adminStats.nodeVersion : "v24"))), /*#__PURE__*/React.createElement("div", {
    className: "p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "radio",
    className: "w-4 h-4 text-emerald-500 animate-pulse"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.quick)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, t.admin.current, " ", /*#__PURE__*/React.createElement("strong", {
    className: "text-blue-600 dark:text-blue-400"
  }, tr(data.profile, "availability"))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-2 pt-1"
  }, availabilityOptions.map(st => /*#__PURE__*/React.createElement("button", {
    key: st.fr,
    onClick: () => handleQuickAvailabilityChange(st),
    className: "px-3.5 py-2 rounded-xl text-xs font-bold glass hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 transition-all"
  }, st[lang]))))), adminTab === "inbox" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white"
  }, t.admin.inbox, " (", messagesList.length, " ", t.admin.db_messages, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: fetchAdminData,
    className: "px-3 py-1.5 rounded-xl text-xs font-bold glass hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "refresh-cw",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.refresh))), messagesList.length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "p-8 text-center text-slate-500 text-xs"
  }, t.admin.empty_inbox) : messagesList.map(msg => /*#__PURE__*/React.createElement("div", {
    key: msg.id,
    className: `p-4 rounded-2xl border transition-all ${msg.read ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800" : "bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-900/60 shadow-sm"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between text-xs mb-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-900 dark:text-white"
  }, msg.name, " • ", /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600 dark:text-blue-400"
  }, msg.email)), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, msg.created_at || t.admin.recent)), /*#__PURE__*/React.createElement("h5", {
    className: "text-sm font-bold text-slate-800 dark:text-slate-100 mb-1"
  }, msg.subject), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 whitespace-pre-wrap"
  }, msg.message), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("a", {
    href: `mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || t.admin.reply_subject)}`,
    className: "px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "reply",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.reply)), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleToggleMessageRead(msg.id, msg.read),
    className: "px-3 py-1 rounded-lg glass text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-semibold"
  }, msg.read ? t.admin.mark_unread : t.admin.mark_read)), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteMessage(msg.id),
    className: "px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 font-bold flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, t.common.delete)))))), adminTab === "profile" && /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveProfile,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-title-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.profile_title, " (FR)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-title-fr",
    lang: "fr",
    type: "text",
    value: editingProfileForm.title,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      title: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-title-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.profile_title, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-title-en",
    lang: "en",
    type: "text",
    value: editingProfileForm.title_en,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      title_en: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-availability-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.availability, " (FR)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-availability-fr",
    lang: "fr",
    type: "text",
    value: editingProfileForm.availability,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      availability: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-availability-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.availability, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-availability-en",
    lang: "en",
    type: "text",
    value: editingProfileForm.availability_en,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      availability_en: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.phone), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: editingProfileForm.phone,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      phone: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.email), /*#__PURE__*/React.createElement("input", {
    type: "email",
    value: editingProfileForm.email,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      email: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-location-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.location, " (FR)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-location-fr",
    lang: "fr",
    type: "text",
    value: editingProfileForm.location,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      location: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-location-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.location, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-location-en",
    lang: "en",
    type: "text",
    value: editingProfileForm.location_en,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      location_en: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-avatar",
    className: "block text-xs font-bold mb-1"
  }, t.admin.avatar_url), /*#__PURE__*/React.createElement("input", {
    id: "editingProfileForm-avatar",
    type: "text",
    value: editingProfileForm.avatar,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      avatar: e.target.value
    }),
    placeholder: "/img/walid.jpg",
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-bio-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.bio, " (FR)"), /*#__PURE__*/React.createElement("textarea", {
    id: "editingProfileForm-bio-fr",
    lang: "fr",
    rows: 4,
    value: editingProfileForm.bio,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      bio: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "editingProfileForm-bio-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.bio, " (EN)"), /*#__PURE__*/React.createElement("textarea", {
    id: "editingProfileForm-bio-en",
    lang: "en",
    rows: 4,
    value: editingProfileForm.bio_en,
    onChange: e => setEditingProfileForm({
      ...editingProfileForm,
      bio_en: e.target.value
    }),
    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
  })), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "save",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.save_profile))), adminTab === "projects" && /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-2"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white"
  }, t.admin.catalog, " (", data.projects.length, ")"), /*#__PURE__*/React.createElement("button", {
    onClick: openNewProjectForm,
    className: "px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.add_project))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3"
  }, data.projects.map((p, idx) => /*#__PURE__*/React.createElement("div", {
    key: p.id || idx,
    className: "p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3 min-w-0"
  }, /*#__PURE__*/React.createElement("img", {
    src: p.image,
    className: "w-12 h-12 rounded-xl object-cover shrink-0",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "min-w-0"
  }, /*#__PURE__*/React.createElement("h5", {
    className: "text-sm font-bold text-slate-900 dark:text-white truncate"
  }, tr(p, "title")), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-blue-600 dark:text-blue-400 font-semibold"
  }, tr(p, "category_label") || p.category))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEditProjectForm(p),
    className: "px-3 py-1.5 rounded-xl text-xs font-bold glass hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit-3",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, t.common.edit)), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteProject(p.id, tr(p, "title")),
    className: "px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2",
    className: "w-3 h-3"
  }), /*#__PURE__*/React.createElement("span", null, t.common.delete))))))))))), projectFormModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4 shrink-0"
  }, /*#__PURE__*/React.createElement("h4", {
    className: "text-base font-bold text-slate-900 dark:text-white"
  }, editingProject ? `${t.admin.edit_project}: ${tr(editingProject, "title")}` : t.admin.new_project), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, languageToggle, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": t.common.close,
    onClick: () => setProjectFormModalOpen(false),
    className: "w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  })))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveProjectForm,
    className: "flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-title-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.project_title, " (FR) *"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-title-fr",
    lang: "fr",
    type: "text",
    required: true,
    value: projectFormData.title,
    onChange: e => setProjectFormData({
      ...projectFormData,
      title: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-title-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.project_title, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-title-en",
    lang: "en",
    type: "text",
    value: projectFormData.title_en,
    onChange: e => setProjectFormData({
      ...projectFormData,
      title_en: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.category), /*#__PURE__*/React.createElement("select", {
    value: projectFormData.category,
    onChange: e => setProjectFormData({
      ...projectFormData,
      category: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  }, t.project_filters.filter(category => category.id !== "all").map(category => /*#__PURE__*/React.createElement("option", {
    key: category.id,
    value: category.id
  }, category.label)))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-category_label-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.category_label, " (FR)"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-category_label-fr",
    lang: "fr",
    type: "text",
    value: projectFormData.category_label,
    onChange: e => setProjectFormData({
      ...projectFormData,
      category_label: e.target.value
    }),
    placeholder: t.admin.category_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-category_label-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.category_label, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-category_label-en",
    lang: "en",
    type: "text",
    value: projectFormData.category_label_en,
    onChange: e => setProjectFormData({
      ...projectFormData,
      category_label_en: e.target.value
    }),
    placeholder: t.admin.category_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-tagline-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.tagline, " (FR)"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-tagline-fr",
    lang: "fr",
    type: "text",
    value: projectFormData.tagline,
    onChange: e => setProjectFormData({
      ...projectFormData,
      tagline: e.target.value
    }),
    placeholder: t.admin.tagline_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-tagline-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.tagline, " (EN)"), /*#__PURE__*/React.createElement("input", {
    id: "projectFormData-tagline-en",
    lang: "en",
    type: "text",
    value: projectFormData.tagline_en,
    onChange: e => setProjectFormData({
      ...projectFormData,
      tagline_en: e.target.value
    }),
    placeholder: t.admin.tagline_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-description-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.description, " (FR)"), /*#__PURE__*/React.createElement("textarea", {
    id: "projectFormData-description-fr",
    lang: "fr",
    rows: 2,
    value: projectFormData.description,
    onChange: e => setProjectFormData({
      ...projectFormData,
      description: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-description-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.description, " (EN)"), /*#__PURE__*/React.createElement("textarea", {
    id: "projectFormData-description-en",
    lang: "en",
    rows: 2,
    value: projectFormData.description_en,
    onChange: e => setProjectFormData({
      ...projectFormData,
      description_en: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.image), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: projectFormData.image,
    onChange: e => setProjectFormData({
      ...projectFormData,
      image: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.github_link), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: projectFormData.github_url,
    onChange: e => setProjectFormData({
      ...projectFormData,
      github_url: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.demo_link), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: projectFormData.demo_url,
    onChange: e => setProjectFormData({
      ...projectFormData,
      demo_url: e.target.value
    }),
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.admin.tags), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: projectFormData.tags,
    onChange: e => setProjectFormData({
      ...projectFormData,
      tags: e.target.value
    }),
    placeholder: "React, Node.js, SQLite, Tailwind CSS",
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-features-fr",
    className: "block text-xs font-bold mb-1"
  }, t.admin.features, " (FR)"), /*#__PURE__*/React.createElement("textarea", {
    id: "projectFormData-features-fr",
    lang: "fr",
    rows: 3,
    value: projectFormData.features,
    onChange: e => setProjectFormData({
      ...projectFormData,
      features: e.target.value
    }),
    placeholder: t.admin.features_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    htmlFor: "projectFormData-features-en",
    className: "block text-xs font-bold mb-1"
  }, t.admin.features, " (EN)"), /*#__PURE__*/React.createElement("textarea", {
    id: "projectFormData-features-en",
    lang: "en",
    rows: 3,
    value: projectFormData.features_en,
    onChange: e => setProjectFormData({
      ...projectFormData,
      features_en: e.target.value
    }),
    placeholder: t.admin.features_example,
    className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
  })), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setProjectFormModalOpen(false),
    className: "px-4 py-2 rounded-xl font-bold glass"
  }, t.common.cancel), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25"
  }, t.admin.save))))), cvModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/25"
  }, "CV"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-extrabold text-slate-900 dark:text-white"
  }, t.cv.title, " — ", data.profile.name), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, t.cv.subtitle))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => window.print(),
    className: "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "printer",
    className: "w-4 h-4"
  }), /*#__PURE__*/React.createElement("span", null, t.cv.print)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 shrink-0"
  }, languageToggle, /*#__PURE__*/React.createElement("button", {
    type: "button",
    "aria-label": t.common.close,
    onClick: () => setCvModalOpen(false),
    className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x",
    className: "w-4 h-4"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto pr-2 space-y-6 text-slate-800 dark:text-slate-200 text-sm cv-print-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-md shrink-0 bg-slate-200 dark:bg-slate-700"
  }, /*#__PURE__*/React.createElement("img", {
    src: data.profile.avatar || "/img/walid.jpg",
    alt: data.profile.name,
    className: "w-full h-full object-cover object-top"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    className: "text-2xl font-black text-slate-900 dark:text-white"
  }, data.profile.name), /*#__PURE__*/React.createElement("p", {
    className: "text-sm font-bold text-blue-600 dark:text-blue-400 mt-1"
  }, tr(data.profile, "title")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
  }, profileLocation, " • ", data.profile.phone, " • ", data.profile.email))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col gap-1.5 text-xs"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-[#0A66C2] dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "linkedin.com/in/waliddjellali")), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-slate-700 dark:text-slate-300 hover:underline flex items-center gap-1 font-semibold"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "github.com/Waliddjla")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2"
  }, t.cv.summary), /*#__PURE__*/React.createElement("p", {
    className: "text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300"
  }, tr(data.profile, "bio"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3"
  }, t.cv.experience), /*#__PURE__*/React.createElement("div", {
    className: "space-y-4"
  }, data.experiences.map((exp, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "border-l-2 border-blue-500 pl-4 py-0.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-900 dark:text-white"
  }, tr(exp, "role"), " — ", /*#__PURE__*/React.createElement("span", {
    className: "text-blue-600 dark:text-blue-400"
  }, exp.company)), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-500"
  }, experiencePeriod(exp))), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 dark:text-slate-400 italic mt-0.5 mb-1.5"
  }, tr(exp, "description")), /*#__PURE__*/React.createElement("ul", {
    className: "list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-300"
  }, trList(exp, "bullets").map((b, bIdx) => /*#__PURE__*/React.createElement("li", {
    key: bIdx
  }, b))))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2"
  }, t.cv.skills), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-wrap gap-1.5 text-xs"
  }, data.skills.map((s, idx) => /*#__PURE__*/React.createElement("span", {
    key: idx,
    className: "px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
  }, skillName(s))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", {
    className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2"
  }, t.cv.education), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-3 gap-3"
  }, data.education.map((edu, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    className: "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-blue-600 dark:text-blue-400 block"
  }, edu.period), /*#__PURE__*/React.createElement("strong", {
    className: "text-slate-900 dark:text-white block mt-0.5"
  }, tr(edu, "degree")), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-500 block"
  }, edu.institution)))))), /*#__PURE__*/React.createElement("div", {
    className: "pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500 shrink-0"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-3"
  }, /*#__PURE__*/React.createElement("a", {
    href: data.profile.linkedin,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "text-[#0A66C2] hover:underline flex items-center gap-1 font-semibold"
  }, /*#__PURE__*/React.createElement(LinkedInIcon, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, t.common.linkedin_profile)), /*#__PURE__*/React.createElement("span", null, "•"), /*#__PURE__*/React.createElement("a", {
    href: data.profile.github,
    target: "_blank",
    rel: "noopener noreferrer",
    className: "hover:underline flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement(GitHubIcon, {
    className: "w-3.5 h-3.5"
  }), /*#__PURE__*/React.createElement("span", null, "GitHub @Waliddjla"))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setCvModalOpen(false),
    className: "px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-all"
  }, t.common.close)))), showBackToTop && /*#__PURE__*/React.createElement("a", {
    href: "#hero",
    "aria-label": t.common.top,
    title: t.common.top,
    className: "fixed bottom-6 right-6 z-30 w-11 h-11 rounded-2xl glass border border-slate-200 dark:border-slate-700 shadow-lg flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:-translate-y-1 transition-all no-print"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up",
    className: "w-5 h-5"
  })), isAdminAuth && !adminModalOpen && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 left-6 z-40 flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-slate-900/95 dark:bg-slate-800/95 text-white border border-amber-500/40 shadow-xl backdrop-blur-md no-print animate-fade-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-2 h-2 rounded-full bg-emerald-400 animate-pulse"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: openAdminModal,
    className: "text-xs font-bold hover:text-amber-300 transition-colors flex items-center gap-1.5"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield",
    className: "w-3.5 h-3.5 text-amber-400"
  }), /*#__PURE__*/React.createElement("span", null, t.admin.session_badge)), /*#__PURE__*/React.createElement("button", {
    onClick: handleAdminLogout,
    title: t.admin.logout,
    className: "ml-1 p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-rose-400 transition-colors"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out",
    className: "w-3.5 h-3.5"
  }))), toastLabel && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-20 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 animate-fade-in pointer-events-none"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle",
    className: "w-5 h-5 shrink-0"
  }), /*#__PURE__*/React.createElement("span", {
    role: "status",
    className: "text-sm font-semibold"
  }, typeof toastLabel === "function" ? toastLabel(...toastMessage.args) : toastLabel)));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));