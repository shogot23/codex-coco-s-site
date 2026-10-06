# Plan

## Task

- task-id: TASK-works-voice-audit-20261006
- related pbi: pbi-input.md

## Intent

- 何を変えるか: 監査で特定した5件のbookConnectionを本人の読書経験から語る自然な文章にする。feeling-one-wordはfrontmatterと本文の重複箇所を同じ文にそろえる。
- なぜ今やるか: 公開文がAI側の資料確認や本人のReviewを第三者視点で説明し、ユーザー自身の経験と誤読されうるため。

## Visual / Content / Interaction Thesis

- visual thesis: 画像、構成、レイアウトは変えず、既存ページの視覚的な読み順を保つ。
- content plan: 本を読んだ本人の受け取り → 日常で考える問い/小さなワーク → 本の手順・研究との境界、の順に短く伝える。経験は既存Reviewだけに基づける。
- interaction thesis: 表示や操作は変えず、relatedReviewと画像・ワーク導線を保つ。

## Scope Declaration

- 変更対象ファイル:
  - `src/content/works/beyond-numbers-star-note-4min.md` — bookConnection
  - `src/content/works/feeling-one-word-note-3min.md` — frontmatter bookConnection、本文「本とのつながり」
  - `src/content/works/happiness-three-things.md` — bookConnection
  - `src/content/works/seiten-kind-voice.md` — bookConnection
  - `src/content/works/third-party-note.md` — bookConnection
  - `docs/tasks/TASK-works-voice-audit-20261006/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-10-06.md}` — 計画と完了記録
- 変更しないもの: 他14件、Review、description、手順、研究・安全文、sources、relatedReview、slug/分類、published、画像、UI/renderer、過去納品/history/studio。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない

単一writerで順に実施する。

## Implementation Steps

1. latest `origin/main` の全19ページと既存Reviewを照合し、private auditを保存する。
2. PlanGateを作成しClaude `glm-5.3` arch reviewで範囲と境界を確認する。通過後にのみページを編集する。
3. 固定したbefore/afterのうち5対象の指定文だけを反映する。
4. 差分をレビューし、`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` を実行する。
5. Claude diff review後にパッチを固定しcommit/PR。PR CI成功とmergeableを確認しsquash mergeする。
6. Pages反映後、5ページのHTML文言、旧監査表現の不在、既存Review相互リンクと画像参照を確認する。差分で触れた以外の公開資産は変わっていないことを照合する。
7. managed branch/worktreeを安全にcleanup/archiveし、CI/Pagesを含む最終証跡をprivate evidenceへ保存する。

## Risks And Guards

- 想定リスク: Codexの未読・資料確認をユーザーの事実と誤って書く、または書評にない本人の経験を加える。
- 回避策: 各文章を本人の既存公開Reviewに照合する。原著全文未読は公開コピーに記載せず内部監査記録に限る。
- scope外に見つけた事項の扱い: 研究の限界・安全説明・出典ラベル・手順内の確認表現は目的に照らして維持し、追加差分にしない。

## Verification

- 実行するコマンド:
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認:
  - 差分が上記10ファイル内に限られ、対象5ページの指定文以外のフロントマター/本文は同一であること。
  - `published: true`、slug・relatedReview、研究/安全/手順/画像が不変であること。
  - Build出力と公開HTMLの文言・リンク・画像参照を確認し、Pagesのcache-bypass応答が成功すること。

## Approval

- approver: ユーザー（全件監査、対象修正、公開の直接依頼）
- status: approved after Claude arch review (2026-10-06 JST; glm-5.3/high; valid; ok=true; blocking=0)
- note: 親へ事前監査と対象案を報告し、5件で確定。Claudeの2件の非blocking advisoryはprivate evidenceへ記録し、scope外の任意差分を増やさない。
