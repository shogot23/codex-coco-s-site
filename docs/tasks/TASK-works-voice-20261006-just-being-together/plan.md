# Plan

## Task

- task-id: TASK-works-voice-20261006-just-being-together
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 公開ワークのbookConnectionと本文導入を、既存レビューに書かれた読者本人の一人称へそろえる。
- なぜ今やるか: 現行文にCodexの原著未読・書誌確認状況と「レビュー筆者」という第三者視点があり、ユーザー自身の体験と誤読される可能性がある。

## Scope Declaration

- 変更対象ファイル:
  - src/content/works/just-being-together-3min.md: frontmatter bookConnection、冒頭の本との導入文、「本とのつながり」段落。
  - docs/tasks/TASK-works-voice-20261006-just-being-together/: pbi-input.md、plan、test-cases.md、完了時のstatus.mdとdaily record。
- 変更しないもの: Review本文、手順、研究メモ、安全文、画像、出典、slug、分類・taxonomy、published: true、他の作品、inbox/studio原本・history、SNS。

## Visual / Content / Interaction Thesis

- visual thesis: 既存のワーク画像とページ構成を維持し、コピーだけを直して現在の余白と読み順を保つ。
- content plan: 読者の困りごと → 本を読んだ本人の気づき → ココちゃんと過ごす時間を大切にしたい思い → 日常向けに組み立てた3分のワーク、の順にする。
- interaction thesis: 操作やリンクは変えず、既存Reviewへの導線とワーク手順の選択肢をそのまま保つ。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

今回は単一writerで順番に実施する。

## Implementation Steps

1. 新しい隔離worktreeが最新remote mainの d88d070c4949d07d464ab4e1f012b7cfdb935f05 から始まり、cleanであることを確認する。
2. PlanGateをClaude glm-5.3のarch phaseでレビューする。blockingがない場合だけ指定箇所を直す。
3. 提示された本人目線のbookConnectionをfrontmatterと本文へ反映し、冒頭だけ同義に整える。他の本文・metadataを変更しない。
4. 差分を確認し、npm run test:works、npm run verify:frontend、npm run check:works-dist とClaude diffレビューを完了する。
5. 変更後の記録をstatus.mdとdailyへ残し、その最終差分もレビューしてcommitする。
6. PRのCI/mergeabilityを確認し、GitHub側でsquash mergeする。Pages deploy後に公開本文の文言、slug、Review導線、関連画像応答を確認する。
7. remote/local topic branchとmanaged worktreeを安全にcleanup/archiveし、最終値をprivate evidenceへ記録する。

## Risks And Guards

- 想定リスク: Codexの未読・出版社資料確認をユーザーの経験として残す、またはユーザーが書いていない経験を加える。
- 回避策: 既存Reviewの該当文だけを根拠にし、ユーザー指定の文章をそのまま使う。ユーザーの読書経験を越える追記はしない。
- scope外に見つけた事項の扱い: 他のコピーや研究・安全上の指摘は別件として記録し、今回の差分へ混ぜない。

## Verification

- 実行するコマンド:
  - npm run test:works
  - npm run verify:frontend
  - npm run check:works-dist
- 追加確認:
  - 初回計画のClaude arch、実装最終差分のClaude diff、merge前の差分/mergeability/CI確認。
  - 変わった本文が既存Reviewの一人称に根拠を持ち、「原著全文は未読」「出版社資料を確認」「レビュー筆者」の表現が公開コピーから消えたこと。
  - slug、研究・安全・手順、画像、Review関連付け、published状態が不変であること。
  - Pages deploy後のcache-bypass HTTPで作品詳細を再取得し、bookConnectionの完全一致を確認する。

## Approval

- approver: ユーザー（今回の直接修正・公開依頼）
- status: approved after Claude arch review (2026-10-06 JST; glm-5.3/high, ok=true, blocking=0; 2 nonblocking advisories retained)
- note: 元dirty checkoutや制作原本を変更しない。別モデルや新規画像は使わない。
