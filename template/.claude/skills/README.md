# Claude Skills And Plugins

This project uses Claude Code plugins installed at project scope.

## Installed Plugins

- `superpowers@claude-plugins-official`
- `ui-ux-pro-max@ui-ux-pro-max-skill`
- `obsidian@obsidian-skills`

These plugins are the authoritative runtime integration for Claude Code in this project.

## What This Folder Is For

This folder contains local reference documentation only.

It exists to document:

- which Claude plugins are installed for this project
- which workflow expectations apply to this project
- which external references are informational only

## Important Clarification

The files in this folder are not the actual Claude runtime payload.
Claude Code uses the installed plugins declared in `.claude/settings.json`.

## External References

- `superpowers`: engineering workflow, brainstorming-first, TDD, review discipline
- `ui-ux-pro-max`: responsive breakpoints, accessibility, visual QA guidance
- `obsidian-skills`: `.base` / Obsidian-oriented content conventions when needed
- `awesome-claude-code`: useful reference index, not an installable plugin

## Maintenance

To verify the current Claude plugin state, run:

```bash
claude plugins list
claude plugins marketplace list
```
