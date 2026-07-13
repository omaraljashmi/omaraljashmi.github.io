const projects = {
  "Fake Review Detection": {
    label: "NLP classification system", year: "2026", metric: "86.7%", metricLabel: "mean accuracy",
    summary: "A repeatable text-classification pipeline built to separate genuine and deceptive reviews at scale.",
    details: ["Processed approximately 40,000 reviews through a reproducible NLP workflow.", "Compared Logistic Regression and Naive Bayes across five random seeds with stratified splits.", "Surfaced a precision-recall asymmetry between genuine and fake review classes."],
    stack: ["Python", "TF-IDF", "scikit-learn"]
  },
  "Cold Email Intelligence": {
    label: "Sales operations dashboard", year: "2025", metric: "3", metricLabel: "funnel signals",
    summary: "An automated Airtable workspace that turns outreach activity into useful timing and conversion signals.",
    details: ["Organized fragmented cold-email outreach data into a structured operating system.", "Tracked response rates, meeting conversion, and outreach timing in automated dashboards.", "Reduced the manual work required to understand campaign performance."],
    stack: ["Clay", "Airtable", "Automation"]
  },
  "F1 2021 Analysis": {
    label: "Performance comparison", year: "2025", metric: "22", metricLabel: "race season",
    summary: "A data-driven look at how Hamilton and Verstappen shaped one of Formula 1's closest title fights.",
    details: ["Compared race results, performance trends, and each driver's contribution to team success.", "Explored the relationship between driver performance and car development across the season.", "Translated a personal interest in Formula 1 into a structured analytical question."],
    stack: ["R", "RStudio", "Data visualization"]
  },
  "Job Search OS": {
    label: "Process optimization system", year: "2026", metric: "5", metricLabel: "connected workflows",
    summary: "A structured job-search command center designed to make applications and follow-ups measurable.",
    details: ["Connects application tracking, networking, weekly reviews, follow-ups, and reusable email templates.", "Uses dropdown controls and status logic to keep next actions visible.", "Turns a high-volume search process into an organized operating rhythm."],
    stack: ["Excel", "Dashboards", "Workflow design"]
  }
};

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
document.documentElement.classList.add("static-ready");

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", link.getAttribute("href"));
  });
});

const filterButtons = [...document.querySelectorAll(".filter-bar button")];
const cards = [...document.querySelectorAll(".project-card")];
filterButtons.forEach((button) => button.addEventListener("click", () => {
  const selected = button.textContent.trim();
  filterButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  cards.forEach((card) => {
    const visible = selected === "All" || card.querySelector(".project-category")?.textContent.trim() === selected;
    card.hidden = !visible;
  });
}));

const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"})[char]);
let lastFocused = null;
function closeModal() {
  document.querySelector(".modal-backdrop")?.remove();
  document.body.classList.remove("modal-open");
  lastFocused?.focus();
}
function openModal(project, source) {
  lastFocused = source;
  const modal = document.createElement("div");
  modal.className = "modal-backdrop";
  modal.innerHTML = `<section class="project-modal glass-panel" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
    <button class="modal-close" type="button" aria-label="Close case study">×</button>
    <span class="modal-label">${escapeHtml(project.label)} · ${project.year}</span>
    <h2 id="project-modal-title">${escapeHtml(source.querySelector("h3").textContent)}</h2>
    <p class="modal-summary">${escapeHtml(project.summary)}</p>
    <div class="modal-metric"><strong>${project.metric}</strong><span>${escapeHtml(project.metricLabel)}</span></div>
    <div class="modal-detail-list">${project.details.map((detail, index) => `<div><span>0${index + 1}</span><p>${escapeHtml(detail)}</p></div>`).join("")}</div>
    <div class="tag-row modal-tags">${project.stack.map((item) => `<span>${escapeHtml(item)}</span>`).join("")}</div>
  </section>`;
  modal.addEventListener("click", (event) => { if (event.target === modal) closeModal(); });
  modal.querySelector(".modal-close").addEventListener("click", closeModal);
  document.body.append(modal);
  document.body.classList.add("modal-open");
  modal.querySelector(".modal-close").focus();
}
cards.forEach((card) => card.addEventListener("click", () => openModal(projects[card.querySelector("h3").textContent.trim()], card)));
document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeModal(); });

const ambientButton = document.querySelector(".ambient-toggle");
ambientButton?.addEventListener("click", () => {
  const layer = document.querySelector(".ambient-layer");
  const enabled = layer.classList.toggle("ambient-paused") === false;
  ambientButton.setAttribute("aria-pressed", String(enabled));
  ambientButton.innerHTML = `<span>${enabled ? "●" : "○"}</span> Ambient motion ${enabled ? "on" : "off"}`;
});
