#!/usr/bin/env node
// Cross-platform bootstrap for the Cursor + Claude Code hybrid template.
// Works via: npm create cursor-claude-hybrid@latest <dir>
//       or:  npx create-cursor-claude-hybrid <dir>

import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync, cpSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const REPO_ROOT = resolve(__dirname, "..");
const TEMPLATE_ROOT = join(REPO_ROOT, "template");

const TEXT_EXT = new Set([
  ".md", ".json", ".txt", ".example", ".mjs", ".js", ".ts", ".tsx",
  ".yml", ".yaml", ".mdc", ".cursorrules", ".editorconfig", ".gitignore"
]);
const TEXT_NAMES = new Set([
  ".cursorrules", "CLAUDE.md", "AGENTS.md", ".gitignore", ".editorconfig",
  "LICENSE", "pre-commit"
]);

function log(msg) { console.log(`==> ${msg}`); }
function warn(msg) { console.warn(`!!  ${msg}`); }
function die(msg) { console.error(`xx  ${msg}`); process.exit(1); }

function parseArgs(argv) {
  const args = { destination: null, projectName: null, primaryStack: "deferred",
    database: "deferred", frontend: "deferred", installPlugins: false,
    withFeatureSkeleton: false, nonInteractive: false, force: false };
  const rest = argv.slice(2);
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--project-name") args.projectName = rest[++i];
    else if (a === "--primary-stack") args.primaryStack = rest[++i];
    else if (a === "--database") args.database = rest[++i];
    else if (a === "--frontend") args.frontend = rest[++i];
    else if (a === "--install-claude-plugins") args.installPlugins = true;
    else if (a === "--with-feature-skeleton") args.withFeatureSkeleton = true;
    else if (a === "--yes" || a === "-y") args.nonInteractive = true;
    else if (a === "--force") args.force = true;
    else if (a === "--help" || a === "-h") { printHelp(); process.exit(0); }
    else if (!a.startsWith("--") && !args.destination) args.destination = a;
    else warn(`Unknown argument ignored: ${a}`);
  }
  return args;
}

function printHelp() {
  console.log(`
create-cursor-claude-hybrid

Usage:
  npm create cursor-claude-hybrid@latest <dir> [options]

Options:
  --project-name <name>          Project name (placeholder __PROJECT_NAME__)
  --primary-stack <stack>        e.g. "React + Vite", "Next.js 15", "Node + Fastify"
  --database <db>                e.g. "Supabase", "Postgres", "SQLite"
  --frontend <fw>                e.g. "Tailwind CSS", "shadcn/ui"
  --install-claude-plugins       Run 'claude plugins install' for the project
  --with-feature-skeleton        Create src/modules feature-sliced skeleton
  --yes, -y                      Skip interactive prompts (use defaults)
  --force                        Overwrite existing non-empty destination
  --help, -h                     Show this help
`);
}

async function prompt(question, fallback) {
  const rl = createInterface({ input, output });
  try {
    const answer = (await rl.question(`${question}${fallback ? ` [${fallback}]` : ""}: `)).trim();
    return answer || fallback || "";
  } finally { rl.close(); }
}

function walk(dir, files = []) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      if (entry === ".git" || entry === "node_modules") continue;
      walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

function isTextFile(path) {
  const base = path.split(/[\\/]/).pop() ?? "";
  if (TEXT_NAMES.has(base)) return true;
  const dot = base.lastIndexOf(".");
  if (dot === -1) return false;
  return TEXT_EXT.has(base.slice(dot));
}

function replacePlaceholders(path, tokens) {
  const original = readFileSync(path, "utf8");
  let content = original;
  for (const [k, v] of Object.entries(tokens)) {
    content = content.split(k).join(v);
  }
  if (content !== original) writeFileSync(path, content, "utf8");
}

function copyTemplate(src, dest) {
  cpSync(src, dest, { recursive: true, force: true });
}

function isEmptyDir(dir) {
  if (!existsSync(dir)) return true;
  return readdirSync(dir).length === 0;
}

function runClaude(cwd, args) {
  const r = spawnSync("claude", args, { cwd, stdio: "inherit", shell: process.platform === "win32" });
  if (r.error) warn(`claude command failed: ${r.error.message}`);
  else if (r.status !== 0) warn(`claude exited with code ${r.status}`);
}

function printNextRecommended() {
  console.log(`
---------------------------------------------------------------
NEXT RECOMMENDED ACTION
---------------------------------------------------------------
Surface : Cursor (Ask mode) OR Claude Code CLI (plan mode)
Model   : Claude Sonnet 4.6 (balanced), or Opus 4.6 for deep research
Reason  : Your project is in the Company-of-One DISCOVERY gate.
          Code scaffolding is LOCKED until .planning/VENTURE/COMMITMENT.md
          is signed via 'npm run commit'.

First step:
  1. Open the new project folder in Cursor.
  2. Open .planning/VENTURE/README.md and read the 7-step workflow.
  3. Run slash command '/venture:skillset' in Claude Code, OR ask the
     Cursor agent (Ask mode): "Guide me through .planning/VENTURE/SKILLSET.md."

When all six VENTURE/*.md files are filled:
  npm run commit      # validates and unlocks code scaffolding
  npm run doctor      # full health check

---------------------------------------------------------------
`);
}

async function main() {
  const args = parseArgs(process.argv);

  if (!existsSync(TEMPLATE_ROOT)) die(`Template directory not found: ${TEMPLATE_ROOT}`);

  if (!args.destination) {
    args.destination = args.nonInteractive
      ? "."
      : await prompt("Target directory", ".");
  }
  const destination = resolve(args.destination);
  const dirName = destination.split(/[\\/]/).pop() ?? "new-project";

  if (!args.projectName) {
    args.projectName = args.nonInteractive
      ? dirName
      : await prompt("Project name", dirName);
  }

  if (!args.nonInteractive) {
    args.primaryStack = await prompt("Primary stack (type 'deferred' to decide in Phase 1)", "deferred");
    args.database     = await prompt("Database       (type 'deferred' to decide in Phase 1)", "deferred");
    args.frontend     = await prompt("Frontend / UI  (type 'deferred' to decide in Phase 1)", "deferred");
  }

  if (!existsSync(destination)) mkdirSync(destination, { recursive: true });
  if (!isEmptyDir(destination) && !args.force) {
    die(`Destination is not empty: ${destination} (use --force to overwrite)`);
  }

  log(`Scaffolding ${args.projectName} into ${destination}`);
  copyTemplate(TEMPLATE_ROOT, destination);

  const today = new Date().toISOString().slice(0, 10);
  const tokens = {
    "__PROJECT_NAME__": args.projectName,
    "__PRIMARY_STACK__": args.primaryStack,
    "__DATABASE__": args.database,
    "__FRONTEND__": args.frontend,
    "__CURRENT_DATE__": today,
    "__TEMPLATE_VERSION__": "0.2.0"
  };

  for (const f of walk(destination)) {
    if (isTextFile(f)) replacePlaceholders(f, tokens);
  }

  const bootstrapMarker = join(destination, ".planning", ".bootstrap.json");
  if (existsSync(bootstrapMarker)) {
    const data = JSON.parse(readFileSync(bootstrapMarker, "utf8"));
    data.bootstrapped = true;
    data.bootstrappedAt = new Date().toISOString();
    data.projectName = args.projectName;
    data.primaryStack = args.primaryStack;
    data.database = args.database;
    data.frontend = args.frontend;
    data.templateVersion = "0.2.0";
    writeFileSync(bootstrapMarker, JSON.stringify(data, null, 2) + "\n", "utf8");
  }

  if (!args.withFeatureSkeleton) {
    // placeholder: feature skeleton toggle is handled by template (absent by default)
  }

  log("Template files copied and placeholders replaced.");

  if (args.installPlugins) {
    log("Installing Claude plugins (project scope)");
    runClaude(destination, ["plugins", "marketplace", "add", "--scope", "project", "nextlevelbuilder/ui-ux-pro-max-skill"]);
    runClaude(destination, ["plugins", "marketplace", "add", "--scope", "project", "kepano/obsidian-skills"]);
    runClaude(destination, ["plugins", "install", "--scope", "project", "superpowers@claude-plugins-official"]);
    runClaude(destination, ["plugins", "install", "--scope", "project", "ui-ux-pro-max@ui-ux-pro-max-skill"]);
    runClaude(destination, ["plugins", "install", "--scope", "project", "obsidian@obsidian-skills"]);
  }

  log("Done.");
  printNextRecommended();
}

main().catch((err) => { console.error(err); process.exit(1); });
