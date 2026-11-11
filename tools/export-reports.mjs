import fs from 'node:fs';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, hash, read } from './lib/catalog.mjs';
const out = path.join(root, 'website/public/reports');
fs.mkdirSync(out, { recursive: true });
for (const name of ['languages', 'formats', 'features', 'coverage'])
  fs.copyFileSync(
    path.join(root, `catalog/generated/${name}.json`),
    path.join(out, `${name}.json`),
  );
fs.copyFileSync(
  path.join(root, 'catalog/generated/coverage.md'),
  path.join(out, 'coverage.md'),
);
const languages = JSON.parse(read('catalog/generated/languages.json'));
const quote = (v) => '"' + String(v ?? '').replaceAll('"', '""') + '"';
const rows = [
  ['id', 'name', 'category', 'example', 'detection', 'validation', 'execution'],
  ...languages.map((r) => [
    r.id,
    r.name,
    r.type,
    r.example_path,
    ...['detection', 'validation', 'execution'].map((a) => r.verification[a]),
  ]),
];
fs.writeFileSync(
  path.join(out, 'languages.csv'),
  rows.map((r) => r.map(quote).join(',')).join('\n') + '\n',
);
const source =
  spawnSync('git', ['rev-parse', 'HEAD'], {
    cwd: root,
    encoding: 'utf8',
  }).stdout?.trim() || 'unknown';
const history = fs.existsSync(path.join(root, 'catalog/history.json'))
  ? JSON.parse(read('catalog/history.json'))
  : [];
fs.writeFileSync(
  path.join(out, 'history.json'),
  JSON.stringify(
    [
      ...history,
      {
        revision: source,
        at: new Date().toISOString(),
        ...JSON.parse(read('catalog/generated/coverage.json')),
      },
    ],
    null,
    2,
  ) + '\n',
);
const files = fs
  .readdirSync(out)
  .filter((n) => n !== 'SHA256SUMS')
  .sort();
fs.writeFileSync(
  path.join(out, 'SHA256SUMS'),
  files
    .map((n) => `${hash(fs.readFileSync(path.join(out, n)))}  ${n}`)
    .join('\n') + '\n',
);
console.log(`Exported ${files.length} reports with SHA-256 checksums.`);
