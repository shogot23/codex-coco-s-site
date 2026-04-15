# Plan: Gallery Note Rollout Phase A

## Source of Truth

- Primary plan: `plans/luminous-singing-star.md`
- This task record narrows execution to Phase A only.

## Classification

- `publish/dev-critical`

## Implementation Intent

- `visual thesis`: Hero は作品紹介、What Lingers は余韻として二層化する
- `content plan`: 公開 63ページへ `note` を追加し、Phase B 5ページは保留する
- `interaction thesis`: CTA や導線は変えず、既存テンプレートで `note` が自然に立ち上がる状態にする

## Target Files

- `src/content/gallery/*.md` のうち公開済み Type D 63ファイルのみ

## Hold Files

- `business-143c24`
- `novel-9868be`
- `novel-78d4ec`
- `novel-70beea`
- `novel-dd98a4`

## Hold Reason

- Phase B 実装に必要な具体的なもしも URL 文字列が、この実行時点では未受領のため

## Non-Changes

- `src/pages/gallery/[slug].astro`
- `src/content/config.ts`
- `src/utils/gallery.ts`
- `src/pages/gallery/index.astro`
- 未公開 gallery エントリ

## Verify

1. `npm run lint`
2. `npm run typecheck`
3. `npm run build`
4. `npm run test:e2e` if needed to clear frontend risk
5. review gates: `claude-review-gate` and `codex-review`
