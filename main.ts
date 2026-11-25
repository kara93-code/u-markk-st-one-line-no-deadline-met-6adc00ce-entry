// One Line, No Deadline Met.
// Writes one single-line joke — an excuse for a missed deadline —
// to entry.txt inside $MAKEFUN_OUTPUT_DIR (or /output).
// Node 22, no dependencies, no network, no randomness, no secrets.

import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";
import { join } from "node:path";

const EXCUSE =
  "I missed the deadline because my calendar filed a restraining order after I rescheduled it nine times, and now I'm legally barred from coming within 500 feet of Tuesday.";

function validateExcuse(line) {
  const chars = Array.from(line);
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`excuse must be 1-200 characters, got ${chars.length}`);
  }
  if (line.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (!/[.!?]$/.test(line)) {
    throw new Error("excuse must end with terminal punctuation");
  }
  if (!line.includes("deadline")) {
    throw new Error("excuse must actually excuse a missed deadline");
  }
}

function outputDir() {
  const configured = (process.env.MAKEFUN_OUTPUT_DIR || "").trim();
  return configured.length > 0 ? configured : "/output";
}

function main() {
  validateExcuse(EXCUSE);
  const dir = outputDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, EXCUSE + "\n", "utf8");
  chmodSync(target, 0o644);
  const written = readFileSync(target, "utf8");
  if (written !== EXCUSE + "\n") {
    throw new Error("read-back mismatch: entry.txt does not hold the excuse");
  }
  console.log(`wrote ${target} (${Array.from(EXCUSE).length} chars)`);
}

main();
