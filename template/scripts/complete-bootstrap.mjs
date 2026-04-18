#!/usr/bin/env node
// Finishes bootstrap inside an already-cloned template directory.
// Run after the user clones the repo manually (no npx). Sets bootstrapped=true.

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const BOOTSTRAP = join(ROOT, ".planning", ".bootstrap.json");

if (!existsSync(BOOTSTRAP)) {
  console.error("xx  .planning/.bootstrap.json missing. Is this a project cloned from the template?");
  process.exit(1);
}

const data = JSON.parse(readFileSync(BOOTSTRAP, "utf8"));
if (data.bootstrapped) {
  console.log("ok  already bootstrapped. Nothing to do.");
  process.exit(0);
}

data.bootstrapped = true;
data.bootstrappedAt = new Date().toISOString();
writeFileSync(BOOTSTRAP, JSON.stringify(data, null, 2) + "\n", "utf8");
console.log("ok  bootstrapped = true");

console.log(`
---------------------------------------------------------------
NEXT RECOMMENDED ACTION
---------------------------------------------------------------
Surface : Claude Code CLI (plan mode) OR Cursor Ask mode
Model   : Claude Sonnet 4.6 (default)
Action  : run '/venture:skillset' (Claude) or open .planning/VENTURE/SKILLSET.md.
Why     : Project is in the Company-of-One discovery gate. Code is locked
          until 'npm run commit' passes.
---------------------------------------------------------------
`);
