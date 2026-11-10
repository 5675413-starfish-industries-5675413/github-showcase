import fs from 'node:fs';
import path from 'node:path';
import { root } from './lib/catalog.mjs';
const dist = path.join(root, 'website/dist');
let checked = 0;
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(file);
      continue;
    }
    if (!file.endsWith('.html')) continue;
    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(/(?:href|src)="([^"]+)"/g)) {
      const url = match[1];
      if (/^(https?:|mailto:|data:|#)/.test(url)) continue;
      const clean = decodeURIComponent(url.split(/[?#]/)[0]);
      const target = clean.startsWith('/github-showcase')
        ? path.join(dist, clean.slice('/github-showcase'.length))
        : path.resolve(path.dirname(file), clean);
      if (!fs.existsSync(target))
        throw new Error(
          `Broken internal link in ${path.relative(dist, file)}: ${url}`,
        );
      if (
        fs.statSync(target).isDirectory() &&
        !fs.existsSync(path.join(target, 'index.html'))
      )
        throw new Error(`Missing page: ${url}`);
      checked++;
    }
  }
}
walk(dist);
console.log(`Checked ${checked} local website links and assets`);
