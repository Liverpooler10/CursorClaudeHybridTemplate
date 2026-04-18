#!/usr/bin/env node
// Spin up a git worktree for parallel experiments without polluting main.
// Usage: npm run worktree <name> [-- --from <base-ref>]

import { existsSync, mkdirSync, copyFileSync } from "node:fs";
import { join, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === "--help" || args[0] === "-h") {
  console.log(`
npm run worktree <name> [-- --from <base-ref>]

Creates worktrees/<name> from base-ref (default: HEAD), copies .env.local if it
exists, and prints instructions to open the new window.
`);
  process.exit(0);
}

const name = args[0];
let base = "HEAD";
const fromIdx = args.indexOf("--from");
if (fromIdx !== -1) base = args[fromIdx + 1] || "HEAD";

const worktreesDir = join(ROOT, "worktrees");
if (!existsSync(worktreesDir)) mkdirSync(worktreesDir, { recursive: true });

const target = join(worktreesDir, name);
if (existsSync(target)) {
  console.error(`xx  worktree exists: ${target}`);
  process.exit(1);
}

const branch = `worktree/${name}`;
const r = spawnSync("git", ["worktree", "add", "-b", branch, target, base], {
  cwd: ROOT, stdio: "inherit", shell: process.platform === "win32"
});
if (r.status !== 0) process.exit(r.status ?? 1);

const envLocal = join(ROOT, ".env.local");
if (existsSync(envLocal)) {
  try { copyFileSync(envLocal, join(target, ".env.local")); }
  catch (e) { console.warn(`!!  could not copy .env.local: ${e.message}`); }
}

console.log(`
ok  worktree ready: ${target}  (branch ${branch} from ${base})

Next recommended
----------------
Surface : open a new Cursor window at the worktree path
Mode    : plan (Cursor Plan mode)
Model   : Cursor Auto or Claude Sonnet 4.6
Why     : isolated experiments do not pollute main; use 'auto' mode here if desired.
`);
