# 🚀 Portfolio Dynamique de Walid Djellali (React + SQLite)

Ce portfolio a été spécialement conçu et personnalisé à partir de votre **CV réel** :
- **Walid Djellali** — *SAP Functional Analyst | Full Stack Software Engineer*
- **Expériences clés intégrées :** Orionlab (SAP S/4HANA PM & MM), ACG SIM SPA, SARL Ide-Net Géolocalisation (Node.js/TypeScript & IoT), SARL Gesco Climatisation.
- **Formations & Certifications :** Master en Informatique Parallèle et Embarquée, Licence en Systèmes Informatiques, Certification Cisco CCNA v7.
- **Architecture technique :** **React 18** pour l'interface dynamique, **Tailwind CSS**, et **SQLite** natif (Node.js 24) pour la persistance des données.

---

## 🗄️ Architecture Full-Stack & Base de Données SQLite

```
test/
├── portfolio.db            # Base de données SQLite native créée automatiquement
├── database.js             # Initialisation, schéma et requêtes SQL (Profil, Expériences, Compétences, Projets, Messages)
├── server.js               # Serveur Web & API REST Node.js (sans dépendance externe !)
├── index.html              # Point d'entrée de l'application React
├── js/
│   └── app.jsx             # Application React 18 complète (Composants, Dark/Light, Filtres, Boîte de réception SQLite)
├── css/
│   └── style.css           # Thème moderne, effets glassmorphism et animations
└── README.md               # Guide d'utilisation
```

---

## ⚡ Comment Lancer le Portfolio Dynamique

### Option 1 : Mode Full-Stack avec serveur & SQLite (Recommandé)
Ouvrez un terminal PowerShell ou Invite de commandes dans ce dossier et exécutez simplement :
```bash
node server.js
```
Puis ouvrez votre navigateur à l'adresse : **`http://localhost:3000`**

> **Ce que permet ce mode :**
> - Les données sont chargées dynamiquement depuis la base **SQLite** (`portfolio.db`).
> - Chaque message envoyé via le formulaire de contact est immédiatement persisté dans la table `messages`.
> - Vous pouvez cliquer sur le badge **"SQLite Connecté"** ou **"Boîte SQLite"** en haut à droite pour consulter tous les messages reçus en direct !

### Option 2 : Mode Autonome Direct (Sans serveur)
Faites simplement un **double-clic sur [index.html](file:///c:/Users/walid.djellali/Desktop/test/index.html)**. L'application React démarre instantanément en utilisant les données de secours synchronisées avec votre CV.

---

## 🛠️ Schéma de la Base de Données SQLite (`portfolio.db`)

1. **`profile` :** Informations personnelles, bio, coordonnées et statut de disponibilité.
2. **`experiences` :** Orionlab, ACG SIM SPA, SARL Ide-Net, SARL Gesco avec toutes les réalisations détaillées.
3. **`skills` :** Compétences réparties en 4 axes (SAP & ERP, Frontend React, Backend Node/APIs, BDD & Systèmes).
4. **`projects` :** Réalisations clés (Plateforme IoT de Géolocalisation, Portail de maintenance SAP S/4HANA PM, etc.).
5. **`education` :** Master, Licence et Cisco CCNA v7.
6. **`messages` :** Formulaire de contact avec horodatage automatique.

---

## 🌐 Déploiement en Ligne
- Pour un hébergement statique (GitHub Pages, Vercel, Netlify) : poussez simplement le dépôt, l'application React s'exécute directement côté client.
- Pour héberger également l'API Node/SQLite : déployez sur un service Node gratuit tel que Render, Railway ou Fly.io.
