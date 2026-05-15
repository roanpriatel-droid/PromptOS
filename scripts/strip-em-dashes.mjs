// Strip em-dashes from review-generator template strings.
// User-facing rule: zero em-dashes in any review body / title.
// Implementation: replace em-dashes inside backtick template strings with
// reasonable punctuation. Em-dashes inside line comments are fine.

import fs from 'node:fs';

const path = 'C:/Users/roanp/Downloads/promptos_storefront/scripts/generate-reviews.mjs';
let s = fs.readFileSync(path, 'utf8');

const before = (s.match(/—/g) || []).length;

// 1. Targeted, context-sensitive replacements.
const pairs = [
  ['replaced about half of them — and the new versions are tighter.',
   'replaced about half of them, and the new versions are tighter.'],
  ['Not exaggerating — I ran',
   'Not exaggerating: I ran'],
  ['The structure of every prompt is the same — use case, body, customize, example, pro tip — and that consistency',
   'The structure of every prompt is the same: use case, body, customize, example, pro tip. That consistency'],
  ['The other half — including ${accent} — were worth the buy.',
   'The other half, including ${accent}, were worth the buy.'],
  ['Wish there were a Notion mirror of the pack — copying out of .docx',
   'Wish there were a Notion mirror of the pack. Copying out of .docx'],
  ['The other sections are uneven — some feel like 80% drafts.',
   'The other sections are uneven; some feel like 80% drafts.'],
  ["I'd love more case studies — the playbook is heavy on frameworks",
   "I'd love more case studies. The playbook is heavy on frameworks"],
  ['The pricing chapter could be a little more aggressive — I think readers',
   'The pricing chapter could be a little more aggressive: I think readers'],
  ['Wish there were video walkthroughs to go with the PDFs — the templates are detailed enough',
   'Wish there were video walkthroughs to go with the PDFs. The templates are detailed enough'],
  ["Some chapters felt aimed at people further along than me — I'm at zero, and a few sections assumed",
   "Some chapters felt aimed at people further along than me. I'm at zero, and a few sections assumed"],
  ['wanted more "here\'s the exact email I sent to land my first client" — there\'s some of that',
   'wanted more "here\'s the exact email I sent to land my first client". There\'s some of that'],
  ["The bundle math is silly — you can't buy them all separately",
   "The bundle math is silly. You can't buy them all separately"],
  ['${accent} is the move. Especially because the packs and the playbooks pair so well — the daily-driver',
   '${accent} is the move. Especially because the packs and the playbooks pair so well: the daily-driver'],
  ["Wouldn't buy the full thing again — I'd cherry-pick",
   "Wouldn't buy the full thing again. I'd cherry-pick"],
  ["Useful — at a discount it's a five",
   "Useful. At a discount it's a five"],
];
let applied = 0;
for (const [from, to] of pairs) {
  if (s.includes(from)) {
    s = s.split(from).join(to);
    applied++;
  }
}

// 2. Sweep any leftover em-dashes inside backtick template strings.
// (Line comments will keep their dashes — that's fine; users don't see code.)
s = s.replace(/`([^`]*)—([^`]*)`/g, (m, a, b) => '`' + a + ', ' + b + '`');
// re-run to catch multiple dashes in one template
let prev;
do { prev = s; s = s.replace(/`([^`]*)—([^`]*)`/g, (m, a, b) => '`' + a + ', ' + b + '`'); } while (prev !== s);

// 3. Same sweep for single-quoted template arrays (TITLE_*).
s = s.replace(/(['"])([^'"\n]*)—([^'"\n]*)\1/g, (m, q, a, b) => q + a + ', ' + b + q);
do { prev = s; s = s.replace(/(['"])([^'"\n]*)—([^'"\n]*)\1/g, (m, q, a, b) => q + a + ', ' + b + q); } while (prev !== s);

fs.writeFileSync(path, s, 'utf8');
const after = (s.match(/—/g) || []).length;
console.log(`em-dashes: ${before} → ${after} (targeted: ${applied})`);
