# Status

## Task

- task-id: `TASK-reviews-readability`
- state: done
- updated: 2026-08-11

## Summary

- 実施内容: Reviewsを「短いHero → 作品固有Featured → 検索・短いテーマ → 本棚 → Gallery」の順へ再構成し、PCでクライアント生成カードのスタイルが外れる問題と、390px幅でページが横へ約208px膨らむ問題を修正した。
- 完了した範囲: PlanGate、ブランド監査、`reviews.astro`と`ReviewExplorer.astro`の実装、専用E2E、既存site smoke更新、desktop / mobile / JavaScript無効時の実画面確認、full frontend verify、Claude grouped diff reviewと最終cross-check。

## Verification Result

- `npm run typecheck`: pass（0 errors / 0 warnings / 0 hints）
- `npm run build`: pass（130ページ、内部リンク・asset検査、integrity、performance budgetを通過）
- `npm run verify:frontend`: pass（53 passed / 7 intentional skips / 0 failures）
- 追加確認: 専用Reviews E2Eは6 passed / 4 expected skips。既存site smokeは31 passed / 3 expected skips。`git diff --check`もpass。
- 実画面: PC 1440x1000で本棚開始1.385 viewport、390x844で1.91 viewport。390px環境のdocument/body幅は390px、一覧本文幅は270px、CTAは44px、検索controlsは48px。
- performance: Reviews HTMLは65,092 bytesから34,997 bytesへ減少。
- review gate: 大規模変更としてarchitecture、grouped diff、cross-checkを完了。最終`glm-5.1` cross-checkは`ok: true`、blocking 0件。

## Scope Check

- scope 内で収まっているか: scope内。Reviewsページ、ReviewExplorer、Reviews専用/既存smokeテスト、PlanGate記録だけを変更した。
- 見送った項目: blockquoteのfont明示、LCP継続監視、PlanGate用語統一、複合back/forwardシナリオ追加は非blocking advisoryとして今後の候補に残した。共通token、他ページ、コンテンツ本文、CMS、依存関係、公開設定は変更していない。

## Next Action

- 残件: branch差分のcommitとPR作成。mergeと公開は別途確認する。
- 次に見る人へのメモ: `ReviewExplorer.astro`の`is:global`はclient生成DOMへスタイルを適用するため必要で、全selectorを`[data-review-explorer]`配下へ限定している。SSR/JS parityとURLの`q` / `situation` / `page`契約を維持すること。

## Daily Record

- 記録先: `inbox/daily/2026-08-11.md`
- 記録内容: Reviewsの可読性修正、desktop / mobile実測、検証、レビューゲート完了。
