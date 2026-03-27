# Cursor Claude Hybrid Template

A reusable project starter for a hybrid workflow with:

- Cursor for day-to-day implementation
- Claude Code for plugin-driven planning, review, and project-state maintenance
- a shared `.planning/` source of truth

This repository can be used in two ways:

1. As a GitHub template repository for new projects
2. As a bootstrap toolkit that scaffolds another project directory

## Included

- project-scoped Claude plugin configuration
- generic `CLAUDE.md`
- generic `.cursorrules`
- reusable `.planning/` starter files
- PowerShell and shell bootstrap scripts

## Claude Plugins Configured

- `superpowers@claude-plugins-official`
- `ui-ux-pro-max@ui-ux-pro-max-skill`
- `obsidian@obsidian-skills`

## Quick Start

### Option A: Use This Repo As A GitHub Template

1. Create a new repository from this template
2. Clone the new repository locally
3. Run:

```powershell
.\scripts\bootstrap.ps1 -ProjectName "MyProject" -PrimaryStack "React + Vite" -Database "Supabase" -Frontend "Tailwind CSS" -InstallClaudePlugins
```

On macOS/Linux:

```bash
./scripts/bootstrap.sh --project-name "MyProject" --primary-stack "React + Vite" --database "Supabase" --frontend "Tailwind CSS" --install-claude-plugins
```

### Option B: Use This Repo To Scaffold Another Project Directory

Clone this repository somewhere convenient, then run:

```powershell
.\scripts\bootstrap.ps1 -Destination "C:\path\to\new-project" -ProjectName "MyProject" -PrimaryStack "React + Vite" -Database "Supabase" -Frontend "Tailwind CSS" -InstallClaudePlugins
```

## What Bootstrap Does

- copies the files from `template/` into the target directory
- replaces placeholders like `__PROJECT_NAME__`
- optionally installs Claude Code marketplaces and plugins in project scope
- leaves you with a ready-to-customize hybrid setup

## Files Generated Into A New Project

- `.claude/settings.json`
- `.claude/skills/README.md`
- `.planning/BACKLOG.md`
- `.planning/PROJECT.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`
- `.planning/config.json`
- `.cursorrules`
- `CLAUDE.md`
- `.gitignore`
- `.env.example`

## After Bootstrap

Customize these files first:

- `CLAUDE.md`
- `.cursorrules`
- `.planning/PROJECT.md`
- `.planning/ROADMAP.md`
- `.planning/STATE.md`

Then verify Claude:

```bash
claude plugins list
claude plugins marketplace list
```

## Recommended Workflow

1. Keep `.planning/` as the source of truth
2. Use Cursor for implementation
3. Use Claude Code for planning, review, and state synchronization
4. After significant Cursor changes, run Claude to refresh planning docs

## Notes

- The files in `.claude/skills/` are reference docs only, not runtime plugin payload
- Claude runtime integration comes from the installed plugins declared in `.claude/settings.json`
- The template is intentionally generic; project-specific rules belong in the generated project, not in this repository
