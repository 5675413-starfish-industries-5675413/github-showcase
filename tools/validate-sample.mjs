import assert from 'node:assert/strict';
import { read } from './lib/catalog.mjs';
const kind = process.argv[2];
if (kind === 'json')
  assert.equal(
    JSON.parse(read('examples/languages/data/json/hello.json')).message,
    'Hello, world!',
  );
else if (kind === 'markdown')
  assert.equal(
    read('examples/languages/prose/markdown/hello.md'),
    '# Hello, world!\n'.replace('\\n', '\n'),
  );
else if (kind === 'css')
  assert.match(
    read('examples/languages/markup/css/hello.css'),
    /^body\s*\{\s*color:\s*#[0-9a-f]{6};\s*\}\s*$/,
  );
else throw new Error('Unknown validator');
console.log('Valid sample');
