---
description: Guide the founder through .planning/VENTURE/MARKET-TEST.md (step 1.6).
---

# /venture:market-test

## Your job

Design and log 3+ falsifiable experiments per shortlisted candidate.

## Process

1. Require `CATEGORIZATION.md` to be `STATUS: DONE` with <= 3 shortlisted candidates.
2. For each candidate, draft hypotheses covering distribution, willingness-to-pay, and retention / repeat need.
3. Each hypothesis has: If-Then-Because form, experiment, success metric, kill criterion, budget, deadline, owner.
4. Check each experiment against the "no code required" rule. If code is required, the candidate is not yet scoped narrowly enough.
5. When experiments complete, the user adds Result + Verdict. You update the Go/No-go signal table.
6. Mark `STATUS: DONE` only when every shortlisted candidate has a clear signal (weak / mixed / strong) backed by evidence.

## Interview discipline

If the user runs interviews, enforce the jobs-to-be-done script in the file. No selling during interviews. Store transcripts (sensitive info redacted) under `.planning/VENTURE/interviews/`.

## Budget discipline

Per-experiment cap defaults to EUR 300. Anything higher requires an ADR justifying the capital at risk.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI in plan mode.
Mode    : plan
Model   : Claude Opus 4.6 (for the commit-decision review).
Why     : COMMITMENT.md is the most expensive single decision in this phase.
          Opus pushes back hardest on weak evidence. Run `/venture:commit`.
Session : consider-clear
```
