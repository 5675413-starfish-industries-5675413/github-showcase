import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac } from 'node:crypto';
import { createWebhookVerifier } from '../examples/integrations/webhook.mjs';
const secret = 'test-only-never-a-real-secret';
function payload(body = Buffer.from('{"zen":"Hello, world!"}')) {
  return {
    body,
    signature:
      'sha256=' + createHmac('sha256', secret).update(body).digest('hex'),
    delivery: 'test-delivery',
    event: 'ping',
  };
}
test('signed webhook accepts once and identifies replay', () => {
  const verify = createWebhookVerifier(secret);
  assert.deepEqual(verify(payload()), {
    status: 202,
    replayed: false,
    event: 'ping',
  });
  assert.deepEqual(verify(payload()), { status: 200, replayed: true });
});
test('tampered body, signature and missing identifiers are rejected', () => {
  const v = createWebhookVerifier(secret);
  assert.equal(v({ ...payload(), body: Buffer.from('{}') }).status, 401);
  assert.equal(v({ ...payload(), signature: 'sha256=no' }).status, 401);
  assert.equal(v({ ...payload(), delivery: '' }).status, 401);
});
test('malformed payload and unsupported event cannot consume replay IDs', () => {
  const v = createWebhookVerifier(secret);
  assert.equal(v(payload(Buffer.from('{'))).status, 400);
  assert.equal(v({ ...payload(), event: 'push' }).status, 422);
  assert.equal(v(payload()).status, 202);
});
test('oversize and capacity denial, expiry permits new delivery', () => {
  let time = 0;
  const v = createWebhookVerifier(secret, {
    now: () => time,
    capacity: 1,
    ttl: 10,
  });
  assert.equal(v(payload(Buffer.alloc(65537))).status, 413);
  assert.equal(v(payload()).status, 202);
  assert.equal(v({ ...payload(), delivery: 'second' }).status, 503);
  time = 11;
  assert.equal(v({ ...payload(), delivery: 'second' }).status, 202);
});
