import { spawnSync } from 'node:child_process';
const result = spawnSync('bundle', ['exec', 'github-linguist', '--version'], {
  encoding: 'utf8',
});
console.error(
  'Detection audit is pending. A pinned Ruby Linguist installation and per-file classifier are required.',
);
if (result.status === 0)
  console.error(
    `Available tool: ${result.stdout.trim()} (not evidence of correct detection)`,
  );
process.exitCode = 2;
