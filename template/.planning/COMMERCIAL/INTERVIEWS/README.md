# Customer Interviews

One file per interview. Filename: `<YYYY-MM-DD>-<first-name-or-handle>.md`. Created via `/commercial:interview-log`.

## Privacy

If interviews contain names, emails, or sensitive business context, add this directory to `.gitignore` in your project. The filename pattern `INTERVIEWS/*` is safe to share publicly only when anonymized.

## Interview template

Copy into each new file:

```markdown
# Interview: <first name>, <role>, <YYYY-MM-DD>

## Context
- Channel: <cold DM | warm intro | inbound | event>
- Duration: <mm>
- Stage: <discovery | pre-sale | active customer | churned>

## Transcript notes
(Raw observations. The AI extracts insights into the Insights section.)

- ...

## Jobs-to-be-done (Troy's script)
- Last time they encountered <pain>: ...
- What they did: ...
- What it cost them (time / money / emotion): ...
- What "fixed" looks like: ...
- Have they paid for anything adjacent: ...
- Would they pay EUR X today: ...

## Insights (harvested by `/commercial:interview-log`)

- [VALIDATES] ...
- [INVALIDATES] ...
- [NEW SIGNAL] ...
- [OBJECTION] ...

## Outcome
- Next step: <follow-up | disqualified | trialing | paying>
- Paying: <yes/no>  Amount: <EUR>  Tier: <...>
- Added to METRICS.md: <yes/no>
```

## Insight-harvesting rules

`/commercial:interview-log` writes `[VALIDATES]` / `[INVALIDATES]` / `[NEW SIGNAL]` / `[OBJECTION]` tags. When three or more `[INVALIDATES]` accumulate against a core VENTURE assumption, the command auto-flags it in METRICS.md `Blockers`.
