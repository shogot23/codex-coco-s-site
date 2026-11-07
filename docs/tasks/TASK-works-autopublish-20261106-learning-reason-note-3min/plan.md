# Plan

## Task

- task-id: TASK-works-autopublish-20261106-learning-reason-note-3min
- related pbi: pbi-input.md

## Approval

- 承認根拠: docs/works-publishing.md の継続承認と、この実行の親から受けた明示承認。
- PlanGate承認者: ユーザー承認の範囲を親から受領。レビュー担当: Claude review gate。
- 分類: publish/dev-critical。公開サイトへ新規コンテンツを加える。
- gate条件: 再開時に追加したテスト変更範囲のPlanGateレビューが通るまで `scripts/work-import.test.mjs` は変更しない。commit/PR/merge前に必須Claude phaseのblockingを0件にする。
- PlanGate status: 2026-11-07の再開範囲はユーザー承認済み。今回の計画レビュー結果はstatus.mdに記録する。

## Intent

- 何を変えるか: 新しいワーク1件とtask記録を、既存のWorks一覧・詳細・関連レビュー導線へ加える。
- なぜ今やるか: 2026-11-06に制作が完了した新規成果物で、継続承認の適用対象。2026-11-07にユーザーから「作業完了させてください」と明示指示があり、前回停止時に提示した固定件数テストの2箇所（テスト名・期待値）の29→30更新と残る公開工程が承認された。

## Design Thesis

- Visual thesis: 制作時に確認済みの1080×1350画像と既存Worksページを使い、画面設計を変えずPC・モバイルで画像と本文の収まりを確かめる。
- Content plan: 学び選びへの焦りから入り、本の「自分はどうしたいか」という視点を暮らしの用途へつなぐ。研究の課題と短縮版の違いを明示し、短縮版未検証を保つ。
- Interaction thesis: 読者が一行を書いた後に「試す・相談する・休む・ここで終える」から今の選択をできる。既存の本レビューへ往復できる。

## Scope Declaration

- 変更対象:
  1. src/content/works/learning-reason-note-3min.md（importで追加し、プレビュー後に published だけtrueへ変更）
  2. src/assets/works/learning-reason-note-3min.png（納品PNGをそのまま追加）
  3. `scripts/work-import.test.mjs` の固定件数テスト名とassert期待値の2箇所（29→30）のみ。
  4. このtask folderの pbi-input.md、plan.md、test-cases.md、status.md、daily-2026-11-06.md、daily-2026-11-07.md
- 取り込み前の入力: 元のdirty worktreeには触れず、受領7ファイルを隔離worktreeの対応するinbox/workフォルダへコピーし、SHAとbyte一致を再確認する。
- 変更しないもの: 元mainのdirty/untracked、制作inboxとhistory、既存review/works/taxonomy、許可範囲外のtestコード、UI/CI/config/依存、SNS投稿、画像の再生成・編集、他inbox成果物。
- 期待差分: 新規work Markdown/PNG、固定件数テスト名と期待数の2箇所だけ、task folderの記録。受領inboxコピーはimport入力として保持しPRに含めない。

## Parallel Work Check

並列で進める独立作業はない。単一writerで順番に確認する。

## Implementation Steps

1. `origin/main` が `c94156eff307984a9f3becd54374f513d31f467a` であることを確認済み。最新baseの `src/content/works` は29 Markdown、slugは未存在、reader-copy guardのテスト名とassert期待値も29であることを確認した。baseが変わった場合は数を再計算し、base件数＋今回の1件＝30件でないときは停止する。source package、書誌・公開review・taxonomy、画像の寸法/SHA/目視は前回の完了済み証拠を引き継ぎ、制作元は変更しない。
2. (前回完了・今回再実行しない) 受領7ファイルのコピー、指定SHA/制作元との照合、dry-run/通常importは成功済み。現在は隔離worktree内のsite-work.jsonを再取り込みせず、既存記事が `published:false`、既存PNGが受領PNGとbyte一致であることだけを確認する。
3. (前回完了・今回再実行しない) 前回 `npm run works:preview` をlocalhost:4327で起動し、desktop/mobileの一覧・詳細・画像・手順・出典・相互導線と読者向けコピー4点を確認済み。原稿と画像に変更がないことをSHAで確認して既存preview証拠を引き継ぐ。
4. 先に `scripts/work-import.test.mjs` のテスト名と `assert.equal(names.length, 29)` の期待値だけを30へ更新する。latest base 29件＋今回の1件＝30件であることを再確認し、差分に他のテスト変更がないことを確認する。
5. 既確認のpreview・コピー結果と内容/画像に変更がないことをSHAで確認後、対象Markdownの `published` だけtrueにし、`published:false → true` の一行だけが変わったことを確認する。`npm run test:works` を実行し、失敗時は公開フラグをfalseへ戻して未commit・未公開で停止する。成功時だけ `npm run verify:frontend`、`npm run check:works-dist` を順に実行する。
6. Claude review gateを規模に応じた必須phaseで実行し、blocking 0件と有効な構造化結果を確認する。
7. 差分を確認してcommit/push/PRを行う。CI成功、merge可能状態、merge前review後にsquash mergeする。
8. merge SHAに対応するPages deployの成功を確認し、cache-bypassで一覧・詳細・関連review相互リンク・共有画像・HTML参照WebPを検証する。
9. worktree側でmainとの同期とbranch cleanupを安全に確認する。元dirty worktreeのHEAD・変更・未追跡は開始時のまま保持する。

## Risks And Guards

- 想定リスク: review IDやtitleの不一致、画像パス・寸法の誤り、既存slug/画像との衝突、研究介入の結果と短縮版の混同、base件数の変化、固定件数testの失敗。
- 回避策: baseの実件数再確認、許可されたテスト2箇所以外を変更しないこと、import dry-run、draft preview、ブランド4点確認、指定test、dist検査、Claude review、PR/Pages/実HTML/媒体の確認を順番に行う。
- scope外の問題が見つかった場合: 停止し、観測した失敗と安全な再開点を記録する。既存testやCIを独断で変えない。

## Verification

- コマンド: (前回完了) npm run works:import -- <absolute site-work.json> --dry-run、通常import、npm run works:preview。(今回実施) `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist`。最新base 29件＋今回の1件＝30件を確認し、fixed-count testは2箇所だけ29→30へ更新する。
- 追加確認: 7ファイルのSHA/byte一致、関連reviewと分類・source・画像の一致、desktop/mobile表示、コピー4点、公開前後の差分、PR checks、Pages実行SHAと公開HTML/媒体bytesの一致。
