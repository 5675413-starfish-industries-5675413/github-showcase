# Verification records

`npm run examples:core` writes ignored `latest.json` with time, environment, exact commands, output, exit code, and content fingerprints. Running one named example replaces this report with only that selection; other results become not tested.

`npm run catalog:build` includes only current matching results. Example or metadata edits invalidate evidence. A missing runner/tool, nonzero exit, timeout, or stdout mismatch is a failure, not a pass. Detection is not yet implemented. CI uploads its raw evidence as a workflow artifact.

This records results, not a security signature. A reviewer must still inspect the workflow and artifact provenance.
