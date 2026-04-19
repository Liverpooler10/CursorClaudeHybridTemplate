<!-- STATUS: TODO -->
# Commercial Metrics - __PROJECT_NAME__

The single number that matters: **paying customers**. Everything else is vanity. Refreshed by `/commercial:check`.

## The 10-customer gate

| # | Customer | Channel | Signed | Price | Tier | Status |
|---|----------|---------|--------|-------|------|--------|
| 1 | <!-- fill --> | | | | | |
| 2 | | | | | | |
| 3 | | | | | | |
| 4 | | | | | | |
| 5 | | | | | | |
| 6 | | | | | | |
| 7 | | | | | | |
| 8 | | | | | | |
| 9 | | | | | | |
| 10 | | | | | | |

Progress: `0 / 10`

## Kill date (mirrored from COMMITMENT.md)

- Kill date: <!-- fill: YYYY-MM-DD; must match COMMITMENT.md -->
- Capital at risk: <!-- fill: EUR amount -->
- Days remaining: <!-- updated by /commercial:check -->

## Funnel (last 30 days)

| Stage | Count | Conversion to next |
|-------|-------|--------------------|
| Landing visits | <!-- fill --> | |
| Primary CTA clicks | | % |
| Qualified conversations | | % |
| Paying customers | | % |

## Active experiments

| Experiment | Started | Metric | Result target | Status |
|------------|---------|--------|---------------|--------|
| <!-- fill --> | | | | |

## Blockers / insights

- <!-- harvested from INTERVIEWS/ by /commercial:check -->

## Signals

- `/commercial:check` writes one of:
  - `SIGNAL: on track` - >= N_day_budget * N_customers_target_so_far
  - `SIGNAL: watch` - < 30 days to kill-date, < 50 % of target
  - `SIGNAL: kill candidate` - < 14 days, < 30 % of target
  - `SIGNAL: double down` - target hit early

Latest signal: <!-- fill: set by /commercial:check -->
Last check: <!-- fill: YYYY-MM-DD -->

## Next recommended

```
Surface : Claude Code CLI
Mode    : default
Model   : Claude Sonnet 4.6
Why     : METRICS reviewed; run `/commercial:competitor-watch` monthly.
Session : ok
```
