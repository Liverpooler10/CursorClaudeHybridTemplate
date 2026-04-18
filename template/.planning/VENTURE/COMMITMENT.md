<!-- STATUS: TODO -->
# 1.7 - Committing

Framework: Company of One - "Committing". This is the decision log. Signed, dated, irrevocable without a new ADR.

Before filling this: all of `SKILLSET.md`, `OPPORTUNITIES.md`, `RESEARCH.md`, `CATEGORIZATION.md`, `MARKET-TEST.md` must be `STATUS: DONE`.

## 1. Chosen Opportunity

- One-line description: <!-- fill -->
- Primary user / buyer: <!-- fill -->
- Pain addressed (verbatim from OPPORTUNITIES.md): <!-- fill -->
- Archetype (from CATEGORIZATION.md): <!-- fill -->

## 2. Evidence Snapshot

Paste the top 3 pieces of market evidence that moved your conviction.

1. <!-- fill -->
2. <!-- fill -->
3. <!-- fill -->

## 3. 90-Day Outcome Target

A single, measurable outcome that, if met, justifies continuing.

- Target (number + metric + date): <!-- fill, e.g. 25 paying customers by 2026-07-18 -->

## 4. Kill Criteria

If ANY of the following is true at day 90, the venture is killed and this ADR is closed with "killed" status.

- <!-- fill: criterion 1, e.g. fewer than 10 paying customers -->
- <!-- fill: criterion 2, e.g. CAC above EUR X -->
- <!-- fill: criterion 3, e.g. churn above X% month-over-month -->

Kill criteria are non-negotiable. Shifting them mid-run requires a new ADR with a new reviewer.

## 5. Capital at Risk

- Maximum cash out-of-pocket through day 90 (EUR): <!-- fill -->
- Opportunity cost of founder time (EUR/month equivalent): <!-- fill -->
- Reversibility (what can you recover if killed on day 90?): <!-- fill -->

## 6. Anti-Goals

Explicit things you will NOT do within the first 90 days even if tempted.

- <!-- fill -->

## 7. First-Week Plan

Concrete actions, each <= 1 day of work.

1. <!-- fill -->
2. <!-- fill -->
3. <!-- fill -->
4. <!-- fill -->
5. <!-- fill -->

## 8. Signature

- Founder: __PROJECT_NAME__ founder
- Date: <!-- fill: YYYY-MM-DD -->
- Acknowledgment: "I have read all of VENTURE/, I accept the kill criteria, and I commit until day 90 or kill, whichever comes first."
- Signed by typing full name: <!-- fill -->

## After signing

Run `npm run commit`. The validator will:

1. Refuse if any VENTURE file is still `STATUS: TODO`.
2. Refuse if any `<!-- fill: ... -->` placeholder remains in this file.
3. Write `venture.committed=true` and a timestamp in `.planning/.bootstrap.json`.
4. Create `.planning/adr/0001-venture-commitment.md` with a frozen snapshot.
5. Update `.planning/STATE.md` to Phase 1 and set the next recommended action.
6. Print the unlocked surface/model recommendation.

## Next recommended (before signing)

- Surface: Claude Code CLI in `plan` mode.
- Model: Opus 4.6 - you want the model that most aggressively surfaces weak evidence.
- Action: Ask the agent "Attack my commit doc. Where is the weakest assumption?"
- Why: one adversarial review before signing catches 80% of post-hoc regret.

## Next recommended (after `npm run commit` succeeds)

- Surface: Cursor Plan mode.
- Model: Claude Sonnet 4.6 (or Cursor Auto).
- Action: open `.planning/ROADMAP.md`, then run `/plan-phase` for Phase 1.
- Why: with the gate open, orchestration takes over. Phase 1 = Foundation scaffolding.
