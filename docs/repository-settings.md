# Repository settings

Configuration files do not prove that hosted settings are enabled. Record actual evidence here after inspection.

| Setting | Intended configuration | Verified status |
| --- | --- | --- |
| Pages | GitHub Actions source; github-pages environment | Pending |
| Actions | Read-only default token; scoped job permissions | Workflow files configured; hosted defaults pending |
| CI checks | Core validation on push and pull request | [Successful PR validation](https://github.com/5675413-starfish-industries-5675413/github-showcase/actions/runs/42771539417) at `48e58eb` |
| Pull requests | Human review, normal merge policy | Pending |
| Discussions, Projects, milestones | Optional; configure when used | Pending |
| Dependency updates | Dependabot npm and actions weekly | Configuration present; hosted run pending |
| Private vulnerability reporting / scanning | Enable where available | Pending availability review |
| Rulesets | Avoid claiming or enabling unreviewed merge restrictions | Not configured |
| Repository secrets | None required by the current static project | No custom names requested |

To enable Pages, select Settings → Pages → Source: GitHub Actions. Merge the Pages workflow to main. Its deployment job uses only pages:write and id-token:write.
