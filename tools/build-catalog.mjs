import './validate-catalog.mjs';
import fs from 'node:fs';
import path from 'node:path';
import {
  root,
  json,
  loadCatalog,
  loadEvidence,
  read,
  safePath,
} from './lib/catalog.mjs';
const catalog = loadCatalog();
const evidence = loadEvidence();
fs.mkdirSync(path.join(root, 'website/public/reports'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'website/public/reports/evidence.json'),
  JSON.stringify(evidence || { records: [] }, null, 2) + '\n',
);
for (const kind of ['languages', 'formats'])
  for (const r of catalog[kind])
    if (r.example_path) {
      const bytes = fs.readFileSync(safePath(`${r.example_path}/${r.source}`));
      if (!bytes.includes(0)) r.source_text = bytes.toString('utf8');
      r.download_name = kind === 'languages' ? 'source.txt' : r.source;
      const target = path.join(
        root,
        'website/public/samples',
        r.id,
        r.download_name,
      );
      fs.mkdirSync(path.dirname(target), { recursive: true });
      fs.copyFileSync(safePath(`${r.example_path}/${r.source}`), target);
    }

const languages = catalog.languages;
const coverage = {
  baseline: json('catalog/upstream/linguist.lock.json'),
  inventory: languages.length,
  examples: languages.filter((r) => r.example_path).length,
  categories: Object.fromEntries(
    ['programming', 'markup', 'data', 'prose'].map((type) => [
      type,
      languages.filter((r) => r.type === type).length,
    ]),
  ),
  ...Object.fromEntries(
    ['detection', 'validation', 'execution'].map((axis) => [
      axis,
      languages.filter((r) => r.verification[axis] === 'passed').length,
    ]),
  ),
  formats: {
    total: catalog.formats.length,
    validated: catalog.formats.filter(
      (r) => r.verification.validation === 'passed',
    ).length,
  },
  features: {
    total: catalog.features.length,
    demonstrated: catalog.features.filter((r) => r.status === 'demonstrated')
      .length,
  },
};
fs.mkdirSync(path.join(root, 'catalog/generated'), { recursive: true });
for (const [key, value] of Object.entries({ ...catalog, coverage }))
  fs.writeFileSync(
    path.join(root, `catalog/generated/${key}.json`),
    JSON.stringify(value, null, 2) + '\n',
  );
fs.writeFileSync(
  path.join(root, 'catalog/generated/coverage.md'),
  `# Coverage\n\nPinned Linguist: ${coverage.baseline.revision}\n\n| Measure | Count |\n| --- | ---: |\n| Inventory | ${coverage.inventory} |\n| Examples | ${coverage.examples} |\n| Detected | ${coverage.detection} |\n| Validated | ${coverage.validation} |\n| Executed | ${coverage.execution} |\n\nResults reflect only matching local evidence. Missing or changed evidence is not tested.\n`,
);
console.log(coverage);
