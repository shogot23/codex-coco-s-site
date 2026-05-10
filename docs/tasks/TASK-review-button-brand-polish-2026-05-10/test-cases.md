# Test Cases

## Task

- task-id: TASK-review-button-brand-polish-2026-05-10
- related plan: `plan.md`

## Must Check

- [ ] Reviews mobile hero CTA is compact and visually aligned with Gallery CTA sizing.
- [ ] About / Profile mobile hero CTA no longer expands to a tall pill.
- [ ] Scope outside the planned files is unchanged.
- [ ] Existing review-led navigation and Gallery semantics remain intact.

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] `/reviews/` mobile and desktop first view.
- [ ] `/gallery/` mobile and desktop first view.
- [ ] `/about/` mobile and desktop first view.
- [ ] `/profile/` mobile and desktop first view.
- [ ] No horizontal page overflow.

## Optional Checks

- [ ] Browser screenshot / DOM measurement for CTA height.
- [ ] `claude-review-gate` before commit / PR.

## Out Of Scope

- Copy rewrite beyond correcting concrete display issues.
- Gallery browse behavior changes.
- Merge.
