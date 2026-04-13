# PBI Input: Gallery Review Note Rollout

## Summary

レビュー記事を持つ gallery 詳細ページ 5件に `note` フィールドを追加し、Hero と What Lingers のテキスト重複を解消する。

## User Story

読者として、gallery 詳細ページの Hero で作品の概要を知り、What Lingers で読後の余韻を感じたい。

## Acceptance Criteria

- 5ページで Hero と What Lingers が異なるテキストを表示すること
- note が description と性格を変え、「残る感覚」を表現すること
- 関連シーンカードで note が優先表示されること
- `autobiography-buffon`（基準実装）と体験ルールが揃っていること

## Scope

- 5 gallery コンテンツファイルに `note` フィールド追加
- テンプレート変更なし
- スキーマ変更なし（`note: z.string().optional()` は既存）

## Out of Scope

- description の変更
- テンプレート・コンポーネントの変更
- レビューなし gallery ページの変更
