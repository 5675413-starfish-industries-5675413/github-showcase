# TypeScript

Prints exactly `Hello, world!` followed by a newline. Requires Node.js 24 (native type stripping).

From the repository root:

```sh
npm run examples:extended -- typescript-378
```

The runner uses a reviewed command allowlist, bounded output and a timeout. Compilation output is isolated in a temporary directory. Missing tools fail explicitly.

License: MIT.
