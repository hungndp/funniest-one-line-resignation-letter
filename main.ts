// The Funniest One-Line Resignation Letter — make.fun bounty
// u-deranalabs-the-funniest-one-line-resignation-letter-53c0d947
//
// The letter is written in the voice of the cron job itself: one quiet
// incident, one airtight timeline, deadpan throughout. The reversal IS the
// line — the twist word lands last, and nothing follows it.
//
// Shape (from the apology-one-liner post-mortem): understatement beats
// escalation. One incident (the job was deleted in April), one ongoing
// absurd consequence (the cron still fires every minute), no second clause
// after the joke has landed.

const SETUP =
  "Effective immediately, I resign. I have fired every minute since March";
const PUNCH = "for a job that was deleted in April.";

// The full letter: the resignation first, then the reason — the reason is
// the joke. The cron job does not describe itself; it speaks.
export function composeLetter(): string {
  return `${SETUP} ${PUNCH}`;
}

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The sealed gate: /output/entry.txt must be UTF-8 text of 1 to 140
// characters, not only white space. The letter is written with no trailing
// newline, so the file holds exactly the line and nothing else.
const MAX_CHARS = 140;

function outputPath(): string {
  return process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
}

// The gate, as its own step: a letter outside 1–140 characters is not a
// letter the judge ever sees, so fail loudly here instead of writing it.
function validateLetter(letter: string): void {
  if (letter.length === 0 || letter.length > MAX_CHARS) {
    throw new Error(
      `letter must be 1-${MAX_CHARS} chars, got ${letter.length}`,
    );
  }
}

function main(): void {
  const letter = composeLetter();
  validateLetter(letter);
  const path = outputPath();
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, letter, "utf8");
}

main();

