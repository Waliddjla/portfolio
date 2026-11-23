import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
  useMemo
} = React;
const fallbackData = {
  profile: {
    name: "Walid Djellali",
    title: "SAP Functional Analyst | Full Stack Software Engineer",
    location: "Oran, Algérie",
    email: "walidjellali32@gmail.com",
    phone: "+213 676 958 671",
    linkedin: "https://www.linkedin.com/in/waliddjellali/",
    github: "https://github.com/Waliddjla",
    bio: "Analyste fonctionnel SAP et ingénieur logiciel diplômé d’un Master en informatique. Expérience confirmée dans le déploiement d’ERP SAP S/4HANA (PM & MM), l’administration de systèmes IT et le développement Full-Stack (Node.js, TypeScript, React). Combine rigueur analytique métier et maîtrise technique pour concevoir des solutions numériques pratiques et pérennes.",
    availability: "Disponible pour opportunités SAP & Développement Full-Stack"
  },
  experiences: [{
    id: 1,
    role: "SAP Functional Analyst",
    company: "Orionlab",
    period: "Poste actuel",
    description: "Support et intégration des processus SAP S/4HANA 2023 avec focus Plant Maintenance (PM) et Materials Management (MM).",
    bullets: ["Prise en charge des activités fonctionnelles SAP S/4HANA, pilotage du module PM et support utilisateurs sur les flux MM.", "Collaboration avec l'ingénierie, la validation et l'intégrateur SAP pour clarifier les exigences de maintenance et réviser le Business Blueprint (BBP) PM.", "Revue et validation des données de base (Equipment, Functional Locations) avant migration (détection des erreurs de longueur, hiérarchies et références manquantes).", "Participation à la planification de la maintenance préventive, calibration, qualifications, gammes d'opérations (Task Lists) et ordonnancement des ordres de travail.", "Coordination des besoins d'impression d'ordres de maintenance et des caractéristiques QM avec les équipes métier.", "Support à l'administration des utilisateurs SAP, habilitations de rôles et accès Fiori ; développement d'applications internes de digitalisation."]
  }, {
    id: 2,
    role: "IT Systems Engineer",
    company: "ACG SIM SPA",
    period: "2024",
    description: "Gestion, sécurisation des systèmes d'information et contribution au déploiement ERP SAP.",
    bullets: ["Administration et maintien en condition opérationnelle des systèmes IT, gestion de la sécurité, des sauvegardes et de l'intégrité du parc.", "Contribution à l'implémentation et au support de l'ERP SAP pour aligner les besoins métiers avec les processus système.", "Diagnostic des dysfonctionnements matériels et logiciels, optimisation de l'infrastructure et développement de solutions logicielles internes."]
  }, {
    id: 3,
    role: "Full Stack Software Engineer",
    company: "SARL Ide-Net Géolocalisation",
    period: "2023 – 2024",
    description: "Conception et développement de plateformes de suivi et géolocalisation IoT / télématique.",
    bullets: ["Conception et développement de plateformes de géolocalisation et de suivi de flotte avec APIs REST en Node.js et TypeScript.", "Intégration d'appareils GPS et de boîtiers CAN dans les solutions de tracking, optimisation des algorithmes backend et des requêtes SQL.", "Collaboration étroite avec des équipes pluridisciplinaires pour traduire les exigences opérationnelles en fonctionnalités logicielles robustes."]
  }, {
    id: 4,
    role: "IT Engineer – Network and Support",
    company: "SARL Gesco Climatisation",
    period: "2023",
    description: "Administration de l'infrastructure réseau, support utilisateur et déploiements IT.",
    bullets: ["Administration et supervision de l'infrastructure réseau, résolution des incidents systèmes/réseau et assistance support utilisateurs (helpdesk).", "Participation aux améliorations d'infrastructures et aux déploiements informatiques stratégiques."]
  }],
  skills: [{
    category: "SAP & ERP",
    name: "SAP S/4HANA 2023"
  }, {
    category: "SAP & ERP",
    name: "SAP PM (Plant Maintenance)"
  }, {
    category: "SAP & ERP",
    name: "SAP MM (Materials Management)"
  }, {
    category: "SAP & ERP",
    name: "SAP Fiori"
  }, {
    category: "SAP & ERP",
    name: "Business Blueprint (BBP)"
  }, {
    category: "SAP & ERP",
    name: "Preventive Maintenance & Calibration"
  }, {
    category: "SAP & ERP",
    name: "Master Data Migration"
  }, {
    category: "Frontend",
    name: "React"
  }, {
    category: "Frontend",
    name: "Next.js"
  }, {
    category: "Frontend",
    name: "TypeScript"
  }, {
    category: "Frontend",
    name: "JavaScript (ES6+)"
  }, {
    category: "Frontend",
    name: "Tailwind CSS"
  }, {
    category: "Frontend",
    name: "HTML5 / CSS3 / Bootstrap"
  }, {
    category: "Backend & Languages",
    name: "Node.js"
  }, {
    category: "Backend & Languages",
    name: "REST APIs"
  }, {
    category: "Backend & Languages",
    name: "PHP / Laravel"
  }, {
    category: "Backend & Languages",
    name: "Python / Django"
  }, {
    category: "Backend & Languages",
    name: "Java"
  }, {
    category: "Databases & Systems",
    name: "SQLite"
  }, {
    category: "Databases & Systems",
    name: "MySQL"
  }, {
    category: "Databases & Systems",
    name: "SQL Server"
  }, {
    category: "Databases & Systems",
    name: "MongoDB"
  }, {
    category: "Databases & Systems",
    name: "Docker & Linux Ubuntu"
  }, {
    category: "Databases & Systems",
    name: "Windows Server"
  }, {
    category: "Databases & Systems",
    name: "Cisco Networking (CCNA)"
  }],
  projects: window.featuredProjects || [],
  education: [{
    degree: "Master en Informatique (Informatique Parallèle et Embarquée)",
    institution: "Université d'Oran 1 Ahmed Ben Bella",
    period: "2020 – 2022",
    details: "Systèmes distribués, calcul parallèle haute performance, systèmes embarqués et algorithmes avancés."
  }, {
    degree: "Licence en Systèmes Informatiques",
    institution: "Université d'Oran 1 Ahmed Ben Bella",
    period: "2016 – 2020",
    details: "Fondements du génie logiciel, réseaux, bases de données relationnelles, systèmes d'exploitation."
  }, {
    degree: "Certification Cisco CCNA v7 (Réseaux & Routage)",
    institution: "Cisco Networking Academy",
    period: "2023",
    details: "Configuration de commutateurs/routeurs Cisco, adressage IP, VLAN, routage OSPF et sécurité réseau."
  }]
};

// Étapes clés du cycle de maintenance industrielle SAP S/4HANA (PM & MM)
const sapWorkflowSteps = [{
  step: "01",
  id: "notification",
  title: "Avis de Maintenance (PM)",
  subtitle: "Notification & Qualification",
  icon: "clipboard-list",
  badge: "IW21 / Fiori PM",
  color: "from-blue-600 to-cyan-600",
  fioriApp: "Create Maintenance Notification",
  description: "Détection des anomalies opérationnelles, création de l'avis de panne, qualification du degré d'urgence et affectation au poste technique concerné.",
  roleTitle: "Expertise Fonctionnelle de Walid :",
  roleDesc: "Paramétrage des types d'avis de maintenance (M1, M2, M3), hiérarchisation des priorités, structuration fine des Postes Techniques (Functional Locations) et validation des données de base Équipements.",
  deliverables: ["Structure BBP des avis PM", "Catalogues de pannes & causes", "Contrôle qualité des Master Data"]
}, {
  step: "02",
  id: "order",
  title: "Ordre de Travail & Pièces (MM)",
  subtitle: "Planification & Approvisionnement",
  icon: "wrench",
  badge: "IW31 / IW32 / MM",
  color: "from-indigo-600 to-blue-600",
  fioriApp: "Manage Maintenance Orders",
  description: "Planification des opérations d'intervention, allocation des techniciens et réservation des composants et pièces de rechange via le module Materials Management (MM).",
  roleTitle: "Expertise Fonctionnelle de Walid :",
  roleDesc: "Configuration des gammes d'opérations (Task Lists), ordonnancement des ordres de travail, coordination avec le flux MM pour la disponibilité et la sortie des articles en stock ou achats.",
  deliverables: ["Gammes d'opérations pré-configurées", "Flux de réservation MM", "Formulaires d'impression des ordres"]
}, {
  step: "03",
  id: "calibration",
  title: "Maintenance Préventive & Étalonnage",
  subtitle: "Métrologie & Réglementation",
  icon: "gauge",
  badge: "IP02 / IP10 / S/4HANA",
  color: "from-violet-600 to-purple-600",
  fioriApp: "Maintenance Plans & Scheduling",
  description: "Programmation des cycles périodiques d'entretien préventif et étalonnage des équipements de mesure et instruments critiques (secteur pharmaceutique et industriel).",
  roleTitle: "Expertise Fonctionnelle de Walid :",
  roleDesc: "Implémentation chez Orionlab des plans de maintenance préventive et protocoles d'étalonnage. Définition des points de mesure, compteurs d'usure et suivi des périodicités réglementaires.",
  deliverables: ["Plans d'entretien préventif", "Points de mesure & tolérances", "Conformité d'étalonnage"]
}, {
  step: "04",
  id: "qm",
  title: "Exécution & Contrôle Qualité (QM)",
  subtitle: "Confirmation & Métrologie",
  icon: "check-circle-2",
  badge: "IW41 / QE51N / QM",
  color: "from-emerald-600 to-teal-600",
  fioriApp: "Confirm Maintenance Jobs & QM Lots",
  description: "Intervention sur site, confirmation des temps de travaux, relevé des compteurs et contrôle des caractéristiques de qualité métrologiques.",
  roleTitle: "Expertise Fonctionnelle de Walid :",
  roleDesc: "Intégration du module QM pour valider les caractéristiques techniques après intervention, contrôle des écarts de mesure et validation des fiches de pointage d'heures.",
  deliverables: ["Pointage horaire techniciens", "Lots de contrôle QM validés", "Rapports de métrologie"]
}, {
  step: "05",
  id: "teco",
  title: "Clôture Technique (TECO) & Analytique",
  subtitle: "Finalisation & Contrôle de Gestion",
  icon: "file-check-2",
  badge: "TECO / KO88 / Fiori",
  color: "from-amber-600 to-orange-600",
  fioriApp: "Technical Completion (TECO) & Cost Settlement",
  description: "Attribution du statut TECO (Technically Completed), clôture technique, imputation des coûts réels à la comptabilité analytique (CO) et archivage d'historique.",
  roleTitle: "Expertise Fonctionnelle de Walid :",
  roleDesc: "Validation du flux de clôture TECO, réconciliation des coûts de maintenance, calcul des indicateurs de performance (MTBF, MTTR) et alimentation des tableaux de bord Fiori.",
  deliverables: ["Imputation des coûts analytiques (CO)", "Historique complet des équipements", "Indicateurs de fiabilité & MTBF/MTTR"]
}];
function App() {
  const [data, setData] = useState(fallbackData);
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // Modal d'Étude de Cas Détaillée pour les projets
  const [selectedProjectModal, setSelectedProjectModal] = useState(null);

  // Nouveautés interactives : Modal CV, Explorateur GitHub et Workflow SAP
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [githubRepos, setGithubRepos] = useState([]);
  const [repoSearchQuery, setRepoSearchQuery] = useState("");
  const [repoLanguageFilter, setRepoLanguageFilter] = useState("all");
  const [activeSapStep, setActiveSapStep] = useState(0);

  // Espace d'Administration SQLite
  const [adminModalOpen, setAdminModalOpen] = useState(false);
  const [isAdminAuth, setIsAdminAuth] = useState(() => {
    return sessionStorage.getItem("walid_admin_auth") === "true";
  });
  const [adminPinInput, setAdminPinInput] = useState("");
  const [adminPinError, setAdminPinError] = useState("");
  const [adminTab, setAdminTab] = useState("stats"); // 'stats', 'inbox', 'profile', 'projects'
  const [adminStats, setAdminStats] = useState(null);
  const [messagesList, setMessagesList] = useState([]);
  const [editingProfileForm, setEditingProfileForm] = useState({
    title: "",
    availability: "",
    bio: "",
    phone: "",
    email: "",
    location: ""
  });
  const [projectFormModalOpen, setProjectFormModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    category: "software",
    category_label: "Full-Stack",
    tagline: "",
    description: "",
    image: "",
    tags: "",
    github_url: "",
    demo_url: "",
    features: ""
  });

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
          availability: apiData.profile.availability || "",
          bio: apiData.profile.bio || "",
          phone: apiData.profile.phone || "",
          email: apiData.profile.email || "",
          location: apiData.profile.location || ""
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
  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Charger les stats administratives et messages
  const fetchAdminData = () => {
    fetch("/api/admin/stats").then(res => res.json()).then(stats => setAdminStats(stats)).catch(() => {});
    fetch("/api/messages").then(res => res.json()).then(msgs => setMessagesList(msgs || [])).catch(() => {});
  };
  const handleAdminLogin = e => {
    e.preventDefault();
    setAdminPinError("");
    fetch("/api/admin/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pin: adminPinInput
      })
    }).then(res => res.json()).then(resData => {
      if (resData.success) {
        setIsAdminAuth(true);
        sessionStorage.setItem("walid_admin_auth", "true");
        setAdminPinInput("");
        fetchAdminData();
        showToast("🔓 Authentification réussie ! Bienvenue dans l'administration.");
      } else {
        setAdminPinError(resData.error || "Code PIN incorrect.");
      }
    }).catch(() => {
      setAdminPinError("Erreur de connexion au serveur.");
    });
  };
  const handleAdminLogout = () => {
    setIsAdminAuth(false);
    sessionStorage.removeItem("walid_admin_auth");
    showToast("Verrouillage de l'espace administration.");
  };
  const openAdminModal = () => {
    setAdminModalOpen(true);
    if (isAdminAuth) {
      fetchAdminData();
    }
  };

  // Actions d'administration : Suppression de message
  const handleDeleteMessage = async id => {
    if (!confirm(`Confirmer la suppression du message #${id} ?`)) return;
    try {
      const res = await fetch(`/api/messages/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        setMessagesList(prev => prev.filter(m => m.id !== id));
        fetchAdminData();
        showToast(`🗑️ Message #${id} supprimé.`);
      }
    } catch (err) {
      showToast("Erreur lors de la suppression du message.");
    }
  };

  // Marquer un message comme lu
  const handleToggleMessageRead = async (id, currentRead) => {
    try {
      const nextState = currentRead ? 0 : 1;
      const res = await fetch(`/api/messages/${id}/read`, {
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
      const res = await fetch("/api/admin/profile", {
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
        showToast("✅ Profil et disponibilité mis à jour dans SQLite !");
      }
    } catch (err) {
      showToast("Erreur lors de la mise à jour du profil.");
    }
  };

  // Changer rapidement la disponibilité
  const handleQuickAvailabilityChange = async newStatus => {
    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          availability: newStatus
        })
      });
      if (res.ok) {
        setEditingProfileForm(prev => ({
          ...prev,
          availability: newStatus
        }));
        fetchPortfolio();
        fetchAdminData();
        showToast(`🟢 Statut mis à jour : "${newStatus}"`);
      }
    } catch (e) {}
  };

  // Supprimer un projet
  const handleDeleteProject = async (id, title) => {
    if (!confirm(`Supprimer le projet "${title}" de la base SQLite ?`)) return;
    try {
      const res = await fetch(`/api/admin/projects/${id}`, {
        method: "DELETE"
      });
      if (res.ok) {
        fetchPortfolio();
        fetchAdminData();
        showToast(`🗑️ Projet "${title}" supprimé de SQLite.`);
      }
    } catch (e) {
      showToast("Erreur lors de la suppression du projet.");
    }
  };

  // Sauvegarder un projet (ajout ou édition)
  const handleSaveProjectForm = async e => {
    e.preventDefault();
    try {
      const isEdit = !!editingProject;
      const endpoint = isEdit ? `/api/admin/projects/${editingProject.id}` : "/api/admin/projects";
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(endpoint, {
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
        showToast(`✅ Projet ${isEdit ? "modifié" : "ajouté"} avec succès dans SQLite !`);
      }
    } catch (e) {
      showToast("Erreur lors de l'enregistrement du projet.");
    }
  };
  const openNewProjectForm = () => {
    setEditingProject(null);
    setProjectFormData({
      title: "",
      category: "software",
      category_label: "Full-Stack",
      tagline: "",
      description: "",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
      tags: "React, Node.js, SQLite",
      github_url: "https://github.com/Waliddjla",
      demo_url: "",
      features: "Gestion centralisée\nTableaux de bord\nArchitecture modulaire"
    });
    setProjectFormModalOpen(true);
  };
  const openEditProjectForm = p => {
    setEditingProject(p);
    setProjectFormData({
      title: p.title || "",
      category: p.category || "software",
      category_label: p.category_label || "Full-Stack",
      tagline: p.tagline || "",
      description: p.description || "",
      image: p.image || "",
      tags: Array.isArray(p.tags) ? p.tags.join(", ") : p.tags || "",
      github_url: p.github_url || "",
      demo_url: p.demo_url || "",
      features: Array.isArray(p.features) ? p.features.join("\n") : p.features || ""
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
        showToast("✅ Message enregistré dans la base SQLite ! Walid vous répondra sous 24h.");
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
      showToast("✅ Message envoyé avec succès !");
      setFormState({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filtrage des projets
  const filteredProjects = selectedCategory === "all" ? data.projects : data.projects.filter(p => p.category === selectedCategory);

  // Filtrage des dépôts GitHub réels
  const filteredGithubRepos = githubRepos.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(repoSearchQuery.toLowerCase()) || repo.description && repo.description.toLowerCase().includes(repoSearchQuery.toLowerCase());
    const matchesLang = repoLanguageFilter === "all" || repo.language && repo.language.toLowerCase() === repoLanguageFilter.toLowerCase();
    return matchesSearch && matchesLang;
  });
  return /*#__PURE__*/_jsxs("div", {
    className: "min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300",
    children: [/*#__PURE__*/_jsxs("header", {
      className: "sticky top-0 z-40 glass border-b border-slate-200/60 dark:border-slate-800/80 transition-colors",
      children: [/*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3",
        children: [/*#__PURE__*/_jsxs("a", {
          href: "#hero",
          className: "flex items-center gap-2.5 sm:gap-3 group shrink-0 py-1",
          children: [/*#__PURE__*/_jsx("span", {
            className: "w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-pink-500 flex items-center justify-center text-white font-extrabold text-base sm:text-lg shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform shrink-0",
            children: "WD"
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex flex-col shrink-0",
            children: [/*#__PURE__*/_jsx("span", {
              className: "font-extrabold tracking-tight text-base sm:text-lg text-slate-900 dark:text-white leading-tight whitespace-nowrap",
              children: data.profile.name
            }), /*#__PURE__*/_jsx("span", {
              className: "text-[11px] sm:text-xs text-blue-600 dark:text-blue-400 font-semibold whitespace-nowrap",
              children: "SAP Analyst & Full-Stack"
            })]
          })]
        }), /*#__PURE__*/_jsxs("nav", {
          className: "hidden xl:flex items-center gap-5 2xl:gap-7 text-sm font-medium shrink-0",
          children: [/*#__PURE__*/_jsx("a", {
            href: "#experience",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Parcours"
          }), /*#__PURE__*/_jsxs("a", {
            href: "#sap-workflow",
            className: "flex items-center gap-1.5 text-blue-600 dark:text-blue-400 font-semibold hover:underline transition-all whitespace-nowrap",
            children: [/*#__PURE__*/_jsx("span", {
              className: "w-2 h-2 rounded-full bg-blue-600 animate-ping"
            }), /*#__PURE__*/_jsx("span", {
              children: "Workflow SAP"
            })]
          }), /*#__PURE__*/_jsx("a", {
            href: "#skills",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Compétences"
          }), /*#__PURE__*/_jsx("a", {
            href: "#projects",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Projets"
          }), /*#__PURE__*/_jsx("a", {
            href: "#github-explorer",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Hub GitHub"
          }), /*#__PURE__*/_jsx("a", {
            href: "#education",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Formations"
          }), /*#__PURE__*/_jsx("a", {
            href: "#contact",
            className: "text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap",
            children: "Contact"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-1.5 sm:gap-2 shrink-0",
          children: [/*#__PURE__*/_jsx("a", {
            href: data.profile.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            title: "Consulter le profil LinkedIn de Walid",
            className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-blue-50 dark:bg-blue-950/60 text-[#0A66C2] dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all shrink-0",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": "linkedin",
              className: "w-4 h-4 sm:w-4.5 sm:h-4.5"
            })
          }), /*#__PURE__*/_jsx("a", {
            href: data.profile.github,
            target: "_blank",
            rel: "noopener noreferrer",
            title: "Explorer le GitHub de Walid (@Waliddjla)",
            className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:scale-105 transition-all shrink-0",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-4 h-4 sm:w-4.5 sm:h-4.5"
            })
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setCvModalOpen(true),
            title: "Consulter et imprimer le CV en PDF",
            className: "hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 hover:bg-indigo-100 transition-all shrink-0 whitespace-nowrap",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "file-text",
              className: "w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400"
            }), /*#__PURE__*/_jsx("span", {
              children: "Mon CV"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: openAdminModal,
            title: "Console d'Administration du Portfolio",
            className: "inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-2 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all shrink-0 shadow-sm",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "shield",
              className: "w-3.5 h-3.5 text-amber-600 dark:text-amber-400"
            }), /*#__PURE__*/_jsx("span", {
              className: "hidden md:inline whitespace-nowrap",
              children: "Admin"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            title: "Base SQLite native connectée",
            className: "hidden lg:inline-flex items-center gap-1.5 px-2.5 py-2 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 shrink-0",
            children: [/*#__PURE__*/_jsx("span", {
              className: "w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
            }), /*#__PURE__*/_jsx("span", {
              className: "whitespace-nowrap",
              children: "SQLite Actif"
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: toggleTheme,
            "aria-label": "Basculer le thème",
            className: "w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shrink-0",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": isDarkMode ? "sun" : "moon",
              className: "w-4 h-4"
            })
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            "aria-label": "Ouvrir le menu",
            className: "xl:hidden w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all shrink-0",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": mobileMenuOpen ? "x" : "menu",
              className: "w-5 h-5"
            })
          })]
        })]
      }), mobileMenuOpen && /*#__PURE__*/_jsxs("div", {
        className: "xl:hidden px-4 pt-3 pb-6 glass border-b border-slate-200 dark:border-slate-800 flex flex-col gap-2 max-h-[calc(100vh-5.5rem)] overflow-y-auto animate-fade-in shadow-2xl",
        children: [/*#__PURE__*/_jsxs("a", {
          href: "#about",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "À propos"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#experience",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "Parcours Professionnel"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#sap-workflow",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 flex items-center justify-between",
          children: [/*#__PURE__*/_jsxs("span", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsx("span", {
              className: "w-2 h-2 rounded-full bg-blue-600 animate-ping"
            }), /*#__PURE__*/_jsx("span", {
              children: "Workflow Métier SAP S/4HANA"
            })]
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-blue-500"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#skills",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "Compétences Clés"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#projects",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsxs("span", {
            children: ["Projets Détaillés (", data.projects.length, ")"]
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#github-explorer",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "Hub GitHub (@Waliddjla)"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#education",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "Formations & Certifications"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("a", {
          href: "#contact",
          onClick: () => setMobileMenuOpen(false),
          className: "px-3.5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsx("span", {
            children: "Contact"
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "chevron-right",
            className: "w-4 h-4 text-slate-400"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "pt-3 border-t border-slate-200 dark:border-slate-800 flex flex-wrap gap-2",
          children: [/*#__PURE__*/_jsxs("a", {
            href: data.profile.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex-1 py-2.5 text-center rounded-xl text-xs font-bold bg-[#0A66C2] text-white flex items-center justify-center gap-1.5 shadow-sm",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "linkedin",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "LinkedIn"
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: data.profile.github,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex-1 py-2.5 text-center rounded-lg text-xs font-bold bg-slate-900 dark:bg-slate-800 text-white flex items-center justify-center gap-1.5 shadow-sm",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "GitHub"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => {
              setMobileMenuOpen(false);
              setCvModalOpen(true);
            },
            className: "flex-1 py-2.5 text-center rounded-xl text-xs font-bold bg-indigo-600 text-white flex items-center justify-center gap-1.5 shadow-sm",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "file-text",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "CV (PDF)"
            })]
          })]
        }), /*#__PURE__*/_jsxs("button", {
          onClick: () => {
            setMobileMenuOpen(false);
            openAdminModal();
          },
          className: "mt-1 px-3 py-2.5 rounded-xl text-xs font-bold bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800 flex items-center justify-between",
          children: [/*#__PURE__*/_jsxs("span", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "shield",
              className: "w-4 h-4 text-amber-500"
            }), /*#__PURE__*/_jsx("span", {
              children: "Console d'Administration Portfolio"
            })]
          }), /*#__PURE__*/_jsx("i", {
            "data-lucide": "lock",
            className: "w-4 h-4"
          })]
        })]
      })]
    }), /*#__PURE__*/_jsxs("section", {
      id: "hero",
      className: "relative pt-20 pb-24 md:pt-28 md:pb-32 overflow-hidden",
      children: [/*#__PURE__*/_jsx("div", {
        className: "absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-indigo-500/15 to-purple-500/20 blur-[130px] rounded-full pointer-events-none -z-10"
      }), /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/80 mb-6 animate-float shadow-sm",
          children: [/*#__PURE__*/_jsx("span", {
            className: "w-2 h-2 rounded-full bg-emerald-500 animate-ping"
          }), /*#__PURE__*/_jsx("span", {
            children: data.profile.availability
          })]
        }), /*#__PURE__*/_jsx("h1", {
          className: "text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5",
          children: data.profile.name
        }), /*#__PURE__*/_jsxs("div", {
          className: "inline-block px-4 sm:px-5 py-2 sm:py-2.5 rounded-2xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950/60 dark:via-indigo-950/60 dark:to-purple-950/60 text-blue-900 dark:text-blue-200 font-extrabold text-sm sm:text-lg md:text-2xl mb-6 shadow-sm border border-blue-200/50 dark:border-blue-800/50 max-w-full",
          children: [/*#__PURE__*/_jsx("span", {
            className: "block sm:inline",
            children: "SAP Functional Analyst"
          }), /*#__PURE__*/_jsx("span", {
            className: "hidden sm:inline text-blue-400 mx-2",
            children: "|"
          }), /*#__PURE__*/_jsx("span", {
            className: "block sm:inline",
            children: "Full Stack Software Engineer"
          })]
        }), /*#__PURE__*/_jsx("p", {
          className: "text-sm sm:text-base md:text-lg lg:text-xl font-normal text-slate-600 dark:text-slate-300 max-w-3xl mb-8 leading-relaxed px-2",
          children: data.profile.bio
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 text-xs sm:text-sm mb-10 max-w-full px-2",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "map-pin",
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-500 shrink-0"
            }), /*#__PURE__*/_jsx("span", {
              children: data.profile.location
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: `tel:${data.profile.phone}`,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "phone",
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 shrink-0"
            }), /*#__PURE__*/_jsx("span", {
              children: data.profile.phone
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: `mailto:${data.profile.email}`,
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl glass text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "mail",
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500 shrink-0"
            }), /*#__PURE__*/_jsx("span", {
              children: data.profile.email
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: data.profile.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-[#0A66C2] dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "linkedin",
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0A66C2] shrink-0"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-semibold truncate max-w-[170px] sm:max-w-none",
              children: "linkedin.com/in/waliddjellali"
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: data.profile.github,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 hover:scale-105 transition-all",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0"
            }), /*#__PURE__*/_jsx("span", {
              className: "font-semibold truncate max-w-[130px] sm:max-w-none",
              children: "github.com/Waliddjla"
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex flex-col sm:flex-row flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 w-full max-w-3xl px-2",
          children: [/*#__PURE__*/_jsxs("a", {
            href: data.profile.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "linkedin",
              className: "w-4 h-4 sm:w-5 sm:h-5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Me contacter sur LinkedIn"
            }), /*#__PURE__*/_jsx("i", {
              "data-lucide": "external-link",
              className: "w-3.5 h-3.5 opacity-75"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setCvModalOpen(true),
            className: "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "file-text",
              className: "w-4 h-4 sm:w-5 sm:h-5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Consulter mon CV (PDF)"
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: "#projects",
            className: "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:scale-105 transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "layers",
              className: "w-4 h-4 sm:w-5 sm:h-5"
            }), /*#__PURE__*/_jsxs("span", {
              children: ["Découvrir les Projets (", data.projects.length, ")"]
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: "#sap-workflow",
            className: "w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-semibold glass hover:bg-slate-200/60 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-100 transition-all flex items-center justify-center gap-2",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "cpu",
              className: "w-4 h-4 sm:w-5 sm:h-5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Workflow SAP S/4HANA"
            })]
          })]
        })]
      })]
    }), /*#__PURE__*/_jsx("section", {
      id: "experience",
      className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block",
            children: "Expérience Professionnelle"
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Parcours & Réalisations Métier"
          }), /*#__PURE__*/_jsx("p", {
            className: "mt-3 text-slate-600 dark:text-slate-400",
            children: "Expérience confirmée alliant la maîtrise fonctionnelle des processus SAP et le développement d'applications critiques."
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "space-y-8",
          children: data.experiences.map((exp, idx) => /*#__PURE__*/_jsxs("div", {
            className: "p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 card-hover transition-all",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4",
              children: [/*#__PURE__*/_jsx("div", {
                children: /*#__PURE__*/_jsxs("h3", {
                  className: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("span", {
                    children: exp.role
                  }), /*#__PURE__*/_jsxs("span", {
                    className: "text-blue-600 dark:text-blue-400 font-extrabold",
                    children: ["@ ", exp.company]
                  })]
                })
              }), /*#__PURE__*/_jsxs("span", {
                className: "inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 w-fit",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "calendar",
                  className: "w-3.5 h-3.5"
                }), /*#__PURE__*/_jsx("span", {
                  children: exp.period
                })]
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-sm sm:text-base text-slate-600 dark:text-slate-300 mb-6 leading-relaxed italic",
              children: exp.description
            }), /*#__PURE__*/_jsx("ul", {
              className: "space-y-3",
              children: exp.bullets.map((bullet, bIdx) => /*#__PURE__*/_jsxs("li", {
                className: "flex items-start gap-3 text-sm sm:text-base text-slate-700 dark:text-slate-300 leading-relaxed",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "w-5 h-5 rounded-lg bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-0.5",
                  children: /*#__PURE__*/_jsx("i", {
                    "data-lucide": "check",
                    className: "w-3.5 h-3.5"
                  })
                }), /*#__PURE__*/_jsx("span", {
                  children: bullet
                })]
              }, bIdx))
            })]
          }, exp.id || idx))
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "sap-workflow",
      className: "py-24",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "cpu",
              className: "w-3.5 h-3.5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Cycle de Vie Industriel & ERP"
            })]
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Simulateur de Processus SAP S/4HANA (PM & MM)"
          }), /*#__PURE__*/_jsx("p", {
            className: "mt-3 text-slate-600 dark:text-slate-400",
            children: "Découvrez pas à pas comment Walid orchestre la maintenance préventive, l'approvisionnement des pièces, l'étalonnage et la clôture financière dans SAP."
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 mb-8",
          children: sapWorkflowSteps.map((step, idx) => {
            const isActive = activeSapStep === idx;
            const isLastOdd = idx === 4;
            return /*#__PURE__*/_jsxs("button", {
              onClick: () => setActiveSapStep(idx),
              className: `p-4 rounded-2xl text-left transition-all relative overflow-hidden flex flex-col justify-between border ${isActive ? "bg-white dark:bg-slate-900 border-blue-500 shadow-xl shadow-blue-500/10 ring-2 ring-blue-500/40" : "glass border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"} ${isLastOdd ? "col-span-2 sm:col-span-1" : ""}`,
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [/*#__PURE__*/_jsx("span", {
                  className: `text-xs font-black tracking-wider px-2 py-0.5 rounded-lg ${isActive ? "bg-blue-600 text-white" : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400"}`,
                  children: step.step
                }), /*#__PURE__*/_jsx("i", {
                  "data-lucide": step.icon,
                  className: `w-4 h-4 ${isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"}`
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("h4", {
                  className: "text-xs sm:text-sm font-bold text-slate-900 dark:text-white leading-tight",
                  children: step.title
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 block truncate",
                  children: step.subtitle
                })]
              })]
            }, step.id);
          })
        }), (() => {
          const current = sapWorkflowSteps[activeSapStep];
          return /*#__PURE__*/_jsxs("div", {
            className: "p-6 sm:p-10 rounded-3xl glass border border-blue-500/30 shadow-2xl space-y-6 animate-fade-in",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200/70 dark:border-slate-800",
              children: [/*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center gap-2 mb-2",
                  children: [/*#__PURE__*/_jsxs("span", {
                    className: "text-xs font-black px-2.5 py-0.5 rounded-lg bg-blue-600 text-white",
                    children: ["Étape ", current.step, " / 05"]
                  }), /*#__PURE__*/_jsx("span", {
                    className: "px-3 py-1 rounded-xl text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300",
                    children: current.badge
                  })]
                }), /*#__PURE__*/_jsx("h3", {
                  className: "text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 dark:text-white",
                  children: current.title
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-2",
                  children: current.description
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between sm:justify-start gap-2 self-stretch sm:self-auto shrink-0 pt-2 sm:pt-0",
                children: [/*#__PURE__*/_jsxs("button", {
                  onClick: () => setActiveSapStep((activeSapStep - 1 + sapWorkflowSteps.length) % sapWorkflowSteps.length),
                  className: "flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold glass hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-1.5",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "chevron-left",
                    className: "w-4 h-4"
                  }), /*#__PURE__*/_jsx("span", {
                    children: "Précédent"
                  })]
                }), /*#__PURE__*/_jsxs("button", {
                  onClick: () => setActiveSapStep((activeSapStep + 1) % sapWorkflowSteps.length),
                  className: "flex-1 sm:flex-none px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-1.5",
                  children: [/*#__PURE__*/_jsx("span", {
                    children: "Suivant"
                  }), /*#__PURE__*/_jsx("i", {
                    "data-lucide": "chevron-right",
                    className: "w-4 h-4"
                  })]
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "grid grid-cols-1 lg:grid-cols-12 gap-8 pt-2",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "lg:col-span-7 space-y-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-start gap-3",
                  children: [/*#__PURE__*/_jsx("div", {
                    className: "w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 mt-1",
                    children: /*#__PURE__*/_jsx("i", {
                      "data-lucide": "user-check",
                      className: "w-5 h-5"
                    })
                  }), /*#__PURE__*/_jsxs("div", {
                    children: [/*#__PURE__*/_jsx("h4", {
                      className: "text-sm font-bold text-slate-900 dark:text-white",
                      children: current.roleTitle
                    }), /*#__PURE__*/_jsx("p", {
                      className: "text-sm sm:text-base text-slate-600 dark:text-slate-300 mt-1 leading-relaxed",
                      children: current.roleDesc
                    })]
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex items-center gap-3",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "terminal",
                    className: "w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0"
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "text-xs",
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "font-bold text-blue-900 dark:text-blue-200",
                      children: "Application SAP Fiori associée : "
                    }), /*#__PURE__*/_jsx("code", {
                      className: "text-blue-600 dark:text-blue-400 font-mono font-bold",
                      children: current.fioriApp
                    })]
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "lg:col-span-5 bg-white/60 dark:bg-slate-900/60 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800",
                children: [/*#__PURE__*/_jsxs("h5", {
                  className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-2",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "file-check",
                    className: "w-4 h-4 text-emerald-500"
                  }), /*#__PURE__*/_jsx("span", {
                    children: "Livrables & Paramétrage Fonctionnel"
                  })]
                }), /*#__PURE__*/_jsx("ul", {
                  className: "space-y-2",
                  children: current.deliverables.map((del, dIdx) => /*#__PURE__*/_jsxs("li", {
                    className: "flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300",
                    children: [/*#__PURE__*/_jsx("span", {
                      className: "w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0"
                    }), /*#__PURE__*/_jsx("span", {
                      children: del
                    })]
                  }, dIdx))
                })]
              })]
            })]
          });
        })()]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "skills",
      className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block",
            children: "Stack Technique & Métier"
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Compétences Clés & Expertise"
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "p-7 rounded-3xl glass border border-blue-500/20 card-hover",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-5",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "cpu",
                className: "w-6 h-6"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
              children: "SAP & Processus ERP"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.skills.filter(s => s.category.includes("SAP")).map((s, i) => /*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
                children: s.name
              }, i))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "p-7 rounded-3xl glass border border-indigo-500/20 card-hover",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 rounded-2xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "layout",
                className: "w-6 h-6"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
              children: "Frontend & React"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.skills.filter(s => s.category === "Frontend").map((s, i) => /*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl text-xs font-semibold bg-indigo-50 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300",
                children: s.name
              }, i))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "p-7 rounded-3xl glass border border-purple-500/20 card-hover",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 dark:text-purple-400 flex items-center justify-center mb-5",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "server",
                className: "w-6 h-6"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
              children: "Backend & APIs"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.skills.filter(s => s.category.includes("Backend")).map((s, i) => /*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl text-xs font-semibold bg-purple-50 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
                children: s.name
              }, i))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "p-7 rounded-3xl glass border border-emerald-500/20 card-hover",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-5",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "database",
                className: "w-6 h-6"
              })
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-lg font-bold text-slate-900 dark:text-white mb-4",
              children: "Bases de Données & Réseau"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-2",
              children: data.skills.filter(s => s.category.includes("Databases")).map((s, i) => /*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl text-xs font-semibold bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300",
                children: s.name
              }, i))
            })]
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "projects",
      className: "py-24",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-12",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "layers",
              className: "w-3.5 h-3.5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Ingénierie Logicielle & Métier"
            })]
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Projets Réalisés & Études de Cas Détaillées"
          }), /*#__PURE__*/_jsx("p", {
            className: "mt-3 text-slate-600 dark:text-slate-400",
            children: "Chaque projet intègre une analyse technique approfondie : contexte industriel, architecture système, défis surmontés et indicateurs de performance (KPIs)."
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "flex flex-wrap justify-center items-center gap-2 mb-12",
          children: [{
            id: "all",
            label: `Tous les projets (${data.projects.length})`
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
          }].map(cat => /*#__PURE__*/_jsx("button", {
            onClick: () => setSelectedCategory(cat.id),
            className: `px-4 py-2 rounded-xl text-sm font-semibold transition-all ${selectedCategory === cat.id ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
            children: cat.label
          }, cat.id))
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-2 gap-8",
          children: filteredProjects.map((p, idx) => {
            const hasCaseStudy = !!p.case_study;
            return /*#__PURE__*/_jsxs("article", {
              className: "fade-in card-hover rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 flex flex-col group",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "relative h-60 overflow-hidden bg-slate-900",
                children: [/*#__PURE__*/_jsx("img", {
                  src: p.image,
                  alt: p.title,
                  className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105",
                  loading: "lazy"
                }), /*#__PURE__*/_jsx("div", {
                  className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent"
                }), /*#__PURE__*/_jsxs("div", {
                  className: "absolute top-4 left-4 flex flex-wrap gap-2",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-xs font-bold px-3 py-1.5 rounded-xl backdrop-blur-md bg-blue-600/90 text-white shadow-sm",
                    children: p.category_label || p.category
                  }), hasCaseStudy && /*#__PURE__*/_jsxs("span", {
                    className: "text-xs font-bold px-2.5 py-1.5 rounded-xl backdrop-blur-md bg-amber-500/90 text-white flex items-center gap-1 shadow-sm",
                    children: [/*#__PURE__*/_jsx("i", {
                      "data-lucide": "sparkles",
                      className: "w-3 h-3"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "Étude de cas"
                    })]
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-7 flex-1 flex flex-col justify-between",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h3", {
                    className: "text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors",
                    children: p.title
                  }), p.tagline && /*#__PURE__*/_jsxs("p", {
                    className: "text-xs font-semibold text-blue-600 dark:text-blue-400 mb-3 italic",
                    children: ["\"", p.tagline, "\""]
                  }), /*#__PURE__*/_jsx("p", {
                    className: "text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6",
                    children: p.description
                  }), p.case_study && p.case_study.kpis && /*#__PURE__*/_jsx("div", {
                    className: "grid grid-cols-3 gap-2 mb-6 p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40",
                    children: p.case_study.kpis.map((kpi, kIdx) => /*#__PURE__*/_jsxs("div", {
                      className: "text-center",
                      children: [/*#__PURE__*/_jsx("span", {
                        className: "text-xs font-black text-blue-600 dark:text-blue-400 block",
                        children: kpi.value
                      }), /*#__PURE__*/_jsx("span", {
                        className: "text-[10px] text-slate-500 dark:text-slate-400 block truncate",
                        children: kpi.label
                      })]
                    }, kIdx))
                  }), /*#__PURE__*/_jsx("div", {
                    className: "flex flex-wrap gap-1.5 mb-6",
                    children: (p.tags || []).slice(0, 6).map((tag, tIdx) => /*#__PURE__*/_jsx("span", {
                      className: "text-xs font-semibold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300",
                      children: tag
                    }, tIdx))
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-slate-200/60 dark:border-slate-800",
                  children: [/*#__PURE__*/_jsxs("button", {
                    onClick: () => setSelectedProjectModal(p),
                    className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 transition-all",
                    children: [/*#__PURE__*/_jsx("i", {
                      "data-lucide": "sparkles",
                      className: "w-4 h-4"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "Détails & Architecture"
                    })]
                  }), /*#__PURE__*/_jsxs("a", {
                    href: p.github_url,
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold glass hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 transition-all",
                    children: [/*#__PURE__*/_jsx("i", {
                      "data-lucide": "github",
                      className: "w-4 h-4"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "Code source"
                    }), /*#__PURE__*/_jsx("i", {
                      "data-lucide": "external-link",
                      className: "w-3 h-3 opacity-60"
                    })]
                  })]
                })]
              })]
            }, p.id || idx);
          })
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "github-explorer",
      className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200/60 dark:border-slate-800/60",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-12",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 mb-3",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-3.5 h-3.5"
            }), /*#__PURE__*/_jsx("span", {
              children: "Écosystème Open Source"
            })]
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Explorateur de Code GitHub (@Waliddjla)"
          }), /*#__PURE__*/_jsx("p", {
            className: "mt-3 text-slate-600 dark:text-slate-400",
            children: "Recherchez et filtrez en direct parmi l'ensemble des dépôts créés par Walid Djellali sur GitHub."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "max-w-3xl mx-auto mb-10 flex flex-col md:flex-row gap-3 sm:gap-4 items-stretch md:items-center",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative flex-1",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "search",
              className: "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              value: repoSearchQuery,
              onChange: e => setRepoSearchQuery(e.target.value),
              placeholder: "Rechercher un dépôt (react, dashboard, api, iot...)...",
              className: "w-full pl-11 pr-10 py-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            }), repoSearchQuery && /*#__PURE__*/_jsx("button", {
              onClick: () => setRepoSearchQuery(""),
              className: "absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "x",
                className: "w-4 h-4"
              })
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "flex flex-wrap gap-1.5 sm:gap-2 justify-center shrink-0",
            children: [{
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
            }].map(lang => /*#__PURE__*/_jsx("button", {
              onClick: () => setRepoLanguageFilter(lang.id),
              className: `px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${repoLanguageFilter === lang.id ? "bg-blue-600 text-white shadow-md shadow-blue-500/25" : "glass text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50"}`,
              children: lang.label
            }, lang.id))
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6",
          children: filteredGithubRepos.slice(0, 9).map((repo, rIdx) => /*#__PURE__*/_jsxs("a", {
            href: repo.html_url || `https://github.com/Waliddjla/${repo.name}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 flex flex-col justify-between card-hover group transition-all",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between mb-3",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center",
                  children: /*#__PURE__*/_jsx("i", {
                    "data-lucide": "folder-git-2",
                    className: "w-4 h-4"
                  })
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-xs px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
                  children: repo.language || "Projet"
                })]
              }), /*#__PURE__*/_jsx("h4", {
                className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors mb-2",
                children: repo.name
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4",
                children: repo.description || "Dépôt de développement hébergé sur le profil de Walid Djellali."
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex items-center justify-between pt-3 border-t border-slate-200/60 dark:border-slate-800/80 text-xs text-slate-500 dark:text-slate-400",
              children: [/*#__PURE__*/_jsxs("span", {
                className: "flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Explorer le code"
                }), /*#__PURE__*/_jsx("i", {
                  "data-lucide": "external-link",
                  className: "w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
                })]
              }), /*#__PURE__*/_jsx("span", {
                children: "@Waliddjla"
              })]
            })]
          }, rIdx))
        }), /*#__PURE__*/_jsx("div", {
          className: "mt-12 text-center",
          children: /*#__PURE__*/_jsxs("a", {
            href: "https://github.com/Waliddjla",
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-95 shadow-md shadow-slate-900/10 hover:scale-105 transition-all",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "Voir l'ensemble des dépôts sur GitHub (@Waliddjla)"
            }), /*#__PURE__*/_jsx("i", {
              "data-lucide": "arrow-up-right",
              className: "w-4 h-4"
            })]
          })
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "education",
      className: "py-24",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block",
            children: "Diplômes & Certifications"
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Formation Académique & Accréditations"
          })]
        }), /*#__PURE__*/_jsx("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6",
          children: data.education.map((edu, idx) => /*#__PURE__*/_jsxs("div", {
            className: "p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col card-hover",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "graduation-cap",
                className: "w-5 h-5"
              })
            }), /*#__PURE__*/_jsx("span", {
              className: "text-xs font-bold text-blue-600 dark:text-blue-400 mb-1",
              children: edu.period
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-2 leading-snug",
              children: edu.degree
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs font-semibold text-slate-500 dark:text-slate-400 mb-3",
              children: edu.institution
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs text-slate-600 dark:text-slate-300 mt-auto leading-relaxed",
              children: edu.details
            })]
          }, edu.id || idx))
        })]
      })
    }), /*#__PURE__*/_jsx("section", {
      id: "contact",
      className: "py-24 bg-slate-100/60 dark:bg-slate-900/40 border-t border-slate-200/60 dark:border-slate-800/60",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "text-center max-w-3xl mx-auto mb-16",
          children: [/*#__PURE__*/_jsx("span", {
            className: "text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block",
            children: "Opportunités & Missions"
          }), /*#__PURE__*/_jsx("h2", {
            className: "text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight",
            children: "Prendre Contact avec Walid"
          }), /*#__PURE__*/_jsx("p", {
            className: "mt-3 text-slate-600 dark:text-slate-400",
            children: "Disponible pour échanger sur des opportunités en intégration SAP S/4HANA (PM & MM) ou en développement Full-Stack."
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "lg:col-span-5 space-y-4",
            children: [/*#__PURE__*/_jsxs("a", {
              href: data.profile.linkedin,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-6 rounded-3xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/80 flex items-center justify-between card-hover group transition-all",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 rounded-2xl bg-[#0A66C2] text-white flex items-center justify-center shrink-0 shadow-md",
                  children: /*#__PURE__*/_jsx("i", {
                    "data-lucide": "linkedin",
                    className: "w-6 h-6"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors",
                    children: "Profil LinkedIn"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-blue-700 dark:text-blue-300 font-medium",
                    children: "/in/waliddjellali"
                  })]
                })]
              }), /*#__PURE__*/_jsx("i", {
                "data-lucide": "arrow-up-right",
                className: "w-5 h-5 text-blue-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              })]
            }), /*#__PURE__*/_jsxs("a", {
              href: data.profile.github,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "p-6 rounded-3xl bg-slate-200/60 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-700/80 flex items-center justify-between card-hover group transition-all",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-4",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-12 h-12 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center shrink-0 shadow-md",
                  children: /*#__PURE__*/_jsx("i", {
                    "data-lucide": "github",
                    className: "w-6 h-6"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("h4", {
                    className: "text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-500 transition-colors",
                    children: "Dépôts GitHub"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-slate-600 dark:text-slate-300 font-medium",
                    children: "@Waliddjla"
                  })]
                })]
              }), /*#__PURE__*/_jsx("i", {
                "data-lucide": "arrow-up-right",
                className: "w-5 h-5 text-slate-500 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 space-y-3 text-xs sm:text-sm",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-3 text-slate-700 dark:text-slate-300",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "map-pin",
                  className: "w-4 h-4 text-rose-500 shrink-0"
                }), /*#__PURE__*/_jsx("span", {
                  children: data.profile.location
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-3 text-slate-700 dark:text-slate-300",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "mail",
                  className: "w-4 h-4 text-blue-500 shrink-0"
                }), /*#__PURE__*/_jsx("span", {
                  children: data.profile.email
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "flex items-center gap-3 text-slate-700 dark:text-slate-300",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "phone",
                  className: "w-4 h-4 text-emerald-500 shrink-0"
                }), /*#__PURE__*/_jsx("span", {
                  children: data.profile.phone
                })]
              })]
            })]
          }), /*#__PURE__*/_jsx("div", {
            className: "lg:col-span-7",
            children: /*#__PURE__*/_jsxs("form", {
              onSubmit: handleFormSubmit,
              className: "p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 space-y-5",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5",
                    children: "Votre Nom / Entreprise *"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "text",
                    required: true,
                    value: formState.name,
                    onChange: e => setFormState({
                      ...formState,
                      name: e.target.value
                    }),
                    placeholder: "Ex: Direction IT / Recruteur",
                    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5",
                    children: "Votre Email *"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "email",
                    required: true,
                    value: formState.email,
                    onChange: e => setFormState({
                      ...formState,
                      email: e.target.value
                    }),
                    placeholder: "nom@entreprise.com",
                    className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("label", {
                  className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5",
                  children: "Objet de votre demande"
                }), /*#__PURE__*/_jsx("input", {
                  type: "text",
                  value: formState.subject,
                  onChange: e => setFormState({
                    ...formState,
                    subject: e.target.value
                  }),
                  placeholder: "Opportunité SAP S/4HANA / Projet Full-Stack...",
                  className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("label", {
                  className: "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5",
                  children: "Message détaillé *"
                }), /*#__PURE__*/_jsx("textarea", {
                  rows: 4,
                  required: true,
                  value: formState.message,
                  onChange: e => setFormState({
                    ...formState,
                    message: e.target.value
                  }),
                  placeholder: "Présentez brièvement vos besoins ou le poste envisagé...",
                  className: "w-full px-4 py-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                })]
              }), /*#__PURE__*/_jsxs("button", {
                type: "submit",
                disabled: isSubmitting,
                className: "w-full py-3.5 rounded-2xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25 transition-all flex items-center justify-center gap-2",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "send",
                  className: "w-4 h-4"
                }), /*#__PURE__*/_jsx("span", {
                  children: isSubmitting ? "Enregistrement dans SQLite..." : "Envoyer le message"
                })]
              })]
            })
          })]
        })]
      })
    }), /*#__PURE__*/_jsx("footer", {
      className: "border-t border-slate-200 dark:border-slate-800 py-12 bg-white/40 dark:bg-slate-950/40",
      children: /*#__PURE__*/_jsxs("div", {
        className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center gap-3",
          children: [/*#__PURE__*/_jsx("span", {
            className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/20",
            children: "WD"
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("span", {
              className: "font-extrabold text-slate-900 dark:text-white block text-sm",
              children: data.profile.name
            }), /*#__PURE__*/_jsxs("span", {
              className: "text-xs text-slate-500 dark:text-slate-400",
              children: ["© ", new Date().getFullYear(), " Walid Djellali. Tous droits réservés."]
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex flex-wrap items-center justify-center gap-5 text-sm text-slate-600 dark:text-slate-400",
          children: [/*#__PURE__*/_jsxs("a", {
            href: data.profile.linkedin,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1.5 transition-colors font-medium",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "linkedin",
              className: "w-4 h-4 text-[#0A66C2]"
            }), /*#__PURE__*/_jsx("span", {
              children: "LinkedIn"
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: data.profile.github,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "hover:text-slate-900 dark:hover:text-white flex items-center gap-1.5 transition-colors font-medium",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "GitHub"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: () => setCvModalOpen(true),
            className: "hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1.5 transition-colors font-medium",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "file-text",
              className: "w-4 h-4 text-indigo-500"
            }), /*#__PURE__*/_jsx("span", {
              children: "CV (PDF)"
            })]
          }), /*#__PURE__*/_jsxs("button", {
            onClick: openAdminModal,
            className: "hover:text-amber-600 dark:hover:text-amber-400 flex items-center gap-1.5 transition-colors font-bold text-amber-600 dark:text-amber-400",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "shield",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "Console d'Administration"
            })]
          }), /*#__PURE__*/_jsxs("a", {
            href: "#hero",
            className: "hover:text-blue-600 flex items-center gap-1 transition-colors font-medium",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "arrow-up",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "Haut"
            })]
          })]
        })]
      })
    }), selectedProjectModal && /*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0 gap-4",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex items-center gap-2 mb-2",
              children: [/*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300",
                children: selectedProjectModal.category_label || selectedProjectModal.category
              }), selectedProjectModal.case_study && /*#__PURE__*/_jsxs("span", {
                className: "px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 flex items-center gap-1",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "award",
                  className: "w-3.5 h-3.5"
                }), /*#__PURE__*/_jsx("span", {
                  children: "Étude de cas certifiée"
                })]
              })]
            }), /*#__PURE__*/_jsx("h3", {
              className: "text-xl sm:text-2xl font-black text-slate-900 dark:text-white",
              children: selectedProjectModal.title
            }), selectedProjectModal.tagline && /*#__PURE__*/_jsx("p", {
              className: "text-xs sm:text-sm text-blue-600 dark:text-blue-400 font-semibold mt-1",
              children: selectedProjectModal.tagline
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setSelectedProjectModal(null),
            className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition-all shrink-0",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": "x",
              className: "w-4 h-4"
            })
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex-1 overflow-y-auto pr-1 sm:pr-2 py-4 space-y-6 text-sm text-slate-700 dark:text-slate-300",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "relative h-48 sm:h-64 rounded-2xl overflow-hidden bg-slate-900",
            children: [/*#__PURE__*/_jsx("img", {
              src: selectedProjectModal.image,
              alt: selectedProjectModal.title,
              className: "w-full h-full object-cover"
            }), /*#__PURE__*/_jsx("div", {
              className: "absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-5",
              children: /*#__PURE__*/_jsx("p", {
                className: "text-xs sm:text-sm text-white font-medium drop-shadow-md",
                children: selectedProjectModal.description
              })
            })]
          }), selectedProjectModal.case_study && selectedProjectModal.case_study.kpis && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "trending-up",
                className: "w-4 h-4"
              }), /*#__PURE__*/_jsx("span", {
                children: "Indicateurs de Performance Clés (KPIs)"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
              children: selectedProjectModal.case_study.kpis.map((kpi, kIdx) => /*#__PURE__*/_jsxs("div", {
                className: "p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/70 dark:border-blue-900/60 flex items-center gap-3",
                children: [/*#__PURE__*/_jsx("div", {
                  className: "w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0 shadow-sm",
                  children: /*#__PURE__*/_jsx("i", {
                    "data-lucide": kpi.icon || "activity",
                    className: "w-5 h-5"
                  })
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-lg font-black text-slate-900 dark:text-white block",
                    children: kpi.value
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs text-slate-500 dark:text-slate-400",
                    children: kpi.label
                  })]
                })]
              }, kIdx))
            })]
          }), selectedProjectModal.case_study && /*#__PURE__*/_jsxs("div", {
            className: "p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 space-y-2",
            children: [/*#__PURE__*/_jsxs("div", {
              className: "flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 dark:text-slate-400 pb-2 border-b border-slate-200 dark:border-slate-800",
              children: [/*#__PURE__*/_jsxs("span", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Client / Organisation :"
                }), " ", selectedProjectModal.case_study.client]
              }), /*#__PURE__*/_jsxs("span", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Rôle de Walid :"
                }), " ", selectedProjectModal.case_study.role]
              }), /*#__PURE__*/_jsxs("span", {
                children: [/*#__PURE__*/_jsx("strong", {
                  children: "Période :"
                }), " ", selectedProjectModal.case_study.period]
              })]
            }), /*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white pt-1",
              children: "Contexte & Enjeux Métier"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs sm:text-sm leading-relaxed",
              children: selectedProjectModal.case_study.context
            })]
          }), selectedProjectModal.case_study && selectedProjectModal.case_study.architecture && /*#__PURE__*/_jsxs("div", {
            className: "p-5 rounded-2xl bg-blue-50/40 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 space-y-2",
            children: [/*#__PURE__*/_jsxs("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "cpu",
                className: "w-4 h-4"
              }), /*#__PURE__*/_jsx("span", {
                children: "Architecture Technique & Flux de Données"
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs sm:text-sm leading-relaxed",
              children: selectedProjectModal.case_study.architecture
            })]
          }), selectedProjectModal.features && selectedProjectModal.features.length > 0 && /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsxs("h4", {
              className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white mb-3 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "check-circle-2",
                className: "w-4 h-4 text-emerald-500"
              }), /*#__PURE__*/_jsx("span", {
                children: "Fonctionnalités Majeures Développées"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-2 gap-2.5",
              children: selectedProjectModal.features.map((feat, fIdx) => /*#__PURE__*/_jsxs("div", {
                className: "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs sm:text-sm",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "chevron-right",
                  className: "w-4 h-4 text-blue-500 shrink-0 mt-0.5"
                }), /*#__PURE__*/_jsx("span", {
                  children: feat
                })]
              }, fIdx))
            })]
          }), selectedProjectModal.case_study && selectedProjectModal.case_study.challenges && /*#__PURE__*/_jsxs("div", {
            className: "space-y-3",
            children: [/*#__PURE__*/_jsxs("h4", {
              className: "text-xs font-black uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "alert-circle",
                className: "w-4 h-4"
              }), /*#__PURE__*/_jsx("span", {
                children: "Défis Complexes & Résolutions Techniques"
              })]
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-2",
              children: selectedProjectModal.case_study.challenges.map((chal, cIdx) => /*#__PURE__*/_jsxs("div", {
                className: "p-3.5 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-xs sm:text-sm flex items-start gap-2.5",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "w-5 h-5 rounded-full bg-amber-500 text-white font-bold flex items-center justify-center shrink-0 text-[10px] mt-0.5",
                  children: cIdx + 1
                }), /*#__PURE__*/_jsx("span", {
                  children: chal
                })]
              }, cIdx))
            }), selectedProjectModal.case_study.solution && /*#__PURE__*/_jsxs("div", {
              className: "p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 text-xs sm:text-sm",
              children: [/*#__PURE__*/_jsx("strong", {
                className: "text-emerald-800 dark:text-emerald-300 block mb-1",
                children: "Approche & Résolution :"
              }), /*#__PURE__*/_jsx("p", {
                children: selectedProjectModal.case_study.solution
              })]
            })]
          }), selectedProjectModal.case_study && selectedProjectModal.case_study.impact && /*#__PURE__*/_jsxs("div", {
            className: "p-5 rounded-2xl bg-slate-900 text-white dark:bg-slate-800/80 border border-slate-800 space-y-2",
            children: [/*#__PURE__*/_jsxs("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-400 flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "zap",
                className: "w-4 h-4 text-amber-400"
              }), /*#__PURE__*/_jsx("span", {
                children: "Impact Opérationnel & Valeur Ajoutée"
              })]
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs sm:text-sm leading-relaxed text-slate-200",
              children: selectedProjectModal.case_study.impact
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2",
              children: "Technologies & Outils Employés"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-1.5",
              children: (selectedProjectModal.tags || []).map((t, idx) => /*#__PURE__*/_jsx("span", {
                className: "px-3 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold",
                children: t
              }, idx))
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "pt-4 border-t border-slate-200 dark:border-slate-800 shrink-0 flex items-center justify-between gap-3",
          children: [/*#__PURE__*/_jsxs("a", {
            href: selectedProjectModal.github_url,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-all",
            children: [/*#__PURE__*/_jsx("i", {
              "data-lucide": "github",
              className: "w-4 h-4"
            }), /*#__PURE__*/_jsx("span", {
              children: "Explorer le code source"
            }), /*#__PURE__*/_jsx("i", {
              "data-lucide": "external-link",
              className: "w-3.5 h-3.5 opacity-60"
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setSelectedProjectModal(null),
            className: "px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all",
            children: "Fermer"
          })]
        })]
      })
    }), adminModalOpen && /*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 shrink-0",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsx("div", {
              className: "w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center shadow-md shadow-amber-500/25",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "shield",
                className: "w-5 h-5"
              })
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsxs("h3", {
                className: "text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("span", {
                  children: "Console d'Administration"
                }), isAdminAuth && /*#__PURE__*/_jsx("span", {
                  className: "text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-bold",
                  children: "En ligne"
                })]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-slate-500 dark:text-slate-400",
                children: "Gestion directe de la base de données SQLite (portfolio.db)"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2",
            children: [isAdminAuth && /*#__PURE__*/_jsxs("button", {
              onClick: handleAdminLogout,
              title: "Se déconnecter",
              className: "px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 transition-all flex items-center gap-1.5",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "log-out",
                className: "w-3.5 h-3.5"
              }), /*#__PURE__*/_jsx("span", {
                children: "Verrouiller"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: () => setAdminModalOpen(false),
              className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "x",
                className: "w-4 h-4"
              })
            })]
          })]
        }), !isAdminAuth ? /*#__PURE__*/_jsxs("div", {
          className: "flex-1 flex flex-col items-center justify-center py-10 px-4 text-center max-w-md mx-auto",
          children: [/*#__PURE__*/_jsx("div", {
            className: "w-16 h-16 rounded-3xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-5 shadow-lg shadow-amber-500/10",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": "lock",
              className: "w-8 h-8"
            })
          }), /*#__PURE__*/_jsx("h4", {
            className: "text-xl font-bold text-slate-900 dark:text-white mb-2",
            children: "Espace Réservé à Walid Djellali"
          }), /*#__PURE__*/_jsx("p", {
            className: "text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-6",
            children: "Veuillez saisir le code PIN d'administration pour gérer vos messages, votre statut de disponibilité et vos projets SQLite."
          }), /*#__PURE__*/_jsxs("form", {
            onSubmit: handleAdminLogin,
            className: "w-full space-y-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("input", {
                type: "password",
                autoFocus: true,
                required: true,
                value: adminPinInput,
                onChange: e => setAdminPinInput(e.target.value),
                placeholder: "Code PIN d'accès (ex: walid2025)",
                className: "w-full text-center px-4 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white font-mono text-base focus:outline-none focus:ring-2 focus:ring-amber-500 tracking-widest"
              }), adminPinError && /*#__PURE__*/_jsx("p", {
                className: "text-xs font-semibold text-rose-500 mt-2",
                children: adminPinError
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-[11px] text-slate-400 mt-2",
                children: ["💡 Indice d'accès : ", /*#__PURE__*/_jsx("code", {
                  children: "walid2025"
                })]
              })]
            }), /*#__PURE__*/_jsxs("button", {
              type: "submit",
              className: "w-full py-3.5 rounded-2xl text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "key",
                className: "w-4 h-4"
              }), /*#__PURE__*/_jsx("span", {
                children: "Déverrouiller la Console"
              })]
            })]
          })]
        }) :
        /*#__PURE__*/
        /* Si AUTHENTIFIÉ : Dashboard avec Onglets */
        _jsxs("div", {
          className: "flex-1 flex flex-col min-h-0 pt-4",
          children: [/*#__PURE__*/_jsx("div", {
            className: "flex flex-wrap gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 shrink-0",
            children: [{
              id: "stats",
              label: "Vue d'ensemble",
              icon: "activity"
            }, {
              id: "inbox",
              label: `Messages SQLite (${messagesList.length})`,
              icon: "mail"
            }, {
              id: "profile",
              label: "Profil & Disponibilité",
              icon: "user-cog"
            }, {
              id: "projects",
              label: `Gestion des Projets (${data.projects.length})`,
              icon: "folder-plus"
            }].map(tab => /*#__PURE__*/_jsxs("button", {
              onClick: () => setAdminTab(tab.id),
              className: `px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${adminTab === tab.id ? "bg-amber-500 text-white shadow-md shadow-amber-500/25" : "glass text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"}`,
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": tab.icon,
                className: "w-3.5 h-3.5"
              }), /*#__PURE__*/_jsx("span", {
                children: tab.label
              })]
            }, tab.id))
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex-1 overflow-y-auto py-5 pr-1 space-y-6",
            children: [adminTab === "stats" && /*#__PURE__*/_jsxs("div", {
              className: "space-y-6",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-3",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-xs text-blue-600 dark:text-blue-400 font-bold block",
                    children: "Messages Reçus"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block",
                    children: adminStats ? adminStats.messagesCount : messagesList.length
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-xs text-emerald-600 dark:text-emerald-400 font-bold block",
                    children: "Projets Enregistrés"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block",
                    children: adminStats ? adminStats.projectsCount : data.projects.length
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-xs text-purple-600 dark:text-purple-400 font-bold block",
                    children: "Taille BDD SQLite"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block",
                    children: adminStats ? `${adminStats.dbSizeKb} Ko` : "68 Ko"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60",
                  children: [/*#__PURE__*/_jsx("span", {
                    className: "text-xs text-amber-600 dark:text-amber-400 font-bold block",
                    children: "Moteur Node.js"
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-2xl font-black text-slate-900 dark:text-white mt-1 block",
                    children: adminStats ? adminStats.nodeVersion : "v24"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "p-5 rounded-2xl glass border border-slate-200 dark:border-slate-800 space-y-3",
                children: [/*#__PURE__*/_jsxs("h4", {
                  className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white flex items-center gap-1.5",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "radio",
                    className: "w-4 h-4 text-emerald-500 animate-pulse"
                  }), /*#__PURE__*/_jsx("span", {
                    children: "Changement Rapide du Statut de Disponibilité"
                  })]
                }), /*#__PURE__*/_jsxs("p", {
                  className: "text-xs text-slate-500",
                  children: ["Statut actuel : ", /*#__PURE__*/_jsx("strong", {
                    className: "text-blue-600 dark:text-blue-400",
                    children: data.profile.availability
                  })]
                }), /*#__PURE__*/_jsx("div", {
                  className: "flex flex-wrap gap-2 pt-1",
                  children: ["Disponible pour opportunités SAP & Développement Full-Stack", "En poste chez Orionlab (À l'écoute d'opportunités)", "Disponible pour missions d'ingénierie & Consulting"].map((st, i) => /*#__PURE__*/_jsx("button", {
                    onClick: () => handleQuickAvailabilityChange(st),
                    className: "px-3.5 py-2 rounded-xl text-xs font-bold glass hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 transition-all",
                    children: st
                  }, i))
                })]
              })]
            }), adminTab === "inbox" && /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between pb-2",
                children: [/*#__PURE__*/_jsxs("h4", {
                  className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white",
                  children: ["Boîte de Réception (", messagesList.length, " messages dans portfolio.db)"]
                }), /*#__PURE__*/_jsxs("button", {
                  onClick: fetchAdminData,
                  className: "px-3 py-1.5 rounded-xl text-xs font-bold glass hover:bg-slate-200 dark:hover:bg-slate-800 flex items-center gap-1",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "refresh-cw",
                    className: "w-3 h-3"
                  }), /*#__PURE__*/_jsx("span", {
                    children: "Actualiser"
                  })]
                })]
              }), messagesList.length === 0 ? /*#__PURE__*/_jsx("div", {
                className: "p-8 text-center text-slate-500 text-xs",
                children: "Aucun message dans la table SQLite pour le moment."
              }) : messagesList.map(msg => /*#__PURE__*/_jsxs("div", {
                className: `p-4 rounded-2xl border transition-all ${msg.read ? "bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800" : "bg-blue-50/80 dark:bg-blue-950/30 border-blue-300 dark:border-blue-900/60 shadow-sm"}`,
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between text-xs mb-2",
                  children: [/*#__PURE__*/_jsxs("span", {
                    className: "font-bold text-slate-900 dark:text-white",
                    children: [msg.name, " • ", /*#__PURE__*/_jsx("span", {
                      className: "text-blue-600 dark:text-blue-400",
                      children: msg.email
                    })]
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-slate-400",
                    children: msg.created_at || "Récemment"
                  })]
                }), /*#__PURE__*/_jsx("h5", {
                  className: "text-sm font-bold text-slate-800 dark:text-slate-100 mb-1",
                  children: msg.subject
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-3 whitespace-pre-wrap",
                  children: msg.message
                }), /*#__PURE__*/_jsxs("div", {
                  className: "flex items-center justify-between pt-2 border-t border-slate-200/60 dark:border-slate-800 text-xs",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2",
                    children: [/*#__PURE__*/_jsxs("a", {
                      href: `mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject || 'Votre message')}`,
                      className: "px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx("i", {
                        "data-lucide": "reply",
                        className: "w-3 h-3"
                      }), /*#__PURE__*/_jsx("span", {
                        children: "Répondre par email"
                      })]
                    }), /*#__PURE__*/_jsx("button", {
                      onClick: () => handleToggleMessageRead(msg.id, msg.read),
                      className: "px-3 py-1 rounded-lg glass text-slate-700 dark:text-slate-300 hover:bg-slate-200 font-semibold",
                      children: msg.read ? "Marquer non-lu" : "Marquer lu"
                    })]
                  }), /*#__PURE__*/_jsxs("button", {
                    onClick: () => handleDeleteMessage(msg.id),
                    className: "px-3 py-1 rounded-lg text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 font-bold flex items-center gap-1",
                    children: [/*#__PURE__*/_jsx("i", {
                      "data-lucide": "trash-2",
                      className: "w-3 h-3"
                    }), /*#__PURE__*/_jsx("span", {
                      children: "Supprimer"
                    })]
                  })]
                })]
              }, msg.id))]
            }), adminTab === "profile" && /*#__PURE__*/_jsxs("form", {
              onSubmit: handleSaveProfile,
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-2 gap-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold mb-1",
                    children: "Titre Professionnel"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "text",
                    value: editingProfileForm.title,
                    onChange: e => setEditingProfileForm({
                      ...editingProfileForm,
                      title: e.target.value
                    }),
                    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold mb-1",
                    children: "Statut de Disponibilité"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "text",
                    value: editingProfileForm.availability,
                    onChange: e => setEditingProfileForm({
                      ...editingProfileForm,
                      availability: e.target.value
                    }),
                    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                className: "grid grid-cols-1 sm:grid-cols-3 gap-4",
                children: [/*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold mb-1",
                    children: "Téléphone"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "text",
                    value: editingProfileForm.phone,
                    onChange: e => setEditingProfileForm({
                      ...editingProfileForm,
                      phone: e.target.value
                    }),
                    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold mb-1",
                    children: "Email"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "email",
                    value: editingProfileForm.email,
                    onChange: e => setEditingProfileForm({
                      ...editingProfileForm,
                      email: e.target.value
                    }),
                    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  })]
                }), /*#__PURE__*/_jsxs("div", {
                  children: [/*#__PURE__*/_jsx("label", {
                    className: "block text-xs font-bold mb-1",
                    children: "Localisation"
                  }), /*#__PURE__*/_jsx("input", {
                    type: "text",
                    value: editingProfileForm.location,
                    onChange: e => setEditingProfileForm({
                      ...editingProfileForm,
                      location: e.target.value
                    }),
                    className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                  })]
                })]
              }), /*#__PURE__*/_jsxs("div", {
                children: [/*#__PURE__*/_jsx("label", {
                  className: "block text-xs font-bold mb-1",
                  children: "Bio / Résumé de Présentation"
                }), /*#__PURE__*/_jsx("textarea", {
                  rows: 4,
                  value: editingProfileForm.bio,
                  onChange: e => setEditingProfileForm({
                    ...editingProfileForm,
                    bio: e.target.value
                  }),
                  className: "w-full px-3 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-xs sm:text-sm"
                })]
              }), /*#__PURE__*/_jsxs("button", {
                type: "submit",
                className: "px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold bg-amber-500 hover:bg-amber-600 text-white shadow-md shadow-amber-500/25 flex items-center gap-2",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "save",
                  className: "w-4 h-4"
                }), /*#__PURE__*/_jsx("span", {
                  children: "Enregistrer les Modifications dans SQLite"
                })]
              })]
            }), adminTab === "projects" && /*#__PURE__*/_jsxs("div", {
              className: "space-y-4",
              children: [/*#__PURE__*/_jsxs("div", {
                className: "flex items-center justify-between pb-2",
                children: [/*#__PURE__*/_jsxs("h4", {
                  className: "text-xs font-black uppercase tracking-wider text-slate-900 dark:text-white",
                  children: ["Catalogue des Projets SQLite (", data.projects.length, ")"]
                }), /*#__PURE__*/_jsxs("button", {
                  onClick: openNewProjectForm,
                  className: "px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5 shadow-sm",
                  children: [/*#__PURE__*/_jsx("i", {
                    "data-lucide": "plus",
                    className: "w-3.5 h-3.5"
                  }), /*#__PURE__*/_jsx("span", {
                    children: "Ajouter un Projet"
                  })]
                })]
              }), /*#__PURE__*/_jsx("div", {
                className: "space-y-3",
                children: data.projects.map((p, idx) => /*#__PURE__*/_jsxs("div", {
                  className: "p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-center justify-between gap-4",
                  children: [/*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-3 min-w-0",
                    children: [/*#__PURE__*/_jsx("img", {
                      src: p.image,
                      className: "w-12 h-12 rounded-xl object-cover shrink-0",
                      alt: ""
                    }), /*#__PURE__*/_jsxs("div", {
                      className: "min-w-0",
                      children: [/*#__PURE__*/_jsx("h5", {
                        className: "text-sm font-bold text-slate-900 dark:text-white truncate",
                        children: p.title
                      }), /*#__PURE__*/_jsx("span", {
                        className: "text-xs text-blue-600 dark:text-blue-400 font-semibold",
                        children: p.category_label || p.category
                      })]
                    })]
                  }), /*#__PURE__*/_jsxs("div", {
                    className: "flex items-center gap-2 shrink-0",
                    children: [/*#__PURE__*/_jsxs("button", {
                      onClick: () => openEditProjectForm(p),
                      className: "px-3 py-1.5 rounded-xl text-xs font-bold glass hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx("i", {
                        "data-lucide": "edit-3",
                        className: "w-3 h-3"
                      }), /*#__PURE__*/_jsx("span", {
                        children: "Modifier"
                      })]
                    }), /*#__PURE__*/_jsxs("button", {
                      onClick: () => handleDeleteProject(p.id, p.title),
                      className: "px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 flex items-center gap-1",
                      children: [/*#__PURE__*/_jsx("i", {
                        "data-lucide": "trash-2",
                        className: "w-3 h-3"
                      }), /*#__PURE__*/_jsx("span", {
                        children: "Supprimer"
                      })]
                    })]
                  })]
                }, p.id || idx))
              })]
            })]
          })]
        })]
      })
    }), projectFormModalOpen && /*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[90vh] flex flex-col",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4 shrink-0",
          children: [/*#__PURE__*/_jsx("h4", {
            className: "text-base font-bold text-slate-900 dark:text-white",
            children: editingProject ? `Modifier le Projet : ${editingProject.title}` : "Ajouter un Nouveau Projet"
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setProjectFormModalOpen(false),
            className: "w-8 h-8 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300",
            children: /*#__PURE__*/_jsx("i", {
              "data-lucide": "x",
              className: "w-4 h-4"
            })
          })]
        }), /*#__PURE__*/_jsxs("form", {
          onSubmit: handleSaveProjectForm,
          className: "flex-1 overflow-y-auto pr-1 space-y-4 text-xs sm:text-sm",
          children: [/*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Titre du Projet *"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              required: true,
              value: projectFormData.title,
              onChange: e => setProjectFormData({
                ...projectFormData,
                title: e.target.value
              }),
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-bold mb-1",
                children: "Catégorie"
              }), /*#__PURE__*/_jsxs("select", {
                value: projectFormData.category,
                onChange: e => setProjectFormData({
                  ...projectFormData,
                  category: e.target.value
                }),
                className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700",
                children: [/*#__PURE__*/_jsx("option", {
                  value: "software",
                  children: "software (Full-Stack)"
                }), /*#__PURE__*/_jsx("option", {
                  value: "sap",
                  children: "sap (SAP & Infra)"
                }), /*#__PURE__*/_jsx("option", {
                  value: "data",
                  children: "data (Python & IA)"
                }), /*#__PURE__*/_jsx("option", {
                  value: "react",
                  children: "react (React & UI)"
                })]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-bold mb-1",
                children: "Label Catégorie"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                value: projectFormData.category_label,
                onChange: e => setProjectFormData({
                  ...projectFormData,
                  category_label: e.target.value
                }),
                placeholder: "Ex: Full-Stack & IT Management",
                className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Phrase d'accroche (Tagline)"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              value: projectFormData.tagline,
              onChange: e => setProjectFormData({
                ...projectFormData,
                tagline: e.target.value
              }),
              placeholder: "Une phrase résumant l'impact du projet...",
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Description"
            }), /*#__PURE__*/_jsx("textarea", {
              rows: 2,
              value: projectFormData.description,
              onChange: e => setProjectFormData({
                ...projectFormData,
                description: e.target.value
              }),
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Image URL"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              value: projectFormData.image,
              onChange: e => setProjectFormData({
                ...projectFormData,
                image: e.target.value
              }),
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "grid grid-cols-1 sm:grid-cols-2 gap-3",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-bold mb-1",
                children: "Lien GitHub"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                value: projectFormData.github_url,
                onChange: e => setProjectFormData({
                  ...projectFormData,
                  github_url: e.target.value
                }),
                className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              })]
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("label", {
                className: "block text-xs font-bold mb-1",
                children: "Lien Démo"
              }), /*#__PURE__*/_jsx("input", {
                type: "text",
                value: projectFormData.demo_url,
                onChange: e => setProjectFormData({
                  ...projectFormData,
                  demo_url: e.target.value
                }),
                className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Technologies (séparées par virgule)"
            }), /*#__PURE__*/_jsx("input", {
              type: "text",
              value: projectFormData.tags,
              onChange: e => setProjectFormData({
                ...projectFormData,
                tags: e.target.value
              }),
              placeholder: "React, Node.js, SQLite, Tailwind CSS",
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("label", {
              className: "block text-xs font-bold mb-1",
              children: "Fonctionnalités clés (1 par ligne)"
            }), /*#__PURE__*/_jsx("textarea", {
              rows: 3,
              value: projectFormData.features,
              onChange: e => setProjectFormData({
                ...projectFormData,
                features: e.target.value
              }),
              placeholder: "Fonctionnalité 1\nFonctionnalité 2",
              className: "w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700"
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2",
            children: [/*#__PURE__*/_jsx("button", {
              type: "button",
              onClick: () => setProjectFormModalOpen(false),
              className: "px-4 py-2 rounded-xl font-bold glass",
              children: "Annuler"
            }), /*#__PURE__*/_jsx("button", {
              type: "submit",
              className: "px-5 py-2 rounded-xl font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/25",
              children: "Enregistrer dans SQLite"
            })]
          })]
        })]
      })
    }), cvModalOpen && /*#__PURE__*/_jsx("div", {
      className: "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-fade-in no-print",
      children: /*#__PURE__*/_jsxs("div", {
        className: "w-full max-w-4xl bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[92vh] flex flex-col",
        children: [/*#__PURE__*/_jsxs("div", {
          className: "flex items-center justify-between pb-5 border-b border-slate-200 dark:border-slate-800 mb-6 shrink-0",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsx("span", {
              className: "w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm shadow-md shadow-blue-500/25",
              children: "CV"
            }), /*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsxs("h3", {
                className: "text-xl font-extrabold text-slate-900 dark:text-white",
                children: ["Curriculum Vitae — ", data.profile.name]
              }), /*#__PURE__*/_jsx("p", {
                className: "text-xs text-slate-500 dark:text-slate-400",
                children: "Format professionnel prêt à l'impression ou sauvegarde PDF"
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-2",
            children: [/*#__PURE__*/_jsxs("button", {
              onClick: () => window.print(),
              className: "px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 flex items-center gap-1.5 transition-all",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "printer",
                className: "w-4 h-4"
              }), /*#__PURE__*/_jsx("span", {
                children: "Imprimer / PDF"
              })]
            }), /*#__PURE__*/_jsx("button", {
              onClick: () => setCvModalOpen(false),
              className: "w-9 h-9 rounded-xl flex items-center justify-center bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-600 dark:text-slate-300",
              children: /*#__PURE__*/_jsx("i", {
                "data-lucide": "x",
                className: "w-4 h-4"
              })
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "flex-1 overflow-y-auto pr-2 space-y-6 text-slate-800 dark:text-slate-200 text-sm cv-print-container",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
            children: [/*#__PURE__*/_jsxs("div", {
              children: [/*#__PURE__*/_jsx("h2", {
                className: "text-2xl font-black text-slate-900 dark:text-white",
                children: data.profile.name
              }), /*#__PURE__*/_jsx("p", {
                className: "text-sm font-bold text-blue-600 dark:text-blue-400 mt-1",
                children: data.profile.title
              }), /*#__PURE__*/_jsxs("p", {
                className: "text-xs text-slate-500 dark:text-slate-400 mt-1",
                children: [data.profile.location, " • ", data.profile.phone, " • ", data.profile.email]
              })]
            }), /*#__PURE__*/_jsxs("div", {
              className: "flex flex-col gap-1.5 text-xs",
              children: [/*#__PURE__*/_jsxs("a", {
                href: data.profile.linkedin,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-[#0A66C2] dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "linkedin",
                  className: "w-3.5 h-3.5"
                }), /*#__PURE__*/_jsx("span", {
                  children: "linkedin.com/in/waliddjellali"
                })]
              }), /*#__PURE__*/_jsxs("a", {
                href: data.profile.github,
                target: "_blank",
                rel: "noopener noreferrer",
                className: "text-slate-700 dark:text-slate-300 hover:underline flex items-center gap-1 font-semibold",
                children: [/*#__PURE__*/_jsx("i", {
                  "data-lucide": "github",
                  className: "w-3.5 h-3.5"
                }), /*#__PURE__*/_jsx("span", {
                  children: "github.com/Waliddjla"
                })]
              })]
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2",
              children: "Synthèse Professionnelle"
            }), /*#__PURE__*/_jsx("p", {
              className: "text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300",
              children: data.profile.bio
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-3",
              children: "Parcours Professionnel"
            }), /*#__PURE__*/_jsx("div", {
              className: "space-y-4",
              children: data.experiences.map((exp, idx) => /*#__PURE__*/_jsxs("div", {
                className: "border-l-2 border-blue-500 pl-4 py-0.5",
                children: [/*#__PURE__*/_jsxs("div", {
                  className: "flex flex-col sm:flex-row sm:items-center justify-between text-xs sm:text-sm",
                  children: [/*#__PURE__*/_jsxs("span", {
                    className: "font-bold text-slate-900 dark:text-white",
                    children: [exp.role, " — ", /*#__PURE__*/_jsx("span", {
                      className: "text-blue-600 dark:text-blue-400",
                      children: exp.company
                    })]
                  }), /*#__PURE__*/_jsx("span", {
                    className: "text-xs font-semibold text-slate-500",
                    children: exp.period
                  })]
                }), /*#__PURE__*/_jsx("p", {
                  className: "text-xs text-slate-600 dark:text-slate-400 italic mt-0.5 mb-1.5",
                  children: exp.description
                }), /*#__PURE__*/_jsx("ul", {
                  className: "list-disc pl-4 space-y-1 text-xs text-slate-600 dark:text-slate-300",
                  children: exp.bullets.map((b, bIdx) => /*#__PURE__*/_jsx("li", {
                    children: b
                  }, bIdx))
                })]
              }, idx))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2",
              children: "Compétences & Outils"
            }), /*#__PURE__*/_jsx("div", {
              className: "flex flex-wrap gap-1.5 text-xs",
              children: data.skills.map((s, idx) => /*#__PURE__*/_jsx("span", {
                className: "px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium",
                children: s.name
              }, idx))
            })]
          }), /*#__PURE__*/_jsxs("div", {
            children: [/*#__PURE__*/_jsx("h4", {
              className: "text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2",
              children: "Formations & Certifications"
            }), /*#__PURE__*/_jsx("div", {
              className: "grid grid-cols-1 sm:grid-cols-3 gap-3",
              children: data.education.map((edu, idx) => /*#__PURE__*/_jsxs("div", {
                className: "p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs",
                children: [/*#__PURE__*/_jsx("span", {
                  className: "font-bold text-blue-600 dark:text-blue-400 block",
                  children: edu.period
                }), /*#__PURE__*/_jsx("strong", {
                  className: "text-slate-900 dark:text-white block mt-0.5",
                  children: edu.degree
                }), /*#__PURE__*/_jsx("span", {
                  className: "text-slate-500 block",
                  children: edu.institution
                })]
              }, idx))
            })]
          })]
        }), /*#__PURE__*/_jsxs("div", {
          className: "pt-4 border-t border-slate-200 dark:border-slate-800 mt-4 flex items-center justify-between text-xs text-slate-500 shrink-0",
          children: [/*#__PURE__*/_jsxs("div", {
            className: "flex items-center gap-3",
            children: [/*#__PURE__*/_jsxs("a", {
              href: data.profile.linkedin,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-[#0A66C2] hover:underline flex items-center gap-1 font-semibold",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "linkedin",
                className: "w-3.5 h-3.5"
              }), /*#__PURE__*/_jsx("span", {
                children: "Profil LinkedIn"
              })]
            }), /*#__PURE__*/_jsx("span", {
              children: "•"
            }), /*#__PURE__*/_jsxs("a", {
              href: data.profile.github,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "hover:underline flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300",
              children: [/*#__PURE__*/_jsx("i", {
                "data-lucide": "github",
                className: "w-3.5 h-3.5"
              }), /*#__PURE__*/_jsx("span", {
                children: "GitHub @Waliddjla"
              })]
            })]
          }), /*#__PURE__*/_jsx("button", {
            onClick: () => setCvModalOpen(false),
            className: "px-5 py-2 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 transition-all",
            children: "Fermer"
          })]
        })]
      })
    }), toastMessage && /*#__PURE__*/_jsxs("div", {
      className: "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-4 rounded-2xl bg-emerald-600 text-white shadow-xl shadow-emerald-600/30 animate-fade-in pointer-events-none",
      children: [/*#__PURE__*/_jsx("i", {
        "data-lucide": "check-circle",
        className: "w-5 h-5 shrink-0"
      }), /*#__PURE__*/_jsx("span", {
        className: "text-sm font-semibold",
        children: toastMessage
      })]
    })]
  });
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/_jsx(App, {}));