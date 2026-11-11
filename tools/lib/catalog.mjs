import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import YAML from 'yaml';
import Ajv from 'ajv';
export const root = fileURLToPath(new URL('../../', import.meta.url));
export const read = (p) => fs.readFileSync(path.join(root, p), 'utf8');
export const json = (p) => JSON.parse(read(p));
export const hash = (value) =>
  crypto.createHash('sha256').update(value).digest('hex');
export function safePath(p, base = root) {
  if (
    typeof p !== 'string' ||
    !p ||
    path.isAbsolute(p) ||
    p.split(/[\\/]/).includes('..')
  )
    throw new Error(`Unsafe path: ${p}`);
  const target = path.resolve(base, p);
  if (!target.startsWith(path.resolve(base) + path.sep))
    throw new Error(`Path outside root: ${p}`);
  if (
    fs.existsSync(target) &&
    !fs.realpathSync(target).startsWith(fs.realpathSync(base) + path.sep)
  )
    throw new Error(`Symlink outside root: ${p}`);
  return target;
}
export const upstream = () =>
  YAML.parse(read('catalog/upstream/languages.yml'));
export const slug = (name, id) =>
  `${
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'language'
  }-${id}`;
export function records(kind) {
  const dir = path.join(root, 'catalog', kind);
  return fs
    .readdirSync(dir)
    .filter((p) => p.endsWith('.yaml'))
    .sort()
    .map((p) => YAML.parse(fs.readFileSync(path.join(dir, p), 'utf8')));
}
export function fingerprint(record) {
  const inputs = [
    JSON.stringify(record),
    ...[
      'tools/lib/catalog.mjs',
      'tools/lib/execute.mjs',
      'tools/run-example.mjs',
      'tools/validate-sample.mjs',
      'tools/validate-formats.py',
    ].map(read),
  ];
  if (record.example_path) {
    const walk = (dir) =>
      fs
        .readdirSync(dir, { withFileTypes: true })
        .sort((a, b) => a.name.localeCompare(b.name))
        .flatMap((f) => {
          const p = path.join(dir, f.name);
          if (f.isSymbolicLink())
            throw new Error('Example symlinks are not allowed');
          return f.isDirectory()
            ? walk(p)
            : [path.relative(root, p), fs.readFileSync(p)];
        });
    inputs.push(...walk(safePath(record.example_path)));
  }
  return hash(Buffer.concat(inputs.map((v) => Buffer.from(v))));
}
export function evidenceFor(record, evidence) {
  const result = {
    detection: 'not-tested',
    validation: 'not-tested',
    execution: 'not-tested',
  };
  const item = evidence?.records?.find((r) => r.id === record.id);
  if (item && item.fingerprint === fingerprint(record)) {
    for (const axis of Object.keys(result))
      if (item[axis]) result[axis] = item[axis];
  }
  return result;
}
export function validateRecord(record, kind) {
  const ajv = new Ajv({ allErrors: true });
  const check = ajv.compile(json(`catalog/schemas/${kind}.schema.json`));
  if (!check(record))
    throw new Error(`${record.id}: ${ajv.errorsText(check.errors)}`);
  if (record.example_path) {
    const dir = safePath(record.example_path);
    if (!fs.statSync(dir).isDirectory())
      throw new Error('Example must be a directory');
    for (const file of ['README.md', record.source])
      if (!fs.existsSync(safePath(`${record.example_path}/${file}`)))
        throw new Error(`Missing example file ${file}`);
  }
  if (kind === 'feature')
    for (const p of record.configuration)
      if (!fs.existsSync(safePath(p)))
        throw new Error(`Missing feature configuration ${p}`);
}
export function validateInventory(languages, baseline) {
  const expected = Object.entries(baseline),
    ids = new Set();
  if (languages.length !== expected.length)
    throw new Error('Inventory count differs from pinned baseline');
  for (const entry of languages) {
    if (ids.has(entry.upstream_language_id))
      throw new Error('Duplicate language ID');
    ids.add(entry.upstream_language_id);
    const source = baseline[entry.name];
    if (
      !source ||
      source.language_id !== entry.upstream_language_id ||
      source.type !== entry.type
    )
      throw new Error(`Upstream mismatch: ${entry.name}`);
    if (
      JSON.stringify(entry.aliases) !== JSON.stringify(source.aliases || []) ||
      JSON.stringify(entry.extensions) !==
        JSON.stringify(source.extensions || [])
    )
      throw new Error(`Upstream metadata mismatch: ${entry.name}`);
  }
}
export function loadEvidence() {
  if (!fs.existsSync(path.join(root, 'verification/latest.json'))) return null;
  const evidence = json('verification/latest.json');
  const validate = new Ajv().compile(
    json('catalog/schemas/verification.schema.json'),
  );
  if (!validate(evidence))
    throw new Error(
      'Invalid verification evidence: ' + JSON.stringify(validate.errors),
    );
  return evidence;
}
export function loadCatalog() {
  const evidence = loadEvidence();
  return Object.fromEntries(
    ['languages', 'formats', 'features'].map((kind) => [
      kind,
      records(kind).map((r) => ({
        ...r,
        verification: evidenceFor(r, evidence),
      })),
    ]),
  );
}
