<!-- STATUS: TODO -->
# 1.4 - Researching Prospective Opportunities

Framework: Company of One - "Researching Prospective Opportunities".

> **Time budget: 10 hours per candidate.** Troy's explicit ceiling. If you cannot fill the canvas in 10 hours you do not have a research problem, you have an idea too vague to test. Split it or drop it.

For each advanced candidate from `OPPORTUNITIES.md`, fill one canvas below. Every cell needs a source (URL, interview transcript, document path). `ASSUMPTION:` is allowed only when a source cannot yet exist; assumptions become hypotheses in `MARKET-TEST.md`.

---

## Candidate A: <!-- pain one-liner -->

### 1. Market

- Total addressable users (source): <!-- fill -->
- Reachable subset in 90 days (source): <!-- fill -->
- Growth direction of the pain (source): <!-- fill -->

### 2. Incumbents / Alternatives

| Solution | Price | Distribution | Weakness | Why users still suffer |
|---|---|---|---|---|
| <!-- fill --> | | | | |

At least 3 rows. If you cannot find 3 incumbents, the pain is probably too small or too niche, OR your search is lazy. Finding no competitors is a red flag, not a green one (Troy 1.4: "You WANT to find competition.").

### 3. Distribution Channels

Where do sufferers already gather? Concrete names, not "social media".

- <!-- fill: channel, size, founder-accessible? -->

### 4. Marketing vs. Sales company (Troy 1.4)

Every business is one or the other early on. Tick which indicators apply:

**Marketing indicators**
- [ ] Easily target-able audience (one clear channel)
- [ ] Low deal size (< EUR 500 / transaction or subscription under EUR 50 / mo)
- [ ] Simple self-setup for the user
- [ ] No contracts needed
- [ ] Selling to individuals

**Sales indicators**
- [ ] High deal size (> EUR 5k / contract)
- [ ] Complex setup / integration
- [ ] Contract or volume commitment expected
- [ ] Selling to businesses

Verdict: <!-- fill: "Marketing company" | "Sales company" | "Hybrid - explain why" -->

Sanity check: if you ticked 3+ Sales indicators but expect a low price point, **kill this candidate or restructure** - a sales company cannot pay its own sales force below a deal threshold.

### 5. TAM / SAM / SOM (Troy 1.4)

Fill the 4 inputs; the formula is fixed. Anchor low on assumptions; do not reverse-engineer to hit a target number.

| Input | Value | Source |
|---|---|---|
| # people in space (TAM scope) | <!-- fill --> | <!-- fill --> |
| # people in need (SAM scope) | <!-- fill: differs from space; not everyone has this pain --> | <!-- fill --> |
| Charge amount (EUR) | <!-- fill: your take after COGS if physical --> | <!-- fill --> |
| Purchase frequency per year | <!-- fill: 12 for monthly subscription, 1 for one-time --> | <!-- fill --> |

Calculations:

- **TAM** = `# in space * charge * frequency` = <!-- fill -->
- **SAM** = `# in need * charge * frequency` = <!-- fill -->
- **SOM** = `SAM * 0.1` (10 % capture is an intentionally conservative anchor) = <!-- fill -->

The SOM is the single number you carry to CATEGORIZATION.md Opportunity-Size bucket.

### 6. Unit Economics Sketch

- Price point hypothesis (source / comp): <!-- fill -->
- Cost to deliver one unit (variable): <!-- fill -->
- CAC rough estimate (source): <!-- fill -->
- Payback month (rough): <!-- fill -->

### 7. Regulatory / Legal / Trust Risk

- <!-- fill: GDPR, licensing, platform TOS, etc. -->

### 8. Would-build gut check

- Can you ship an MVP solo in 6 weeks? (yes/no, why): <!-- fill -->
- 5-year obsession test - will this still interest you in year 5? <!-- fill -->

---

## Candidate B: <!-- copy structure above -->

---

## Synthesis

Rank candidates with a note on what evidence flipped your ranking vs. `OPPORTUNITIES.md`.

| Rank | Candidate | Marketing or Sales | SOM (EUR) | Decisive evidence | Move to CATEGORIZATION? |
|---|---|---|---|---|---|
| 1 | <!-- fill --> | | | | |
| 2 | <!-- fill --> | | | | |

## Next recommended

- Surface: Claude Code CLI in `plan` mode, OR Cursor Plan mode.
- Model: Sonnet 4.6.
- Action: run `/venture:categorize`.
- Why: we now reduce breadth to a short list ranked by Troy's Timeline-to-Ship x Opportunity-Size x Confidence matrix.
