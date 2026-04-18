---
description: Security audit of deps, env, hooks, MCP whitelist, and secrets hygiene.
---

# /security-audit

## Scope

Everything the agents can reach: dependencies, `.env.example`, hooks, `.mcp.json`, CI workflows, husky scripts.

## Checklist

### Dependencies

- [ ] Lockfile committed (`package-lock.json` / `pnpm-lock.yaml`).
- [ ] `npm audit` (or `pnpm audit`) - no high / critical.
- [ ] No new runtime dep without an ADR.
- [ ] All new deps have been on npm > 90 days, have > 1k weekly downloads, and a named maintainer.

### Secrets

- [ ] `.env.example` is current; no keys in it.
- [ ] `gitleaks detect --no-banner` on HEAD clean.
- [ ] `gitleaks detect --log-opts="-p"` on last 50 commits clean.
- [ ] No secret printed in any committed log, fixture, or test snapshot.

### Hooks

- [ ] `.cursor/hooks.json` deny / ask lists unchanged vs template unless ADR.
- [ ] `.claude/settings.json.permissions.deny` unchanged vs template unless ADR.
- [ ] `.husky/pre-commit` still runs gitleaks.

### MCP

- [ ] `.mcp.json` contains only filesystem MCP, or additions are each covered by an ADR.
- [ ] No MCP server makes outbound calls to unlisted domains.

### CI

- [ ] `.github/workflows/ci.yml` runs gitleaks.
- [ ] `permissions:` clause in workflows is minimal.
- [ ] No secret echoed in CI logs.

### Platform

- [ ] No `sudo`, `curl ... | sh` anywhere in scripts.
- [ ] `scripts/*.mjs` do not shell out with unvalidated user input.

## Output

`.planning/phase-N/SECURITY-AUDIT.md` with per-check PASS / FAIL / NA and remediation plan.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : plan (fix remediations with /execute afterwards)
Model   : Claude Opus 4.6
Why     : security findings benefit from deep reasoning on blast radius.
```
