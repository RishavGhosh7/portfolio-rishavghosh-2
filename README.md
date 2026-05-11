# Rishav Ghosh — Futuristic 3D Portfolio

React + TypeScript + Vite with **React Three Fiber**, **Tailwind CSS**, **GSAP**, and lazy-loaded 3D canvas.

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
npm run preview
```

## Deploy (Vercel)

1. Import the `portfolio` folder as a Vite project.
2. Framework preset: **Vite**. Output: **`dist`** (already set in `vercel.json`).
3. Add environment variables only if you later integrate a form backend.
4. After deploy, update Open Graph URLs in `index.html` to absolute URLs if needed for social previews.

## Structure

- `src/data/` — typed portfolio content (profile, education, experience, projects, skills).
- `src/components/three/` — `HeroScene`, `CameraRig`, `PostFX`, `SceneCanvas`.
- `src/hooks/useReducedMotion.ts` — lighter 3D when `prefers-reduced-motion` is set.
- `src/styles/globals.css` — Tailwind + layout/component styles.
- `public/RishavGhosh_Resume.pdf` — downloadable resume.
