# Status

## Task

- task-id: TASK-works-home-intro
- state: implementation complete; frontend verified; Claude review passed; release in progress
- updated: 2026-09-28

## Summary

- Hero copy changed to explain that the short works turn questions from books into actions readers can try on paper or in a note.
- Added a full-width intro composition with the 1536×1024 image, CTA to the mood finder, and a cardless three-step guide. Mobile receives the 768×512, 120KB variant; desktop uses the responsive `srcset`/`sizes` candidates, including the 401KB original for higher density.
- Shortened the finder introduction while keeping its non-diagnostic note and the complete list behavior.
- Preserved the existing OGP/X social image URL and dimensions.

## Verification

- Sol approved the PlanGate and the desktop/mobile screenshots.
- Viewport screenshots: `output/playwright/works-home-intro-desktop-viewport.png`, `output/playwright/works-home-intro-mobile-viewport.png` (local review artifacts; excluded from PR).
- `npm run verify:frontend`: passed after responsive image changes; lint, typecheck (0 errors, warnings, hints), build, and E2E (91 passed / 7 skipped).
- Focused works E2E: 40 passed across Chromium and mobile-chrome, including responsive image source checks and social/intro separation.
- Claude architecture and diff reviews completed with `ok: true`, no blocking issues. The final review accepted one advisory that desktop candidate assertion allows either srcset candidate because selection depends on rendered size and DPR.
- Public release verification remains pending.

## Scope Check

- Changed page, stylesheet, works E2E assertions, PlanGate, daily record, and both received introduction image variants.
- Existing X/OGP image and metadata, finder behavior, and `WORKS_PREVIEW` publication boundary remain unchanged.
- The original main worktree's pre-existing dirty and untracked files remain isolated from this branch.

## Review Notes

- The former hero WebP no longer has a runtime code reference, but its public URL is retained to avoid breaking cached links or external references.
- The 401KB original is retained for high-density rendering; the 120KB 768px variant is used on viewports at or below 720px.
- Full-bleed overflow is clipped only on the works home `<main>`. The 18px top offset cancels `Layout.astro`'s matching main padding and is documented next to the rule.
- Sol re-approved mobile spacing after the responsive-image follow-up: at 390px, text and image begin 16px from the edge, the selected image is 768px wide, and document scroll width is 390px.
