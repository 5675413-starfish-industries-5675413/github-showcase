# Release process

1. Run `npm run verify` on the intended commit and inspect CI artifacts.
2. Complete human review and merge. Verify Pages deployed that exact commit.
3. Update changelog with real changes. Create an annotated `v*` tag only when ready.
4. The release workflow validates the tagged source and packages catalog exports and raw core evidence with SHA-256 checksums. It creates a draft release for human review.
5. Record the actual PR, review, merge, deployment, and release links in the walkthrough. Do not claim a complete trace before all exist.
