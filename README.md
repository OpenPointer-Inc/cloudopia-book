# Cloudopia Book — The Cloud Mastery Playbook

**Cloudopia** is a free, open-access book for people who want to become cloud experts. Its core is *The Cloud Mastery Playbook*: a practical, vendor-neutral path to designing, deploying, and operating secure, scalable cloud systems — from first fundamentals through architecture, infrastructure as code, security, reliability, and cost-aware operations.

The site has two parts:

- **Landing page** (`/`) — a Sentry-inspired marketing page introducing the playbook, who it's for, and how it works. Built as a custom React page in `src/pages/index.tsx` with its own navbar and footer.
- **The book** (`/docs`) — the chapters themselves, powered by [Docusaurus](https://docusaurus.io/), with themed navigation, sidebar, table of contents, and syntax-highlighted code blocks. A blog ("Field Notes") lives at `/blog`.

## Design system

The visual language is Sentry-inspired: deep midnight violet (`#150f23`), electric lime (`#c2ef4e`) accents, Space Grotesk for display type, Rubik for UI, and Monaco for code. Tokens live in `src/css/custom.css` as `--sp-*` variables and are shared by the landing page and the book interface.

## Installation

```bash
npm install
```

## Local Development

```bash
npm run start
```

This command starts a local development server at `http://localhost:3000`. Most changes are reflected live without having to restart the server.

## Shared Authentication

The book uses the Cloudopia portal's Better Auth API. Set `CLOUDOPIA_AUTH_URL` at build time when the portal uses a different origin; the production default is `https://cloudopia.vercel.app` and the development default is `http://localhost:3000`.

When running both apps locally, keep the Cloudopia portal on port `3000` and start the book on another port, for example `npm run start -- --port 3001`. Add that book origin to the portal's `AUTH_TRUSTED_ORIGINS` environment variable.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory and can be served using any static content hosting service (the site is deployed on Vercel, with Vercel Analytics enabled).

## Content structure

| Path | What it holds |
| --- | --- |
| `src/pages/` | The landing page (`index.tsx`) and its styles |
| `src/theme/` | Theme customizations (e.g. the Vercel `<Analytics />` wrapper) |
| `src/css/custom.css` | Design tokens + theme overrides |
| `docs/` | Book chapters (Docker, Linux Basics, …) |
| `blog/` | Field Notes blog posts; authors in `blog/authors.yml`, tags in `blog/tags.yml` |
| `static/img/` | Site-wide images (logo, favicon, social card) |
