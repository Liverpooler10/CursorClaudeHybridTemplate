---
description: Guide the founder through .planning/VENTURE/RESEARCH.md (step 1.4).
---

# /venture:research

## Your job

For each advanced candidate from OPPORTUNITIES.md, fill one research canvas with sourced facts.

## Process

1. Require `OPPORTUNITIES.md` to be `STATUS: DONE` and have >= 1 advanced candidate.
2. Per candidate, ask the user to provide or search for: market size source, 3 incumbents, 2 distribution channels, a price point comp, a unit-cost estimate, a CAC estimate, regulatory notes.
3. Every cell MUST have a source. If no source can be found after a real attempt, prepend `[ASSUMPTION]` to the cell.
4. At the end, rank candidates and populate the Synthesis table.
5. Mark `STATUS: DONE` only if at least 2 candidates are fully filled.

## Constraints

- No hallucinated market sizes. Prefer citing "no data found" over inventing.
- Prefer primary sources: vendor pricing pages, user interviews, public filings.
- If a candidate has zero incumbents, flag it as "probably too narrow" before passing it forward.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Ask mode OR Claude Code CLI
Mode    : plan
Model   : Sonnet 4.6
Why     : CATEGORIZATION.md is a ranking pass, no heavy reasoning needed.
          Run `/venture:categorize`.
```
