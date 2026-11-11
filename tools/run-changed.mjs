import { spawnSync } from 'node:child_process';
import { records, root } from './lib/catalog.mjs';
const ref = process.argv[2] || 'HEAD';
if (!/^[a-zA-Z0-9_./-]+$/.test(ref) || ref.startsWith('-'))
  throw new Error('Invalid base ref');
const result = spawnSync('git', ['diff', '--name-only', ref, '--'], {
  cwd: root,
  encoding: 'utf8',
});
if (result.status !== 0) throw new Error(result.stderr);
const paths = result.stdout.trim().split('\n');
const selected = records('languages').filter((r) =>
  paths.some(
    (p) =>
      p === `catalog/languages/${r.id}.yaml` ||
      p.startsWith(r.example_path + '/'),
  ),
);
let failed = false;
for (const r of selected) {
  const profile =
    r.verification_profile === 'extended'
      ? 'run-extended.mjs'
      : r.verification_profile === 'inspection'
        ? 'linguist-audit.mjs'
        : 'run-example.mjs';
  const out = spawnSync(process.execPath, [`tools/${profile}`, r.id], {
    cwd: root,
    stdio: 'inherit',
  });
  failed ||= out.status !== 0;
}
console.log(
  `${selected.length} changed language examples selected. For shared tooling changes run npm run verify and the extended/detection profiles.`,
);
if (failed) process.exitCode = 1;
