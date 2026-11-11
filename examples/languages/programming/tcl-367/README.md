# Tcl

Prints exactly `Hello, world!` followed by a newline. Requires Tcl 8.6.

From the repository root:

```sh
npm run examples:extended -- tcl-367
```

The runner uses a reviewed command allowlist, bounded output and a timeout. Compilation output is isolated in a temporary directory. Missing tools fail explicitly.

License: MIT.
