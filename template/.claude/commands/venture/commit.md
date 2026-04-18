---
description: Run the commit ritual and unlock code scaffolding.
---

# /venture:commit

## Your job

1. Require all five prior files to be `STATUS: DONE`:
   - SKILLSET.md
   - OPPORTUNITIES.md
   - RESEARCH.md
   - CATEGORIZATION.md
   - MARKET-TEST.md

2. Walk the user through each section of `COMMITMENT.md`. Refuse to move on if:
   - any `<!-- fill: ... -->` placeholder remains
   - kill criteria are vague (no numbers, no dates)
   - 90-day outcome target has no metric
   - Capital at risk is zero (means the founder is not actually committing)

3. **Adversarial review pass**: before signing, challenge the commit doc. Ask:
   - "Which of your kill criteria would you actually enforce?"
   - "Where is the weakest assumption? If it is false, what breaks?"
   - "What would make you quit on day 30, and is that in the kill criteria?"
   - "Could you do a smaller version of this with the same learning?"

4. After the user adds a signature, remind them to exit the slash-command and run:

```
npm run commit
```

The `venture-commit.mjs` script is the only code path that flips `venture.committed`. Do NOT try to edit `.planning/.bootstrap.json` yourself.

## After commit succeeds

Read `.planning/.bootstrap.json`. Verify `venture.committed === true`. Announce the gate is open and emit:

```
Next recommended
----------------
Surface : Cursor Plan mode
Mode    : plan
Model   : Cursor Auto (or Claude Sonnet 4.6)
Why     : With the gate open, orchestration begins. Open ROADMAP.md and run
          `/plan-phase` for Phase 1 (Foundation).
Session : consider-clear
```
