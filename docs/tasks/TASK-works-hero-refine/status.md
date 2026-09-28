# Status

## Task

- task-id: TASK-works-hero-refine
- state: done
- updated: 2026-09-28

## Summary

- 実施内容: 既存hero画像の左側へdesktopのcopy/CTAを配置。920px以下はcopy→CTA→画像へstackし、finderと一覧は既存720px breakpointを維持。説明を一文にし、finderへのCTAと0件/no-JS時の表示条件を追加。
- 完了した範囲: desktop・820px・mobileはSolがデザイン承認。追加で880pxを目視し、Heroをstackする920px breakpointを決めた。DOM順をcopy→画像へ揃え、CTA遷移、keyboard Tab到達と3px focus ring、選択値、OGP/X画像不変を確認。mobileはfinder上端64px／header下端62px、desktopは64.5px／60pxで見出しが隠れないことを実測。

## Verification Result

- `npm run typecheck`: passed (0 errors, warnings, hints)
- `npm run build`: passed
- 追加確認: `npm run verify:frontend` passed (lint/typecheck/build/E2E; 91 passed, 7 skipped)。`npm run test:works-preview` passed (40 tests)。PlanGate plan reviewは`ok: true`, blockingなし。Claude architectureと最終diff reviewは`ok: true`、blockingなし。初回diff reviewの読み上げ順指摘は修正済み。

## Release Verification

- PR #182をsquash merge。merge SHA: `410e20f2f8ed5de63f986212932fc8057bc88cb9`。
- GitHub Pages deploy run `36365213694` 成功。cache-bypass付き公開URLで見出し、CTA、既存hero画像を確認。desktop/mobileの公開画面でCTAから`#work-finder`へ移動し、focusがfinderへ移ることを確認。
- merge SHA `410e20f` のmain CI run `36365213803` 成功。
- desktop: finder上端64.47px、見出し上端153.67px。mobile: finder上端63.98px、見出し上端133.19px。いずれもsticky header下端は隠れない。
- hero画像は200/image-webp、X/OGP画像は従来URLで200/image/jpeg。公開HTMLの`twitter:image`と`og:image`は`works-social-20260926.jpg`のまま。
- 公開確認スクリーンショット: `/tmp/coco-works-hero/desktop-public.png`, `/tmp/coco-works-hero/mobile-public.png`。

## Scope Check

- scope 内で収まっているか: はい。Astro page、works.css、works e2e、TASK-works-hero-refine記録、dailyのみ。
- 見送った項目: 新規画像生成、OGP/X画像・meta変更、finderロジック変更、公開境界変更。

## Next Action

- 残件: なし。
- 次に見る人へのメモ: 元mainのdirty/untracked変更は隔離worktreeで保護し、書き換えていない。

## Daily Record

- 記録先: `inbox/daily/2026-09-28.md`
- 記録内容: `/works/` Hero改善、PlanGate、frontend verify、画面レビュー結果。
