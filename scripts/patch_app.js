/**
 * patch_app.js
 * Applies all portfolio improvements to js/app.jsx:
 *   1. Cleans fallbackData (empties experiences/skills/education arrays → DB-driven)
 *   2. Adds IntersectionObserver scroll-reveal useEffect
 *   3. Adds .reveal / .reveal-left / .reveal-scale / .stagger-children classes to JSX
 *   4. Adds name-shimmer to <h1> and btn-magnetic to CTA buttons
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'js', 'app.jsx');
let src = fs.readFileSync(filePath, 'utf8');

// ─────────────────────────────────────────────────────────────────
// 1. Clean fallbackData — replace experiences/skills/education arrays
//    with empty arrays so SQLite always wins
// ─────────────────────────────────────────────────────────────────

// Replace the entire experiences array in fallbackData
src = src.replace(
  /(\s*)experiences:\s*\[\s*\{[\s\S]*?\}\s*\],\s*\n(\s*)skills:\s*\[[\s\S]*?\],\s*\n(\s*)projects: window\.featuredProjects \|\| \[\],\s*\n(\s*)education:\s*\[[\s\S]*?\],\s*\n(\s*)sap_modules:/,
  '$1experiences: [],\n$2skills: [],\n$3projects: window.featuredProjects || [],\n$4education: [],\n$5sap_modules:'
);

// ─────────────────────────────────────────────────────────────────
// 2. Add IntersectionObserver useEffect after the lucide icons effect
// ─────────────────────────────────────────────────────────────────

const lucideEffect = `  // Réinitialiser les icônes Lucide à chaque re-render
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });`;

const lucideEffectWithObserver = `  // Réinitialiser les icônes Lucide à chaque re-render
  useEffect(() => {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  });

  // ── Scroll-reveal global — IntersectionObserver ──────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.10, rootMargin: '0px 0px -48px 0px' }
    );
    const targets = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
    targets.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [data]);`;

src = src.replace(lucideEffect, lucideEffectWithObserver);

// ─────────────────────────────────────────────────────────────────
// 3. Hero — name-shimmer on <h1>, btn-magnetic on CTA buttons
// ─────────────────────────────────────────────────────────────────

// Add name-shimmer class to the <h1>
src = src.replace(
  `<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.1] mb-5">
            {data.profile.name}
          </h1>`,
  `<h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-5">
            <span className="name-shimmer">{data.profile.name}</span>
          </h1>`
);

// Add btn-magnetic to the LinkedIn CTA button
src = src.replace(
  `className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2">`,
  `className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-[#0A66C2] hover:bg-[#004182] text-white shadow-lg shadow-blue-500/25 btn-magnetic flex items-center justify-center gap-2">`
);

// Add btn-magnetic to the CV/Resume button
src = src.replace(
  `className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-105 transition-all flex items-center justify-center gap-2">`,
  `className="w-full sm:w-auto px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-bold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/25 btn-magnetic flex items-center justify-center gap-2">`
);

// ─────────────────────────────────────────────────────────────────
// 4. Experience section — add reveal-left + stagger-children
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `        <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.experience.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.experience.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.experience.subtitle}
            </p>
          </div>

          <div className="space-y-8">
            {data.experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 card-hover transition-all">`,
  `        <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.experience.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.experience.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.experience.subtitle}
            </p>
          </div>

          <div className="space-y-8 stagger-children">
            {data.experiences.map((exp, idx) => (
              <div
                key={exp.id || idx}
                className="reveal-left p-8 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 card-hover transition-all">`
);

// ─────────────────────────────────────────────────────────────────
// 5. SAP section — reveal on header, stagger-children on cards grid + flow grid
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          {/* En-tête de la section */}
          <div className="text-center max-w-3xl mx-auto mb-14">`,
  `          {/* En-tête de la section */}
          <div className="reveal text-center max-w-3xl mx-auto mb-14">`
);

src = src.replace(
  `          {/* Grille des Modules SAP (Boucle dynamique SQLite Database First) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">`,
  `          {/* Grille des Modules SAP (Boucle dynamique SQLite Database First) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12 stagger-children">`
);

// Add reveal-scale to each SAP card
src = src.replace(
  `                  <div
                    key={mod.id}
                    className={\`p-6 sm:p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-slate-900/5 hover:-translate-y-1 \${cardBorder}\`}
                  >`,
  `                  <div
                    key={mod.id}
                    className={\`reveal-scale p-6 sm:p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-slate-900/5 hover:-translate-y-1 \${cardBorder}\`}
                  >`
);

// Add stagger-children to SAP flow grid
src = src.replace(
  `            {/* Les 5 étapes du flux, en une ligne fluide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative">`,
  `            {/* Les 5 étapes du flux, en une ligne fluide */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 relative stagger-children">`
);

// Add reveal to each flow step card
src = src.replace(
  `                  <div
                    key={step.id || idx}
                    className="p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between relative group hover:border-blue-500/50 transition-all shadow-sm"
                  >`,
  `                  <div
                    key={step.id || idx}
                    className="reveal p-4 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between relative group hover:border-blue-500/50 transition-all shadow-sm"
                  >`
);

// ─────────────────────────────────────────────────────────────────
// 6. Skills section — reveal on header, reveal-scale + stagger on cards
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.skills.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.skills.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {t.skill_groups.map(group => (
              <div key={group.category} className={\`p-7 rounded-3xl glass border card-hover \${group.frame}\`}>`,
  `          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.skills.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.skills.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children">

            {t.skill_groups.map(group => (
              <div key={group.category} className={\`reveal-scale p-7 rounded-3xl glass border card-hover \${group.frame}\`}>`
);

// ─────────────────────────────────────────────────────────────────
// 7. Projects section — reveal on header, reveal on each project card
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3">
              <Icon name="layers" className="w-3.5 h-3.5" />
              <span>{t.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.projects.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.portfolio.subtitle}
            </p>
          </div>`,
  `          <div className="reveal text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-900 mb-3">
              <Icon name="layers" className="w-3.5 h-3.5" />
              <span>{t.projects.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.projects.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.portfolio.subtitle}
            </p>
          </div>`
);

// reveal on each project article card — add reveal class with dynamic stagger delay
src = src.replace(
  `                <article
                  key={p.id || idx}
                  className="fade-in card-hover rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 flex flex-col group">`,
  `                <article
                  key={p.id || idx}
                  style={{ transitionDelay: \`\${idx * 90}ms\` }}
                  className="reveal card-hover rounded-3xl overflow-hidden glass border border-slate-200/80 dark:border-slate-800 flex flex-col group">`
);

// ─────────────────────────────────────────────────────────────────
// 8. GitHub explorer — reveal on header
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 mb-3">
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>{t.repos.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.repos.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.repos.subtitle}
            </p>
          </div>`,
  `          <div className="reveal text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-300 dark:border-slate-700 mb-3">
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>{t.repos.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.repos.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.repos.subtitle}
            </p>
          </div>`
);

// reveal on each repo card
src = src.replace(
  `                className="p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 flex flex-col justify-between card-hover group transition-all">`,
  `                className="reveal p-6 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 flex flex-col justify-between card-hover group transition-all">`
);

// ─────────────────────────────────────────────────────────────────
// 9. Education section — reveal on header, stagger + reveal on cards
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.education.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.education.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} className="p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col card-hover">`,
  `          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.education.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.education.title}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
            {data.education.map((edu, idx) => (
              <div key={edu.id || idx} className="reveal-scale p-7 rounded-3xl glass border border-slate-200/80 dark:border-slate-800 flex flex-col card-hover">`
);

// ─────────────────────────────────────────────────────────────────
// 10. Contact section — reveal on header
// ─────────────────────────────────────────────────────────────────

src = src.replace(
  `          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.contact.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.contact.subtitle}
            </p>
          </div>`,
  `          <div className="reveal text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold tracking-wider uppercase text-blue-600 dark:text-blue-400 mb-2 block">
              {t.contact.badge}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.contact.title}
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-400">
              {t.contact.subtitle}
            </p>
          </div>`
);

// ─────────────────────────────────────────────────────────────────
// Write patched file
// ─────────────────────────────────────────────────────────────────
fs.writeFileSync(filePath, src, 'utf8');
console.log('✅ app.jsx patched successfully!');
console.log('   Lines:', src.split('\n').length);
console.log('   Size:', src.length, 'chars');
