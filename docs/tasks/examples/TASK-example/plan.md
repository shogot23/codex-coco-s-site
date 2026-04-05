# Plan

## Task

- task-id: TASK-example
- related pbi: `docs/tasks/examples/TASK-example/pbi-input.md`

## Intent

- 何を変えるか: hero の CTA 文言と補助コピーを調整する
- なぜ今やるか: 主導線を明確にしつつ、最小差分で first viewport の読了性を上げるため

## Scope Declaration

- 変更対象ファイル: `src/pages/index.astro`
- 変更しないもの: hero の構図、画像、他ページ、スタイル設計

## Implementation Steps

1. 既存 hero の CTA と補助文を確認する
2. doctrine に沿って主 CTA と補助コピーを差し替える
3. 文言崩れがないか確認する

## Risks And Guards

- 想定リスク: brand tone が弱くなる
- 回避策: 既存コピーと doctrine を並べて確認する
- scope 外に見つけた事項の扱い: 別 task に切り出す

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
  - `npm run verify:frontend`
- 追加確認: desktop / mobile で hero の CTA を目視確認する

## Approval

- approver: reviewer
- status: approved
- note: 文言変更のみ。layout 変更は別 task。

plan 承認前はコード変更しない。
