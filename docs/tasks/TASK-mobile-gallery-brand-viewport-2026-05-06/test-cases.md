# Test Cases

## Task

- task-id: TASK-mobile-gallery-brand-viewport-2026-05-06
- related plan: `docs/tasks/TASK-mobile-gallery-brand-viewport-2026-05-06/plan.md`

## Must Check

- [x] Gallery grid cards on mobile have reduced bottom whitespace under author / `景色をひらく`.
- [x] Gallery compact cards on mobile have reduced bottom whitespace under author / `景色をひらく`.
- [x] Gallery mobile hero CTA buttons stay compact while preserving 44px+ tap target.
- [x] `/gallery/` and `/gallery/archive/` keep their existing roles and labels.
- [x] Mobile nav stays usable at 360px and 390px with no horizontal overflow.
- [x] Reviews mobile hero contains a real visual cue and keeps Review as the primary CTA.
- [x] About/Profile mobile hero keeps Coco visible while showing copy/CTA sooner.
- [x] Profile decorative captions no longer introduce unnecessary heading levels.
- [x] scope 外の変更が入っていない。

## Command Checks

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Manual Checks

- [x] `/gallery/?view=grid` mobile visual/metric check
- [x] `/gallery/archive/` mobile visual/metric check
- [x] `/reviews/` mobile hero check
- [x] `/about/` mobile hero check
- [x] `/profile/` mobile hero and heading check

## Optional Checks

- [x] Targeted e2e project or local browser screenshots during iteration
- [x] Claude review gate after implementation

## Out Of Scope

- Archive hero redesign
- New image assets
- Content/schema/dependency changes
