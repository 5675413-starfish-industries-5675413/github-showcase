import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {
  safePath,
  validateInventory,
  validateRecord,
  records,
  upstream,
  evidenceFor,
  fingerprint,
  slug,
} from '../tools/lib/catalog.mjs';
test('inventory accounts for every pinned language', () =>
  validateInventory(records('languages'), upstream()));
test('missing inventory and duplicate IDs are rejected', () => {
  const list = records('languages');
  assert.throws(() => validateInventory(list.slice(1), upstream()), /count/);
  list[1] = list[0];
  assert.throws(() => validateInventory(list, upstream()), /Duplicate/);
});
test('altered upstream category is rejected', () => {
  const list = records('languages');
  list[0].type = 'invented';
  assert.throws(() => validateInventory(list, upstream()), /mismatch/);
});
test('unsafe relative and absolute paths are rejected', () => {
  for (const p of ['../secret', '/etc/passwd', 'a/../../b', 'a\\..\\b', ''])
    assert.throws(() => safePath(p), /path/i);
});
test('symlinks outside a root are rejected', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'showcase-'));
  try {
    fs.symlinkSync(os.tmpdir(), path.join(dir, 'escape'));
    assert.throws(() => safePath('escape', dir), /Symlink/);
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
test('metadata cannot declare a passing result', () => {
  const r = records('languages')[0];
  assert.throws(
    () =>
      validateRecord(
        { ...r, verification: { execution: 'passed' } },
        'language',
      ),
    /additional/,
  );
});
test('missing and stale evidence never passes', () => {
  const r = records('languages').find((r) => r.example_path);
  assert.equal(evidenceFor(r, null).execution, 'not-tested');
  assert.equal(
    evidenceFor(r, {
      records: [{ id: r.id, fingerprint: 'stale', execution: 'passed' }],
    }).execution,
    'not-tested',
  );
  assert.equal(
    evidenceFor(r, {
      records: [{ id: r.id, fingerprint: fingerprint(r), execution: 'passed' }],
    }).execution,
    'passed',
  );
  const changed = { ...r, expected: 'different' };
  assert.equal(
    evidenceFor(changed, {
      records: [{ id: r.id, fingerprint: fingerprint(r), execution: 'passed' }],
    }).execution,
    'not-tested',
  );
});
test('punctuation cannot collide because IDs remain distinct', () =>
  assert.notEqual(slug('C++', 1), slug('C#', 2)));
test('feature demonstration requires evidence', () => {
  const r = records('features')[0];
  assert.throws(
    () =>
      validateRecord({ ...r, status: 'demonstrated', evidence: [] }, 'feature'),
    /items/,
  );
});

test('independent matching evidence merges axes and stale reports cannot override it', () => {
  const r = records('languages').find((r) => r.name === 'Python');
  const f = fingerprint(r);
  assert.deepEqual(
    evidenceFor(r, {
      records: [
        { id: r.id, fingerprint: f, execution: 'passed' },
        { id: r.id, fingerprint: f, detection: 'passed' },
        { id: r.id, fingerprint: 'stale', execution: 'failed' },
      ],
    }),
    { detection: 'passed', execution: 'passed', validation: 'not-tested' },
  );
  assert.equal(
    evidenceFor(r, {
      records: [
        { id: r.id, fingerprint: f, execution: 'passed' },
        { id: r.id, fingerprint: f, execution: 'failed' },
      ],
    }).execution,
    'failed',
  );
});
test('imported fixture checksum changes are rejected', () => {
  const r = records('languages').find((r) => r.origin);
  assert.throws(
    () =>
      validateRecord(
        { ...r, origin: { ...r.origin, sha256: '0'.repeat(64) } },
        'language',
      ),
    /checksum/,
  );
});
