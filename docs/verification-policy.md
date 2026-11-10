# Verification policy

Inventory, examples, detection, validation, execution, format checks, and hosted platform evidence are separate measures. Missing records fail inventory validation. Missing examples are valid catalog gaps. Passing runtime output cannot imply successful detection or formal syntax validation.

Core uses three executable greetings (Node.js, Python, Bash), JSON parsing, constrained HTML structure, Markdown content, CSS sample structure, and Python standard-library format checks. HTML, CSS, Markdown, SVG, and WebVTT checks are intentionally limited and do not prove browser rendering or full standards conformance. WAV validates its PCM header/data length; it is a native tone, not spoken text.

A later source, catalog, runner, or validator edit invalidates former local evidence. Local records include the environment and command; CI artifacts add the hosted run context. The detection command exits nonzero until a pinned per-file Linguist audit is implemented.
