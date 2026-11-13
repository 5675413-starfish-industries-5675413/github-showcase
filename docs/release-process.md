# Release process

Run full verification on the intended source, inspect CI and merge through the required-check PR workflow. Verify the Pages build/deployment identifies that exact merge commit. Create an annotated `v*` tag and let the release workflow rerun all profiles from the tag, package reports/raw evidence, and create a draft with SHA-256 checksums.

Inspect the generated archive and checksums before publishing. If independent human review has not occurred, publish only a clearly labeled prerelease/release candidate and say so in its notes; do not claim a reviewed stable release. The full contribution walkthrough remains incomplete at its human-review step until a person submits a review. Record actual issue, PR, check, merge, deployment and release links without inventing events or their order.
