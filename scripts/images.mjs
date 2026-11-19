// Turns the original job photos in ../media into web-sized WebP files in
// public/media (1600px "lg" and 800px "sm"), and writes a manifest with each
// photo's dimensions so pages can reserve space and avoid layout shift.
// Run with: npm run images  (optionally pass a folder for a contact sheet).
import {readdir, mkdir, writeFile} from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('..', 'media');
const OUT = path.resolve('public', 'media');
const sheetDir = process.argv[2];

await mkdir(OUT, {recursive: true});
const files = (await readdir(SRC)).filter((f) => /\.jpe?g$/i.test(f) && !/^logo/i.test(f));

const slug = (f) =>
  'p-' +
  f
    .replace(/\.jpe?g$/i, '')
    .replace(/WhatsApp Image /i, 'wa-')
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-|-$/g, '')
    .toLowerCase();

const manifest = {};
for (const f of files) {
  let id = slug(f);
  while (manifest[id]) id += 'b';
  const img = sharp(path.join(SRC, f)).rotate();
  const meta = await img.metadata();
  const portrait = (meta.orientation ?? 1) >= 5;
  const w = portrait ? meta.height : meta.width;
  const h = portrait ? meta.width : meta.height;
  await img.clone().resize({width: 1600, withoutEnlargement: true}).webp({quality: 74}).toFile(path.join(OUT, `${id}-lg.webp`));
  await img.clone().resize({width: 800, withoutEnlargement: true}).webp({quality: 72}).toFile(path.join(OUT, `${id}-sm.webp`));
  manifest[id] = {src: f, w, h};
}

// Logo: trimmed PNG with the white made transparent is not reliable on a JPEG,
// so ship it as-is (white background) at two sizes.
await sharp(path.join(SRC, 'logo.jpg')).resize({width: 600}).png().toFile(path.join(OUT, 'logo.png'));
await sharp(path.join(SRC, 'logo.jpg')).extract({left: 330, top: 0, width: 980, height: 900}).resize({width: 256}).png().toFile(path.join(OUT, 'logo-mark.png'));

await writeFile(path.resolve('src', 'photos.json'), JSON.stringify(manifest, null, 2));
console.log(`wrote ${files.length} photos`);

if (sheetDir) {
  // Numbered contact sheet, 8 across, for picking photos by eye.
  const ids = Object.keys(manifest);
  const cell = 220;
  const cols = 8;
  const rows = Math.ceil(ids.length / cols);
  const tiles = await Promise.all(
    ids.map(async (id, i) => {
      const buf = await sharp(path.join(OUT, `${id}-sm.webp`)).resize(cell, cell, {fit: 'cover'}).toBuffer();
      const label = Buffer.from(
        `<svg width="${cell}" height="22"><rect width="${cell}" height="22" fill="black"/><text x="4" y="16" font-size="14" fill="white" font-family="Arial">${i}: ${id}</text></svg>`,
      );
      return [
        {input: buf, left: (i % cols) * cell, top: Math.floor(i / cols) * cell},
        {input: label, left: (i % cols) * cell, top: Math.floor(i / cols) * cell},
      ];
    }),
  );
  await sharp({create: {width: cols * cell, height: rows * cell, channels: 3, background: '#000'}})
    .composite(tiles.flat())
    .jpeg({quality: 70})
    .toFile(path.join(sheetDir, 'sheet.jpg'));
  console.log('sheet written');
}
