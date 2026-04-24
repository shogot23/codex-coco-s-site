# PBI Input

## Task

- task-id: TASK-coco-infographic-skill-setup
- title: 読書with Coco 本紹介インフォグラフィック用スキルと制作基盤の整備
- owner: Codex
- date: 2026-04-24

## Request Summary

- 依頼の要約: 直前の本紹介インフォグラフィック制作フローを再利用できるスキルとして定義し、今後の制作作業を `/Users/shogo/Projects` 配下の専用フォルダで行えるように環境構築する
- 背景: 毎回の調査、原稿化、画像生成、保存先整理の手順を固定し、生成画像をサイト repo の inbox に集約したい

## Goal

- 達成したいこと: 今後のインフォグラフィック制作を同じ手順で再現できる skill と専用ワークスペースを用意する
- 完了条件: skill 定義、制作ワークスペース、画像保存補助スクリプト、利用手順が揃い、生成画像を `/Users/shogo/Projects/codex-coco-s-site-main/inbox/infographic` に保存できる

## Scope

- 含める: 新規スキル作成、専用プロジェクト作成、保存導線のスクリプト化、利用ドキュメント、タスク記録
- 含めない: 既存サイトの frontend 変更、既存コンテンツの改修、画像生成モデルの API 実装

## Constraints

- 既存運用との整合: `publish/dev-critical` として Claude review gate を通す。画像生成は内蔵機能を優先する
- 納期 / 優先度: 今回の turn で end-to-end で整備する
- 触ってよいファイルや領域: repo 内の `docs/tasks/`、新規プロジェクト `/Users/shogo/Projects/coco-book-infographic-studio`、新規 skill 配置先

## References

- 関連ドキュメント: `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`, `/Users/shogo/.agents/skills/claude-review-gate/SKILL.md`, `/Users/shogo/.agents/skills/skill-creator/SKILL.md`
- 関連 issue / PR: なし

## Notes

- 領域固有メモ: ココちゃんの外見基準はユーザー提供のキャラクターシートと、生成時に参照できる画像のみを使う
- 未確定事項: 生成画像の保存名規則は本タイトルと日付をベースに実装時に定める
