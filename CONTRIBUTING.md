# Contributing

1. Pick a missing catalog entry or propose a curated format in an issue. Explain the native demonstration, runtime, expected result, and license.
2. Add a small sample under `examples/` with a README, exact requirements, command, expected result, and limitations. Do not import unknown-license examples.
3. Update the existing catalog record. Keep the upstream identity, aliases, category, and extensions unchanged unless updating the pinned baseline through a separate reviewed change.
4. Add an appropriate reviewed check to the core runner, or document why it belongs in a future extended/manual profile. Do not install unusual or expensive toolchains without maintainer approval.
5. Run `npm run verify` and inspect the built page. Open a focused PR containing its validation results and remaining gaps.

Catalog YAML cannot declare passing results. Verification is produced by the runner and bound to content fingerprints. Never add `pull_request_target` execution of contributor code, publishing credentials to example jobs, secrets to examples, or Linguist overrides to inflate statistics.

A human review must be real. Do not mark review, merge, deployment, release, or a toolchain demonstration complete based only on configuration files.
