// One-time bootstrap. Refuses to overwrite an existing catalog.
import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { root, upstream, slug } from './lib/catalog.mjs';
const dir = path.join(root, 'catalog/languages');
if (fs.existsSync(dir))
  throw new Error('Catalog already exists; use a reviewed upstream update');
fs.mkdirSync(dir, { recursive: true });
for (const [name, data] of Object.entries(upstream())) {
  const record = {
    id: slug(name, data.language_id),
    name,
    upstream_language_id: data.language_id,
    type: data.type,
    aliases: data.aliases || [],
    extensions: data.extensions || [],
    example_path: null,
    source: null,
    demonstration: 'pending',
    requirements: [],
    run: null,
    expected: null,
    limitations: [
      'Example not yet contributed. Toolchain requirements not yet assessed.',
    ],
    license: 'MIT (catalog metadata; see NOTICE.md)',
  };
  fs.writeFileSync(path.join(dir, record.id + '.yaml'), YAML.stringify(record));
}
