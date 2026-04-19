# __PROJECT_NAME__ Roadmap

Each phase after Discovery runs two parallel tracks: the AI builds the tech, the founder runs the commercial motion. Both tracks must close before the phase counts as `/verify`-green.

## Milestones

### Phase 0 - Discovery (Company of One)

Pre-code, pre-sell. Fill `.planning/VENTURE/*.md` in order. Ends when `npm run commit` succeeds.

- [ ] 1.2 Skillset (`SKILLSET.md`)
- [ ] 1.3 Opportunities (`OPPORTUNITIES.md`)
- [ ] 1.4 Research (`RESEARCH.md`)
- [ ] 1.5 Categorization (`CATEGORIZATION.md`)
- [ ] 1.6 Market Test (`MARKET-TEST.md`)
- [ ] 1.7 Commit (`COMMITMENT.md`)

### Phase 1 - Foundation

Unlocked after venture commit. Rule `015-commercial-gate.mdc` blocks the Tech Track until LANDING.md is filled.

**Commercial Track**
- [ ] Landing page live (`COMMERCIAL/LANDING.md` done, published).
- [ ] ICP v1 documented (`COMMERCIAL/ICP.md`).
- [ ] Pricing decision recorded (`COMMERCIAL/PRICING.md`).
- [ ] 10 discovery calls completed (`COMMERCIAL/INTERVIEWS/*`).
- [ ] First `/commercial:check` run; initial signal recorded.

**Tech Track**
- Scaffold repository layout aligned with `AGENTS.md` and `tsconfig.base.json`.
- Confirm hybrid workflow end-to-end: `/plan-phase` -> `/execute` -> `/verify`.
- Ship the smallest slice that exercises the chosen opportunity's primary value path.

### Phase 2 - Core Product

**Commercial Track**
- [ ] First 10 paying customers (`COMMERCIAL/METRICS.md` table filled).
- [ ] Pricing experiment 1 run to conclusion (accept / reject / iterate).
- [ ] `/commercial:check` `SIGNAL: on track` or `double down`.

**Tech Track**
- Build the main user flow against real data (not mocks).
- Validate the primary value proposition against COMMITMENT.md's 90-day target.

### Phase 3 - Hardening

**Commercial Track**
- [ ] 30-day content queue published (`COMMERCIAL/` or external channels).
- [ ] Retention signal captured (repeat-purchase or active-use rate).
- [ ] First `/commercial:competitor-watch` run.

**Tech Track**
- Fill testing gaps per Rule 200.
- Security audit (`/security-audit`).
- UI audit (`/ui-review`).
- Integration check across phases (`/integration-check`).

### Phase 4 - Release Readiness

**Commercial Track**
- [ ] Launch announcement copy drafted.
- [ ] Press / community post list prepared.
- [ ] Launch-day FAQ and refund policy written.

**Tech Track**
- Docs.
- Ops checks.
- Launch checklist and rollback plan.
- ADR for go-live.

## Notes

- Keep this roadmap outcome-focused.
- Tactical daily position goes in `STATE.md`.
- Every phase starts with `/plan-phase` (tech) and weekly `/commercial:check` (commercial).
- Every phase ends with `/verify` (tech) AND a commercial-metric update.
