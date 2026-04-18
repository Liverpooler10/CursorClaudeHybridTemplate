# Claude Skills and Plugins

This folder is reference documentation only. Runtime integration comes from plugins declared in `.claude/settings.json`. Project conventions live in `AGENTS.md`.

## Installed plugins (project scope)

- `superpowers@claude-plugins-official` - engineering workflow, brainstorming-first, TDD, review discipline
- `ui-ux-pro-max@ui-ux-pro-max-skill` - responsive breakpoints, accessibility, visual QA guidance
- `obsidian@obsidian-skills` - `.base` / Obsidian-oriented content conventions when needed

Verify:

```bash
claude plugins list
claude plugins marketplace list
```

## External references (not installable plugins)

- `awesome-claude-code` - curated index only

## When to use which

- Superpowers: pre-implementation planning, adversarial review, test discipline.
- UI/UX Pro Max: any frontend polish phase.
- Obsidian skills: anything targeting `.base` or Obsidian-style markdown flows.
