# Test Cases

## Task

- task-id: TASK-review-buffon-autobiography-2026-04-09
- related plan: docs/tasks/TASK-review-buffon-autobiography-2026-04-09/plan.md

## Must Check

- [ ] 新規レビュー content が schema 適合している
- [ ] ギャラリー content が schema 適合し relatedReview が正しく参照している
- [ ] scope 外の変更が入っていない（テンプレート・config 不変更）

## Command Checks（repo 既定の順）

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`（= lint + typecheck + build + test:e2e 統合）

## Manual Checks

- [ ] `/reviews/` 一覧に新しいカードが表示される
- [ ] `/reviews/buffon-autobiography/` 詳細ページが正しく表示される
- [ ] `/gallery/` にギャラリーエントリが表示される
- [ ] アフィリエイトリンクの URL が正しい（HTML デコード済み）
- [ ] description / excerpt / recommendedFor の内容が適切

## Review Addition Checklist（docs/review-addition-checklist.md を正本として反映）

### 1. 書誌情報
- [ ] title / bookTitle / author が正確か
- [ ] ISBN での検索結果と一致するか

### 2. Frontmatter 必須項目
- [ ] `title`, `bookTitle`, `author`, `date`
- [ ] `cover`, `infographic` の画像パスが存在するか
- [ ] `tags` が設定されているか
- [ ] `description`, `excerpt` に下書きでない本文が入っているか

### 3. purchaseLinks
- [ ] Amazon 検索リンクあり（`amazon.co.jp/s?k=...`）
- [ ] 楽天リンクあり（あれば）

### 4. 品質 Gate
- [ ] `npm run verify:frontend` が通ること

### 5. 表示確認
- [ ] `npm run dev` で該当レビューページが正しく表示されるか
- [ ] 画像・リンクが機能しているか

## 承認済み例外（pbi-input.md で承認）

以下は checklist 正本に対する例外。オーナー承認済み。

| checklist 項目 | 例外 | 理由 |
|---------------|------|------|
| Amazon 検索リンクあり | 今回は楽天のみ | ユーザー提供リンクに Amazon なし |
| cover / infographic 画像パスの実在確認 | パスのみ記載、ファイル未配置 | ユーザー後日配置予定 |

## Out Of Scope

- 画像ファイル自体の存在確認（後日配置後の follow-up タスクで実施）
