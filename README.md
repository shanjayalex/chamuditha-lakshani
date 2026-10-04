# Chamuditha Lakshani: Portfolio

This is the editorial ("Campaign Magazine") portfolio of a social media marketer and digital marketer based in Colombo.
It is a static site with **no build step**: plain HTML, CSS and JavaScript modules. GSAP, ScrollTrigger, Flip and Lenis
load from a CDN. If the CDN fails or the visitor prefers reduced motion, the site still renders and works fully.

## Run it locally

ES modules need an HTTP server. Opening `index.html` directly from the file system will not work. Use any one of these:

```bash
ruby -run -e httpd . -p 5173      # built into macOS
npx serve .                        # if Node is installed
python3 -m http.server 5173        # if Python is installed
```

Then open http://localhost:5173.

## Edit content

**All text, links and poster data live in `src/data/content.js`.** Components never hard-code content.

- Wrap **one** word per headline in `*stars*` to make it the italic maroon accent word.
- Search for `[EDIT]` to find what still needs a real detail (Instagram handle, form endpoint, client/concept status, results).
- Stats: add only numbers you can prove.

## Add a poster

1. Export the poster as JPEG (or WebP). Sizes: 4:5 = 1080×1350, 1:1 = 1080×1080, 9:16 = 1080×1920. Keep each file under 250 KB where possible.
2. Save two files in `work/`:
   - `my-poster.jpg`: full size, used in the lightbox (max 1350 px tall)
   - `my-poster-560.jpg`: grid thumbnail, 560 px wide

   On a Mac:
   ```bash
   sips -s format jpeg -s formatOptions 70 -Z 1350 source.png --out work/my-poster.jpg
   sips -s format jpeg -s formatOptions 65 --resampleWidth 560 source.png --out work/my-poster-560.jpg
   ```
3. Optional: add a blur placeholder to `src/data/placeholders.js`. This is a base64 16 px JPEG:
   ```bash
   sips -s format jpeg --resampleWidth 16 source.png --out /tmp/p.jpg && echo "data:image/jpeg;base64,$(base64 -i /tmp/p.jpg)"
   ```
4. Add an object to the `work` array in `content.js`:
   ```js
   { id: "my-poster", images: ["my-poster"], ratio: "4:5", type: "post", category: "Ads",
     brand: "Brand name", status: "Client", year: 2026,
     idea: "One-line idea behind it.", alt: "Describe what the poster shows.", tools: ["Canva"] }
   ```
   - `type`: `post`, `story` (opens inside a phone frame) or `carousel` (list several `images`).
   - `category` must be one of `workSection.filters`. Filter chips with no posters are hidden automatically.
   - `status`: use `Client` for real or paid work and `Concept` for self-initiated spec work.

## Before launch

- [ ] Add `Chamuditha-Lakshani-CV.pdf` to the project root (the CV links point there)
- [ ] Set `profile.instagram` and `profile.instagramHandle`
- [ ] Create a free [Formspree](https://formspree.io) form and paste the endpoint into `profile.formEndpoint`. Until then the form opens the visitor's email app.
- [ ] Mark each VIEC piece as `Client` if it was commissioned, and add real results to `cases`
- [ ] After deploying, replace `chamuditha-lakshani.vercel.app` in `index.html` (canonical, Open Graph, JSON-LD) with the real domain
- [ ] Test the WhatsApp link and the form on a phone

## Deploy (Vercel, free)

1. Push this folder to a GitHub repository.
2. On vercel.com, choose **Add New → Project**, import the repository and set **Framework preset: Other**. There is no build command and the output directory is `.`.
3. Deploy. Netlify, GitHub Pages and Cloudflare Pages also work, because the site is just static files.

## Structure

```
index.html                 page shell, SEO meta, JSON-LD, CDN scripts
src/styles.css             design tokens + all styles
src/data/content.js        ← all content
src/data/placeholders.js   blur placeholders
src/lib/                   icons, image helpers
src/components/render.js   renders every section from content.js
src/components/ui.js       nav, filters, story player, form, clock, cursor
src/components/lightbox.js accessible lightbox
src/motion.js              GSAP/ScrollTrigger/Lenis motion (skipped for reduced motion)
work/                      posters (full + -560 thumbnails)
images/                    portrait + Open Graph image
```
