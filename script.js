const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");
const yearNode = document.querySelector("#current-year");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setPageTitle(title) {
  if (title) {
    document.title = title;
  }
}

function renderHero(site) {
  const heroNode = document.querySelector("#hero-content");
  const captionNode = document.querySelector("#hero-caption");

  if (!heroNode || !captionNode) {
    return;
  }

  const heroMeta = (site.hero.meta || [])
    .map((item) => `<span>${item}</span>`)
    .join("");

  const heroLinks = (site.hero.links || [])
    .map((link) => {
      const externalAttrs = link.external
        ? ' target="_blank" rel="noopener"'
        : "";
      const classes = link.primary ? "button button-primary" : "button";
      return `<a class="${classes}" href="${link.href}"${externalAttrs}>${link.label}</a>`;
    })
    .join("");

  const heroFacts = (site.hero.facts || [])
    .map(
      (fact) => `
        <div class="fact-card">
          <span class="fact-number">${fact.value}</span>
          <span class="fact-label">${fact.label}</span>
        </div>
      `
    )
    .join("");

  heroNode.innerHTML = `
    <h1>${site.hero.name}</h1>
    <p class="hero-role">${site.hero.role}</p>
    <div class="hero-meta">${heroMeta}</div>
    <div class="hero-links">${heroLinks}</div>
    <div class="hero-facts">${heroFacts}</div>
  `;

  captionNode.textContent = site.hero.caption || "";
}

function renderAbout(about) {
  const headingNode = document.querySelector("#about-heading");
  const contentNode = document.querySelector("#about-content");

  if (!headingNode || !contentNode) {
    return;
  }

  headingNode.innerHTML = `
    <p class="section-kicker">${about.kicker}</p>
    <h2>${about.heading}</h2>
  `;

  contentNode.innerHTML = about.paragraphs
    .map((paragraph) => `<p>${paragraph}</p>`)
    .join("");
}

function renderResearch(research) {
  const headingNode = document.querySelector("#research-heading");
  const cardsNode = document.querySelector("#research-cards");

  if (!headingNode || !cardsNode) {
    return;
  }

  headingNode.innerHTML = `
    <p class="section-kicker">${research.kicker}</p>
    <h2>${research.heading}</h2>
    <p class="section-intro">${research.intro}</p>
  `;

  cardsNode.innerHTML = research.cards
    .map(
      (card) => `
        <article class="interest-card">
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>
      `
    )
    .join("");
}

function renderTimeline(items) {
  return `
    <div class="timeline">
      ${items
        .map(
          (item) => `
            <article class="timeline-item">
              <div class="timeline-topline">
                <strong>${item.title}</strong>
                <span>${item.period}</span>
              </div>
              <p>${item.subtitle}</p>
              ${item.note ? `<p class="muted">${item.note}</p>` : ""}
            </article>
          `
        )
        .join("")}
    </div>
  `;
}

function renderExperience(experience) {
  const headingNode = document.querySelector("#experience-heading");
  const gridNode = document.querySelector("#experience-grid");

  if (!headingNode || !gridNode) {
    return;
  }

  headingNode.innerHTML = `
    <p class="section-kicker">${experience.kicker}</p>
    <h2>${experience.heading}</h2>
  `;

  gridNode.innerHTML = `
    <div class="panel">
      <h3>${experience.education.title}</h3>
      ${renderTimeline(experience.education.items)}
    </div>
    <div class="panel">
      <h3>${experience.work.title}</h3>
      ${renderTimeline(experience.work.items)}
    </div>
    <div class="panel">
      <h3>${experience.skills.title}</h3>
      <p>${experience.skills.body}</p>
      <div class="tag-list">
        ${experience.skills.tags.map((tag) => `<span>${tag}</span>`).join("")}
      </div>
    </div>
  `;
}

function renderCv(site) {
  const cvNode = document.querySelector("#cv-card");

  if (!cvNode) {
    return;
  }

  cvNode.innerHTML = `
    <div>
      <p class="section-kicker">${site.cv.kicker}</p>
      <h2>${site.cv.heading}</h2>
      <p>${site.cv.body}</p>
    </div>
    <a class="button button-primary" href="${site.cv.href}" target="_blank" rel="noopener">
      ${site.cv.buttonLabel}
    </a>
  `;
}

function renderContact(site) {
  const contentNode = document.querySelector("#contact-content");
  const linksNode = document.querySelector("#footer-links");
  const footerNoteNode = document.querySelector("#footer-note");

  if (!contentNode || !linksNode) {
    return;
  }

  contentNode.innerHTML = `
    <p class="section-kicker">${site.contact.kicker}</p>
    <h2>${site.contact.name}</h2>
    <p>${site.contact.role}</p>
    <p class="muted">${site.contact.email}</p>
  `;

  linksNode.innerHTML = site.contact.links
    .map((link) => {
      const externalAttrs = link.external
        ? ' target="_blank" rel="noopener"'
        : "";
      return `<a href="${link.href}"${externalAttrs}>${link.label}</a>`;
    })
    .join("");

  if (footerNoteNode) {
    footerNoteNode.textContent = site.footer.note;
  }
}

function renderPublication(item) {
  const titleMarkup = item.url
    ? `<a class="publication-title" href="${item.url}" target="_blank" rel="noopener">${item.title}</a>`
    : `<span class="publication-title publication-title-static">${item.title}</span>`;

  return `
    <article class="publication-item">
      <span class="publication-status">${item.status}</span>
      ${titleMarkup}
      <div class="publication-authors">${item.authors}</div>
      <div class="publication-venue">${item.venue} · ${item.year}</div>
    </article>
  `;
}

function renderPublications(data) {
  const publishedList = document.querySelector("#published-list");
  const workingList = document.querySelector("#working-list");
  const publishedCount = document.querySelector("#published-count");
  const workingCount = document.querySelector("#working-count");

  if (!publishedList || !workingList || !publishedCount || !workingCount) {
    return;
  }

  publishedList.innerHTML = data.published.map(renderPublication).join("");
  workingList.innerHTML = data.working.map(renderPublication).join("");
  publishedCount.textContent = String(data.published.length);
  workingCount.textContent = String(data.working.length);
}

function renderPublicationFallback() {
  const publishedList = document.querySelector("#published-list");
  const workingList = document.querySelector("#working-list");

  if (!publishedList || !workingList) {
    return;
  }

  const fallback = `
    <article class="publication-item">
      <strong>Publication data could not be loaded.</strong>
      <div class="publication-authors">Please refresh the page or check the data file.</div>
    </article>
  `;

  publishedList.innerHTML = fallback;
  workingList.innerHTML = fallback;
}

async function loadJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    throw new Error(`Failed to load ${path}`);
  }
  return response.json();
}

async function loadPageData() {
  try {
    const [site, about, research, experience, publications] = await Promise.all([
      loadJson("./data/site.json"),
      loadJson("./data/about.json"),
      loadJson("./data/research.json"),
      loadJson("./data/experience.json"),
      loadJson("./data/publications.json")
    ]);

    setPageTitle(site.pageTitle);
    renderHero(site);
    renderAbout(about);
    renderResearch(research);
    renderExperience(experience);
    renderCv(site);
    renderContact(site);
    renderPublications(publications);
  } catch (error) {
    renderPublicationFallback();
    console.error(error);
  }
}

loadPageData();
