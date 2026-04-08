# Plan

## Task

- task-id: `TASK-gallery-description-fix-2026-04-08`
- related pbi: `docs/tasks/TASK-gallery-description-fix-2026-04-08/pbi-input.md`

## Intent

- 何を変えるか: `ひゃくえむ。` の gallery description を正式文へ更新し、Gallery ページで description 表示前に title / author 混入を除去する。
- なぜ今やるか: 公開中 UI の文言誤りと表示混在を最小差分で解消するため。

## Scope Declaration

- 変更対象ファイル: `src/content/gallery/manga-hyakuemu.md`, `src/pages/gallery.astro`, task 記録ファイル
- 変更しないもの: Gallery 以外のテンプレート構造、他 content の文面、スタイル設計

## Implementation Steps

1. `ひゃくえむ。` の gallery content を正式紹介文へ差し替える。
2. Gallery ページの summary 取得を、description から title / author を除外する表示ロジックへ置き換える。
3. `npm run typecheck` と `npm run build` を実行し、review gate を通す。

## Risks And Guards

- 想定リスク: description 整形が強すぎて本文まで削る。
- 回避策: 先頭一致の title / author パターンだけを最小限除去し、fallback は元 description を残す。
- scope 外に見つけた事項の扱い: 今回は記録のみで触らない。

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
- 追加確認: diff で変更ファイルが scope 内に収まっていることを確認し、Gallery の主要カード種別を目視想定で点検する。

## Approval

- approver: self
- status: approved
- note: scope と検証方針を確認し、自己承認で実装開始。
