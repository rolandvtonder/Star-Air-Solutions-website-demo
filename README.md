# Star Air Solution — website

Six pages: Home, About, Services, Projects, Gallery, Contact. Built with Vite, React, TypeScript, Tailwind CSS v4 and Lenis smooth scrolling.

## Run it locally

```powershell
npm install
npm run dev
```

Then open http://localhost:5173.

## Change the text

All wording, phone numbers, the email address, the project list and the photo captions are in `src/content.ts`. Edit that file only — the pages pick the changes up.

## Add or replace photos

1. Put the new `.jpeg` files in the `media` folder next to this `website` folder.
2. Run `npm run images` — it makes web-sized copies in `public/media` and updates `src/photos.json`.
3. Add a caption for each new photo in `captions` in `src/content.ts` (the photo's id is `p-` plus its file name, e.g. `55.jpeg` → `p-55`). Only captioned photos appear in the gallery.

## Publish

```powershell
npm run build
```

Upload the contents of the `dist` folder to any static host (Netlify, Vercel, Cloudflare Pages, or your current hosting for starairsolution.co.za). Every page is a real HTML file, so no server setup is needed.

## The quote form

The form on the Contact page has no server: it opens WhatsApp (to 072 599 0798) or the visitor's email app with the request filled in, and they press send. To receive submissions straight into an inbox instead, connect a form service such as Netlify Forms or Formspree.
