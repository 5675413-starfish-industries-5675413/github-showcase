import fs from 'node:fs';
import path from 'node:path';
import YAML from 'yaml';
import { root, records } from './lib/catalog.mjs';
const info = {
  Python: [
    'programming/python',
    'hello.py',
    ['python3', 'hello.py'],
    'Python 3',
    'print',
  ],
  JavaScript: [
    'programming/javascript',
    'hello.js',
    ['node', 'hello.js'],
    'Node.js 22.12+',
    'print',
  ],
  Shell: [
    'programming/shell',
    'hello.sh',
    ['bash', 'hello.sh'],
    'Bash',
    'print',
  ],
  JSON: ['data/json', 'hello.json', null, 'Node.js 22.12+', 'store'],
  HTML: ['markup/html', 'hello.html', null, 'Web browser; Python 3', 'render'],
  Markdown: [
    'prose/markdown',
    'hello.md',
    null,
    'Markdown viewer; Node.js',
    'render',
  ],
  CSS: ['markup/css', 'hello.css', null, 'Web browser; Node.js', 'native'],
};
for (const r of records('languages'))
  if (info[r.name]) {
    const [sub, source, run, requirement, demonstration] = info[r.name];
    Object.assign(r, {
      example_path: `examples/languages/${sub}`,
      source,
      run,
      requirements: [requirement],
      demonstration,
      expected: run ? 'Hello, world!\n' : 'Valid sample\n',
      limitations: run
        ? ['Detection not yet audited.']
        : [
            'Core check covers this sample structure/content only; full syntax conformance and rendered appearance are not verified.',
          ],
      license: 'MIT',
    });
    fs.writeFileSync(
      path.join(root, 'catalog/languages', r.id + '.yaml'),
      YAML.stringify(r),
    );
  }
