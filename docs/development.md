# Development

Core: Node.js 24, npm, Python 3.11+ and Bash. Run `npm ci && npm run verify`. `npm run dev` serves `/github-showcase/`. `docker build -t showcase-core . && docker run --rm --network none showcase-core` reproduces the core check in Linux. The devcontainer installs Python explicitly and runs the same verification after setup. Hosted container validation is recorded in the platform catalog; a paid Codespaces session has not been launched.

## Full Linux toolchain

In addition to core, install Ruby 3.3.13, Bundler 2.5.22, ICU development headers, CMake, pkg-config, a C/C++ compiler, Rust, Go, Java 17+, Perl, PHP, Lua 5.4, Tcl, Poppler and FFmpeg. On Ubuntu, the extra packages used by CI are in `.github/actions/setup-full/action.yml`; the GitHub runner supplies C/C++, Rust, Go, Java and Perl.

```sh
bundle install
npm run verify:full
```

The Gemfile locks Linguist to the exact inventory revision; Gemfile.lock pins transitive dependencies. Its classifier database is generated from the pinned gem's own corpus, following upstream's sample task. A checksum check rejects a mismatched loaded inventory. A missing compiler, decoder or Ruby bundle fails explicitly. `npm run examples:extended -- ruby-326` selects one example; `npm run examples:changed -- main` selects changed sources. Shared verifier changes require the full suite.

## Samples and output

`npm run formats:generate` regenerates standard-library formats. `recipes/generate-rich-formats.py` requires reportlab, Pillow and FFmpeg. `recipes/generate-workbook.mjs` requires `@oai/artifact-tool` and writes an XLSX with a real LEN formula and preview. Generation is separate from verification; CI checks the committed bytes and decoder output. Generated reports and site assets can be rebuilt, while raw verification files are ignored to prevent stale commits masquerading as a fresh run.

The import utility accepts only a checkout matching the pinned inventory checksum. Preserve upstream bytes and licenses. The [update procedure](upstream-updates.md) requires review before changing the pin or denominator.
