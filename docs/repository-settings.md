# Repository settings

Configuration files do not prove that hosted settings are enabled. Record actual evidence here after inspection.

| Setting | Intended configuration | Verified status |
| --- | --- | --- |
| Pages | GitHub Actions source; github-pages environment | [Deployed](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/42941104081) at `4b13cf9`; HTTPS enforced |
| Actions | Read-only default token; scoped job permissions | Workflow files configured; hosted defaults pending |
| CI checks | Core validation on push and pull request | [Successful PR validation](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/42771539417) at `48e58eb` |
| Pull requests | Human review, normal merge policy | [PR #1](https://github.com/5675413-starfish-industries-5675413/github-showcase/pull/1) merged; no submitted human review |
| Discussions, Projects, milestones | Optional; configure when used | Pending |
| Dependency updates | Dependabot npm and actions weekly | Configuration present; hosted run pending |
| Private vulnerability reporting / scanning | Enable where available | Pending availability review |
| Rulesets | Avoid claiming or enabling unreviewed merge restrictions | Not configured |
| Repository secrets | None required by the current static project | No custom names requested |

Pages is enabled with the GitHub Actions build type. The live URL is [https://5675413-starfish-industries-5675413.github.io/github-showcase/](https://5675413-starfish-industries-5675413.github.io/github-showcase/). The deployment job has only pages:write and id-token:write. The first successful deployment records SHA `4b13cf978be1c6170d78cbd6bea871bb72ba8e8c`; source links on the public site were checked against that SHA.
