<!-- STATUS: TODO -->
# 1.6 - Testing The Market

Framework: Company of One - "Testing The Market".

Goal: cheap, falsifiable experiments that either kill the candidate or earn it a commit.

## Rules

1. Each hypothesis is written BEFORE the experiment.
2. Each experiment has a success metric, a budget, a deadline, and a kill criterion.
3. Reuse existing audiences / channels; do NOT build a product to test the market.
4. If no experiment can be run without code, the idea is too vague - split further.

## Hypothesis Matrix

| H# | Candidate | Hypothesis (If X then Y because Z) | Experiment | Success metric | Kill criterion | Budget (EUR) | Deadline | Owner | Result | Verdict |
|----|---|---|---|---|---|---|---|---|---|---|
| 1 | <!-- fill --> | | | | | | | | | |
| 2 | <!-- fill --> | | | | | | | | | |
| 3 | <!-- fill --> | | | | | | | | | |

Minimum: 3 hypotheses per shortlist candidate, at least one covering distribution, one covering willingness-to-pay, one covering retention or repeat need.

## Allowed experiment types

- Landing page + paid traffic (preset CAC ceiling)
- Waitlist with commitment gate (credit card, deposit, call booking)
- Concierge / manual delivery to 3-5 users
- Pre-sell with refund guarantee
- Interviews with jobs-to-be-done script (evidence only, no selling)
- Dry scrape / buy scrape of existing offers to gauge supply

## Interview script (if used)

Store transcripts under `.planning/VENTURE/interviews/` (gitignored if sensitive).

- Tell me about the last time you encountered <pain>.
- What did you do? (looking for current solution path)
- What did that cost you? (time, money, emotion)
- What would "fixed" look like for you?
- Have you ever paid for anything in this space? What?
- Would you pay EUR X today for <narrow solution>? Why / why not?

## Results log

Summaries of completed experiments. One paragraph each; link raw data.

- <!-- fill -->

## Go / No-go signal per candidate

| Candidate | Signal strength (weak/mixed/strong) | Evidence | Recommendation |
|---|---|---|---|
| <!-- fill --> | | | |

## Next recommended

- Surface: Cursor Ask mode first (summarize evidence), then Claude Code CLI `plan` mode to draft commit doc.
- Model: Opus 4.6 for commit-decision quality.
- Action: run `/venture:commit`.
- Why: decision under uncertainty benefits from a model that pushes back hardest on weak evidence.
