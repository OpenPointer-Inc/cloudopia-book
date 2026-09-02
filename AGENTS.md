# Cloudopia Book Agent Notes

## Active Site

- Work from the repository root. The active site is the Docusaurus 3.10.2 TypeScript app defined by the root `package.json`, `docusaurus.config.ts`, and `sidebars.ts`.
- `docusaurus-2/` is a separate legacy Docusaurus 2 sample with its own `package.json` and `yarn.lock`; it is excluded from the root TypeScript project and is not part of the root site.
- The root site is static: `/` is the custom React landing page in `src/pages/index.tsx`, while `/docs` and `/blog` are Docusaurus content. `sidebars.ts` autogenerates the docs sidebar from `docs/`.
- The landing page supplies its own navbar and footer and adds `body.landing-page`; global Docusaurus navbar/footer styles hide themselves in that mode. Keep landing-only changes in `src/pages/`.
- `src/theme/NavbarItem/index.tsx` implements the `custom-github` and `custom-auth` navbar item types declared in `docusaurus.config.ts`; update both files when changing those items.

## Commands

- Use Node `>=20` and npm from the repository root; `package-lock.json` is the active lockfile. Use `npm ci` for a clean install and `npm install` when intentionally changing dependencies.
- `npm run start` starts the dev server at `http://localhost:3000`.
- `npm run build` creates the deployable static site in `build/`; `npm run serve` serves that output locally.
- `npm run typecheck` runs the standalone `tsc` check. Docusaurus `start` and `build` do not run it. There are no repository lint, test, or CI scripts.
- `.docusaurus/` and `build/` are generated and ignored; do not edit them. Use `npm run clear` to clear Docusaurus cache.
- Blog configuration warns about posts without a truncation marker; add `<!-- truncate -->` when a post needs a shortened listing preview.

## Integrations

- Authentication is browser-only and delegated to the external Better Auth service. `src/lib/auth-client.ts` uses `https://cloudopia.vercel.app` in production and `http://localhost:3000` in development, stores the session bearer token in `localStorage`, and sends it as an `Authorization` header; do not assume local server routes or cross-origin cookies.
- Production is a Vercel static deployment. The root `npm run deploy` script is Docusaurus/GitHub Pages deployment, and the config still contains template GitHub Pages fields; do not use it as the Vercel deployment command.
