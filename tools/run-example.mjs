import fs from 'node:fs';
import path from 'node:path';
import { executeChecked } from './lib/execute.mjs';
import { root, records, fingerprint } from './lib/catalog.mjs';
// Trusted, reviewed allowlist. Catalog commands are displayed, never executed automatically.
const runs = {
  JavaScript: [
    'node',
    ['examples/languages/programming/javascript/hello.js'],
    'execution',
  ],
  Python: [
    'python3',
    ['examples/languages/programming/python/hello.py'],
    'execution',
  ],
  Shell: [
    'bash',
    ['examples/languages/programming/shell/hello.sh'],
    'execution',
  ],
  JSON: ['node', ['tools/validate-sample.mjs', 'json'], 'validation'],
  HTML: ['python3', ['tools/validate-formats.py', 'html'], 'validation'],
  Markdown: ['node', ['tools/validate-sample.mjs', 'markdown'], 'validation'],
  CSS: ['node', ['tools/validate-sample.mjs', 'css'], 'validation'],
};
const selected = process.argv[2];
const evidence = {
  version: 1,
  at: new Date().toISOString(),
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
  },
  records: [],
};
let failed = false;
for (const record of records('languages').filter((r) => r.example_path)) {
  if (selected && ![record.id, record.name].includes(selected)) continue;
  const spec = runs[record.name];
  if (!spec) throw new Error(`No reviewed runner for ${record.name}`);
  const [command, args, axis] = spec;
  const { passed: pass, result } = executeChecked(
    command,
    args,
    record.expected,
    { cwd: root },
  );
  const item = {
    id: record.id,
    fingerprint: fingerprint(record),
    command: [command, ...args],
    [axis]: pass ? 'passed' : 'failed',
    exit_code: result.status,
    stdout: result.stdout || '',
    stderr: result.stderr || '',
    error: result.error?.message || null,
  };
  evidence.records.push(item);
  failed ||= !pass;
  console.log(`${record.name}: ${axis} ${item[axis]}`);
}
if (selected && evidence.records.length === 0)
  throw new Error(`Unknown example: ${selected}`);
if (!selected) {
  for (const record of records('formats')) {
    const { passed: pass, result } = executeChecked(
      'python3',
      ['tools/validate-formats.py', record.id],
      record.expected,
      { cwd: root },
    );
    evidence.records.push({
      id: record.id,
      fingerprint: fingerprint(record),
      command: ['python3', 'tools/validate-formats.py', record.id],
      validation: pass ? 'passed' : 'failed',
      exit_code: result.status,
      stdout: result.stdout || '',
      stderr: result.stderr || '',
    });
    failed ||= !pass;
    console.log(`${record.name}: validation ${pass ? 'passed' : 'failed'}`);
  }
}
fs.mkdirSync(path.join(root, 'verification'), { recursive: true });
fs.writeFileSync(
  path.join(root, 'verification/latest.json'),
  JSON.stringify(evidence, null, 2) + '\n',
);
if (failed) process.exitCode = 1;
