# Manual verification profile

This profile is for inspection fixtures outside the maintained execution allowlist. It is a documented workflow, not a passing status.

1. Read the entry README, upstream source URL, embedded licensing and catalog limitations. Confirm source SHA-256 for imported fixtures.
2. Inspect the source as data. Identify required original project files, compiler/interpreter version, OS, frameworks, hardware and licensing. Do not execute an imported fixture merely because its extension is familiar.
3. Use an isolated environment with no production credentials. Install only the identified trusted toolchain. Some fixtures are declarations, console transcripts or project fragments and are not standalone programs.
4. Run the appropriate parser/compiler/viewer. Record version, command, source hash, exit code, full output and observed behavior. Keep detection independent.
5. To promote a sample into automated execution, replace it with a small reviewed standalone example, add a command to the runner allowlist and meaningful failure tests, then submit a PR. Do not hand-edit generated evidence to claim a pass.

The automated profiles intentionally leave these executions as not tested. The framework and source examples are implemented; exhaustive execution of all 845 languages is not claimed.
