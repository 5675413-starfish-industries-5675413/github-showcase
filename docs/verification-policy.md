# Verification policy

Inventory, source presence, detection, validation, execution, format checks and hosted evidence are independent measures. A real result includes the entry ID, source/catalog/verifier fingerprint, command, environment, exit code, output and errors. Evidence from the core, extended and detection profiles is merged by axis only when the fingerprint matches. Changed source, metadata, verifier code, Gemfile lock or upstream pin invalidates old results.

Core runs JavaScript, Python and Bash greetings, four narrow language structure checks and 24 format checks. Format checks inspect expected content, container structure, CRCs, archive members, SQLite integrity, spreadsheet formula/cached value and encoding round trips. They do not prove full standards conformance. Extended compiles C/C++/Rust, executes 11 authored greetings, extracts PDF text and decodes the full video. An unavailable tool is a failed attempt, never a pass. Runtimes/commands come from reviewed allowlists, never catalog-controlled shell strings.

Detection loads the pinned Linguist implementation and its own training corpus. It compares the actual classifier result to the canonical language or its upstream-defined child group. OpenAPI parent records therefore accept their OAS JSON/YAML variants; raw evidence retains the exact result. Elvish Transcript, Julia REPL and Python console have no automatic filename, extension or interpreter mapping. Their attempted classification is recorded as not tested, with the explicit-selection limitation documented. No `.gitattributes` language override is used to make a classification pass.

Most language examples are verbatim syntax fixtures. Their presence and classification do not establish standalone compilation, output or execution. Their required original projects, frameworks, hardware or proprietary tools are not silently installed. The manual profile describes how a maintainer can verify them without elevating the automated claims.

The website escapes source text and serves language downloads as `source.txt`, preventing arbitrary imported HTML/SVG/JavaScript from running at the Pages origin. Only authored format samples receive media previews. The signed-webhook demonstration checks raw-body authentication and bounded replay handling locally; it is not a deployed webhook service.

A successful CI result is not a human review. Published release candidates must identify that distinction. See the completion audit for actual account and human limitations.
