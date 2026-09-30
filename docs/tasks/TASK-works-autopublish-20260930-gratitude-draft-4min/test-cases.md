# Test cases: gratitude-draft-4min publication

1. Package has exactly seven expected files; all are readable and the expected image hash and 1080×1350 PNG dimensions match.
2. Frozen spec and `site-work.json` agree on slug, book title, review ID, filename, duration and four numbered steps; package says `published:false`.
3. Taxonomy IDs are known and unique; related review exists, is published, and its title exactly matches the package book title; each source URL matches its stated label and use.
4. Dry-run resolves the expected content/image destinations and reports `published:false`; neither destination already exists.
5. Normal import creates only the target Markdown and image; Markdown is still unpublished and image bytes match the inbox PNG.
6. Desktop and mobile preview show the works list and detail, correct image, all steps and sources, unvalidated adaptation note, and working related-review/book navigation.
7. Published-state edit changes only the target `published` value; works tests, frontend verification and distribution check pass.
8. Claude review phases each finish successfully with actual model `glm-5.3`, `ok:true`, and no blocking findings.
9. PR contains only the declared target content/image plus task/evidence/daily records; CI passes and PR is mergeable before squash merge.
10. GitHub Pages deployment succeeds; cache-bypassed list/detail/review routes and HTML-referenced optimized images return HTTP 200 and show the new content.
