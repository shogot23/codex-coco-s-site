# PBI Input

## Task

- task-id: `TASK-remove-videos-2026-08-12`
- title: 動画関連の公開機能と保守資産を削除する
- owner: task owner
- date: 2026-08-12

## Request Summary

- 依頼の要約: 今後更新しない動画ページと動画関連機能をサイトから削除する。
- 背景: 動画はブランドの主要導線ではなく、現在はグローバルナビとトップで実態以上に一つの柱として見えている。専用ページ、コンテンツ、38,999,261 bytes（約39MB）の公開アセット、生成スクリプト、依存関係、テストも保守対象になっている。

## Goal

- 達成したいこと: サイトを `レビュー → ギャラリー` の二本柱に整理し、動画機能に固有のコード、コンテンツ、公開アセット、CMS設定、ツール、依存関係、テスト、現行文書の参照を削除する。
- 完了条件: 公開導線とbuild成果物に動画機能が残らず、ブランドの主CTA・副CTA、desktop/mobile表示、既存の主要ページが正常で、frontend verifyとClaude review gateを通過する。

## Scope

- 含める: Videos route、video content collection、legacy video data、公開動画アセット、動画専用スクリプトとmanifest、`ffmpeg-static`、ナビ/Home/Aboutの動画導線、CMS動画collection、動画専用E2E、現行README/運用文書の動画機能記述。
- 含めない: Git履歴のrewrite、過去task/dailyの履歴改変、書評本文中の一般語としての「動画」、汎用リンク検査の`video`/`track`/`iframe`対応、ブランド原典の変更、動画の代替となる第三機能の追加。

## Constraints

- 既存運用との整合: `publish/dev-critical` としてLightweight PlanGate、`npm run verify:frontend`、Claude review gateを必須とし、その後にSol自身の独立最終チェックを行う。
- 納期 / 優先度: 現在のタスクで完了させる。
- 触ってよいファイルや領域: `src/`、`public/videos/`、`scripts/`の動画専用ファイルとdist integrity guard、`tests/e2e/`、`cms/decap/config.yml`、`package*.json`、`README.md`、`AGENTS.md`、関連する現行運用文書、このtaskのPlanGate/status/daily記録。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/brand/reading-with-coco-ai-operations.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/frontend-playbook.md`。
- 関連 issue / PR: なし。

## Notes

- 領域固有メモ: 旧 `/videos/` はredirect routeを残さず、サイト共通のブランド404へ移行する。GitHub Pagesではrepo内だけでサーバー側301を保証できないため、完全削除を優先する。
- 未確定事項: なし。ownerのオーケストラ方針に従い、依存inventory・test/SEO・brand/contentを3つのread-only sub-agentへ分け、共有ファイルの実装と統合は親agentだけが行う。
