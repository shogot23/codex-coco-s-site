# Plan

## Task

- task-id: TASK-works-autopublish-20261028-choose-one-feed-3min
- related pbi: `pbi-input.md`

## Intent

- 何を変えるか: 新規ワーク1件のサイト原稿と最適化画像を追加し、プレビュー後に当該原稿だけ公開する。
- なぜ今やるか: 制作・納品gateがすべて成功し、ユーザーの継続承認範囲に含まれる新規成果物だから。

## Scope Declaration

- 変更対象ファイル: `src/content/works/choose-one-feed-3min.md`、`src/assets/works/choose-one-feed-3min.png`、必要時のみ今回の追加1件を反映する既存works件数テスト1箇所、task記録。
- 変更しないもの: 指定inboxの全7ファイルとSHA、`published:false` のsite-work原本、history、既存184件、正本画像、既存レビュー、既存work、元mainの変更/未追跡ファイル。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

単一writerのサイト工程。並列実装は行わない。

## Implementation Steps

1. `origin/main` 起点のclean隔離worktreeと本task記録を確認する。制作納品7件のSHA/byte一致、slug・review・bookTitle、source `published:false`、production gate、既存ファイル保全を再確認する。
2. dry-run成功後だけprivate importし、`npm run works:preview` で127.0.0.1:4327にpreviewを起動する。desktop/mobileの一覧・詳細・手順・画像・本への導線・noindex・overflowを確認し、公開コピーを本人目線4点で再読したらpreview serverを停止する。
3. 問題がなければ生成Markdownの当該 `published` のみtrueへ変更する。既存テストに手動件数期待値がある場合だけ今回の追加1件分を最小更新し、その後に指定3検証とClaude gateを通す。
4. 差分・CI・merge可否とClaude gateを確認してcommit/PR/squash mergeする。Pagesとcache-bypass本番HTML、related review、OG画像、HTML参照の最適化画像をHTTP/ブラウザで確認する。
5. status/daily記録に実績と本番証跡を残す。失敗したgateがあれば未確認のまま進まず、公開済みと報告しない。

## Risks And Guards

- 想定リスク: 既存slug/画像との衝突、taxonomy/関連レビュー/画像の不一致、研究結果の短縮版への誤適用、preview漏れ、元mainのdirty worktree混入。
- 回避策: import dry-run、原稿と画像/JSON照合、公開コピー4点確認、noindex/PC/mobile確認、隔離worktree限定、全必須レビューと本番URL確認。
- scope 外に見つけた事項の扱い: 記録して停止・親へ報告し、修正を広げない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-28_2158_choose-one-feed-3min/site-work.json --dry-run`
  - `npm run works:import -- /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-28_2158_choose-one-feed-3min/site-work.json`
  - `npm run test:works`（preview確認・当該 `published:true` 切替後。test-cases.mdの順序に従う）
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: `npm run works:preview` によるPC/mobile実画面確認、Claude review、PR checks、Pages SHA、cache-bypass公開ページ/画像のHTTP statusとSHA。

## Approval

- approver: このチャットのユーザー（2026-10-28 Automation Coco毎日の修復ワークによる、この新規完成1件のサイト工程継続承認）
- status: approved
- note: 明示済みの継続承認により作業範囲・公開段階まで承認済み。各レビューgate・検証条件は別途すべて通過させる。
