---
description: Cross-phase integration check. Verify E2E flows work after phase work landed.
---

# /integration-check

## Scope

End-to-end user flows that cross phase boundaries. Catches "each phase passed but together they break".

## Process

1. List the top user flows from `.planning/PROJECT.md` -> "Core Value" + "Product Scope".
2. For each flow, identify which phases contribute and locate the E2E (or integration) test.
3. Run tests.
4. For any flow without a test, propose one and add it to the backlog with a priority.
5. Manual smoke: open the app, walk each flow once. Note anomalies.

## Output

`.planning/phase-N/INTEGRATION-CHECK.md` with per-flow verdict, test path (or "no test"), and priority for missing coverage.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Agent
Mode    : default
Model   : Claude Sonnet 4.6
Why     : integration fixes tend to be localized; fast loop wins.
```
