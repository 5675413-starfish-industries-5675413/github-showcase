# Rust

Prints exactly `Hello, world!` followed by a newline. Requires Rust compiler.

From the repository root:

```sh
npm run examples:extended -- rust-327
```

The runner uses a reviewed command allowlist, bounded output and a timeout. Compilation output is isolated in a temporary directory. Missing tools fail explicitly.

License: MIT.
