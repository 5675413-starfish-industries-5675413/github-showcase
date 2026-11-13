# Go

Prints exactly `Hello, world!` followed by a newline. Requires Go 1.22+.

From the repository root:

```sh
npm run examples:extended -- go-132
```

The runner uses a reviewed command allowlist, bounded output and a timeout. Compilation output is isolated in a temporary directory. Missing tools fail explicitly.

License: MIT.
