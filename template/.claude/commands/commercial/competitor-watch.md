---
description: Monthly competitor snapshot - fetch competitor pages (MCP) or accept manual paste, diff vs. last snapshot, update COMPETITORS.md.
---

# /commercial:competitor-watch

Monthly cadence. Requires the fetch MCP (opt-in since v1.0.0) or manual paste mode.

## MCP requirement

This command uses the Web-Fetch MCP. The template ships it under `.mcp.json._opt_in_servers.fetch` - move it into `mcpServers` to enable. Without MCP, the command runs in manual mode: it asks for pasted copy and only structures the snapshot.

Enabling the fetch MCP is a deliberate security decision. The default `.claude/settings.json.permissions.ask` gates each fetch. Do not auto-allow without reviewing the target domain list in `.planning/COMMERCIAL/COMPETITORS.md`.

## Preconditions

- `.planning/COMMERCIAL/COMPETITORS.md` has a non-empty Watchlist with URLs.
- Either the fetch MCP is enabled OR the founder is ready to paste copy.

## Process

1. Read `.planning/COMMERCIAL/COMPETITORS.md`. For each entry in the Watchlist:
   - If fetch MCP available: fetch the URL (HTML only, no scripts). Ask the user to approve each fetch.
   - Else: ask the user to paste the visible landing-page copy for that competitor.
   - Extract: `headline`, `primary_cta`, `price` (or "price hidden"), `positioning` sentence.
2. Append a "Snapshot" block per competitor under `## Snapshots`, tagged with the current `YYYY-MM` month. Never overwrite prior snapshots - diffing them month-over-month is the whole point.
3. Diff against the previous snapshot for the same competitor:
   - Headline change: note verbatim old vs. new.
   - CTA change: note.
   - Price change: note with delta percent.
   - Positioning shift: note.
4. Set threat level using the Red-flags table in COMPETITORS.md:
   - `low` - cosmetic change only.
   - `medium` - messaging pivot toward our ICP.
   - `high` - price drop > 30 %, or new funding, or new marquee logo in our ICP.
5. If any red flag triggers:
   - Append to `.planning/COMMERCIAL/METRICS.md` `Blockers` with date and nature.
   - Append a todo to `.planning/STATE.md` "Next 3 TODOs".
6. Produce a chat-facing digest:

   ```
   Competitor watch - <YYYY-MM>
   ----------------------------
   Scanned   : N competitors
   Changes   : <count> (low: A, medium: B, high: C)
   Top flag  : <competitor + what changed>
   Next      : <one concrete action for the founder>
   ```

## Hard rules

- Never scrape behind a login.
- Never infer hidden prices. Write "price hidden" and move on.
- Do not auto-propose ADRs or price matches. Surface changes to the founder in STATE.md, let the founder decide.
- Fetch MCP calls respect `.claude/settings.json.permissions.ask` gating every request. Do not try to bypass.

## Next recommended

```
Next recommended
----------------
Surface : Cursor Ask
Mode    : ask
Model   : Claude Sonnet 4.6
Why     : Snapshot captured; founder reviews whether to respond in STATE.md.
Session : ok
```
