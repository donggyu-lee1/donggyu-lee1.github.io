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

function renderPublication(item) {
  return `
    <article class="publication-item">
      <span class="publication-status">${item.status}</span>
      <a class="publication-title" href="${item.url}" target="_blank" rel="noopener">${item.title}</a>
      <div class="publication-authors">${item.authors}</div>
      <div class="publication-venue">${item.venue} · ${item.year}</div>
    </article>
  `;
}

async function loadPublications() {
  const publishedList = document.querySelector("#published-list");
  const workingList = document.querySelector("#working-list");
  const publishedCount = document.querySelector("#published-count");
  const workingCount = document.querySelector("#working-count");

  if (!publishedList || !workingList || !publishedCount || !workingCount) {
    return;
  }

  try {
    const response = await fetch("./data/publications.json");
    const data = await response.json();

    publishedList.innerHTML = data.published.map(renderPublication).join("");
    workingList.innerHTML = data.working.map(renderPublication).join("");
    publishedCount.textContent = String(data.published.length);
    workingCount.textContent = String(data.working.length);
  } catch (error) {
    const fallback = `
      <article class="publication-item">
        <strong>Publication data could not be loaded.</strong>
        <div class="publication-authors">Please refresh the page or check the data file.</div>
      </article>
    `;
    publishedList.innerHTML = fallback;
    workingList.innerHTML = fallback;
  }
}

loadPublications();
