import {
  read,
  json,
  hash,
  records,
  upstream,
  validateRecord,
  validateInventory,
} from './lib/catalog.mjs';
const lock = json('catalog/upstream/linguist.lock.json');
if (
  !/^[a-f0-9]{40}$/.test(lock.revision) ||
  hash(read('catalog/upstream/languages.yml')) !== lock.sha256
)
  throw new Error('Pinned upstream integrity check failed');
const ids = new Set();
for (const [group, schema] of [
  ['languages', 'language'],
  ['formats', 'format'],
  ['features', 'feature'],
])
  for (const record of records(group)) {
    validateRecord(record, schema);
    if (ids.has(record.id))
      throw new Error(`Duplicate catalog ID ${record.id}`);
    ids.add(record.id);
  }
validateInventory(records('languages'), upstream());
console.log(
  `Catalog valid: ${records('languages').length} languages, ${records('formats').length} formats, ${records('features').length} features`,
);
