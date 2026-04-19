#!/usr/bin/env node
// `npm run next` - active next-step launcher.
// Reads .planning/.bootstrap.json and COMMERCIAL/VENTURE state, then spawns
// the correct surface (Claude Code CLI) with the correct slash-command and model.
// Falls back to printing a copy-paste-ready command if spawn fails.

import { existsSync, readFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const IS_WIN = process.platform === "win32";

function readJson(path) {
  if (!existsSync(path)) return null;
  try { return JSON.parse(readFileSync(path, "utf8")); }
  catch { return null; }
}

function fileNeedsWork(path) {
  if (!existsSync(path)) return true;
  const c = readFileSync(path, "utf8");
  if (/STATUS:\s*TODO/i.test(c)) return true;
  if (/<!--\s*fill(\s*:[^-]*)?\s*-->/i.test(c)) return true;
  return false;
}

function firstUnfinished(relPaths) {
  for (const rel of relPaths) {
    if (fileNeedsWork(join(ROOT, rel))) return rel;
  }
  return null;
}

function claudeAvailable() {
  const r = spawnSync("claude", ["--version"], { stdio: "pipe", shell: IS_WIN });
  return r.status === 0;
}

function openCursor(target) {
  const r = spawnSync("cursor", [target], { stdio: "ignore", shell: IS_WIN, detached: true });
  return r.error == null && r.status !== 127;
}

function spawnClaude(mode, model, slash, message) {
  // Build a safe arg list. Model and mode flags are Claude Code CLI conventions.
  // The slash-command plus message are piped as the opening user prompt.
  const args = [];
  if (mode) args.push("--permission-mode", mode === "plan" ? "plan" : "default");
  if (model) args.push("--model", model);
  const opening = slash ? `${slash}\n\n${message ?? ""}`.trim() : (message ?? "");
  if (opening) args.push(opening);
  const r = spawnSync("claude", args, { cwd: ROOT, stdio: "inherit", shell: IS_WIN });
  return r.error == null && r.status !== 127;
}

function printCopyPaste(title, steps) {
  console.log(`
---------------------------------------------------------------
${title}
---------------------------------------------------------------`);
  for (const s of steps) console.log(s);
  console.log(`---------------------------------------------------------------
`);
}

function decide() {
  const bootstrap = readJson(join(ROOT, ".planning", ".bootstrap.json"));

  if (!bootstrap || !bootstrap.bootstrapped) {
    return {
      surface: "Terminal",
      why: "Bootstrap marker missing or false.",
      action: () => {
        printCopyPaste("Next step: run the bootstrap", [
          "  npm run bootstrap",
          "",
          "Then re-run `npm run next`."
        ]);
        return true;
      }
    };
  }

  const ventureOrder = [
    { file: "SKILLSET.md",       slash: "/venture:skillset",    model: "claude-sonnet-4-5", mode: "plan" },
    { file: "OPPORTUNITIES.md",  slash: "/venture:chase-pain",  model: "claude-sonnet-4-5", mode: "plan" },
    { file: "RESEARCH.md",       slash: "/venture:research",    model: "claude-opus-4-1",   mode: "plan" },
    { file: "CATEGORIZATION.md", slash: "/venture:categorize",  model: "claude-sonnet-4-5", mode: "plan" },
    { file: "MARKET-TEST.md",    slash: "/venture:market-test", model: "claude-sonnet-4-5", mode: "plan" },
    { file: "COMMITMENT.md",     slash: "/venture:commit",      model: "claude-opus-4-1",   mode: "plan" }
  ];

  if (!bootstrap.venture?.committed) {
    const next = ventureOrder.find(v => fileNeedsWork(join(ROOT, ".planning", "VENTURE", v.file)));
    if (next) {
      return {
        surface: "Claude Code CLI",
        why: `Venture gate: ${next.file} next.`,
        action: () => {
          if (claudeAvailable()) {
            return spawnClaude(next.mode, next.model, next.slash,
              `Read .planning/.bootstrap.json and .planning/VENTURE/${next.file}. Coach me through it per rule 006-venture-workflow.`);
          }
          printCopyPaste(`Next step: ${next.file}`, [
            "  (claude CLI not found in PATH)",
            "",
            "  In Cursor Ask mode, paste:",
            `  Read .planning/VENTURE/${next.file} and coach me through it per rule 006-venture-workflow.`,
            "",
            `  Or install claude (https://claude.ai) and run: claude ${next.slash}`
          ]);
          return true;
        }
      };
    }
    return {
      surface: "Terminal",
      why: "All VENTURE files look filled. Lock in the decision.",
      action: () => {
        printCopyPaste("Next step: commit the venture", [
          "  npm run commit",
          "",
          "This validates the six files and flips the venture gate."
        ]);
        return true;
      }
    };
  }

  // Post-commit: check Commercial gate (Wave 2 artifacts; no-op if absent).
  const commercialLanding = join(ROOT, ".planning", "COMMERCIAL", "LANDING.md");
  if (existsSync(join(ROOT, ".planning", "COMMERCIAL")) && fileNeedsWork(commercialLanding)) {
    return {
      surface: "Claude Code CLI",
      why: "Commercial gate: LANDING.md next (sales before product).",
      action: () => {
        if (claudeAvailable()) {
          return spawnClaude("plan", "claude-sonnet-4-5", "/commercial:landing",
            "Read .planning/COMMERCIAL/LANDING.md and coach me through it.");
        }
        printCopyPaste("Next step: LANDING.md", [
          "  In Cursor Ask mode, paste:",
          "  Read .planning/COMMERCIAL/LANDING.md and coach me through headline / sub / pain / offer / CTA."
        ]);
        return true;
      }
    };
  }

  // Phase workflow
  const currentPhase = bootstrap.currentPhase ?? 1;
  const phaseDir = join(ROOT, ".planning", `phase-${currentPhase}`);
  const phasePlan = join(phaseDir, "PLAN.md");

  if (!existsSync(phasePlan)) {
    return {
      surface: "Claude Code CLI",
      why: `No plan yet for phase ${currentPhase}. Run /plan-phase.`,
      action: () => {
        if (claudeAvailable()) {
          return spawnClaude("plan", "claude-sonnet-4-5", "/plan-phase",
            "Plan the next unstarted phase. Produce the PLAN.md skeleton; do not touch code.");
        }
        printCopyPaste(`Next step: plan phase ${currentPhase}`, [
          "  In Claude Code CLI, plan mode, run: /plan-phase",
          "  Or ask Cursor Plan mode to outline .planning/phase-" + currentPhase + "/PLAN.md"
        ]);
        return true;
      }
    };
  }

  return {
    surface: "Claude Code CLI",
    why: `Phase ${currentPhase} plan exists. Continue /execute.`,
    action: () => {
      if (claudeAvailable()) {
        return spawnClaude("default", "claude-sonnet-4-5", "/execute",
          `Continue executing tasks from .planning/phase-${currentPhase}/PLAN.md per rule 040 (task ownership) and the /execute protocol.`);
      }
      printCopyPaste(`Next step: execute phase ${currentPhase}`, [
        "  In Claude Code CLI, default mode, run: /execute",
        "  Or open Cursor Agent and ask it to continue .planning/phase-" + currentPhase + "/PLAN.md tasks."
      ]);
      return true;
    }
  };
}

function main() {
  const decision = decide();
  console.log(`==> next: ${decision.surface} - ${decision.why}`);
  const ok = decision.action();
  process.exit(ok ? 0 : 1);
}

main();
