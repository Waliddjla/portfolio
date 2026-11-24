/**
 * i18n.js
 * Module de traduction FR / EN pour le Portfolio de Walid Djellali
 * - UI du site (nav, sections, boutons, formulaire, admin)
 * - Contenu du CV (bio, expériences, formations, workflow SAP) en FR et EN
 * L'exposition "bilingue" : si une donnée ne fournit qu'une seule langue,
 * elle est affichée telle quelle dans les deux langues.
 */
(function () {
  const dict = {
    // ---------- Navbar ----------
    "nav.about": { fr: "À propos", en: "About" },
    "nav.experience": { fr: "Parcours", en: "Experience" },
    "nav.sapWorkflow": { fr: "Workflow SAP", en: "SAP Workflow" },
    "nav.skills": { fr: "Compétences", en: "Skills" },
    "nav.projects": { fr: "Projets", en: "Projects" },
    "nav.github": { fr: "Hub GitHub", en: "GitHub Hub" },
    "nav.education": { fr: "Formations", en: "Education" },
    "nav.contact": { fr: "Contact", en: "Contact" },
    "nav.cv": { fr: "Mon CV", en: "My CV" },
    "nav.admin": { fr: "Admin", en: "Admin" },
    "nav.sqlite": { fr: "SQLite Actif", en: "SQLite Active" },
    "nav.themeLight": { fr: "Basculer le thème", en: "Toggle theme" },

    // ---------- Menu mobile ----------
    "mobile.about": { fr: "À propos", en: "About" },
    "mobile.experience": { fr: "Parcours Professionnel", en: "Professional Experience" },
    "mobile.sapWorkflow": { fr: "Workflow Métier SAP S/4HANA", en: "SAP S/4HANA Business Workflow" },
    "mobile.skills": { fr: "Compétences Clés", en: "Key Skills" },
    "mobile.projects": { fr: "Projets Détaillés", en: "Detailed Projects" },
    "mobile.github": { fr: "Hub GitHub (@Waliddjla)", en: "GitHub Hub (@Waliddjla)" },
    "mobile.education": { fr: "Formations & Certifications", en: "Education & Certifications" },
    "mobile.contact": { fr: "Contact", en: "Contact" },
    "mobile.cvPdf": { fr: "CV (PDF)", en: "CV (PDF)" },
    "mobile.adminConsole": { fr: "Console d'Administration Portfolio", en: "Portfolio Admin Console" },

    // ---------- Hero ----------
    "hero.titleLine1": { fr: "SAP Functional Analyst", en: "SAP Functional Analyst" },
    "hero.titleLine2": { fr: "Full Stack Software Engineer", en: "Full Stack Software Engineer" },
    "hero.linkedinBtn": { fr: "Me contacter sur LinkedIn", en: "Contact me on LinkedIn" },
    "hero.cvBtn": { fr: "Consulter mon CV (PDF)", en: "View my CV (PDF)" },
    "hero.projectsBtn": { fr: "Découvrir les Projets", en: "Explore Projects" },
    "hero.sapBtn": { fr: "Workflow SAP S/4HANA", en: "SAP S/4HANA Workflow" },

    // ---------- Sections ----------
    "exp.badge": { fr: "Expérience Professionnelle", en: "Professional Experience" },
    "exp.title": { fr: "Parcours & Réalisations Métier", en: "Career & Business Achievements" },
    "exp.subtitle": {
      fr: "Expérience confirmée alliant la maîtrise fonctionnelle des processus SAP et le développement d'applications critiques.",
      en: "Proven experience combining functional mastery of SAP processes and critical application development."
    },
    "skills.badge": { fr: "Expertise Technique", en: "Technical Expertise" },
    "projects.badge": { fr: "Réalisations", en: "Achievements" },
    "github.badge": { fr: "Explorateur GitHub", en: "GitHub Explorer" },
    "education.badge": { fr: "Formations & Certifications", en: "Education & Certifications" },
    "contact.badge": { fr: "Prenons contact", en: "Get in touch" },
    "cv.summary": { fr: "Synthèse Professionnelle", en: "Professional Summary" },
    "cv.experiences": { fr: "Parcours Professionnel", en: "Professional Experience" },
    "cv.skills": { fr: "Compétences & Outils", en: "Skills & Tools" },
    "cv.education": { fr: "Formations & Certifications", en: "Education & Certifications" },
    "cv.print": { fr: "Imprimer / Export PDF", en: "Print / Export PDF" },
    "cv.close": { fr: "Fermer", en: "Close" },

    // ---------- Contact form ----------
    "contact.name": { fr: "Nom complet", en: "Full name" },
    "contact.email": { fr: "Adresse e-mail", en: "Email address" },
    "contact.subject": { fr: "Sujet", en: "Subject" },
    "contact.message": { fr: "Votre message", en: "Your message" },
    "contact.send": { fr: "Envoyer le message", en: "Send message" },
    "contact.sending": { fr: "Envoi en cours...", en: "Sending..." }
  };

  // ---------- Contenu bilingue du profil / CV ----------
  const content = {
    profile: {
      location: { fr: "Oran, Algérie", en: "Oran, Algeria" },
      availability: {
        fr: "Disponible pour opportunités SAP & Développement Full-Stack",
        en: "Available for SAP & Full-Stack Development opportunities"
      },
      bio: {
        fr: "Analyste fonctionnel SAP et ingénieur logiciel diplômé d'un Master en informatique. Expérience confirmée dans le déploiement d'ERP SAP S/4HANA (PM & MM), l'administration de systèmes IT et le développement Full-Stack (Node.js, TypeScript, React). Combine rigueur analytique métier et maîtrise technique pour concevoir des solutions numériques pérennes.",
        en: "SAP Functional Analyst and software engineer with a Master's degree in Computer Science. Proven experience in deploying SAP S/4HANA ERP systems (PM & MM), IT systems administration and Full-Stack development (Node.js, TypeScript, React). Combines business analytical rigor with technical expertise to design sustainable digital solutions."
      }
    },
    experiences: [
      {
        role: { fr: "SAP Functional Analyst", en: "SAP Functional Analyst" },
        company: { fr: "Orionlab", en: "Orionlab" },
        period: { fr: "Poste actuel", en: "Current position" },
        description: {
          fr: "Support et intégration des processus SAP S/4HANA 2023 avec focus Plant Maintenance (PM) et Materials Management (MM).",
          en: "Support and integration of SAP S/4HANA 2023 processes with a focus on Plant Maintenance (PM) and Materials Management (MM)."
        },
        bullets: [
          { fr: "Prise en charge des activités fonctionnelles SAP S/4HANA, pilotage du module PM et support utilisateurs sur les flux MM.", en: "Owned SAP S/4HANA functional activities, led the PM module and provided user support on MM flows." },
          { fr: "Collaboration avec l'ingénierie, la validation et l'intégrateur SAP pour clarifier les exigences de maintenance et réviser le Business Blueprint (BBP) PM.", en: "Collaborated with engineering, validation and the SAP integrator to clarify maintenance requirements and review the PM Business Blueprint (BBP)." },
          { fr: "Revue et validation des données de base (Equipment, Functional Locations) avant migration (détection des erreurs de longueur, hiérarchies et références manquantes).", en: "Reviewed and validated master data (Equipment, Functional Locations) before migration (detecting length errors, hierarchies and missing references)." },
          { fr: "Participation à la planification de la maintenance préventive, calibration, qualifications, gammes d'opérations (Task Lists) et ordonnancement des ordres de travail.", en: "Contributed to preventive maintenance planning, calibration, qualifications, task lists and work order scheduling." },
          { fr: "Coordination des besoins d'impression d'ordres de maintenance et des caractéristiques QM avec les équipes métier.", en: "Coordinated maintenance order printing requirements and QM characteristics with business teams." },
          { fr: "Support à l'administration des utilisateurs SAP, habilitations de rôles et accès Fiori ; développement d'applications internes de digitalisation.", en: "Supported SAP user administration, role authorizations and Fiori access; developed internal digitalization applications." }
        ]
      },
      {
        role: { fr: "IT Systems Engineer", en: "IT Systems Engineer" },
        company: { fr: "ACG SIM SPA", en: "ACG SIM SPA" },
        period: { fr: "2024", en: "2024" },
        description: {
          fr: "Gestion, sécurisation des systèmes d'information et contribution au déploiement ERP SAP.",
          en: "Management and security of information systems, and contribution to the SAP ERP deployment."
        },
        bullets: [
          { fr: "Administration et maintien opérationnel des systèmes IT, gestion des sauvegardes, intégrité et sécurité des infrastructures.", en: "Administered and maintained operational IT systems, managed backups, infrastructure integrity and security." },
          { fr: "Contribution active à l'implémentation et au support de l'ERP SAP en alignant les besoins métiers avec les fonctionnalités du système.", en: "Actively contributed to SAP ERP implementation and support by aligning business needs with system capabilities." },
          { fr: "Diagnostic matériel/logiciel, optimisation de l'infrastructure et développement de solutions logicielles internes adaptées.", en: "Hardware/software troubleshooting, infrastructure optimization and development of tailored internal software solutions." }
        ]
      },
      {
        role: { fr: "Full Stack Software Engineer", en: "Full Stack Software Engineer" },
        company: { fr: "SARL Ide-Net Géolocalisation", en: "SARL Ide-Net Géolocalisation" },
        period: { fr: "2023 – 2024", en: "2023 – 2024" },
        description: {
          fr: "Conception et développement de plateformes de suivi et géolocalisation IoT / télématique.",
          en: "Design and development of IoT / telematics tracking and geolocation platforms."
        },
        bullets: [
          { fr: "Conception et développement de plateformes de géolocalisation et de suivi de flotte avec APIs REST en Node.js et TypeScript.", en: "Designed and developed geolocation and fleet-tracking platforms with REST APIs in Node.js and TypeScript." },
          { fr: "Intégration d'appareils GPS et de boîtiers CAN dans les solutions de tracking, optimisation des algorithmes backend et des requêtes SQL.", en: "Integrated GPS devices and CAN boxes into tracking solutions, optimizing backend algorithms and SQL queries." },
          { fr: "Collaboration étroite avec des équipes pluridisciplinaires pour traduire les exigences opérationnelles en fonctionnalités logicielles robustes.", en: "Worked closely with multidisciplinary teams to translate operational requirements into robust software features." }
        ]
      },
      {
        role: { fr: "IT Engineer – Network and Support", en: "IT Engineer – Network and Support" },
        company: { fr: "SARL Gesco Climatisation", en: "SARL Gesco Climatisation" },
        period: { fr: "2023", en: "2023" },
        description: {
          fr: "Administration de l'infrastructure réseau, support utilisateur et déploiements IT.",
          en: "Network infrastructure administration, user support and IT deployments."
        },
        bullets: [
          { fr: "Administration et supervision de l'infrastructure réseau, résolution des incidents systèmes/réseau et assistance support utilisateurs (helpdesk).", en: "Administered and supervised network infrastructure, resolved system/network incidents and provided user helpdesk support." },
          { fr: "Participation aux améliorations d'infrastructures et aux déploiements informatiques stratégiques.", en: "Contributed to infrastructure improvements and strategic IT deployments." }
        ]
      }
    ],
    education: [
      {
        degree: { fr: "Master en Informatique (Informatique Parallèle et Embarquée)", en: "Master in Computer Science (Parallel & Embedded Computing)" },
        institution: { fr: "Université d'Oran 1 Ahmed Ben Bella", en: "University of Oran 1 Ahmed Ben Bella" },
        details: { fr: "Systèmes distribués, calcul parallèle haute performance, systèmes embarqués et algorithmes avancés.", en: "Distributed systems, high-performance parallel computing, embedded systems and advanced algorithms." }
      },
      {
        degree: { fr: "Licence en Systèmes Informatiques", en: "Bachelor in Information Systems" },
        institution: { fr: "Université d'Oran 1 Ahmed Ben Bella", en: "University of Oran 1 Ahmed Ben Bella" },
        details: { fr: "Fondements du génie logiciel, réseaux, bases de données relationnelles, systèmes d'exploitation.", en: "Fundamentals of software engineering, networks, relational databases and operating systems." }
      },
      {
        degree: { fr: "Certification Cisco CCNA v7 (Réseaux & Routage)", en: "Cisco CCNA v7 Certification (Networking & Routing)" },
        institution: { fr: "Cisco Networking Academy", en: "Cisco Networking Academy" },
        details: { fr: "Configuration de commutateurs/routeurs Cisco, adressage IP, VLAN, routage OSPF et sécurité réseau.", en: "Cisco switch/router configuration, IP addressing, VLANs, OSPF routing and network security." }
      }
    ],
    sapSteps: [
      {
        title: { fr: "Avis de Maintenance (PM)", en: "Maintenance Notification (PM)" },
        subtitle: { fr: "Notification & Qualification", en: "Notification & Qualification" },
        description: { fr: "Détection des anomalies opérationnelles, création de l'avis de panne, qualification du degré d'urgence et affectation au poste technique concerné.", en: "Detection of operational anomalies, creation of the breakdown notification, urgency qualification and assignment to the relevant technical location." },
        roleTitle: { fr: "Expertise Fonctionnelle de Walid :", en: "Walid's Functional Expertise:" },
        roleDesc: { fr: "Paramétrage des types d'avis de maintenance (M1, M2, M3), hiérarchisation des priorités, structuration fine des Postes Techniques (Functional Locations) et validation des données de base Équipements.", en: "Configuration of maintenance notification types (M1, M2, M3), priority ranking, detailed structuring of Technical Locations and validation of Equipment master data." },
        deliverables: [
          { fr: "Structure BBP des avis PM", en: "BBP structure for PM notifications" },
          { fr: "Catalogues de pannes & causes", en: "Failure & cause catalogs" },
          { fr: "Contrôle qualité des Master Data", en: "Master data quality control" }
        ]
      },
      {
        title: { fr: "Ordre de Travail & Pièces (MM)", en: "Work Order & Components (MM)" },
        subtitle: { fr: "Planification & Approvisionnement", en: "Planning & Procurement" },
        description: { fr: "Planification des opérations d'intervention, allocation des techniciens et réservation des composants et pièces de rechange via le module Materials Management (MM).", en: "Planning of intervention operations, technician allocation and reservation of components and spare parts through the Materials Management (MM) module." },
        roleTitle: { fr: "Expertise Fonctionnelle de Walid :", en: "Walid's Functional Expertise:" },
        roleDesc: { fr: "Configuration des gammes d'opérations (Task Lists), ordonnancement des ordres de travail, coordination avec le flux MM pour la disponibilité et la sortie des articles en stock ou achats.", en: "Configuration of task lists, work order scheduling and coordination with the MM flow for material availability and goods issue from stock or purchasing." },
        deliverables: [
          { fr: "Gammes d'opérations pré-configurées", en: "Pre-configured task lists" },
          { fr: "Flux de réservation MM", en: "MM reservation flow" },
          { fr: "Formulaires d'impression des ordres", en: "Order print forms" }
        ]
      },
      {
        title: { fr: "Maintenance Préventive & Étalonnage", en: "Preventive Maintenance & Calibration" },
        subtitle: { fr: "Métrologie & Réglementation", en: "Metrology & Compliance" },
        description: { fr: "Programmation des cycles périodiques d'entretien préventif et étalonnage des équipements de mesure et instruments critiques (secteur pharmaceutique et industriel).", en: "Scheduling of periodic preventive maintenance cycles and calibration of measuring equipment and critical instruments (pharmaceutical and industrial sectors)." },
        roleTitle: { fr: "Expertise Fonctionnelle de Walid :", en: "Walid's Functional Expertise:" },
        roleDesc: { fr: "Implémentation chez Orionlab des plans de maintenance préventive et protocoles d'étalonnage. Définition des points de mesure, compteurs d'usure et suivi des périodicités réglementaires.", en: "Implemented preventive maintenance plans and calibration protocols at Orionlab. Defined measurement points, wear counters and monitoring of regulatory cycles." },
        deliverables: [
          { fr: "Plans d'entretien préventif", en: "Preventive maintenance plans" },
          { fr: "Points de mesure & tolérances", en: "Measurement points & tolerances" },
          { fr: "Conformité d'étalonnage", en: "Calibration compliance" }
        ]
      },
      {
        title: { fr: "Exécution & Contrôle Qualité (QM)", en: "Execution & Quality Control (QM)" },
        subtitle: { fr: "Confirmation & Métrologie", en: "Confirmation & Metrology" },
        description: { fr: "Intervention sur site, confirmation des temps de travaux, relevé des compteurs et contrôle des caractéristiques de qualité métrologiques.", en: "On-site intervention, confirmation of work times, counter readings and control of metrological quality characteristics." },
        roleTitle: { fr: "Expertise Fonctionnelle de Walid :", en: "Walid's Functional Expertise:" },
        roleDesc: { fr: "Intégration du module QM pour valider les caractéristiques techniques après intervention, contrôle des écarts de mesure et validation des fiches de pointage d'heures.", en: "Integrated the QM module to validate technical characteristics after interventions, control measurement deviations and approve time confirmation sheets." },
        deliverables: [
          { fr: "Pointage horaire techniciens", en: "Technician time confirmations" },
          { fr: "Lots de contrôle QM validés", en: "Approved QM inspection lots" },
          { fr: "Rapports de métrologie", en: "Metrology reports" }
        ]
      },
      {
        title: { fr: "Clôture Technique (TECO) & Analytique", en: "Technical Completion (TECO) & Analytics" },
        subtitle: { fr: "Finalisation & Contrôle de Gestion", en: "Finalization & Controlling" },
        description: { fr: "Attribution du statut TECO (Technically Completed), clôture technique, imputation des coûts réels à la comptabilité analytique (CO) et archivage d'historique.", en: "Assignment of the TECO status, technical completion, posting of actual costs to controlling (CO) and history archiving." },
        roleTitle: { fr: "Expertise Fonctionnelle de Walid :", en: "Walid's Functional Expertise:" },
        roleDesc: { fr: "Validation du flux de clôture TECO, réconciliation des coûts de maintenance, calcul des indicateurs de performance (MTBF, MTTR) et alimentation des tableaux de bord Fiori.", en: "Validated the TECO closing flow, reconciled maintenance costs, computed performance KPIs (MTBF, MTTR) and fed Fiori dashboards." },
        deliverables: [
          { fr: "Imputation des coûts analytiques (CO)", en: "Controlling cost postings (CO)" },
          { fr: "Historique complet des équipements", en: "Complete equipment history" },
          { fr: "Indicateurs de fiabilité & MTBF/MTTR", en: "Reliability KPIs & MTBF/MTTR" }
        ]
      }
    ]
  };

  function normalize(lang) {
    return (lang === "en" || lang === "EN") ? "en" : "fr";
  }

  // Retourne la valeur {fr, en} dans la langue demandée, sinon la chaîne telle quelle
  function bi(value, lang) {
    if (value && typeof value === "object" && ("fr" in value || "en" in value)) {
      return value[normalize(lang)] || value.fr || value.en;
    }
    return value;
  }

  function tr(key, lang) {
    const entry = dict[key];
    if (!entry) return key;
    return entry[normalize(lang)] || entry.fr;
  }

  window.I18N = {
    normalize,
    t: tr,
    bi,
    content,
    // Fusionne les données API/fallback avec la version traduite (l'exposition "bilingue" :
    // les données personnalisées non traduites restent affichées telles quelles)
    localizeData(data, lang) {
      if (!data) return data;
      const L = normalize(lang);
      const c = content;
      const profile = Object.assign({}, data.profile);
      ["location", "availability", "bio"].forEach(k => {
        if (c.profile[k]) profile[k] = c.profile[k][L];
      });
      const experiences = (data.experiences || []).map((exp, idx) => {
        const ce = c.experiences[idx];
        if (!ce) return exp;
        return Object.assign({}, exp, {
          role: ce.role[L],
          company: ce.company[L],
          period: ce.period[L] || exp.period,
          description: ce.description[L],
          bullets: (ce.bullets || []).map(b => b[L])
        });
      });
      const education = (data.education || []).map((ed, idx) => {
        const cEdu = c.education[idx];
        if (!cEdu) return ed;
        return Object.assign({}, ed, {
          degree: cEdu.degree[L],
          institution: cEdu.institution[L],
          details: cEdu.details[L]
        });
      });
      return Object.assign({}, data, { profile, experiences, education });
    }
  };
})();
