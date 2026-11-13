# Verification

This repository currently contains Markdown, skill metadata, client pointers, a structural checker and an upstream merge script.
It has no product runtime, application tests or live-agent evaluation suite.

## Commands

Run from the repository root:

- `python3 scripts/check.py`: local Markdown links/anchors, skill identity and invocation metadata, directory hashes, the pristine upstream copy and client pointers.
- `python3 -m unittest discover -s scripts`: regression tests for `scripts/upstream.py`, the upstream checks and the client pointer checks.
- `git diff --check`: whitespace errors in the change.

Before a PR, run all three commands and report their actual results.
CI runs the same three checks on the PR result.
`harness-check` is the job name; repository protection settings are not implied by its existence.

## Appropriate evidence

For documentation or metadata changes, run structural checks and obtain independent review.
Check English/Russian meaning and owner actions during review; a link checker cannot do that.
For changed checker behavior, exercise a clean fixture and a fixture that should fail.
Record the observed failure and successful result rather than adding tests for prose wording.
For new executable behavior, add suitable regression tests as part of that issue.

Read proposed comparisons in `docs/experiments.en.md` or `docs/experiments.ru.md` when an experiment is assigned.
Record client/model, source revision, task, expected result, actual outcome and limits.
Keep private transcripts outside the public repository.
A static pass does not establish live-agent adherence, semantic translation parity or product correctness.
