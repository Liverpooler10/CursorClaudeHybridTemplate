---
description: Flush the current session - update STATE.md, recommend /compact, then /clear. Use at task end or when context feels long.
---

# /session-end

Clean handoff before ending or compacting a Claude Code session. The goal is to ensure the next session (yours or the user's) can resume from STATE.md alone, without any chat history.

## Your job

1. **Summarize** the current task in one paragraph: what was done, what was decided, what remains open.
2. **Update `.planning/STATE.md`** in place:
   - `Last session:` -> today's date (YYYY-MM-DD, ISO).
   - `Stopped at:` -> the exact point where work paused (task id, phase step, or file:line).
   - `Next 3 TODOs:` -> concrete, actionable next steps. No vague verbs ("improve", "look at") - use "Run", "Implement", "Review", "Decide".
   - `Current owner:` -> set to `none`.
   - `Accumulated Context -> Decisions:` -> append any durable decision made this session. One line per decision.
   - Do NOT rewrite sections that did not change. Keep STATE.md short.
3. **Check ADR debt.** If an architectural decision was made this session and no ADR exists, flag it: "ADR pending: <topic>". Add it to `Next 3 TODOs`.
4. **Verify the gates are still green.** If `.planning/.bootstrap.json` was touched, re-read it. Do not leave `bootstrapped:false` or inconsistent `venture.committed` state behind.
5. **Print a short handoff** to the user:

   ```
   Session wrap-up
   ---------------
   Done    : <one line>
   Decided : <one line or "none">
   Next    : <first TODO from STATE.md>

   Recommended: run /compact to shrink this session, then /clear to start fresh.
   ```

6. **Emit the Next recommended footer** with `Session: consider-clear` (see rule `035-next-step-hint`).

## Do NOT

- Do not touch code files (`src/`, `app/`, `server/`, etc.) in this command.
- Do not invent work that did not happen - if the session was unproductive, say so in STATE.md.
- Do not run `/compact` or `/clear` yourself - they are user commands. Only recommend them.
- Do not modify `.planning/ROADMAP.md` unless an ADR was committed this session.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : default
Model   : Claude Sonnet 4.6
Why     : STATE.md is flushed; user should run /compact then /clear before next task.
Session : consider-clear
```
