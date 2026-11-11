# Plan

## Task

- task-id: TASK-works-autopublish-20261111-before-reply-30-second-check
- related pbi: `pbi-input.md`
- resume authorization: user explicitly requested resumption on 2026-11-12 JST; scope is the same new work and the exact 30→31 repair to the one fixed-count test that failed previously.

## Intent

- 何を変えるか: 完成検証済みの「返信前の30秒見直し」を既存のワーク記事・画像構成に追加し、確認後にこの1件だけ公開する。
- なぜ今やるか: `docs/works-publishing.md` にある自動公開継続承認の対象となる、新規・当日完成の成果物だから。
- visual thesis: 既存の落ち着いたワーク詳細画面に4:5の実画像を置き、ココちゃんが本から届いた問いを読者に案内する。
- content plan: SNSで返信を急ぐ困りごと → 本の問い → 相手への評価と論点を分ける余地 → メモ・閉じる・休む・相談・終了から選べる一歩。研究条件と短縮版未検証を併記する。
- interaction thesis: 3手順と本へのリンクを読者が確認し、論点を残すか画面を閉じるかを自分で選べる。既存の詳細ページ操作とレビュー往復リンクを使う。

## Scope Declaration

- 変更対象ファイル:
  - `src/content/works/before-reply-30-second-check.md`
  - `src/assets/works/before-reply-30-second-check.png`
  - `scripts/work-import.test.mjs`（単一の固定件数テスト名と期待値のみ30→31）
  - `docs/tasks/TASK-works-autopublish-20261111-before-reply-30-second-check/{pbi-input.md,plan.md,test-cases.md,status.md,daily-2026-11-11.md,daily-2026-11-12.md}`
- 変更しないもの: 元main worktree、受領したinbox原本、関連レビュー、既存ワーク、指定テスト以外のtest/import/CI実装、他アセット、X/Instagram。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一writerで順番に実行する。

## Implementation Steps

1. 原本7ファイルのSHA-256、JSON、1080×1350 PNG、公開レビューのID・書名とslug/画像の衝突を再照合する。
2. 前回の`npm run test:works`出力と現行Markdown件数を照合し、失敗が同一の固定件数不一致であることを確認する。
3. 再開計画をGLM-5.3でレビューする。レビューが成立し`ok:true`、blocking 0になるまでコード/公開状態を変更しない。
4. `scripts/work-import.test.mjs`の失敗した単一テストだけ、ラベルと期待値を30から31へ変更する。他のtest/import/CI実装は変更しない。
5. その後、対象Markdownの`published`だけをtrueにする。`npm run test:works`を実行し、失敗時は対象Markdownを`published:false`に戻してここで停止する。
6. 前回のPC・モバイルPreview、本文、画像、書誌、出典、相互リンク確認の証跡と、今回の差分を照合する。記事/画像表示や文面に変化があれば、同じ`127.0.0.1:4327`で必要箇所だけ再確認する。
7. `npm run verify:frontend` → `npm run check:works-dist`を実行する。どれかが失敗したら、対象Markdownを`published:false`へ戻して停止し、記録と失敗出力を保持する。
8. 変更全体のClaude/GLM-5.3レビューを通し、blocking 0を確認してからcommit/push/PRへ進む。CI成功・merge可能・変更ファイルを確認してsquash mergeし、Pagesとcache-bypass本番表示を検証する。公開確認で不一致や取得失敗が出たら成功扱いせず、証跡を保全して親へ報告し、同一成果物の修正またはrevert判断を待って停止する。

## Risks And Guards

- 想定リスク: 既存slug/画像との衝突、公開レビュー名のずれ、Previewの本番誤認、固定件数修正が他の意図しない箇所へ広がること、本番表示と確認内容の不一致。
- 回避策: import dry-runと参照先照合、localhost:4327限定の下書きPreview、固定件数テスト1箇所以外を変更しない。検証失敗時は`published:false`へ戻して停止する。本番表示の確認に失敗した場合も成功扱いせず、証跡を保全して親の修正/revert判断を待つ。
- scope 外に見つけた事項の扱い: 記録して停止または別タスクへ送る。固定件数・runnerの先回り修正はしない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-11_2223_before-reply-30-second-check/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-11_2223_before-reply-30-second-check/site-work.json`
  - `npm run works:preview`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: SHA-256/cmp、`sips`寸法、PC・モバイルのブラウザ表示と画面記録、公開後一覧・詳細・関連レビュー・OG・HTML参照の最適化画像のHTTP/byte/SHA確認。

## Approval

- approver: このサイト工程のowner（gpt-6-luna / max）
- status: approved
- note: 2026-11-12のユーザー再開指示に沿う短い自己完結プランを、実モデルglm-5.3の構造化diffレビューに提出。終了コード0、schema妥当、`ok:true`、blocking 0。3 advisoryを確認した。テスト名は実際に件数を含むため31へ更新する。実装は全`*.md`名を列挙しており公開フラグには依存しないため、失敗時も記事だけを非公開へ戻し期待値31は維持する。動的件数化は今回の限定scope外として別タスクへ送る。「画像変更なし」は再生成・編集なしを意味し、新規ワークの既存画像表示は前回確認済み。

## Page template content checks

- 本人の読書目線で書かれているか。
- AIの未読/確認状況や第三者レビューを公開本文へ持ち込んでいないか。
- 既存公開レビューと制作証跡が本と書き手の経験の根拠を支えているか。
- 著者の実験と日常向け翻案を区別し、30秒短縮版の未検証を保っているか。
