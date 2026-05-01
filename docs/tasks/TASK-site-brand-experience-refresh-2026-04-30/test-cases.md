# Test Cases: Site Brand Experience Refresh

## Visual Checks

- [x] `/` mobile 390x844 で hero 内に CTA とココちゃん画像の上部が見える
- [x] `/` desktop 1440 幅で hero の構図が大きく変わっていない
- [x] `/gallery/` mobile / desktop で読者向けコピーとして自然に読める
- [x] `/gallery/` で「章ごとに眺める場所」としての役割が維持されている
- [x] `/reviews/` mobile / desktop で一覧が単調な長いリストに見えすぎない
- [x] 画像読込前の placeholder が灰色の空白に見えすぎない

## Commands

- [x] `npm run lint`
- [x] `npm run typecheck`
- [x] `npm run build`
- [x] `npm run test:e2e`
- [x] `npm run verify:frontend`

## Review Gate

- [x] Claude review gate が `ok: true`

## Results

- `npm run verify:frontend`: passed, 29 passed / 1 skipped
- Claude review gate:
  - arch review: `ok: true`
  - Home / Gallery diff review: `ok: true`
  - Reviews / Tests diff review: `ok: true`
  - cross-check: `ok: true`
- Visual evidence:
  - `/` 390x844 DOM check: CTA visible in first viewport, Coco portrait top visible, no horizontal overflow / portrait overlap.
  - `/`, `/gallery/`, `/reviews/` were checked at desktop and mobile widths during Playwright visual review.
