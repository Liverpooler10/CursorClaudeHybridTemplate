# Commercial Track

Post-commit companion to `.planning/VENTURE/`. While `VENTURE/` is one-time (Company-of-One discovery 1.1-1.7), `COMMERCIAL/` is the ongoing artifact set that keeps the business side of `__PROJECT_NAME__` moving in parallel to the tech phases under `.planning/phase-N/`.

## Why this exists

You (the founder) handle commercialization. The AI handles technical execution. These files are the structured inputs the AI needs to help you on the commercial side, and the artifacts the AI produces so you have deliverables to post, send, and review.

## Files

| # | File | Slash-command | Output |
|---|------|---------------|--------|
| 1 | `LANDING.md` | `/commercial:landing` | Landing-page copy: headline, subhead, 3 pains, offer, CTA, social proof |
| 2 | `ICP.md` | `/commercial:icp` | Ideal Customer Profile (segment, jobs-to-be-done, channels, objections) |
| 3 | `PRICING.md` | `/commercial:pricing` | Pricing experiment: at-cost, godfather, free trial, advisor shares |
| 4 | `INTERVIEWS/<date>.md` | `/commercial:interview-log` | Structured customer interviews + insights harvested to `METRICS.md` |
| 5 | `METRICS.md` | `/commercial:check` | 10-paying-customers tracker; mirrors kill-date from COMMITMENT.md |
| 6 | `COMPETITORS.md` | `/commercial:competitor-watch` | Monthly competitor scan (price, headline, positioning) |

## Gate

Rule `.cursor/rules/015-commercial-gate.mdc` enforces: **after venture commit, `LANDING.md` must be filled before any code under `src/`, `app/`, `server/`, `api/`, `lib/`, `components/`, `pages/`, `prisma/`, `db/` is touched**. Sales page before product. Override only via ADR.

## Cadence

- Daily: `npm run next` - picks up the next commercial or tech step.
- Weekly: `/commercial:check` - progress vs. 10-paying-customers, days to kill-date.
- Monthly: `/commercial:competitor-watch` - refresh COMPETITORS.md.

## Rules

1. Every paying customer gets an entry in `METRICS.md` with source channel.
2. Every interview gets its own file under `INTERVIEWS/` (gitignored if sensitive via `.gitignore`).
3. Pricing changes are ADRs under `.planning/adr/` - `PRICING.md` tracks the current live version.
4. No code gets shipped without a matching commercial artifact updated in the same phase.
