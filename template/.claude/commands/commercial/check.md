---
description: Weekly commercial health check - kill-date countdown, 10-paying-customers signal, blockers surfaced from interviews.
---

# /commercial:check

Read-mostly. Produces a status block and exactly one of four SIGNAL verdicts.

## Preconditions

- Venture committed.
- `.planning/VENTURE/COMMITMENT.md` exists and contains a `kill_date` value.
- `.planning/COMMERCIAL/METRICS.md` exists.

## Process

1. Read `.planning/VENTURE/COMMITMENT.md`. Parse:
   - `kill_date:` (YYYY-MM-DD) - when capital-at-risk expires.
   - `capital_at_risk:` (EUR amount) - for the weekly burn estimate.
   - `chosenOpportunity` - for context line.
   Refuse if either `kill_date` or `capital_at_risk` is missing - they are contractual in v1.0.0.
2. Read `.planning/COMMERCIAL/METRICS.md`:
   - Paying customer count (from "The 10-customer gate" table rows with a Signed date).
   - Funnel row counts.
3. Read the last 5 interview files under `.planning/COMMERCIAL/INTERVIEWS/` by filename date desc.
4. Compute:
   - `days_elapsed` - days from COMMITMENT.md sign-date to today.
   - `days_remaining` - days from today to kill-date.
   - `total_days` - sum of elapsed + remaining.
   - `target_so_far` = `max(1, ceil(days_elapsed / total_days * 10))`.
   - Funnel conversion rates.
   - Weekly burn = `capital_at_risk / (total_days / 7)`.
5. Assign exactly one signal (evaluated in order; first match wins):
   - `SIGNAL: double down` - paying_count >= 10 at any point.
   - `SIGNAL: kill candidate` - days_remaining < 30 AND paying_count < (target_so_far * 0.5).
   - `SIGNAL: watch` - paying_count < target_so_far AND days_remaining >= 30.
   - `SIGNAL: on track` - paying_count >= target_so_far.
   - Fallback: `SIGNAL: watch`.
6. Append a one-line entry to METRICS.md `Signals` section with date and verdict. Do NOT overwrite prior signals; the history is the point.
7. Summarize `[INVALIDATES]` trends across the last 5 interviews - which assumption is most frequently contradicted.
8. Produce the chat-facing block:

   ```
   Commercial check - <YYYY-MM-DD>
   -------------------------------
   Paying   : N / 10           (target so far: T)
   Days     : D until kill-date (weekly burn ~EUR B)
   Funnel   : <visits> -> <CTA> -> <conv>
   Signal   : <...>
   Hot      : <top blocker / top invalidated assumption>
   Next     : <one concrete action>
   ```

9. On `SIGNAL: kill candidate` OR `SIGNAL: double down`: append a todo to `.planning/STATE.md` "Next 3 TODOs" with the signal text so `npm run next` surfaces it.
10. On `SIGNAL: kill candidate`: also draft (do not commit) an ADR stub at `.planning/adr/<next-number>-kill-decision.md` for the founder to fill.

## Hard rules

- Do not modify COMMITMENT.md. The kill-date is contractual.
- No code changes. Read-only except METRICS.md append, STATE.md todo edit, and optional ADR draft.
- If paying_count drops between runs (refund, churn), log it as a METRICS.md event; do not silently lower the count.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Ask
Mode    : ask
Model   : Cursor Auto
Why     : Signal reviewed; founder decides iterate / pivot / kill.
Session : ok
```
