# 完了状況

- サイト内のブランド表記を「読書with Coco」に統一。本文、alt、title、OG、JSON-LD、RSS、表示テストと現行ブランド文書を更新。
- 検証: npm run verify:frontend 成功（lint / typecheck / build / test:e2e）。113 passed、7 skipped。
- public/: 対象ファイルを検索し旧表記0件。
- 生成物: dist以下のHTML/XML/JSON/SVGを対象に、正式表記「読書with Coco」の出現数をPythonで合計。183ファイル・1506件、旧表記0件。
- Claude review: glm-5.3 / low、arch / diff 7グループ / cross-check がすべてok:true。schema修正を含め全dispatch・モデル・正常終了を確認。別モデルへの切替なし。
- Advisory: ブランド名外の空白は既存表現を維持。定数参照への集約は今回の範囲外。画像内文字は対象外。
- commit・PR・本番反映の状態はGitHub PRとマージ記録を正とする。元checkoutの既存差分は保持。
- daily記録: daily-2026-10-15.md。詳細実行証跡: /tmp/coco-name-review/。
