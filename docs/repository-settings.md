# Repository settings

Inspected/configured on November 11, 2026. Repository: [https://github.com/5675413-starfish-industries-5675413/github-showcase](https://github.com/5675413-starfish-industries-5675413/github-showcase).

| Capability | Actual state |
| --- | --- |
| Repository | Public; description/topics/homepage configured; template reuse enabled; merged branches auto-delete |
| Issues | Enabled; [implementation issue #9](https://github.com/5675413-starfish-industries-5675413/github-showcase/issues/9); catalog, verification and platform labels |
| Milestone | [Showcase v0.2](https://github.com/5675413-starfish-industries-5675413/github-showcase/milestone/1) |
| Discussions | Enabled; Announcements, General, Ideas, Polls, Q&A, Show and tell categories exist |
| Project | Creation blocked: current token lacks `read:project`/`project`; browser access was not approved |
| Ruleset | [Verified main](https://github.com/5675413-starfish-industries-5675413/github-showcase/rules/27070656): PRs, resolved review threads, no force push/deletion, four required checks; no mandatory human approval count |
| Required checks | `validation / verify`, `audit`, `examples`, `core-container`; GitHub Actions app 15368; up-to-date branch required |
| Actions defaults | Read-only token; workflow approval permission disabled; elevated permissions only in publishing/scanning jobs |
| Pages | Actions source; HTTPS enforced; github-pages environment; deploy only main |
| Security | Secret scanning and push protection enabled; vulnerability alerts and automated security fixes enabled; scoped CodeQL workflow added |
| Dependencies | Weekly npm/Actions Dependabot updates; genuine PRs #2-6 proposed the pinned action upgrades |
| Custom secrets | None provisioned. Publishing uses the built-in scoped GitHub token/OIDC. Never put a webhook secret in source. |
| Codespaces | Devcontainer image built and prerequisites checked in CI; no billable interactive session created |
| Packages | Core runner container builds and runs offline in CI; publication is main-only in the container workflow |

A repository Project needs the account owner to grant Project access or create the board in the GitHub UI. The scoped board setup is: title `GitHub Showcase`, link this repository, add issue #9, group Status into Todo/In progress/Done, and use milestone Showcase v0.2. A source-controlled plan is in `docs/completion-plan.md`; it is not falsely labeled a hosted Project.

Human approval is recorded only when a person actually submits a review. Required checks do not imply it.
