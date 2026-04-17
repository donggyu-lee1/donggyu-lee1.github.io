# Donggyu Lee Homepage

One-page academic homepage for GitHub Pages.

## Edit Guide

Most text is no longer stored directly in `index.html`.

- `data/site.json`: tab title, hero info, hero links, CV card, contact, footer
- `data/about.json`: About section heading and paragraphs
- `data/research.json`: Research section heading, intro, and cards
- `data/experience.json`: education, work, teaching, and tool lists
- `data/publications.json`: publications and working papers

If you want to change visible content, edit the corresponding JSON file, then:

```bash
git add .
git commit -m "Update homepage content"
git push
```

## Local preview

```bash
python3 -m http.server 8000
```

Then open `http://127.0.0.1:8000`.

## Publish on GitHub Pages

Push to the default branch of `donggyu-lee1.github.io`.

Because this is a user site repository, the homepage should publish at:

`https://donggyu-lee1.github.io/`
