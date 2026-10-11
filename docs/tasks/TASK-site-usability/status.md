# Status
- 2026-10-11 JST
- 実装: 8項目すべて対応。
- Branch: codex/coco-site-usability
- Worktree: /Users/shogo/.codex/worktrees/coco-site-usability/codex-coco-s-site-main
- 元worktreeのdirty/untrackedを変更せず、origin/mainから分離。

## Changes
1. 最新特集を含む全45公開レビューを検索対象にした。
2. スマホheroを短くし、ココちゃん・ブランド・主CTAが初期画面に収まる。
3. トップはhero直後に一冊。レビュー補足は本文後のdetailsに移動。
4. 導線・終端・FINAL CTA等の制作側用語と冗長な説明を整理。
5. taxonomyの「自分を責めている」「不安・落ち着かない」「動き出せない」を入口に、表示した検索語で探せるリンクを追加。
6. 「はじめての方へ：最初の3冊」をトップとレビュー入口に配置。
7. desktopの3画像を重ならないgridに変更。
8. gallery説明を短くし「このページを一覧表示」と「全作品の一覧へ」を区別。

## Validation
- npm run lint: PASS
- npm run typecheck: PASS (0 errors / 0 warnings / 0 hints)
- npm run build: PASS (link / integrity / performance / draft exclusion含む)
- npm run verify:frontend: exit 0、109 passed / 7 expected skipped。
- 最新書名・著者検索、気がかり検索→reset→back、補足開閉、既存gallery表示/URL/keyboard、work往復、axeを確認。
- Desktop 1440x900 / 1200x656、mobile 390x844 / 360x800: 目視・要素境界assert・横溢れ確認。
- 初回全E2Eで旧補足見出し期待が失敗し、読後の補足開閉確認へ修正。最終は全PASS。
- 本文内容、公開状態、画像原本、依存、package設定は変更なし。
- Claude plan arch: glm-5.3 ok:true、blocking 0、schema失敗2回後の成功1回。最終envelope/モデル/dispatch検証済み。
- Claude final review: arch / home-diff / reviews-diff-fix / gallery-diff はok:true。record-diff-fix / cross-checkもok:true。必須全phase完了、blocking 0。レビューの実モデル・最終envelope・dispatch検証済み。
- Evidence: /private/tmp/coco-usability-review/
- 公開/commit/PR/merge: 未実行。
- Daily: docs/tasks/TASK-site-usability/daily-2026-10-11.md

## Review decisions
- 空のrecommendedForが数値0を描画する条件をbooleanへ修正。ビルドHTMLに独立した0テキストがないことを確認。
- 気がかり入口の検索語は責め / 不安 / 再起。「行動」は0件だったため既存の再起タグへ修正し、3語とも結果ありをE2Eで確認。修正後verify:frontendも109 passed / 7 skipped。
- 最新レビューは特集と全件検索棚の両方に意図的に掲載。
- 全9コード・テスト差分を一体で届ける。グループはレビュー分割であり独立マージ単位ではない。
- 未使用になった既存CSSの整理は見送り。動作に影響がなく、8改善の範囲内で差分を最小化するため。
- 320px幅では補助画像のcaptionが小さくなる。主要内容・CTAと横幅は保持。完了基準の360/390pxでは目視確認済み。
- GalleryBrowseにはジャンルフィルタがあり、archiveではenableSort=trueで並び順selectが有効。説明文と実機能は一致。
- reading-repairのインデントは兄弟sectionと同じ6/8/10スペースへ復元済み。

## Completion
- 最終cross-check: glm-5.3、effort high、ok:true。最終envelope正常、成功dispatch1、schema失敗1から修正。全phaseでfallbackなし。record-diff-fixは小規模文書のためeffort low。
- 残るhomeの空行/インデントadvisoryは動作影響なし、今回の整形範囲を増やさず見送り。
- hash scrollの自動assert追加は見送り。直接?q=不安#review-streamを読み込む最終ブラウザ確認でtop=0.203px / viewport=720px、検索結果2冊、anchorが画面内と確認。
- Preview: http://127.0.0.1:4321/codex-coco-s-site/
- Screenshot: /private/tmp/coco-usability-review/home-final.jpg
- viewport overrideはreset済み。公開/commit/PR/merge未実行。
