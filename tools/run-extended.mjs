import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { root, records, fingerprint } from './lib/catalog.mjs';
const selected = process.argv[2];
const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'showcase-run-'));
const executable = path.join(dir, 'hello');
const entries = records('languages').filter(
  (r) =>
    r.verification_profile === 'extended' &&
    (!selected || [r.name, r.id].includes(selected)),
);
const report = {
  version: 1,
  at: new Date().toISOString(),
  environment: {
    node: process.version,
    platform: process.platform,
    arch: process.arch,
  },
  records: [],
};
const command = (bin, args) =>
  spawnSync(bin, args, {
    cwd: root,
    encoding: 'utf8',
    timeout: 120000,
    maxBuffer: 65536,
    env: { ...process.env, GOCACHE: path.join(dir, 'go-cache') },
  });
try {
  for (const r of entries) {
    const source = `${r.example_path}/${r.source}`;
    const specs = {
      C: [
        ['cc', [source, '-o', executable]],
        [executable, []],
      ],
      'C++': [
        ['c++', [source, '-o', executable]],
        [executable, []],
      ],
      Rust: [
        ['rustc', [source, '-o', executable]],
        [executable, []],
      ],
      Go: [
        [null, []],
        ['go', ['run', source]],
      ],
      Java: [
        [null, []],
        ['java', [source]],
      ],
      Ruby: [
        [null, []],
        ['ruby', [source]],
      ],
      Perl: [
        [null, []],
        ['perl', [source]],
      ],
      PHP: [
        [null, []],
        ['php', [source]],
      ],
      Lua: [
        [null, []],
        ['lua', [source]],
      ],
      Tcl: [
        [null, []],
        ['tclsh', [source]],
      ],
      TypeScript: [
        [null, []],
        ['node', [source]],
      ],
    };
    const spec = specs[r.name];
    if (!spec) throw new Error('No reviewed extended runner');
    const [compile, run] = spec;
    const built = compile[0] ? command(...compile) : null;
    const output = built && built.status !== 0 ? built : command(...run);
    const pass =
      output.status === 0 && !output.error && output.stdout === r.expected;
    report.records.push({
      id: r.id,
      fingerprint: fingerprint(r),
      command:
        run[0] === executable
          ? [compile[0], ...compile[1], 'THEN', run[0], ...run[1]]
          : [run[0], ...run[1]],
      execution: pass ? 'passed' : 'failed',
      ...(compile[0]
        ? { validation: built.status === 0 ? 'passed' : 'failed' }
        : {}),
      exit_code: output.status,
      stdout: output.stdout || '',
      stderr:
        (built?.stderr || '') + (output === built ? '' : output.stderr || ''),
      error: output.error?.message || null,
    });
    console.log(`${r.name}: ${pass ? 'passed' : 'failed'}`);
  }
  if (selected && !entries.length) throw new Error('Unknown extended example');
  if (!selected) {
    for (const [id, bin, args, expected] of [
      [
        'format-pdf',
        'pdftotext',
        ['examples/formats/documents/hello.pdf', '-'],
        null,
      ],
      [
        'format-mp4',
        'ffmpeg',
        [
          '-v',
          'error',
          '-i',
          'examples/formats/video/hello.mp4',
          '-f',
          'null',
          '-',
        ],
        '',
      ],
    ]) {
      const r = records('formats').find((x) => x.id === id);
      const output = command(bin, args);
      const pass =
        output.status === 0 &&
        !output.error &&
        (expected === null
          ? output.stdout.includes('Hello, world!')
          : output.stdout === expected);
      report.records.push({
        id,
        fingerprint: fingerprint(r),
        command: [bin, ...args],
        validation: pass ? 'passed' : 'failed',
        exit_code: output.status,
        stdout: output.stdout || '',
        stderr: output.stderr || '',
        error: output.error?.message || null,
      });
      console.log(`${id}: decoder ${pass ? 'passed' : 'failed'}`);
    }
  }
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
  fs.mkdirSync(path.join(root, 'verification'), { recursive: true });
  fs.writeFileSync(
    path.join(root, 'verification/extended.json'),
    JSON.stringify(report, null, 2) + '\n',
  );
}
if (
  report.records.some(
    (r) => r.execution === 'failed' || r.validation === 'failed',
  )
)
  process.exitCode = 1;
