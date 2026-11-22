# DXJ Labs — Studio Website V1

A polished, mobile-responsive Next.js website for DXJ Labs. Includes selected explorations (VINSS, CAREL, Growhaven), a custom CSS orbital graphic, and studio positioning.

## Getting started

```bash
npm install
npm run dev
npm run build
```

## Publish from Termux

Unzip to a *new* folder (or back up your old `~/dxjlabs` first). Then use `git init`, `git add .`, `git commit`, and GitHub CLI (`gh repo create DXJLabs/dxj-labs-site --public --source=. --remote=origin --push`) if the organization permissions permit it. For Vercel use `npx vercel --prod` and link this folder to its own Vercel project. Never link to VINSS/CAREL deployment projects.

The site intentionally labels all projects as experiments/prototypes, not commercial launches. Only VINSS has a confirmed public repository link; add other links once verified.
