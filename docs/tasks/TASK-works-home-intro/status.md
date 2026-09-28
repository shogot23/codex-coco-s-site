# Status

## Task

- task-id: TASK-works-home-intro
- state: released; frontend verified; Claude review passed
- updated: 2026-09-28

## Summary

- Hero copy changed to explain that the short works turn questions from books into actions readers can try on paper or in a note.
- Added a full-width intro composition with the 1536×1024 image, CTA to the mood finder, and a cardless three-step guide. Mobile receives the 768×512, 120KB variant; desktop uses the responsive `srcset`/`sizes` candidates, including the 401KB original for higher density.
- Shortened the finder introduction while keeping its non-diagnostic note and the complete list behavior.
- Preserved the existing OGP/X social image URL and dimensions.

## Verification

- Sol approved the PlanGate and the desktop/mobile screenshots.
- Sol approved desktop/mobile local screenshots and the published desktop/mobile initial viewports.
- `npm run verify:frontend`: passed after responsive image changes; lint, typecheck (0 errors, warnings, hints), build, and E2E (91 passed / 7 skipped).
- Focused works E2E: 40 passed across Chromium and mobile-chrome, including responsive image source checks and social/intro separation.
- Claude architecture and diff reviews completed with `ok: true`, no blocking issues. The final review accepted one advisory that desktop candidate assertion allows either srcset candidate because selection depends on rendered size and DPR.
- PR [#184](https://github.com/shogot23/codex-coco-s-site/pull/184) merged as `5b61ff7d`; PR checks success (frontend-verify, Cloudflare Workers Build, Netlify deploy preview).
- GitHub Pages deploy run [36386038361](https://github.com/shogot23/codex-coco-s-site/actions/runs/36386038361) and main CI run [36386038358](https://github.com/shogot23/codex-coco-s-site/actions/runs/36386038358) success.
- Public desktop/mobile initial-view screenshots were reviewed by Sol; the generated QA files were temporary and excluded from the repository.
- Cache-bypass public route verified: `https://shogot23.github.io/codex-coco-s-site/works/?codex-check=20260928-184`. SEO description is updated; OGP/X metadata still points to `works-social-20260926.jpg` at 1200×630. New JPEGs and preserved old hero WebP all returned HTTP 200 with their expected content types. CTA reached `#work-finder` and moved focus; desktop/mobile had no horizontal overflow.

## Scope Check

- Changed page, stylesheet, works E2E assertions, PlanGate, daily record, and both received introduction image variants.
- Existing X/OGP image and metadata, finder behavior, and `WORKS_PREVIEW` publication boundary remain unchanged.
- The original main worktree's pre-existing dirty and untracked files remain isolated from this branch.

## Review Notes

- The former hero WebP no longer has a runtime code reference, but its public URL is retained to avoid breaking cached links or external references.
- The 401KB original is retained for high-density rendering; the 120KB 768px variant is used on viewports at or below 720px.
- Full-bleed overflow is clipped only on the works home `<main>`. The 18px top offset cancels `Layout.astro`'s matching main padding and is documented next to the rule.
- Sol re-approved mobile spacing after the responsive-image follow-up: at 390px, text and image begin 16px from the edge, the selected image is 768px wide, and document scroll width is 390px.
