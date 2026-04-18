---
description: Refresh CLAUDE.md as a thin pointer to AGENTS.md. Use instead of raw /init.
---

# /init-memory

The upstream `/init` command tends to produce a long generated CLAUDE.md. For this project we keep CLAUDE.md thin and treat AGENTS.md as the source of truth.

## Your job

1. Read `AGENTS.md`. Summarize in your own head.
2. Check `CLAUDE.md` - ensure it:
   - Points to AGENTS.md as source of truth.
   - Contains the two non-negotiable gates (bootstrap, venture).
   - Contains the short Mode Policy.
   - Contains the Next-Step Hint Protocol reminder.
3. If `CLAUDE.md` has drifted (contains generated content, duplicates AGENTS.md, or has been padded), rewrite it to the template version from the hybrid template.
4. Do NOT dump the full AGENTS.md into CLAUDE.md.
5. Record the action in `.planning/STATE.md` under "Accumulated Context -> Decisions".

## Next recommended

```
Next recommended
----------------
Surface : Cursor Ask mode
Mode    : ask
Model   : Cursor Auto
Why     : CLAUDE.md and AGENTS.md are synced; next real task picks up in
          Plan mode per MODE-GUIDE.md.
```
