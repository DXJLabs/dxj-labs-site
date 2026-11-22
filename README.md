# DXJ Labs — Living Interface (V2)

Premium Next.js site for DXJ Labs with animated orbital hero, kinetic work visuals, scrolling practice ticker, scroll-driven reveals, subtle mouse-follow light, and reduced-motion accessibility. No extra runtime dependencies.

## Run locally

```bash
npm install
npm run build
npm run dev
```

## Update deployed Termux project

This ZIP contains files at the root. Extract into the existing `~/dxjlabs-premium` Git directory.

```bash
cd ~/dxjlabs-premium
cp app/page.tsx app/page.tsx.v1.bak
cp app/globals.css app/globals.css.v1.bak
unzip -o ~/storage/downloads/dxjlabs-living-v2.zip -d .
npm run build
git add app/page.tsx app/globals.css README.md
git commit -m "feat: bring DXJ Labs studio interface to life"
git push origin main
```

Vercel should auto-deploy the connected main branch after GitHub receives the push.

Visual elements and labels are illustrative; project stages are not claimed to be launched products.
