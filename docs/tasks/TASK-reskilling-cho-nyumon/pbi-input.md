# PBI Input

## Task

- task-id: TASK-reskilling-cho-nyumon
- title: リスキリング超入門 のギャラリー＆レビュー追加
- owner: Claude Code
- date: 2026-04-27

## Request Summary

- 依頼の要約: 書籍「リスキリング超入門」（徳岡晃一郎 / 房広治）をギャラリーとレビューページに追加する
- 背景: inbox に gallery 用画像と infographic 用画像が配置済み

## Goal

- 達成したいこと: ギャラリーエントリとレビューページを新規作成し、サイトに公開する
- 完了条件: verify:frontend が通ること、ギャラリーとレビューが正しくレンダリングされること

## Scope

- 含める: ギャラリーエントリ、レビューページ、画像コピー、manifest 更新
- 含めない: 既存エントリの変更、UIコンポーネントの変更

## Constraints

- 既存運用との整合: 直近エントリ（jibun-no-yowasa-wo-shiru）のパターンに準拠
- 納期 / 優先度: 通常
- 触ってよいファイルや領域: src/content/, data/, public/uploads/gallery/books/

## References

- 関連ドキュメント: plans/piped-splashing-lantern.md
- 関連 issue / PR: なし

## Notes

- codex がレート制限のためレビューは自身で実施
- pr-merge スキルを使用して PR→merge を実行
