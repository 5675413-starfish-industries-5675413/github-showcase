# GitHub integrations

`node examples/integrations/github-api.mjs` makes a real, read-only REST request. Public rate limits apply; failure is an error, not simulated data.

`webhook.mjs` verifies GitHub-style SHA-256 HMAC signatures over raw bytes, rejects oversized/invalid payloads and unsupported events, and bounds replay memory by time and capacity. Run `npm test` for success, tamper, replay and denial cases. This is a local verifier demonstration, not a registered or publicly hosted webhook. A production receiver must preserve raw bytes, use HTTPS and durable replay storage, and manage a real webhook secret outside source control. No secret or endpoint is provisioned by this sample.
