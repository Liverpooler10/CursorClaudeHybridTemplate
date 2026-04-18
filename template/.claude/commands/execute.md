---
description: Execute tasks from the current phase plan atomically, with checkpoints and conventional commits.
---

# /execute

## Preconditions

- `.planning/phase-N/PLAN.md` exists and user approved it.
- Venture gate is open.
- Phase branch `gsd/phase-N-<slug>` is checked out.

## Protocol per task

1. Take a checkpoint named `phase-N/task-<id>/pre`.
2. Announce: "Starting task <id> - <one-line title>".
3. Enter `plan` mode, outline the specific change set.
4. Switch to `default` (or `acceptEdits` after a second checkpoint) for edits.
5. Run tests. If red, loop until green or 3 attempts (then stop and report).
6. Commit with Conventional Commits (`feat:`, `fix:`, `test:`, `refactor:`, `chore:`).
7. Update `.planning/STATE.md`:
   - mark task complete in "Pending Todos" (or remove).
   - update "Last session" timestamp.
8. Move to next task.

## Stop conditions

- 3 consecutive test-fix attempts failed -> stop, summarize, hand back.
- A task touches files outside its acceptance criteria -> stop, propose amending the plan.
- Any security hook fires -> stop, do not override.
- `Current owner:` was claimed by another agent mid-run -> stop.

## Output per run

- List of commits made (sha + message).
- List of tests added / changed.
- Remaining tasks in the phase.

## Next recommended

```
Next recommended
----------------
Surface : Claude Code CLI
Mode    : default (continue execute) or hand off to /verify when phase complete
Model   : Claude Sonnet 4.6
Why     : Execution loop is routine; verifier runs once phase tasks are done.
Session : ok
```
