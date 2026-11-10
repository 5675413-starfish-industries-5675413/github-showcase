# GitHub Showcase

Languages, formats, and workflows—demonstrated, not just listed.

An independent collection of small language examples, meaningful file-format demonstrations, and inspectable GitHub workflows. The repository is the collection. Its Astro website is the searchable view.

## Start here

- [Language catalog](catalog/languages) · [Format catalog](catalog/formats) · [Platform catalog](catalog/features)
- [Coverage report](catalog/generated/coverage.md) · [Verification policy](docs/verification-policy.md)
- [Contribution guide](CONTRIBUTING.md) · [Project blueprint](docs/blueprint.md)

## Quick start

Requires Node.js 22.12+ (Node.js 24 recommended), npm, Python 3, and Bash for the core profile.

```sh
npm ci
npm run verify
npm run dev
```

Open the printed URL with `/github-showcase/`. Individual sample READMEs document their requirements. Installing the website does not install every language toolchain.

```sh
npm run catalog:validate  # strict schemas, paths, exact upstream inventory
npm run catalog:build     # exports and coverage, no network required
npm run examples:core     # reviewed examples; writes local evidence
npm test                  # failure/denial and stale-evidence tests
npm run build             # static Astro site
npm run links:check       # built local pages and assets
npm run linguist:audit    # currently exits 2: detection audit not implemented
```

## Honest coverage

Every language in the pinned Linguist revision has a record. Seven language examples currently span programming, markup, data, and prose. Eight curated format targets cover structured data, images, audio, archives, compression, databases, and subtitles.

**Cataloged does not mean tested.** Detection, validation, and execution are separate. The language bar is not the coverage report. No detection result is claimed. Structural checks are limited to the included samples. Missing examples and toolchains remain explicit.

## Repository map

| Path | Contents |
| --- | --- |
| `catalog/` | Pinned inventory, strict schemas, records, generated exports |
| `examples/` | Inspectable language and format samples |
| `recipes/` | Deterministic format generation |
| `tools/` | Validation, building, reviewed runner and link checks |
| `tests/` | Inventory, schema, path safety and stale evidence checks |
| `verification/` | Core profile and local evidence policy |
| `website/` | Astro explorer, detail pages, coverage, walkthrough |
| `.github/` | CI, Pages, release, dependency and contribution configuration |

## Platform status

Workflows are configuration until their actual runs succeed. Pages requires repository settings. Human review, release evidence, extended toolchains, the pinned Linguist detection audit, and optional integrations remain pending. See [repository settings](docs/repository-settings.md) and [the feature matrix](docs/platform-feature-matrix.md).

Original material is [MIT licensed](LICENSE); upstream exceptions are in [NOTICE.md](NOTICE.md). This is not an official GitHub product.
