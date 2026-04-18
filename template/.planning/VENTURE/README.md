# Company of One - Discovery Workflow

This directory is the mandatory pre-code validation gate for __PROJECT_NAME__. Based on the "Company of One" framework (Troy, serial founder). Six files, one script, one decision.

While `venture.committed` in `.planning/.bootstrap.json` is `false`:

- no code under `src/`, `app/`, `server/`, `api/`, `lib/`, `components/`, `pages/`, `prisma/`, `db/`
- no runtime dependency installs
- no infrastructure scaffolding

When all six files below are filled and `npm run commit` passes, the gate opens.

## The Six Steps

| # | Framework section | File | Slash command | Output |
|---|---|---|---|---|
| 1.2 | Evaluating Your Skillset | `SKILLSET.md` | `/venture:skillset` | Ranked skill+asset inventory |
| 1.3 | Chase The Pain | `OPPORTUNITIES.md` | `/venture:chase-pain` | Scored pain-driven ideas |
| 1.4 | Researching Prospective Opportunities | `RESEARCH.md` | `/venture:research` | Evidence per candidate |
| 1.5 | Categorizing Opportunities | `CATEGORIZATION.md` | `/venture:categorize` | Fit x Pain x Effort matrix |
| 1.6 | Testing The Market | `MARKET-TEST.md` | `/venture:market-test` | Falsifiable experiments + results |
| 1.7 | Committing | `COMMITMENT.md` | `/venture:commit` | Signed go/no-go decision |

## Hard rules

1. Do the steps in order. Skipping steps creates untested assumptions that survive into code.
2. Every claim cites a source. No hallucinated market sizes.
3. Assumptions are marked `ASSUMPTION:` so they can be attacked later.
4. Pain before solution. Never start from "I want to build X."
5. Kill criteria are written BEFORE running experiments, not after.
6. `COMMITMENT.md` requires a capital-at-risk number and a 90-day kill date. No number, no commit.

## What "done" means for a step

Each file has a `<!-- STATUS: TODO -->` marker at the top. Change it to `<!-- STATUS: DONE -->` only when:

- every required section is filled
- every `ASSUMPTION:` is either tested or explicitly accepted with rationale
- the footer "Next recommended" block is updated to point to the next step

The `npm run commit` validator refuses to flip the gate if any file still says `TODO` or contains placeholder `<!-- fill: ... -->` tokens.

## Next recommended

- Surface: Claude Code CLI (`claude` in Cursor terminal) in `plan` mode, OR Cursor Ask mode.
- Model: Claude Sonnet 4.6 for speed; Opus 4.6 if you want deeper challenge on your assumptions.
- Action: run `/venture:skillset` (Claude) or ask the Cursor agent to guide you through `SKILLSET.md`.
- Why: Skillset evaluation precedes opportunity hunting; it narrows the search space 10x.
