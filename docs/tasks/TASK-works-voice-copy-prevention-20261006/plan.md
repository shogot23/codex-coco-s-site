# Plan: reader-facing voice regression guard

## Approval
Approved by the user's direct request: “再発防止をしてください”, with the specific scope to document the reader-voice/source boundary and add a narrow shared guard plus regression tests. This is `publish/dev-critical`; Claude review is required before commit, PR, and merge. Root separately completed the automation prompt change; this site plan does not infer or record automation configuration details.

## Change declaration
1. `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, `docs/works-publishing.md`: document author-perspective copy, use of the user's existing review only as internal support, no publishing AI audit status or unverified personal reading/experience, omission/stop when unsupported, and preservation of adaptation/research boundaries.
2. `scripts/` and `scripts/work-import.test.mjs`: a standalone shared module with one narrow known-relapse phrase list, shared by package import (before dry-run return) and the existing Markdown distribution/build check. Explicitly inspect `title`, `description`, `readerWorry`, `imageAlt`, `bookTitle`, `bookConnection`, `completion`, `question`, `evidenceNote`, `safetyNote`, `sources[].label`, and `body`; the raw Markdown build check must include every frontmatter value and body text before published/draft filtering. Do not blanket-ban “review”, “unread”, “checked”, systematic-review language, evidence limitations, source labels, or task instructions.
3. `docs/tasks/TASK-works-voice-copy-prevention-20261006/`: this PlanGate and completion status; one daily record as required by repository practice.

## Behavior and boundaries
The check catches known formulations that attribute publication-review lookup/audit to the reader or describe the user's own review as external (for example, “公開レビューから受け取った”, “レビュー筆者”, “原著全文は未読”). It must not attempt semantic verification. Human/Claude review uses four checks: (1) author/user perspective, (2) no AI audit/third-person review framing in bookConnection or body, (3) book and personal-experience claims supported without inferring that the user read/experienced something, and (4) retain quotation/adaptation distinction and research limitations. If factual support is uncertain, omit the claim or stop.

## Design thesis
- Visual thesis: no visual/UI changes; preview desktop/mobile only to confirm existing reader-facing work copy remains unchanged.
- Content plan: policy describes voice/source boundary; shared detector blocks only known relapse formulations; tests protect explicit allowed counterexamples.
- Interaction thesis: import fails before any write for invalid package copy, while the existing build check rejects a direct Markdown edit before distribution checks.

## PlanGate authorization
This scope is directly authorized by the user. Proceed to implementation after the Claude architecture review of this plan and implementation design returns valid/ok with no blocking issues.
