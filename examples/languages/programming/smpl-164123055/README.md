# SmPL

This is a verbatim upstream syntax fixture, not a claim of a standalone executable program. Inspect its native declarations and syntax in a text editor.

- [Original source](https://github.com/github-linguist/linguist/blob/d456527fe93355baa28c3c29d542c97282b61bc7/samples/SmPL/atomic_as_refcounter.cocci)
- Revision: `d456527fe93355baa28c3c29d542c97282b61bc7`
- SHA-256: `8653ce20f84afb712e383ec0d04aeb27e8ebc525e00e0baf87445e4595c3a154`
- License: distributed by GitHub Linguist under MIT; all embedded copyright and license notices are retained. See the repository NOTICE and upstream license.

## Verification

From the repository root, run `npm run linguist:audit -- smpl-164123055`. Expected classification: **SmPL**. This reads the fixture as data; it does not execute it. Ruby/Bundler and the pinned Linguist bundle are required.

Compilation/execution is intentionally outside the reviewed profiles for this imported fixture. It may depend on its original project, libraries, toolchain, hardware or proprietary environment. Detection does not validate its syntax or runtime behavior.
