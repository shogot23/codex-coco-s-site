# PBI Input

## Task

- task-id: TASK-works-process-steps
- title: ワークの思想を4段階の進め方として示す
- owner: 読書 with Coco
- date: 2026-09-29

## Request Summary

- 依頼: 今回のワークの思想内容を、読者が実際に進められる手順へ整理する。
- 背景: 個別ページには振り返りがあるため、一覧入口でも「困りごと → 本の問い → 見方の変化 → 今選べる一歩」の流れを先に示す。

## Goal

- `/works/` の入口で、ワークの使い方を4段階で読めるようにする。
- 変化や行動を強制せず、休む・相談する・ここで終える選択を残す。

## Scope

- 含める: `src/pages/works/index.astro` の使い方セクション、必要な `src/styles/works.css`、表示契約を確認する `tests/e2e/works.spec.ts`、このタスクの記録。
- 含めない: 個別ワークの手順・研究説明・安全上の注意、検索ロジック、画像、データ構造。

## References

- `docs/brand/reading-with-coco-brand-strategy.md`
- `docs/brand/reading-with-coco-content-guidelines.md`
- `docs/parallel-dev-config.md`
