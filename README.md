
# Preetham Gattu — Portfolio

**URL**: https://preethamgattu.github.io/preethamgattu-portfolio/

A personal portfolio project that showcases experience, skills, and projects. The repository contains **two ways to run the site**:

1) a modern **React + Vite + TypeScript** single‑page app (SPA) styled with **Tailwind CSS** and components managed via **shadcn/ui**, and

2) lightweight **static HTML/CSS/JS** variants for quick hosting or standalone pages (including a Salesforce‑focused page).

This README consolidates how the codebase is organized and how to develop, build, and deploy each variant.

---

## Tech Stack

- **App framework:** React (Vite + TypeScript)
- **Styling:** Tailwind CSS (with PostCSS), custom CSS files for static pages
- **UI components:** shadcn/ui (configured via `components.json`)
- **Tooling:** Vite, ESLint
- **Optional runtime:** Bun (lockfile present) — `bun.lockb`

> The root also includes static HTML, CSS, and JS files so the portfolio can be hosted without a build step.

---

## Repository Structure

```
preethamgattu-portfolio/
├─ public/                     # Static assets served as-is (Vite)
├─ src/                        # React + TypeScript app source
│  ├─ (your components/pages)
│  └─ main.tsx / App.tsx ...
├─ 404.html                    # SPA fallback (useful for GitHub Pages)
├─ index.html                  # Vite entry (mounts the React app)
├─ preetham-portfolio.html     # Standalone static portfolio page (no build)
├─ salesforce-portfolio.html   # Standalone Salesforce-focused static page
├─ styles.css                  # Global CSS (root)
├─ script.js                   # JS used by a static page
├─ portfolio-styles.css        # Styles for static portfolio variant(s)
├─ portfolio-script.js         # Scripts for static portfolio variant(s)
├─ components.json             # shadcn/ui configuration
├─ tailwind.config.ts          # Tailwind setup for the React app
├─ postcss.config.js           # PostCSS config
├─ eslint.config.js            # ESLint config
├─ vite.config.ts              # Vite configuration
├─ tsconfig.json               # TS base config
├─ tsconfig.app.json           # TS config (app)
├─ tsconfig.node.json          # TS config (Node tooling)
├─ package.json                # NPM scripts & dependencies
├─ package-lock.json           # NPM lockfile
├─ bun.lockb                   # Bun lockfile (optional alternative to npm)
└─ .gitignore
```

> The actual files under `src/` will contain the React components, routes (if any), and page content.

---

## Getting Started (React + Vite app)

### Prerequisites
- **Node.js** (LTS recommended). If you use **Bun**, you can substitute `bun` for `npm` in most commands.

### Install dependencies
```bash
# clone
git clone https://github.com/prithamgattu/preethamgattu-portfolio.git
cd preethamgattu-portfolio

# install deps (pick ONE of these)
npm install
# or
bun install
```

### Run the dev server
```bash
npm run dev
# or
bun run dev
```
This starts Vite with hot module replacement. Open the printed local URL in your browser.

### Build for production
```bash
npm run build
# or
bun run build
```
The optimized files will be emitted to `dist/`.

### Preview the production build (local)
```bash
npm run preview
# or
bun run preview
```

---

## Using the Static HTML Variants (no build step)

If you prefer a simple static deployment or want a separate standalone page (for example, a Salesforce‑focused landing page), use the files at the repository root:

- `preetham-portfolio.html`
- `salesforce-portfolio.html`
- `portfolio-styles.css`, `portfolio-script.js` (as applicable)
- `styles.css`, `script.js` (as applicable)

### Quick local preview
- Double‑click the `.html` file to open it in a browser; or
- Use a simple static server (recommended so relative paths work):
  ```bash
  # Python 3
  python -m http.server 5173
  # then visit http://localhost:5173/preetham-portfolio.html
  ```

> These static pages do not require Node/Vite; they load their CSS/JS directly in the browser.

---

## Content & Customization

### React app (`src/`)
- Update text, sections, and components under `src/` (e.g., hero, about, skills, projects, experience, contact).
- Tailwind classes are used for styling; adjust design tokens in `tailwind.config.ts`.
- If using **shadcn/ui**, manage components with the CLI as documented by shadcn. The registry and component list are tracked in `components.json`.

### Static pages (root)
- Edit the corresponding `.html` files and their linked CSS/JS.
- Assets referenced by the static pages can live in `public/` or alongside the HTML files; ensure the relative paths match your hosting setup.

---

## Routing & 404 Handling

- SPA deployments (React) typically need a catch‑all route. The included `404.html` can be used on GitHub Pages to redirect back to `index.html` so client‑side routes work on refresh.

---

## Linting & Formatting

- Run ESLint via your editor or add an npm script like:
  ```json
  {
    "scripts": {
      "lint": "eslint ."
    }
  }
  ```

---

## Deployments

### GitHub Pages (React app)
1. Build the site: `npm run build` → outputs to `dist/`.
2. Serve `dist/` with Pages. Common options:
   - Push `dist/` to a `gh-pages` branch (via `gh-pages` package or an Action).
   - Or configure GitHub Pages to serve from `dist` on the main branch.
3. Keep `404.html` in place to support client‑side routing.

### GitHub Pages (Static HTML)
- Commit the `.html` + CSS/JS files to the publishing branch and set Pages to serve from that branch/folder. No build step required.

### Vercel / Netlify / Cloudflare Pages
- Select the repo, set the framework to **Vite** (or generic), and use the defaults:
  - **Build command:** `npm run build`
  - **Output directory:** `dist`

---

## Environment Variables

- If the React app fetches external data (e.g., forms, analytics, APIs), add a `.env` file in the project root and reference variables with `import.meta.env`. Example:
  ```bash
  VITE_PUBLIC_ANALYTICS_ID=xxxxx
  ```
  Do **not** commit secrets.

---

## Accessibility & SEO

- Ensure each page (React and static) sets descriptive `<title>`, meta description, and social share tags.
- Maintain sufficient color contrast and keyboard navigation.
- Provide alt text for images and descriptive link text.

---

## Roadmap (suggested)

- Unify content sources so both the React app and static pages share the same portfolio data.
- Add tests (unit for components, pa11y/axe for accessibility).
- Automate GitHub Pages deploy with a workflow.
- Add light/dark theme toggle and SEO sitemap.

---

## License

> No license file was found in this repository at the time this README was written. If you intend the code to be open source, consider adding an SPDX license (e.g., MIT) via `LICENSE`.

---

## Acknowledgments
- Tailwind CSS
- shadcn/ui
- Vite + React community

---

## Maintainer
- **Preetham Gattu**
- Open issues and PRs are welcome.


Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain]
