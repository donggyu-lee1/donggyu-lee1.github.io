# Donggyu Lee Homepage

Astro-based academic homepage and writing site published with GitHub Pages.

## Edit homepage information

The existing homepage content remains in JSON files:

- `data/site.json`: page title, profile links, CV, contact, and footer
- `data/about.json`: About section
- `data/research.json`: research interests
- `data/experience.json`: education, work, teaching, and tools
- `data/publications.json`: publications and working papers

Astro reads these files during the build, so the published homepage contains
the content as static HTML and does not fetch JSON in the browser.

## Write and publish

### Pages CMS

1. Open [Pages CMS](https://app.pagescms.org/).
2. Sign in with the GitHub account that can write to this repository.
3. Install the Pages CMS GitHub App for this repository only.
4. Open `donggyu-lee1/donggyu-lee1.github.io` and select the `main` branch.
5. Open **Writing**, create a post, and save it.

Saving a post commits a Markdown file to `src/content/writing/`. The GitHub
Pages workflow then checks, builds, and deploys the site automatically. New
posts are public by default. Turn on **Draft** before saving to keep a post off
the website.

This repository is public. Drafts are hidden from the built website, RSS feed,
and sitemap, but their Markdown source remains visible on GitHub.

Images added in the editor are stored in `public/images/writing/`.

### Markdown

Posts can also be created directly in `src/content/writing/`:

```md
---
title: "Post title"
description: "A short summary used in lists and link previews."
pubDate: 2026-07-14
tags:
  - research
draft: false
---

Write the post in Markdown here.
```

The filename becomes the permanent URL slug. For example,
`research-notes.md` is published at `/writing/research-notes/`.

## Local development

The project requires Node.js 22.12 or newer.

```bash
npm install
npm run dev
```

Open `http://localhost:4321`.

Run the same checks used during deployment:

```bash
npm run check
npm run build
```

The production output is written to `dist/`.

## GitHub Pages setup

The workflow at `.github/workflows/deploy.yml` deploys every push to `main`.
Before the first Astro deployment, open **Settings → Pages** in this repository
and set **Source** to **GitHub Actions**. Do this before pushing the migration so
GitHub Pages keeps serving the last successful site until the Astro workflow
finishes.

After deployment, verify:

- `https://donggyu-lee1.github.io/`
- `https://donggyu-lee1.github.io/writing/`
- `https://donggyu-lee1.github.io/rss.xml`
- `https://donggyu-lee1.github.io/sitemap-index.xml`
