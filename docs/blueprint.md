# GitHub Showcase

A repository that showcases GitHub-recognized languages, meaningful file formats, and the GitHub development platform—all through small, inspectable examples.

The repository is the collection. A companion website makes it searchable. GitHub’s collaboration, automation, security, and publishing tools demonstrate how the collection is maintained.

This is the proposed full blueprint—not a claim that the repository or its demonstrations already exist.

## 1. Title, description, and identity

| Item | Proposed value |
|---|---|
| Repository name | `github-showcase` |
| Display title | GitHub Showcase |
| Tagline | Languages, formats, and workflows—demonstrated, not just listed. |
| Short description | A searchable showcase of GitHub-recognized languages, meaningful file formats, and real development workflows, with transparent coverage and verification. |
| Website title | GitHub Showcase — Explore the Collection |
| Suggested topics | `github`, `polyglot`, `programming-languages`, `file-formats`, `github-actions`, `github-pages`, `developer-tools`, `examples`, `educational` |
| Relationship to GitHub | Independent community project; not an official GitHub product |

### Scope statement

> Catalog every language entry in a recorded GitHub Linguist revision, provide appropriate examples, demonstrate relevant file formats, and showcase GitHub features through working, documented workflows.

GitHub Linguist provides the language inventory, including programming, markup, data, and prose categories. That is a bounded baseline—not a list of every language or file format ever created. [github](https://github.com/github-linguist/linguist/blob/main/lib/linguist/languages.yml)

## 2. What the repository contains

The project has four connected parts:

| Part | Purpose |
|---|---|
| Language collection | Minimal examples for the complete pinned Linguist inventory |
| Format collection | Valid documents, data, media, and containers with meaningful demonstrations |
| Platform demonstrations | Real examples of collaboration, automation, development environments, security, and publishing |
| Searchable website | A browsable view of the catalog, examples, prerequisites, and verification evidence |

Hello World remains the default example, not a rule that forces inappropriate content into every format.

### Example-selection rules

- Print the greeting when the language supports a sensible executable example.
- Render it for document and visual formats.
- Store and retrieve it for data formats.
- Speak or display it for media.
- Package and recover it for archives.
- Use a small native demonstration for domain-specific languages where a greeting would be artificial.
- Document constraints instead of creating fake examples.

## 3. Complete repository structure

The tree below is the target structure. Optional files should be added only when their corresponding feature is implemented.

```text
github-showcase/
│
├── README.md
├── LICENSE
├── NOTICE.md
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
├── SUPPORT.md
├── CHANGELOG.md
├── CITATION.cff
│
├── .editorconfig
├── .gitattributes
├── .gitignore
├── .prettierignore
├── prettier.config.mjs
├── package.json
├── package-lock.json
├── Makefile
│
├── catalog/
│   ├── README.md
│   ├── upstream/
│   │   ├── linguist.lock.json
│   │   └── languages.yml
│   ├── languages/
│   │   ├── python.yaml
│   │   ├── rust.yaml
│   │   └── [one record per upstream language entry]
│   ├── formats/
│   │   ├── pdf.yaml
│   │   ├── png.yaml
│   │   └── [one record per curated format]
│   ├── features/
│   │   ├── actions.yaml
│   │   ├── pages.yaml
│   │   └── [one record per platform capability]
│   ├── schemas/
│   │   ├── language.schema.json
│   │   ├── format.schema.json
│   │   ├── feature.schema.json
│   │   └── verification.schema.json
│   └── generated/
│       ├── languages.json
│       ├── formats.json
│       ├── features.json
│       ├── coverage.json
│       └── coverage.md
│
├── examples/
│   ├── README.md
│   ├── languages/
│   │   ├── programming/
│   │   │   ├── python/
│   │   │   │   ├── README.md
│   │   │   │   ├── hello.py
│   │   │   │   └── expected.stdout.txt
│   │   │   └── [additional language directories]
│   │   ├── markup/
│   │   ├── data/
│   │   └── prose/
│   └── formats/
│       ├── documents/
│       ├── structured-data/
│       ├── spreadsheets/
│       ├── databases/
│       ├── images/
│       ├── audio/
│       ├── video/
│       ├── subtitles/
│       ├── models-3d/
│       ├── archives/
│       ├── compression/
│       └── encodings/
│
├── recipes/
│   ├── README.md
│   ├── documents/
│   ├── images/
│   ├── audio/
│   └── archives/
│
├── verification/
│   ├── README.md
│   ├── profiles/
│   │   ├── core.yaml
│   │   ├── extended.yaml
│   │   └── manual.yaml
│   └── manual/
│       └── [dated, versioned verification records]
│
├── website/
│   ├── README.md
│   ├── astro.config.mjs
│   ├── tsconfig.json
│   ├── public/
│   │   ├── favicon.svg
│   │   └── social-preview.png
│   └── src/
│       ├── components/
│       │   ├── Search.astro
│       │   ├── FilterPanel.astro
│       │   ├── EntryCard.astro
│       │   ├── StatusBadge.astro
│       │   ├── CodeExample.astro
│       │   └── EvidenceLinks.astro
│       ├── layouts/
│       │   └── BaseLayout.astro
│       ├── pages/
│       │   ├── index.astro
│       │   ├── languages/
│       │   ├── formats/
│       │   ├── features/
│       │   ├── coverage.astro
│       │   ├── walkthrough.astro
│       │   └── about.astro
│       ├── scripts/
│       └── styles/
│           └── global.css
│
├── tools/
│   ├── sync-linguist.mjs
│   ├── validate-catalog.mjs
│   ├── check-inventory.mjs
│   ├── check-links.mjs
│   ├── build-catalog.mjs
│   ├── generate-coverage.mjs
│   ├── run-example.mjs
│   └── lib/
│
├── tests/
│   ├── catalog/
│   ├── tools/
│   ├── website/
│   └── fixtures/
│
├── docs/
│   ├── index.md
│   ├── scope.md
│   ├── architecture.md
│   ├── development.md
│   ├── catalog-specification.md
│   ├── language-policy.md
│   ├── format-policy.md
│   ├── verification-policy.md
│   ├── platform-feature-matrix.md
│   ├── repository-settings.md
│   ├── availability-and-costs.md
│   ├── accessibility.md
│   ├── licensing-and-attribution.md
│   ├── release-process.md
│   ├── walkthrough.md
│   └── decisions/
│       └── 0001-project-scope.md
│
├── demos/
│   ├── README.md
│   ├── api/
│   ├── webhooks/
│   └── container/
│       ├── Dockerfile
│       └── README.md
│
├── .devcontainer/
│   ├── devcontainer.json
│   └── Dockerfile
│
└── .github/
    ├── CODEOWNERS
    ├── PULL_REQUEST_TEMPLATE.md
    ├── dependabot.yml
    ├── release.yml
    ├── ISSUE_TEMPLATE/
    │   ├── bug_report.yml
    │   ├── add_language_example.yml
    │   ├── add_format_example.yml
    │   ├── feature_request.yml
    │   └── config.yml
    ├── DISCUSSION_TEMPLATE/
    │   ├── ideas.yml
    │   └── show-and-tell.yml
    ├── actions/
    │   └── setup-project/
    │       └── action.yml
    └── workflows/
        ├── ci.yml
        ├── examples-core.yml
        ├── examples-extended.yml
        ├── linguist-audit.yml
        ├── upstream-update.yml
        ├── pages.yml
        ├── release.yml
        ├── container.yml
        └── reusable-validation.yml
```

## 4. Important file responsibilities

### Root documentation

| File | Responsibility |
|---|---|
| `README.md` | Explain the project, scope, usage, and entry points |
| `LICENSE` | License the project’s original material |
| `NOTICE.md` | Attribute upstream data and third-party material |
| `CONTRIBUTING.md` | Explain how to add, test, and review examples |
| `CODE_OF_CONDUCT.md` | Establish community expectations |
| `SECURITY.md` | Explain responsible security reporting |
| `SUPPORT.md` | Direct questions, bugs, and requests appropriately |
| `CHANGELOG.md` | Summarize notable changes by release |
| `CITATION.cff` | Provide optional citation metadata for educational use |

Select a project license before publishing. Record exceptions for imported examples, media, or upstream data rather than implying one license automatically covers everything.

### Repository configuration

| File | Proposed use |
|---|---|
| `.gitattributes` | Line endings, binary handling, and justified Linguist annotations |
| `.editorconfig` | Consistent basic editing conventions |
| `.gitignore` | Exclude dependencies, build output, and local artifacts |
| `package.json` | Shared tooling and website commands |
| `package-lock.json` | Reproducible JavaScript dependency resolution |
| `Makefile` | Optional convenience aliases, not the only way to run tasks |

Do not manipulate Linguist attributes merely to inflate the language bar. Linguist supports overrides, but repository statistics are not equivalent to complete catalog coverage. [github](https://github.com/github-linguist/linguist/blob/main/docs/overrides.md)

## 5. Catalog design

The catalogs are the source of truth. The website, coverage reports, and CI selection are generated from them.

### Language records

Each language record should contain:

| Field | Meaning |
|---|---|
| `id` | Stable project identifier |
| `name` | Canonical upstream name |
| `upstream_language_id` | Linguist identifier |
| `type` | Upstream category |
| `aliases` | Alternate names, not additional languages |
| `example_path` | Example directory, if available |
| `demonstration` | Print, render, store, query, or native example |
| `requirements` | Runtime, compiler, OS, hardware, or license needs |
| `run` | Explicit command or structured execution steps |
| `expected` | Expected output or validation result |
| `verification` | Separate detection, validation, and execution records |
| `limitations` | Known constraints |
| `license` | Applicable license and attribution |

Use stable, filesystem-safe slugs for directories. Do not derive paths by simply lowercasing names containing punctuation.

### Format records

Add fields for:

- Format family and variant.
- Extensions and media type, where applicable.
- Whether the example is source, rendered output, or container.
- Viewer or decoder requirements.
- Generation recipe.
- Validation method.
- Relationship to other entries.

For example, a document source and its PDF output are related artifacts, not interchangeable formats. Likewise, an archive and the file it contains require different verification.

### Platform feature records

Track:

- Purpose in this project.
- Configuration location.
- Required permissions and prerequisites.
- Whether setup happens in files or GitHub settings.
- Demonstration links.
- Availability limitations.
- Date last reviewed.
- Implementation status.

## 6. Coverage and verification

Avoid one “complete” badge that conflates several different achievements.

| Measure | Definition |
|---|---|
| Inventory coverage | Every entry in the pinned upstream inventory has a catalog record |
| Example coverage | An appropriate example exists |
| Detection coverage | The pinned Linguist version recognizes it as intended |
| Validation coverage | A relevant parser, compiler, or validator accepts it |
| Execution coverage | The documented example runs successfully |
| Format coverage | The curated format targets have valid examples |
| Platform coverage | Planned GitHub capabilities have inspectable demonstrations |

GitHub’s language statistics normally emphasize programming and markup rather than all four Linguist categories, so the website’s catalog must provide the complete view. [github](https://github.com/github-linguist/linguist/issues/3795)

### Record verification independently

An example might be:

```text
Cataloged: yes
Example present: yes
Detected as intended: yes
Syntax validated: yes
Executed successfully: not yet
Reason: requires a proprietary runtime
```

“Not tested” should never silently become “passed.”

## 7. Website features

### Home

- Project purpose.
- Entry points to languages, formats, and platform features.
- Coverage summary.
- Current catalog baseline.
- Clear explanation of what completeness means.

### Language explorer

- Search by canonical name, alias, or extension.
- Filter by Linguist category.
- Filter by platform and runtime requirements.
- Filter by verification status.
- View source, commands, expected output, and limitations.

### Format explorer

- Browse by document, data, media, or container category.
- Preview safe, supported samples.
- Show generation and validation instructions.
- Download small examples.
- Explain when a format requires an external application.

### Platform gallery

- Explain each demonstrated capability.
- Link to configuration.
- Link to a real issue, pull request, workflow run, deployment, or release.
- State prerequisites and limitations.
- Distinguish configured from demonstrated.

### Coverage dashboard

- Pinned Linguist revision.
- Inventory totals by category.
- Examples present versus missing.
- Detection, validation, and execution results.
- Unavailable-toolchain explanations.
- Recently added or changed entries.

### Walkthrough

Follow a genuine contribution:

```text
Issue → branch → pull request → checks → review → merge → deployment → release
```

Use real project maintenance, such as adding a language example or improving validation—not fabricated activity.

## 8. GitHub platform demonstrations

These are implementation targets, with account-specific availability to be checked before enabling them.

| Area | Intended demonstration |
|---|---|
| Repository presentation | Description, topics, README, social preview |
| Community | Contribution guidelines, discussions, support routes |
| Planning | Issues, labels, milestones, and a Project |
| Review | Focused PRs, comments, ownership, and merge decisions |
| Governance | Appropriate rulesets and required checks |
| Automation | Validation, testing, builds, and maintenance workflows |
| Development | Reproducible local setup and a Codespaces configuration |
| Publishing | Pages website, tagged releases, and downloadable reports |
| Packages | Optional container containing the website or core runner |
| Security | Dependency updates and applicable scanning |
| Integrations | Small API and webhook examples |
| Reuse | Reusable workflow and optional template-repository support |

Do not imply that all of these are repository-local or universally available. GitHub capabilities, permissions, and usage allowances vary across plans and settings. [docs.github](https://docs.github.com/get-started/learning-about-github/githubs-products)

### Hosted settings and resources

Document these in `docs/repository-settings.md`:

- Enabled repository features.
- Discussion categories.
- Labels and milestones.
- Project configuration.
- Rulesets and merge policies.
- Actions permissions.
- Environments and deployment approvals.
- Secret and variable names—but never their values.
- Pages configuration.
- Security settings.
- Optional template-repository configuration.

## 9. Workflow responsibilities

| Workflow | Responsibility |
|---|---|
| `ci.yml` | Validate catalogs, documentation, tooling, and website |
| `examples-core.yml` | Run a practical, maintained set of examples |
| `examples-extended.yml` | Run specialized checks on demand or on a schedule |
| `linguist-audit.yml` | Compare detected languages against catalog expectations |
| `upstream-update.yml` | Propose a reviewed update to the pinned inventory |
| `pages.yml` | Build and publish the website |
| `release.yml` | Prepare versioned reports and release artifacts |
| `container.yml` | Optionally build and publish a useful container |
| `reusable-validation.yml` | Demonstrate reusable validation automation |

The upstream update process should open a proposed change rather than silently changing the definition of “complete.”

### Execution policy

- Do not run every toolchain on every pull request.
- Select checks based on changed examples and their dependencies.
- Keep a small default verification profile.
- Run specialized profiles separately.
- Use timeouts and resource limits.
- Keep untrusted example execution away from publishing credentials.
- Require explicit approval for unusual or expensive execution.

The website should display examples, not act as an unrestricted online code-execution service.

## 10. Proposed developer commands

These are the intended command interface, not commands that already exist.

```sh
npm ci
npm run dev
npm run build
npm test

npm run catalog:validate
npm run catalog:build
npm run coverage
npm run links:check

npm run examples:core
npm run linguist:audit
```

Additional tooling should support selecting one example or profile without installing every language runtime.

## 11. README outline and proposed copy

The README should be welcoming and useful without duplicating the entire website.

***

# GitHub Showcase

Languages, formats, and workflows—demonstrated, not just listed.

GitHub Showcase is an independent collection of minimal language examples, meaningful file-format demonstrations, and working GitHub development workflows.

It aims to account for every language entry in a recorded GitHub Linguist revision while keeping example availability, validation, and execution status transparent.

### Explore

- Language catalog.
- Format catalog.
- GitHub feature gallery.
- Coverage report.
- Development walkthrough.
- Contribution guide.

*Replace these labels with real links when their destinations exist.*

### What you’ll find

- Minimal programs and native language examples.
- Documents, data, images, audio, and other appropriate formats.
- Commands, prerequisites, expected results, and verification evidence.
- A searchable website generated from the catalog.
- Real demonstrations of review, automation, publishing, and maintenance.

### What “complete” means

The language inventory is tied to a specific Linguist revision.

A cataloged language is not necessarily executable in the default development environment. Detection, validation, and execution are tracked separately.

The format and platform collections have explicit scope and exclusions. This project does not claim to contain every file format or every GitHub capability under every account configuration.

### Quick start

Once implemented:

```sh
npm ci
npm run dev
```

To validate the catalog and build the website:

```sh
npm run catalog:validate
npm run build
```

Individual examples list their own runtime requirements. Installing the website does not install every language toolchain.

### Repository map

| Directory | Contents |
|---|---|
| `catalog/` | Structured inventory and coverage metadata |
| `examples/` | Language and format demonstrations |
| `recipes/` | Reproducible artifact generation |
| `verification/` | Verification profiles and manual records |
| `website/` | Searchable gallery |
| `tools/` | Maintenance and validation utilities |
| `docs/` | Policies, architecture, and setup |
| `demos/` | Optional platform integrations |
| `.github/` | Collaboration and automation configuration |

### Verification

Coverage reports distinguish:

- Cataloged entries.
- Examples present.
- Successful language detection.
- Successful validation.
- Successful execution.
- Documented limitations.

### Contributing

Contributions can add an example, improve verification, fix documentation, or implement a meaningful platform demonstration.

Each addition should include:

1. A valid example.
2. A catalog record.
3. Usage instructions.
4. Requirements and expected results.
5. Honest verification status.
6. Licensing and attribution where needed.

### Limitations

- Some examples require specialized environments.
- Some formats require external viewers or tools.
- Some GitHub capabilities require additional permissions or plans.
- Repository language statistics are not the complete coverage report.
- No arbitrary code execution is offered through the public website.

### License and attribution

Project licensing and third-party exceptions are documented in `LICENSE` and `NOTICE.md`.

GitHub Showcase is not affiliated with or endorsed by GitHub.

***

## 12. Release contents

A release should contain useful outputs rather than a giant bundle of runtimes:

- Source snapshot.
- Catalog exports.
- Coverage report.
- Verification summary.
- Selected small generated examples.
- Checksums for downloadable assets.

GitHub releases support notes and downloadable assets, making them suitable for publishing these versioned snapshots. [docs.github](https://docs.github.com/en/repositories/releasing-projects-on-github/about-releases)

Do not publish an “all languages” runtime image unless there is a practical reason and a maintainable build strategy.

## 13. Implementation milestones

| Milestone | Deliverable |
|---|---|
| Foundation | Scope, licensing, schemas, and pinned upstream inventory |
| Representative collection | A small set spanning all language categories and major format families |
| Verification | Catalog checks, example runner, detection audit, and coverage reports |
| Website | Search, filters, detail pages, and coverage dashboard |
| Platform showcase | Real review, automation, deployment, and release demonstrations |
| Expansion | Systematically fill the full language inventory and curated format targets |
| Maintenance | Reviewed upstream updates, dependency maintenance, and periodic verification |

The inventory can be comprehensive before the examples are. That is acceptable as long as the distinction is visible.

## 14. Definition of done

The project’s first public version is ready when:

- The pinned Linguist inventory is fully accounted for.
- Representative examples cover programming, markup, data, and prose.
- Selected formats have valid, meaningful demonstrations.
- Every included example has instructions and a verification status.
- The website can be built reproducibly.
- Core checks run automatically.
- At least one real contribution is traceable through review and release.
- Platform features have evidence or are explicitly marked pending.
- Licensing, limitations, and operating requirements are documented.

The central principle is **verifiable coverage**: account for the full target inventory, demonstrate what is appropriate, and make every gap visible rather than disguising it with extra files or inflated counts.