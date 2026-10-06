# PBI input: reader-facing voice regression guard

## Authorization and problem
The user's direct request is to prevent AI research/audit status and third-person framing of the user's own public reviews from reappearing in reader-facing work copy. It explicitly asks for minimal rules, a shared narrow check on import and existing Markdown/build paths, meaningful regression tests, and preservation of legitimate research/source/work-step language.

## Scope
- Add the smallest necessary policy text to `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`, and `docs/works-publishing.md`.
- Add one shared, deliberately narrow reader-copy detector and apply it to work package imports (dry-run and normal) and every existing `src/content/works/*.md` file before published/draft distribution checks.
- Add regression coverage for rejected relapse phrases, direct Markdown/build rejection, and allowed research/source/instruction/adaptation language.
- Audit the current 19 work pages and verify public copy is unchanged in desktop/mobile preview.

## Out of scope
No existing work copy, book facts, research interpretation, taxonomy/schema, renderer, image, slug, publication status, automation setting, or prior production evidence changes. No claim that phrase matching can establish semantic truth or user experience.
