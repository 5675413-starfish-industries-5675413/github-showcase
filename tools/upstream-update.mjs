import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { root, json, hash, upstream } from './lib/catalog.mjs';
const requested = process.argv[2] || 'HEAD';
if (requested !== 'HEAD' && !/^[a-f0-9]{40}$/.test(requested))
  throw new Error('Use HEAD or a full upstream commit SHA');
async function get(url) {
  const r = await fetch(url, {
    headers: { Accept: 'application/vnd.github+json' },
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`${r.status} fetching upstream`);
  return r;
}
const commit = await (
  await get(
    `https://api.github.com/repos/github-linguist/linguist/commits/${requested}`,
  )
).json();
if (!/^[a-f0-9]{40}$/.test(commit.sha))
  throw new Error('Invalid upstream revision');
const text = await (
  await get(
    `https://raw.githubusercontent.com/github-linguist/linguist/${commit.sha}/lib/linguist/languages.yml`,
  )
).text();
const candidate = YAML.parse(text);
if (!candidate || Object.keys(candidate).length < 500)
  throw new Error('Invalid inventory');
const before = upstream();
const lock = {
  ...json('catalog/upstream/linguist.lock.json'),
  revision: commit.sha,
  sha256: hash(text),
};
const proposal = {
  from: json('catalog/upstream/linguist.lock.json').revision,
  to: commit.sha,
  added: Object.keys(candidate).filter((n) => !before[n]),
  removed: Object.keys(before).filter((n) => !candidate[n]),
  changed: Object.keys(candidate).filter(
    (n) =>
      before[n] && JSON.stringify(before[n]) !== JSON.stringify(candidate[n]),
  ),
};
const out = path.join(root, '.cache/upstream-proposal');
fs.mkdirSync(out, { recursive: true });
for (const [name, data] of [
  ['languages.yml', text],
  ['linguist.lock.json', JSON.stringify(lock, null, 2) + '\n'],
  ['changes.json', JSON.stringify(proposal, null, 2) + '\n'],
])
  fs.writeFileSync(path.join(out, name), data);
console.log(JSON.stringify(proposal, null, 2));
console.log(
  'Proposal only: pinned baseline and catalog unchanged. Review docs/upstream-updates.md before applying.',
);
