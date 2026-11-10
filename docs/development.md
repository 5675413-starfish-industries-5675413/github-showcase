# Development

Use Node.js 24, npm, Python 3 and Bash. `npm ci` then `npm run verify`. `npm run dev` serves the site under `/github-showcase/`. Format samples can be regenerated with `python3 recipes/generate-formats.py`.

To change the pinned Linguist revision, fetch the exact commit, inspect the YAML diff and license, update the lock SHA-256, reconcile records by upstream ID, and run inventory checks. Never silently change the baseline. The one-time seed tools refuse to overwrite a language inventory; representative-example setup is a bootstrap tool, not an update process.
