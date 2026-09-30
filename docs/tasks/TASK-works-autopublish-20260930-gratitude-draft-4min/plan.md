# Plan: gratitude-draft-4min publication

## Thesis

- Visual thesis: let the supplied 4:5 watercolor image carry the quiet transition from an open book to a small act of gratitude; keep the established works page framing intact.
- Content plan: show the reader's difficulty finding words, the four-step draft, the explicit unvalidated-adaptation note, and reciprocal route to the exact related review.
- Interaction thesis: retain the existing works list/detail navigation and let readers open the related review; the work remains optional and permits sending, saving, resting, or stopping.

## Scope

- Add only `src/content/works/gratitude-draft-4min.md` and `src/assets/works/gratitude-draft-4min.png` through the repository importer.
- Set only this work's `published` field from false to true after PC/mobile unpublished preview review.
- Add this task's PBI, plan, cases, status and a concise `inbox/daily/2026-09-30.md` record.
- Save site-phase verification and Claude review artifacts under the current studio job's `site-phase/` directory.
- No UI, taxonomy, review, production deliverable, or social-post changes.

## Steps and gates

1. Check all seven package files, frozen spec, PNG checksum and dimensions, taxonomy IDs, collision state, related review title and public state, and the four-step consistency.
2. Run `npm run works:import -- <absolute site-work.json> --dry-run`; proceed only on success and `published:false`.
3. Import once, confirm the generated markdown is unpublished and the copied image is byte-identical, then start `npm run works:preview` on its documented local host.
4. Inspect list, detail, image, steps, sources, book/review links at desktop and mobile viewports. Stop if any mismatch appears.
5. Set only this entry to `published: true`; run `npm run test:works`, `npm run verify:frontend`, and `npm run check:works-dist`.
6. Run all required Claude GLM-5.3 review phases with stored stdout/stderr/time/debug/exit metadata; repair blocking issues and repeat required phases.
7. Review the complete diff, commit and push the branch, open the PR, verify CI and mergeability, squash-merge, then verify the Pages deployment and cache-bypassed public routes and referenced image bytes.

## Approval

Plan accepted by the task owner through the explicit continuing publication authorization supplied with this task. Code changes may proceed once the source checks and dry-run pass.
