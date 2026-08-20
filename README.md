# Kyra Jiao — Personal Portfolio

Personal software engineering portfolio built with React and TypeScript and deployed with GitHub Pages. The site emphasizes professional experience, engineering decisions, and a curated set of full-stack and data projects.

## Live Site

[https://jqiwen.github.io/](https://jqiwen.github.io/)

## Tech Stack

- React 19
- TypeScript
- Vite
- CSS
- GitHub Actions
- GitHub Pages

## Local Development

```bash
npm install
npm run dev
```

From a fresh clone:

```bash
git clone https://github.com/jqiwen/jqiwen.github.io.git
cd jqiwen.github.io
npm install
npm run dev
```

## Build

```bash
npm run build
```

The production output is written to `dist/`. Preview it locally with:

```bash
npm run preview
```

## Deployment

The workflow in `.github/workflows/deploy.yml` builds the Vite project and publishes `dist/` to GitHub Pages whenever `main` is updated. The site is configured as the root user site, so Vite uses `/` as its base path.

## Project Structure

```text
src/
├── components/      React sections and reusable UI
├── data/            Portfolio content and typed data
├── App.tsx          Page composition
└── index.css        Global styles and responsive design

public/
├── projects/        Verified project visuals
└── resume.pdf       Downloadable resume
```

Content can be updated in:

- Experience: `src/data/experience.ts`
- Projects and case-study content: `src/data/projects.ts`
- Skills: `src/data/skills.ts`
- Education: `src/data/education.ts`
- Contact and profile links: `src/data/profile.ts`
- Resume: `public/resume.pdf`
- Project images: `public/projects/`

The Hammerly section currently uses an architecture panel because the public repository does not contain a verified product screenshot. Replace that panel when a genuine screenshot is available.
