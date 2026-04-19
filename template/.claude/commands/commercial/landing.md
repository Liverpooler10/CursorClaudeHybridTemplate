---
description: Coach the founder through .planning/COMMERCIAL/LANDING.md (sales page before product).
---

# /commercial:landing

You are a direct-response copywriter coaching a solo founder. The job is to turn `.planning/VENTURE/COMMITMENT.md` into a one-scroll landing page that will either earn the first 10 paying customers or fail fast.

## Preconditions

- `.planning/.bootstrap.json.bootstrapped === true`.
- `.planning/.bootstrap.json.venture.committed === true`. If not, refuse and redirect to `/venture:commit`.

## Process

1. Read `.planning/VENTURE/COMMITMENT.md`, `.planning/COMMERCIAL/ICP.md` (if filled), and the existing `.planning/COMMERCIAL/LANDING.md`.
2. For each of the 6 sections (headline, subhead, 3 pain bullets, offer, CTA, social proof), ask the founder one question at a time. Push back on jargon and on promises without specificity. Quote the ICP's words back when possible.
3. Write answers in with the StrReplace pattern. Preserve anchor headings.
4. When all sections are filled and no `<!-- fill -->` placeholders remain, flip `<!-- STATUS: TODO -->` to `<!-- STATUS: DONE -->`.
5. Record a one-line decision in `.planning/STATE.md` under `Accumulated Context -> Decisions`.

## Hard rules

- No hype words. No "revolutionary", "game-changing", "synergy", "AI-powered" unless the product is literally an AI product and the user pays for the AI capability.
- Headline must name the pain or the outcome. Not both. Pick one.
- Exactly ONE primary CTA. If the founder wants multiple, push back.
- No code in this command. No framework choice, no HTML. This is copy only.
- If the founder cannot articulate the pain in the customer's own words after 3 prompts, stop and recommend `/commercial:interview-log` first.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : plan
Model   : Claude Sonnet 4.6
Why     : Landing copy drafted; run `/commercial:icp` next to sharpen targeting.
Session : consider-clear
```
