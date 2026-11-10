import test from 'node:test';
import assert from 'node:assert/strict';
import { executeChecked } from '../tools/lib/execute.mjs';
const run = (script, expected = '', options = {}) =>
  executeChecked(process.execPath, ['-e', script], expected, options);
test('exact stdout and successful exit are required', () => {
  assert.equal(run('console.log("ok")', 'ok\n').passed, true);
  assert.equal(run('console.log("wrong")', 'ok\n').passed, false);
  assert.equal(run('process.exit(1)').passed, false);
});
test('unavailable toolchain fails honestly', () =>
  assert.equal(
    executeChecked('showcase-nonexistent-runtime', [], '').passed,
    false,
  ));
test('timeouts and excessive output fail', () => {
  assert.equal(run('while(true){}', '', { timeout: 100 }).passed, false);
  assert.equal(
    run('console.log("x".repeat(100000))', '', { maxBuffer: 1024 }).passed,
    false,
  );
});
