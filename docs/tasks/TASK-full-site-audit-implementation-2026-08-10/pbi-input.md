# PBI Input

## Task

- task-id: `TASK-full-site-audit-implementation-2026-08-10`
- title: 公開サイト総合監査の全改善項目をブランド方針に沿って実装する
- owner: shogo
- date: 2026-08-10

## Request Summary

- 依頼の要約: 2026-08-10 の公開サイト監査で抽出したブランド、コンテンツ、UX、アクセシビリティ、SEO、性能、技術運用の改善項目をすべて適用する。
- 背景: 現行サイトは「本 × ココちゃん × 学び」の世界観とレビュー主導の大枠は成立しているが、レビュー未連携 Gallery の購入主導線、旧レビューの編集品質、first viewport、mobile navigation、画像容量、構造化データなどにブランド方針とのずれがある。

## Goal

- 達成したいこと:
  - `読書 with Coco` を、忙しい大人が本から「問い・見方の変化・今日の一歩」を持ち帰れる「人生の修復工房」として一貫させる。
  - Reviews を主導線、Gallery を読後の副導線、購入リンクを補助導線として全ページで統一する。
  - desktop / mobile / keyboard / reduced-motion / error state を含む公開体験を完成させる。
  - 画像、OGP、JSON-LD、動画、HTML量、公開運用の技術品質を改善する。
- 完了条件:
  - 本タスクの `test-cases.md` の必須項目がすべて完了する。
  - `npm run lint`、`npm run typecheck`、`npm run build`、`npm run test:e2e`、`npm run verify:frontend` が通る。
  - desktop / mobile の主要ページを目視確認し、brand / CTA / navigation / layout / image load を確認する。
  - Claude Review Gate の必須フェーズが `ok: true` になる。
  - `status.md` と daily / worklog に実施内容、検証結果、配信基盤など repo 外制約を記録する。

## Scope

- 含める:
  - Home、Reviews、Review detail、Gallery、Gallery detail、3books、About、Profile、Videos、404、共通 Layout / SEO / theme。
  - 公開済み review content の編集品質是正と、Gallery / Review の導線ルール統一。
  - アフィリエイト、AI生成・読後イメージ、引用・独自要約の透明性表示。
  - responsive navigation、skip link、reduced motion、footer、empty/error state、external-link cue。
  - responsive image、次世代形式、OGP、JSON-LD、RSS、favicon、sitemap metadata、動画補助情報。
  - Gallery / Reviews の初期HTML・DOM量削減、検索・filter・pagination / progressive disclosure。
  - E2E、アクセシビリティ、リンク整合、性能予算の回帰テスト。
  - CMSのブランド品質項目と公開前整合チェック。
  - 公開件数を固定せず、content collectionの公開条件と`relatedReview`から動的に検証する完全性チェック。
- 含めない:
  - 新しい書籍や購入URLの創作。
  - ユーザーが提供していないISBN、出版社、刊行日、引用ページ番号の推測。
  - 認証情報を必要とするCMSログイン実地テスト、Search Console登録、外部CDN設定、GitHub Pages外への本番移行。
  - 明確な再訪・オフライン要件がない状態でのPWA導入。
  - `inbox/gallery/` と `inbox/infographic/` の既存未追跡データ。
  - 制作記録で確認できない画像を、`generated_at`や見た目だけでAI生成と断定すること。

## Constraints

- 既存運用との整合:
  - AGENTS.md、brand strategy、content guidelines、AI operations、design doctrine、frontend playbook、DESIGN.mdを正本とする。
  - `publish/dev-critical` として Claude Review Gate を使用する。
  - main へ直接commitせず、`codex/apply-full-site-audit` branch の専用worktreeで進める。
- 納期 / 優先度:
  - P1のブランド逆転、review quality、Hero / mobile nav、image performanceを先に行う。
  - P2/P3も同一タスクの完了範囲に含め、外部サービス依存だけを制約として明記する。
- 触ってよいファイルや領域:
  - `src/`、`public/`、`scripts/`、`tests/`、`docs/tasks/`、必要最小限の`package.json` / config。

## References

- 関連ドキュメント:
  - `AGENTS.md`
  - `docs/brand/reading-with-coco-brand-strategy.md`
  - `docs/brand/reading-with-coco-content-guidelines.md`
  - `docs/brand/reading-with-coco-ai-operations.md`
  - `docs/reading-with-coco-design-doctrine.md`
  - `docs/frontend-playbook.md`
  - `DESIGN.md`
  - `docs/process/lightweight-plangate.md`
- 関連 issue / PR:
  - なし。2026-08-10 の会話内監査結果を入力とする。

## Notes

- 領域固有メモ:
  - visual thesis: 温かな紙面と書棚の静けさの中で、ブランド名・読者のモヤモヤ・ココちゃんの案内を一つの表紙として見せる。
  - content plan: Heroで対象読者と持ち帰る価値を示し、生活場面からレビューを選び、Galleryはレビュー後の副旋律へ戻す。
  - interaction thesis: 主要CTAはReviewsへ収束し、mobile navは全項目を発見可能にし、動きは視線誘導だけに限定してreduced-motionへ従う。
- 未確定事項:
  - GitHub Pagesで設定できないレスポンスヘッダは、repo側の配信要件文書と将来のホスティング移行判断へ分離する。
  - PWAは監査でも条件付き提案だったため、明確な要件がない現状では実装しない。
  - Gallery / Review件数は監査時点の数値をassertせず、現行のcollection filterから期待値を導出する。
