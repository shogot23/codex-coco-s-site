# Gate Evidence

## Claude review

- Scope: 公開予定の読者向けコピーと一般化した1件の設計のみ。内部PlanGate、ユーザー絶対パス、作業履歴はreview promptに含めていない。
- Preflight: `glm-5.3`, exit 0, envelope `result/success`, `is_error:false`, `structured_output:{"ok":true}`。
  - `/private/tmp/claude-review/notice-the-conditions-2min-20261118-preflight/metadata.json`
  - `/private/tmp/claude-review/notice-the-conditions-2min-20261118-preflight/stdout.json`
- Plan/content architecture review: `glm-5.3`, effort high, exit 0, envelope `result/success`, `is_error:false`, structured `phase=arch`, `ok:true`, blocking 0. 2 advisory findings carried to later checks and resolved by the preview/data checks above. No final diff review was run because the required test gate failed.
  - `/private/tmp/claude-review/notice-the-conditions-2min-20261118-public-arch/metadata.json`
  - `/private/tmp/claude-review/notice-the-conditions-2min-20261118-public-arch/stdout.json`

## Verification

- Source job: `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261118-Coco修復ワーク-20261118/final/`.
- Delivery manifest: `/Users/shogo/Projects/coco-book-infographic-studio/jobs/20261118-Coco修復ワーク-20261118/delivery-manifest.json`.
- All 7 inputs matched the declared SHA-256 and matched byte-for-byte between `job/final` and delivery.
- Preview: local HTTP 200; HTML contained `<meta name="robots" content="noindex, nofollow">`. Desktop 1440x900 and mobile 390x844 were visibly checked. Published review and reverse work link loaded in the local preview.

## Test gate

Command: `npm run test:works`

- Result: exit 1; 35 tests total, 34 pass, 1 fail.
- Failing assertion: `all 32 current work Markdown files pass the narrow reader-copy guard` at `scripts/work-import.test.mjs:188-190`.
- Actual work Markdown count: 33; expected: 32 (`33 !== 32`).
- Stop action: only `src/content/works/notice-the-conditions-2min.md` restored to `published: false`; local preview stopped. No test or runner configuration was edited.
- Not run after failure: `npm run verify:frontend`, `npm run check:works-dist`, Claude diff review, CI/PR/merge/Pages.

## State

- Original worktree final porcelain status matches the initial 18 unrelated entries; no status drift.
- `inbox/work/history.json`: 37 entries, SHA-256 `09445faabeddfbe9959d7041ba134e1bba3e11e284f008b0747784c1774a3369`, matching the delivery manifest.
- Isolated worktree has only the PlanGate record, this one work Markdown, and this one image; package.json/lockfile are unchanged. `published:false` is confirmed.
- No commit, PR, merge, deployment, or public URL confirmation. Original worktree and delivery remain untouched. See `status.md` for the resume boundary.

## Continuation (2026-11-19)

- User explicitly requested that the site process continue to completion. The isolated branch was rebased onto latest `origin/main` `bf14198dcffc65d0ef3211109795b742002c88ce`; the original dirty worktree was not used.
- Latest main already expected 33 Markdown work files. The current worktree has 34 including this one item. Only the fixed test description and assertion changed from 33 to 34. The guard enumerates all `.md` files, independent of `published`.
- All 7 job/final and inbox deliverables were rechecked against the declared SHA-256 and byte-for-byte. `site-work.json` frontmatter values/body and the imported image were rechecked; the source `published:false` value was changed only in the site Markdown for this one work after preview approval. Imported image SHA remains `9befba995705f18be1bb9d7a006f3fb51ea03985ebb245f4d28dca2fdc36fc0c` (1080×1350).

### Claude continuation architecture review

- First sandbox attempt made no model dispatch because `CODEX_SANDBOX_NETWORK_DISABLED=1`; debug showed `getaddrinfo ENOTFOUND api.z.ai` after CLI retries. The public-only same-scope review was retried once outside the sandbox; no alternate model was used.
- Successful artifact: `/private/tmp/claude-review/notice-conditions-continuation-arch-20261119-070731/retry-1/` (`metadata.json`, `stdout.json`, `debug.log`, `stderr.txt`, `time.txt`, `exit-code.txt`). Requested/actual model `glm-5.3`, effort high, StructuredOutput success, exit 0, fallback/rate limit false, 2 schema-repair dispatches then one successful dispatch, `ok:true`, blocking 0, advisory 2.
- Review scope contained only the public copy and generalized one-item design; it did not receive internal PlanGate content, local paths, or work history. The copy wording advisory is retained for a future editorial revision because the production source is frozen. The test counts all Markdown entries; expected 34 and the work publication flag are included in the same eventual change set.

### Verification after continuation

- `npm run test:works`: 35/35 passed after the minimal count update, and 35/35 passed again with the target `published:true`.
- `npm run test:works-preview`: desktop Chromium and mobile Chrome, 80/80 passed. Target work/book round-trip passed in both projects. Screenshots: `/private/tmp/coco-site-notice-the-conditions-2min-20261118/test-results/works-notice-the-conditions-2min-chromium.png` and `/private/tmp/coco-site-notice-the-conditions-2min-20261118/test-results/works-notice-the-conditions-2min-mobile-chrome.png`.
- `npm run verify:frontend`: exit 0; lint, typecheck, build, E2E. Typecheck reported 65 files with 0 errors/warnings/hints. E2E reported 137 passed / 7 skipped.
- `npm run check:works-dist`: exit 0, `Draft exclusion verified across dist`.
- Dist output directory: `/private/tmp/coco-site-notice-the-conditions-2min-20261118/dist/`. Generated work page: `works/notice-the-conditions-2min/index.html`; list: `works/index.html`; related review: `reviews/haiboku-no-sports-gaku/index.html`.
- Dist HTML has the stable canonical work URL and target work in the list; work HTML links to the review and review HTML links back to the work. Work detail `og:image` and `twitter:image` both reference `/codex-coco-s-site/works/media/notice-the-conditions-2min/1080.webp`.
- HTML-referenced image bytes: `/private/tmp/coco-site-notice-the-conditions-2min-20261118/dist/works/media/notice-the-conditions-2min/480.webp` is 480×600, 113384 bytes, SHA-256 `4cf0596ce22ce400e662ba6c2cad839b3e643919bda9b8ca30e1c90ef12209ed`; `/private/tmp/coco-site-notice-the-conditions-2min-20261118/dist/works/media/notice-the-conditions-2min/1080.webp` is 1080×1350, 433254 bytes, SHA-256 `4d4d23517eb9318fe2327b263adb22b9d2d6f0fa77f4a953112a541a3d896364`.
- At the time this interim note was first recorded, the final diff review had not completed; the result is recorded below. There is still no commit, PR, CI, merge, Pages deployment, or external public URL proof. The old 2026-11-18 stop record above is historical; `status.md` contains the current state.

### Final diff review

- Artifact: `/private/tmp/claude-review/notice-conditions-continuation-diff-20261119-073015/run/` (`metadata.json`, `stdout.json`, `debug.log`, `stderr.txt`, `time.txt`, `exit-code.txt`). Review scope was public copy plus a generalized one-item publishing design and the single 33→34 assertion change; internal PlanGate text, local user paths, and work history were excluded.
- Result: requested/actual `glm-5.3`, effort high, StructuredOutput successful after schema-repair dispatches, exit 0, fallback/rate limit false, `phase=diff`, `ok:true`, blocking 0, advisory 2.
- Advisory 1: action-choice punctuation varies across sections, but the four choices are semantically consistent and the copy poses no reader-safety risk. It is retained because production copy is frozen.
- Advisory 2: the same book-connection paragraph appears in the article body and the page's dedicated book section. It was visible in the local desktop/mobile screenshots. Retain this production copy in the current scope; consider a future template/content revision.
- The reviewer found the one-count update and published-state timing in scope, no unrelated test/dependency/runner/CI changes, and no blocking copy or safety concern. The reviewer did not directly access repository files; it evaluated the supplied public copy/design and relied on reported verification outputs.
- No source/article/image/test changes were made after the reviewed public diff. The only later edits are internal PlanGate status/evidence records.
