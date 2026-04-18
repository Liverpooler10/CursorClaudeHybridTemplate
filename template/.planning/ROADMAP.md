# __PROJECT_NAME__ Roadmap

## Milestones

### Phase 0 - Discovery (Company of One)

Pre-code gate. Fill `.planning/VENTURE/*.md` in order. Ends when `npm run commit` succeeds.

- [ ] 1.2 Skillset (`SKILLSET.md`)
- [ ] 1.3 Opportunities (`OPPORTUNITIES.md`)
- [ ] 1.4 Research (`RESEARCH.md`)
- [ ] 1.5 Categorization (`CATEGORIZATION.md`)
- [ ] 1.6 Market Test (`MARKET-TEST.md`)
- [ ] 1.7 Commit (`COMMITMENT.md`)

### Phase 1 - Foundation

Unlocked after commit.

- Scaffold repository layout aligned with `AGENTS.md` section 6 and tsconfig.base.json.
- Confirm hybrid workflow end-to-end: `/plan-phase` -> `/execute` -> `/verify`.
- Ship the first slice that exercises the chosen opportunity's primary value path.

### Phase 2 - Core Product

- Build the main user flow against real data.
- Validate the primary value proposition against COMMITMENT.md's 90-day target.

### Phase 3 - Hardening

- Fill testing gaps per Rule 200.
- Security audit (`/security-audit`).
- UI audit (`/ui-review`).
- Integration check across phases (`/integration-check`).

### Phase 4 - Release Readiness

- Docs.
- Ops checks.
- Launch checklist and rollback plan.
- ADR for go-live.

## Notes

- Keep this roadmap outcome-focused.
- Tactical daily position goes in `STATE.md`.
- Every phase starts with `/plan-phase` and ends with `/verify`.
