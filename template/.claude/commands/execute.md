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

## Subagent delegation

If the `superpowers` plugin (`@claude-plugins-official`) is active AND the current task has at least 3 independent subtasks (no shared-file edits, no ordering dependency), delegate each subtask to a subagent instead of running linearly. Typical shape:

- file generation + matching test file + docstring update for the same unit
- three unrelated file renames in a codemod sweep
- migrations for N tables that don't share foreign keys

Pattern:

1. In `plan` mode, list the subtasks and confirm independence with the user.
2. Spawn one subagent per subtask via the plugin's `task` primitive. Each subagent gets: a one-sentence goal, the acceptance criterion, and the exact files it owns.
3. Wait for all subagents to report. Collect their diffs.
4. Review as one combined change. Commit atomically with a single Conventional Commits message that references every subtask id.

If `superpowers` is not active, continue linearly and note in the output that parallel execution was skipped. Do not try to fake parallelism with sequential runs - the benefit is both speed and independent reasoning.

Do NOT delegate: anything that writes to `.planning/STATE.md`, anything that touches security-sensitive paths (enforced by hooks), or anything that modifies the same file as another subtask.

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
