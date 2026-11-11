# GitHub Showcase

An inspectable collection of **845 language examples**, **24 file-format samples**, and working GitHub workflows. The Astro explorer is published on [GitHub Pages](https://5675413-starfish-industries-5675413.github.io/github-showcase/).

## Run locally

Requires Node.js 24, npm, Python 3.11+ and Bash.

```sh
npm ci
npm run verify
npm run dev
```

Open the printed URL under `/github-showcase/`.

| Command | Purpose |
| --- | --- |
| `npm run verify` | Strict catalog checks, failure-path tests, 31 core sample checks, static build and local links |
| `npm run linguist:audit` | Classify all samples with the pinned Ruby Linguist bundle |
| `npm run examples:extended` | Compile/run 11 additional greetings and decode PDF/video |
| `npm run examples:changed -- main` | Select modified language examples for their reviewed profile |
| `npm run verify:full` | Detection, extended and core verification together |
| `npm run upstream:propose` | Download an immutable upstream candidate and a reviewable diff |
| `npm run reports:export` | JSON/CSV reports, coverage history and SHA-256 checksums |
| `npm run api:demo` | Real read-only public GitHub API request |

See [development setup](docs/development.md) for toolchains. The website installation does not install hundreds of language runtimes. Docker and the devcontainer provide a tested core environment.

## Read the evidence

The pinned inventory has 845 entries. Every entry has a source example and README. Most are attributed syntax fixtures from Linguist; original greetings form the executable profiles. Imported fixtures are never executed automatically. Three transcript entries require explicit language selection because the pinned classifier has no automatic mapping. OpenAPI parent entries accept their documented JSON/YAML child classifications.

[Hosted detection](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/43106105729) recorded 842 recognized examples. [Extended verification](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/43106105858) ran 11 additional greetings and two decoders. [The container check](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/43106105850) built and ran the core profile with networking disabled, then checked development-container prerequisites. These links prove those revisions only. The deployed site's reports are rebuilt from matching evidence at deployment time.

Detection, structural validation, compilation, execution and human review are distinct. [Verification policy](docs/verification-policy.md) explains the limits. [Completion audit](docs/completion-plan.md) records remaining account/human actions.

## Explore the repository

- [Languages](catalog/languages), [formats](catalog/formats), [platform features](catalog/features)
- [Coverage](catalog/generated/coverage.md), [upstream provenance](NOTICE.md), [full blueprint](docs/blueprint.md)
- [Contribution guide](CONTRIBUTING.md), [repository settings](docs/repository-settings.md), [release process](docs/release-process.md)
- [API and signed-webhook examples](examples/integrations), [manual verification profile](verification/manual.md)

Original material is [MIT licensed](LICENSE). Imported source retains [its attribution and embedded notices](NOTICE.md). This is an independent project, not an official GitHub product.
