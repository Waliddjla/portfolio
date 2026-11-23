/**
 * main.js
 * Logique interactive du Portfolio de Walid Djellali
 */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialiser les icônes Lucide
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Gestion du Thème Sombre / Clair
  initTheme();

  // 3. Menu Mobile (Burger)
  initMobileMenu();

  // 4. Initialisation des Projets & Filtres
  initProjects();

  // 5. Formulaire de contact
  initContactForm();

  // 6. Navigation fluide et mise en évidence de la section active
  initScrollSpy();

  // 7. Année dynamique du Footer
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});

/**
 * Gère le Dark/Light mode avec persistance dans localStorage
 */
function initTheme() {
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");

  // Vérifier la préférence existante ou le mode système
  const storedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  const isDark = storedTheme === "dark" || (!storedTheme && systemPrefersDark);

  if (isDark) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  updateThemeIcon(isDark);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isCurrentlyDark = document.documentElement.classList.contains("dark");
      if (isCurrentlyDark) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("portfolio-theme", "light");
        updateThemeIcon(false);
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("portfolio-theme", "dark");
        updateThemeIcon(true);
      }
    });
  }
}

function updateThemeIcon(isDark) {
  const themeIcon = document.getElementById("theme-icon");
  if (!themeIcon) return;
  themeIcon.setAttribute("data-lucide", isDark ? "sun" : "moon");
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Gestion du menu déroulant mobile
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  if (!mobileMenuBtn || !mobileMenu) return;

  mobileMenuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  mobileLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.add("hidden");
    });
  });
}

/**
 * Rendu et filtrage dynamique des projets
 */
function initProjects() {
  const filterContainer = document.getElementById("project-filters");
  const gridContainer = document.getElementById("projects-grid");

  if (!gridContainer || !window.projectsData) return;

  // Création des boutons de filtre si le container existe
  if (filterContainer && window.categoriesData) {
    filterContainer.innerHTML = window.categoriesData.map((cat, index) => `
      <button 
        type="button"
        data-filter="${cat.id}"
        class="filter-btn px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
          index === 0 
            ? "bg-blue-600 text-white shadow-md shadow-blue-500/20 active-filter" 
            : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300"
        }">
        ${cat.label}
      </button>
    `).join("");

    const filterBtns = filterContainer.querySelectorAll(".filter-btn");
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => {
          b.classList.remove("bg-blue-600", "text-white", "shadow-md", "shadow-blue-500/20", "active-filter");
          b.classList.add("bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300");
        });

        btn.classList.add("bg-blue-600", "text-white", "shadow-md", "shadow-blue-500/20", "active-filter");
        btn.classList.remove("bg-slate-100", "hover:bg-slate-200", "dark:bg-slate-800", "dark:hover:bg-slate-700", "text-slate-700", "dark:text-slate-300");

        const selectedFilter = btn.getAttribute("data-filter");
        renderProjects(selectedFilter);
      });
    });
  }

  // Rendu initial (tous les projets)
  renderProjects("all");
}

function renderProjects(filter = "all") {
  const gridContainer = document.getElementById("projects-grid");
  if (!gridContainer || !window.projectsData) return;

  const filteredProjects = filter === "all" 
    ? window.projectsData 
    : window.projectsData.filter(p => p.category === filter);

  if (filteredProjects.length === 0) {
    gridContainer.innerHTML = `
      <div class="col-span-full text-center py-12 text-slate-500 dark:text-slate-400">
        Aucun projet trouvé dans cette catégorie.
      </div>
    `;
    return;
  }

  gridContainer.innerHTML = filteredProjects.map(project => `
    <article class="fade-in card-hover rounded-2xl overflow-hidden glass flex flex-col group border border-slate-200/80 dark:border-slate-800">
      <div class="relative h-48 sm:h-52 overflow-hidden bg-slate-900">
        <img 
          src="${project.image}" 
          alt="${project.title}" 
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
        <span class="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-lg backdrop-blur-md bg-blue-600/90 text-white shadow-sm">
          ${project.categoryLabel}
        </span>
      </div>

      <div class="p-6 flex-1 flex flex-col">
        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-500 transition-colors">
          ${project.title}
        </h3>
        
        <p class="text-slate-600 dark:text-slate-300 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
          ${project.description}
        </p>

        <div class="flex flex-wrap gap-1.5 mb-6">
          ${project.tags.map(tag => `
            <span class="text-xs font-medium px-2.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              ${tag}
            </span>
          `).join("")}
        </div>

        <div class="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800/80">
          <a 
            href="${project.demoUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-semibold rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition-all shadow-sm shadow-blue-500/20">
            <span>Démo</span>
            <i data-lucide="external-link" class="w-4 h-4"></i>
          </a>
          <a 
            href="${project.githubUrl}" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="inline-flex items-center justify-center gap-1.5 py-2 px-3 text-sm font-semibold rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-all"
            title="Code Source">
            <i data-lucide="github" class="w-4 h-4"></i>
            <span class="sr-only">GitHub</span>
          </a>
        </div>
      </div>
    </article>
  `).join("");

  // Réinitialiser les icônes dans le nouveau contenu
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/**
 * Gestion du formulaire de contact avec notification toast
 */
function initContactForm() {
  const contactForm = document.getElementById("contact-form");
  const toast = document.getElementById("toast-notification");

  if (!contactForm) return;

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalContent = submitBtn.innerHTML;

    // État de chargement
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-4 w-4 text-white" viewBox="0 0 24 24" fill="none">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Envoi en cours...
      </span>
    `;

    setTimeout(() => {
      // Réinitialiser le formulaire
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalContent;

      // Afficher le toast de succès
      showToast("Merci Walid a bien reçu votre message ! Une réponse vous parviendra sous 24h.");
      if (window.lucide) {
        window.lucide.createIcons();
      }
    }, 900);
  });
}

function showToast(message) {
  const toast = document.getElementById("toast-notification");
  const toastMsg = document.getElementById("toast-message");
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove("translate-y-24", "opacity-0");
  toast.classList.add("translate-y-0", "opacity-100");

  setTimeout(() => {
    toast.classList.remove("translate-y-0", "opacity-100");
    toast.classList.add("translate-y-24", "opacity-0");
  }, 4500);
}

/**
 * Met en évidence le lien de navigation selon la position de défilement
 */
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let currentId = "";
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPosition >= top && scrollPosition < top + height) {
        currentId = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("text-blue-600", "dark:text-blue-400", "font-bold");
      if (link.getAttribute("href") === `#${currentId}`) {
        link.classList.add("text-blue-600", "dark:text-blue-400", "font-bold");
      }
    });
  });
}
