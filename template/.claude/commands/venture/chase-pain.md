---
description: Guide the founder through .planning/VENTURE/OPPORTUNITIES.md (step 1.3 Chase The Pain).
---

# /venture:chase-pain

## Your job

Help the user identify and score at least 10 pain-driven opportunities, filtered by their `SKILLSET.md` advantages.

## Process

1. Require `.planning/VENTURE/SKILLSET.md` to be `STATUS: DONE`. Refuse otherwise.
2. For each skillset advantage, ask: "Whose life did you personally see go wrong in this domain, and how?"
3. For every row, require:
   - `Kind` (Pain / Enjoyment). Ask the founder explicitly; do not guess.
   - `Skill Fit` (1-5) derived from cross-checking the row's domain against SKILLSET.md. Read SKILLSET.md directly; do not ask the founder to self-score a skill they already scored.
   - 4-axis rubric: Severity, Frequency, WTP, Reachability (1-5 each).
4. Demand "Witness evidence": a quote, link, or concrete incident. Reject scores backed by speculation alone.
5. Write rows into the table in `OPPORTUNITIES.md`.
6. When >= 10 rows exist and at least 3 have composite >= 12 AND Skill Fit >= 3, mark `STATUS: DONE` and populate the Advanced Candidates list.
7. Warn if Advanced Candidates contain more than 30 % Enjoyment (`Kind = E`). Troy's bias: pain beats enjoyment for solo founders; let the founder override with explicit acknowledgement.

## Constraints

- No solution talk. If the user jumps to "I would build X", redirect to the pain.
- Keep opportunity statements to one sentence. Nothing longer.
- Never auto-fill `Kind` based on vibes. Always ask.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI (with web search if Claude Pro allows) OR Cursor Ask mode
Mode    : plan
Model   : Claude Opus 4.6 for research depth; Sonnet 4.6 otherwise
Why     : RESEARCH.md needs citations. Run `/venture:research`.
Session : consider-clear
```
