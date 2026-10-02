# Test cases: 3-minute one-word feeling note publication

## Task

- task-id: TASK-works-autopublish-20261002-feeling-one-word-note-3min
- related plan: plan.md

## Must Check

- [x] Package contains exactly seven expected files; each SHA matches the provided manifest and the image is a 1080×1350 PNG.
- [x] Site-work JSON remains byte-identical and published:false; slug/title/review ID/image filename match the frozen spec.
- [x] Taxonomy IDs are known/unique; related review exists, is public, and its title exactly matches bookTitle.
- [x] Dry-run succeeds, reports the intended content/image paths and published:false; both targets are collision-free.
- [x] Normal import creates only the intended markdown and PNG; markdown remains published:false, copied PNG bytes match.
- [x] Desktop and mobile preview show list, detail, image, three steps, sources, unvalidated-adaptation wording, safe exit choices, and related-review/book link.
- [x] After preview, only target published changes to true; no package or unrelated file changes.
- [x] npm run test:works, npm run verify:frontend, and npm run check:works-dist pass (28 works tests; verify:frontend 99 passed / 7 skipped).
- [x] Required Claude arch/diff reviews used actual model glm-5.3, completed successfully, and had zero blocking issues (advisories resolved).
- [ ] PR contains only declared source and task records; all CI passes and PR is mergeable before squash merge.
- [ ] GitHub Pages deployment succeeds; cache-bypassed list/detail/review routes and HTML-referenced media return HTTP 200.
- [x] All seven inbox delivery file SHAs remain unchanged; no X/Instagram post is made.

## Command Checks

- [x] npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-02_2140_komyuryoku-feeling-word/site-work.json --dry-run
- [x] npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-02_2140_komyuryoku-feeling-word/site-work.json
- [x] npm run test:works
- [x] npm run verify:frontend
- [x] npm run check:works-dist

## Manual Checks

- [x] Desktop viewport: list/detail, correct work image, body, source list, review navigation and unvalidated statement.
- [x] Mobile viewport: same content fits and remains readable; browser viewport was explicitly resized to 390×844.

## Optional Checks

- [x] Confirm draft noindex behavior in preview and regular build output.
- [x] Confirm HTML-referenced optimized production WebP files and hashes in build output.

## Out Of Scope

- X / Instagram publication, edits to the inbox package or studio history, and publication of existing packages.
