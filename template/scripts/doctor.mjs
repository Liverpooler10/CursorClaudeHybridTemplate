#!/usr/bin/env node
// Health check for a project scaffolded from create-cursor-claude-hybrid.
// Prints a clear PASS/WARN/FAIL line per check and the next-recommended action.

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const results = [];
function pass(label, detail = "") { results.push({ level: "PASS", label, detail }); }
function warn(label, detail = "") { results.push({ level: "WARN", label, detail }); }
function fail(label, detail = "") { results.push({ level: "FAIL", label, detail }); }

// 1. Node >= 18
{
  const v = process.versions.node.split(".").map(Number);
  if (v[0] >= 18) pass("Node >= 18", `node ${process.versions.node}`);
  else fail("Node >= 18", `found ${process.versions.node}`);
}

// 2. claude CLI present
{
  const shell = process.platform === "win32";
  const r = spawnSync("claude", ["--version"], { stdio: "pipe", shell });
  if (r.status === 0) pass("Claude Code CLI", (r.stdout?.toString() || "").trim());
  else warn("Claude Code CLI", "`claude` not in PATH (install from https://claude.ai)");
}

// 3. bootstrap marker
const bootstrapPath = join(ROOT, ".planning", ".bootstrap.json");
let bootstrap = null;
if (!existsSync(bootstrapPath)) {
  fail(".planning/.bootstrap.json present");
} else {
  try {
    bootstrap = JSON.parse(readFileSync(bootstrapPath, "utf8"));
    if (bootstrap.bootstrapped) pass("Bootstrap complete", `at ${bootstrap.bootstrappedAt ?? "?"}`);
    else fail("Bootstrap complete", "run `npm run bootstrap`");
  } catch (e) { fail(".planning/.bootstrap.json parsable", e.message); }
}

// 4. Venture gate status
if (bootstrap) {
  const v = bootstrap.venture ?? {};
  if (v.committed) pass("Venture committed", `since ${v.committedAt ?? "?"} -> ${v.chosenOpportunity ?? "?"}`);
  else {
    const missing = [];
    const required = ["SKILLSET.md","OPPORTUNITIES.md","RESEARCH.md","CATEGORIZATION.md","MARKET-TEST.md","COMMITMENT.md"];
    for (const f of required) {
      const p = join(ROOT, ".planning", "VENTURE", f);
      if (!existsSync(p)) { missing.push(f); continue; }
      const content = readFileSync(p, "utf8");
      if (/STATUS:\s*TODO/i.test(content) || /<!--\s*fill(\s*:[^-]*)?\s*-->/i.test(content)) missing.push(f);
    }
    if (missing.length) warn("Venture gate", `open; pending: ${missing.join(", ")}`);
    else warn("Venture gate", "files look filled - run `npm run commit`");
  }
}

// 5. AGENTS.md + CLAUDE.md + .cursor/rules/ presence
{
  const checks = [
    ["AGENTS.md", "AGENTS.md"],
    ["CLAUDE.md", "CLAUDE.md"],
    [".cursor/rules/000-bootstrap-guard.mdc", "rule 000"],
    [".cursor/rules/005-venture-gate.mdc", "rule 005"],
    [".cursor/rules/035-next-step-hint.mdc", "rule 035"],
    [".planning/MODE-GUIDE.md", ".planning/MODE-GUIDE.md"]
  ];
  for (const [rel, label] of checks) {
    if (existsSync(join(ROOT, rel))) pass(label);
    else fail(label, "missing");
  }
}

// 6. Security
{
  const hooksPath = join(ROOT, ".cursor", "hooks.json");
  if (existsSync(hooksPath)) pass(".cursor/hooks.json");
  else fail(".cursor/hooks.json", "missing");

  const claudeSettings = join(ROOT, ".claude", "settings.json");
  if (existsSync(claudeSettings)) {
    const s = JSON.parse(readFileSync(claudeSettings, "utf8"));
    if (s.permissions?.deny) pass(".claude/settings.json permissions.deny present");
    else warn(".claude/settings.json permissions.deny", "absent");
  } else {
    fail(".claude/settings.json", "missing");
  }

  const mcp = join(ROOT, ".mcp.json");
  if (existsSync(mcp)) pass(".mcp.json");
  else warn(".mcp.json", "missing");
}

// 7. gitleaks available
{
  const shell = process.platform === "win32";
  const r = spawnSync("gitleaks", ["version"], { stdio: "pipe", shell });
  if (r.status === 0) pass("gitleaks installed");
  else warn("gitleaks installed", "optional; recommended for pre-commit");
}

// 8. git hooks / husky
{
  const p = join(ROOT, ".husky", "pre-commit");
  if (existsSync(p)) pass(".husky/pre-commit");
  else warn(".husky/pre-commit", "not installed; run `npm install` to trigger husky install");
}

// 9. Current owner status
{
  const state = join(ROOT, ".planning", "STATE.md");
  if (existsSync(state)) {
    const s = readFileSync(state, "utf8");
    const m = s.match(/Current owner:\s*([^\n]+)/i);
    if (!m || /^\s*none/i.test(m[1])) pass("Task ownership clear");
    else warn("Task ownership", `currently: ${m[1].trim()}`);
  }
}

// 10. Deferred stack in build phase (WARN — only relevant after gate opens)
if (bootstrap?.venture?.committed) {
  const deferredFields = ["primaryStack", "database", "frontend"]
    .filter(k => !bootstrap[k] || bootstrap[k] === "deferred");
  if (deferredFields.length > 0) {
    warn(
      "Stack fields still 'deferred' in build phase",
      `${deferredFields.join(", ")} — create ADRs under .planning/adr/ and update .planning/.bootstrap.json`
    );
  } else {
    pass("Stack fields resolved", `${bootstrap.primaryStack} / ${bootstrap.database} / ${bootstrap.frontend}`);
  }
}

// Print
for (const r of results) {
  const tag = r.level === "PASS" ? "ok " : r.level === "WARN" ? "!! " : "xx ";
  console.log(`${tag} ${r.label}${r.detail ? " - " + r.detail : ""}`);
}

// Determine next-recommended
function nextRecommended() {
  if (!bootstrap || !bootstrap.bootstrapped) return {
    surface: "Terminal", mode: "n/a", model: "n/a",
    why: "Bootstrap not complete. Run `npm run bootstrap`."
  };
  if (!bootstrap.venture?.committed) {
    const required = ["SKILLSET.md","OPPORTUNITIES.md","RESEARCH.md","CATEGORIZATION.md","MARKET-TEST.md","COMMITMENT.md"];
    const firstOpen = required.find(f => {
      const p = join(ROOT, ".planning", "VENTURE", f);
      if (!existsSync(p)) return true;
      const c = readFileSync(p, "utf8");
      return /STATUS:\s*TODO/i.test(c) || /<!--\s*fill(\s*:[^-]*)?\s*-->/i.test(c);
    });
    const modelRow = {
      "SKILLSET.md":       { model: "Claude Sonnet 4.6", surface: "Claude Code CLI", mode: "plan" },
      "OPPORTUNITIES.md":  { model: "Claude Sonnet 4.6", surface: "Claude Code CLI", mode: "plan" },
      "RESEARCH.md":       { model: "Claude Opus 4.6",   surface: "Claude Code CLI", mode: "plan" },
      "CATEGORIZATION.md": { model: "Claude Sonnet 4.6", surface: "Cursor Ask",      mode: "ask"  },
      "MARKET-TEST.md":    { model: "Claude Sonnet 4.6", surface: "Claude Code CLI", mode: "plan" },
      "COMMITMENT.md":     { model: "Claude Opus 4.6",   surface: "Claude Code CLI", mode: "plan" }
    };
    if (firstOpen) return {
      ...modelRow[firstOpen],
      why: `Venture gate: fill ${firstOpen} next. See .planning/MODE-GUIDE.md.`
    };
    return { surface: "Terminal", mode: "n/a", model: "n/a",
      why: "All VENTURE files filled. Run `npm run commit`." };
  }
  return {
    surface: "Cursor Plan mode (or Claude CLI plan)",
    mode: "plan",
    model: "Cursor Auto (or Claude Sonnet 4.6)",
    why: `Phase ${bootstrap.currentPhase ?? 1} - run /plan-phase or continue /execute.`
  };
}

const nr = nextRecommended();
console.log(`
---------------------------------------------------------------
Next recommended
----------------
Surface : ${nr.surface}
Mode    : ${nr.mode}
Model   : ${nr.model}
Why     : ${nr.why}
---------------------------------------------------------------
`);

const failed = results.some(r => r.level === "FAIL");
process.exit(failed ? 1 : 0);
