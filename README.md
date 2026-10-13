# SRV Associates — website

Marketing site for SRV Associates (architecture, structural design, construction).
React 19 + TypeScript, built with Vite, animated with GSAP/ScrollTrigger, deployed as static files to an Apache host.

## Commands

```bash
npm install
npm run dev          # local dev server
npm run build        # type-check + production build into dist/
npm run preview      # serve the production build locally
npm run lint         # oxlint
npm run check:size   # fail if dist/ exceeds the performance budgets (run after build)
```

Deploy by uploading the contents of `dist/`. It includes `.htaccess` (SPA routing, compression, cache headers, video MIME types).

## Project layout

```
src/
  pages/        Home, About, Services, Contact (lazy-loaded routes; see src/routes.ts)
  components/   Navbar, Footer, FooterAnimation, hero/, sections/, about/
  lib/          scrollTrigger.ts: GSAP plugin setup and layout-change refresh
  data/         services and contact content
  styles/       one CSS file per component/page
  assets/       images and hero video (imported, so Vite hashes and caches them)
public/
  media/        logos, favicons, hero posters (stable URLs, preloaded from index.html)
  assets/       06-structure.webp (About hero)
  .htaccess
scripts/
  check-budgets.mjs
```

Fonts are self-hosted through `@fontsource` packages (imported in `src/main.tsx`). Don't add Google Fonts links. They would duplicate the fonts and block rendering.

## Performance rules

The site went from a Lighthouse mobile score of 3 to 69 on the home page. See `OPTIMIZATION_PLAN.md` for the history and the next steps. To keep it fast:

- **Images:** WebP, sized at about 2× their largest display size, normally under 100 KB (the hard limit in `check:size` is 200 KB). Below-the-fold images get `loading="lazy" decoding="async"`. No spaces in file names.
- **Never put source/master files in `public/`.** Everything there is deployed as-is.
- **Hero video:** keep under 2 MB, with `preload="metadata"`. The poster must be the video's first frame.
- Run `npm run build && npm run check:size` before deploying.

## Design masters

Full-size originals (hero renders, the original 10 MB hero video, uncompressed images, 822×720 logos, design notes) are kept in `design-source/`. That folder is **git-ignored**, so keep a copy in shared storage. It is not part of the site.

### Re-encoding the hero video

From the master `design-source/video/hero-bg.webm` (ffmpeg needed; `npx ffmpeg-static` works too):

```bash
IN=design-source/video/hero-bg.webm
vp9 () { # width, bitrate, output
  ffmpeg -y -i $IN -an -vf scale=$1:-2 -c:v libvpx-vp9 -b:v $2 -row-mt 1 -g 48 -pass 1 -passlogfile pl$1 -cpu-used 4 -f null - &&
  ffmpeg -y -i $IN -an -vf scale=$1:-2 -c:v libvpx-vp9 -b:v $2 -row-mt 1 -g 48 -pass 2 -passlogfile pl$1 -cpu-used 1 -auto-alt-ref 1 -lag-in-frames 25 $3; }
vp9 1920 2000k src/assets/hero-1920.webm
vp9 960  750k  src/assets/hero-960.webm
ffmpeg -y -i $IN -an -vf scale=1280:-2 -c:v libx264 -preset slow -b:v 1600k -maxrate 2000k -bufsize 3200k \
  -pix_fmt yuv420p -movflags +faststart -g 48 src/assets/hero-1280.mp4
```

Posters (`public/media/hero-poster-{960,1600}.webp`) are the first frame, saved as WebP at quality 60.
