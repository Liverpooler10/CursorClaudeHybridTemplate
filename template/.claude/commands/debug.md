---
description: Scientific-method debugging loop. Hypothesis -> minimal repro -> fix -> regression test.
---

# /debug

## Process

1. **Observation** - capture the symptom exactly. Copy the error, stack, input, expected vs actual.
2. **Hypothesis** - state what you think is wrong in one sentence, and why.
3. **Minimal repro** - shrink until a 20-line test reproduces the bug. If no test can repro, keep shrinking the scenario.
4. **Instrumentation** - add logging or assertions that would prove/disprove the hypothesis.
5. **Experiment** - run. Update hypothesis if wrong. Do NOT leap to a fix.
6. **Fix** - smallest change that turns the regression test from red to green.
7. **Regression test** - commit the failing test, then the fix, separately.
8. **Post-mortem note** - add a line to `.planning/STATE.md` under "Decisions" if the root cause is non-obvious.

## Hard rules

- No speculative fixes. Fix only what evidence proves is broken.
- Bisect when the commit that introduced the bug is unclear: `git bisect`.
- Do not widen scope. If the bug reveals another bug, file it and come back.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Agent (paste stack, iterate) OR Claude Code CLI with `!` bash shortcut
Mode    : default
Model   : Claude Sonnet 4.6 (Opus 4.6 if the bug is gnarly and old)
Why     : debugging benefits from fast iteration; switch to Opus only when Sonnet stalls.
Session : ok
```
