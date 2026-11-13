# Lua

Prints exactly `Hello, world!` followed by a newline. Requires Lua 5.4.

From the repository root:

```sh
npm run examples:extended -- lua-213
```

The runner uses a reviewed command allowlist, bounded output and a timeout. Compilation output is isolated in a temporary directory. Missing tools fail explicitly.

License: MIT.
