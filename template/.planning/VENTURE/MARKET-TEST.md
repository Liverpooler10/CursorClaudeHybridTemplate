<!-- STATUS: TODO -->
# 1.6 - Testing The Market

Framework: Company of One - "Testing The Market".

Goal: cheap, falsifiable experiments that either kill the candidate or earn it a commit.

## Rules

1. Each hypothesis is written BEFORE the experiment.
2. Each experiment has a success metric, a budget, a deadline, and a kill criterion.
3. Reuse existing audiences / channels; do NOT build a product to test the market.
4. If no experiment can be run without code, the idea is too vague - split further.

## Default success metric

Troy 1.6: the North Star is **10 paying customers** before committing more capital. The default success metric for any hypothesis is pre-filled with `10 paying customers`. Override only when the hypothesis explicitly cannot produce revenue (e.g. pure reachability test).

## Hypothesis Matrix

| H# | Candidate | Hypothesis (If X then Y because Z) | Experiment | Success metric | Kill criterion | Budget (EUR) | Deadline | Owner | Result | Verdict |
|----|---|---|---|---|---|---|---|---|---|---|
| 1 | <!-- fill --> | | | 10 paying customers | | | | | | |
| 2 | <!-- fill --> | | | 10 paying customers | | | | | | |
| 3 | <!-- fill --> | | | 10 paying customers | | | | | | |

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

## Finding your first customers (Troy 1.6 playbook)

The customer matters more than the price. Choose the mechanism that matches your pain's stakes and your ICP's expectations. Detail lives in `COMMERCIAL/PRICING.md` after commit; here you just pick one and commit to it for the test.

### Advisor Shares

- Use when your ICP is prestigious (lawyers, doctors, founders, senior ops, executives).
- Total equity to allocate across first customers: **0.1 - 0.5 %**, no more.
- Express in absolute share count, not percent. Bigger numbers feel better to customers.
- Obligation from customer: monthly feedback call + testimonial rights. Name it in writing.
- Leverages the IKEA effect - customers love products they helped shape.

### Godfather Offer

- A price they will never see again. Memorable, deliberately under market.
- Locked in for 12 months (minimum) or lifetime.
- Customer agrees to: testimonial, weekly feedback during first 90 days, public logo rights.
- Use when the pain is ongoing and switching costs accrue over months.

### Sell At Cost

- Your default. Price = your variable cost + 3rd-party fees only.
- Goal: maximum signal on whether the product is wanted, zero noise from "is it worth X EUR?".
- Graduate to full price after 10 paying customers.

### Free Trial (only if ICP expects it)

- Length: 7, 14, or 30 days. Pick based on how long until the customer sees the value moment.
- Payment info upfront is **non-negotiable**. Without it, this is free users, not a trial.
- Communicate the auto-charge date explicitly in welcome email.

### Hard "don't" list

- Never give the product away for free with no payment info. Destroys the signal.
- Never "split the difference" when a price fails. Drop 50 % or kill. (Troy: "split looks desperate and teaches the market nothing.")
- Never skip charging first 10 customers just because they are friends.

## Go / No-go signal per candidate

| Candidate | Signal strength (weak/mixed/strong) | Evidence | Recommendation |
|---|---|---|---|
| <!-- fill --> | | | |

## Next recommended

- Surface: Cursor Ask mode first (summarize evidence), then Claude Code CLI `plan` mode to draft commit doc.
- Model: Opus 4.6 for commit-decision quality.
- Action: run `/venture:commit`.
- Why: decision under uncertainty benefits from a model that pushes back hardest on weak evidence.
