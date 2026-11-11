import { spawnSync } from 'node:child_process';
export function executeChecked(
  command,
  args,
  expected,
  { cwd, timeout = 10000, maxBuffer = 65536 } = {},
) {
  const result = spawnSync(command, args, {
    cwd,
    timeout,
    maxBuffer,
    encoding: 'utf8',
    shell: false,
  });
  return {
    passed: !result.error && result.status === 0 && result.stdout === expected,
    result,
  };
}
