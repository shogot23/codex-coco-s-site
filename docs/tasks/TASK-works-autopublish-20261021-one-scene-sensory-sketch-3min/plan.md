# Plan

## Task

- task-id: TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min
- related pbi: `docs/tasks/TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min/pbi-input.md`

## Intent

- 何を変えるか: 読者向けワークを1件追加し、preview・公開前確認後にその記事だけを公開する。
- なぜ今やるか: 人間ユーザーが今回の新規制作成功分に限ってサイト工程を継続承認し、PR・merge・実公開確認まで指示したため。

## Scope Declaration

- 変更対象ファイル: この task の PlanGate / status / daily 記録、`src/content/works/one-scene-sensory-sketch-3min.md`、`src/assets/works/one-scene-sensory-sketch-3min.png`、`scripts/work-import.test.mjs` の現在作品Markdown数の期待値1か所。
- 変更しないもの: 元 checkout、inbox の7原本、既存記事・画像・レビュー・Gallery、package/config/UI、他 PR、SNS。サイト記事の URL slug は固定する。
- 分類: `publish/dev-critical`。
- visual thesis: 既存の Works 詳細レイアウトに、受領済みの 1080×1350 画像を本文と同じ順序で見せ、「本 × ココちゃん × 学び」を一続きで読める状態にする。
- content plan: 一日の採点に疲れる悩み、本から受け取った問い、一場面の3手順、未検証と研究の限界、空欄・休む・相談を選べる説明、本への導線の順に置く。
- interaction thesis: 一覧から詳細を開き、関連レビューへ進める。手順は読み進めるだけで完結し、終了・休息・相談も選べる。

## Parallel Work Check

単一 writer で実施する。工程が順序依存するため、並列作業は行わない。

## Implementation Steps

1. 元 checkout の `git status --short --branch` を task directory の `source-checkout-status-start.txt` へ保存し、必要に応じて `/private/tmp` にも複製して開始状態を固定する。完了時の照合には task directory の耐久証跡を使う。dirty 状態を保護したまま、最新 `origin/main` の managed worktree と `codex/one-scene-sensory-sketch-3min` branch を使い、slug、画像、関連レビューの公開状態、書名、taxonomy を照合する。
2. 指定の絶対 source path を使って `npm run works:import -- <path> --dry-run` を実行する。成功後に通常 import し、原本 JSON と画像 SHA が不変、取り込み記事は draft であることを確認する。
3. `npm run works:preview` が localhost:4327 で起動したことを実際の出力と HTTP で確認する。占有中または別 port が選ばれた場合は停止して調査し、desktop と明示的に mobile viewport に切り替えて確認する。noindex、一覧・詳細・画像・全手順・出典・関連レビュー導線を見る。
4. 4点（本人の目線、AI事情・第三者語りの排除、本と本人の経験の根拠、引用/翻案と研究限界）を人が確認し、Claude が文章の意味を確認する。問題があれば公開を止める。
5. preview 後、新規記事の `published` だけを true にし、slug・本文・画像を再確認する。`npm run test:works` が既存テストの期待値23 / 実ファイル数24で1件失敗したため、新規Markdown追加に合わせ `scripts/work-import.test.mjs` の期待件数だけを24へ更新する。他のテスト条件・回帰検査ループは維持する。続けて `npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` を実行し、dist の記事 URL と参照画像も確認する。
6. Claude review gate を実施する。CLI/preflight を確認し、変更規模に沿う arch / diff / cross-check phase を `glm-5.3` で完了させる。各結果は envelope・actual model・dispatch・schema・exit code で検証する。commit / PR / merge 前にも最新差分を確認する。
7. 対象差分だけを commit・push・PR し、PR を artifact として attach する。存在する `codex` / `codex-automation` label を付け、CI成功・差分・mergeable・merge前 review を確認後に squash merge する。
8. GitHub Actions の `Deploy Astro site to GitHub Pages` が対象 merge SHA で success になるまで待つ。完了後、一覧・詳細・関連レビュー・OG/shared image・HTML が参照する画像を、merge SHA を付けた cache-bypass HTTP で確認する。cache-bypass URL と query のない正規 URL の両方が HTTP 200 で本文が一致することを含め、URL・status・HTML画像URLとSHA/寸法を `production-verification.json` と site-phase `completion.json` に保存する。
9. 全検証後に status.md と daily-2026-10-21.md を更新する。step 1–8 がすべて成功し、PR が squash merge 済みで Pages 公開 URL の確認が完了し、元 checkout の `git status --short --branch` 出力が task directory の保存済み開始時ファイルと `cmp` で一致した場合だけ、隔離 branch / worktree を cleanup する。どれか一つでも未達なら cleanup せず worktree を残して報告する。

## Risks And Guards

- 想定リスク: 誤った本・レビューへの接続、読者向け文の出所や研究限界の崩れ、未公開画像の露出、dirty checkout への混入。
- 回避策: 一致照合、preview の目視、4点チェックと Claude review、既存 importer / dist check、隔離 worktree、対象 Markdown のみ公開変更。
- scope 外に見つけた事項の扱い: 変更せず記録して停止または別 task とする。source 原本や画像は編集・再生成しない。

## Verification

- 実行するコマンド:
  - `npm run works:import -- <absolute site-work.json> --dry-run`
  - `npm run works:import -- <absolute site-work.json>`
  - `npm run works:preview`
  - `npm run test:works`
  - `npm run verify:frontend`
  - `npm run check:works-dist`
- 追加確認: desktop / mobile preview、public copy 4点、dist URL / image、CI、Pages deployment と公開 URL の cache-bypass checks。
  - 公開 URL は `curl --fail --silent --show-error -H 'Cache-Control: no-cache' -H 'Pragma: no-cache' '<url>?codex_verify=<merge_sha>' -D <headers.txt> -o <body.html>` 相当で確認し、status と応答本文を保存する。query を除いた正規 URL も取得し、両方が HTTP 200 で本文に必要な内容が含まれることを照合する。

## Approval

- approver: 人間ユーザー（今回 Automation の直接指示）
- status: approved
- note: 新規成功成果物1件だけを対象に、import・commit・PR・CI成功後の squash merge・Pages URL確認まで実行する直接承認を受領済み。必須 `test:works` が新規1ファイル追加後に固定件数23で失敗したため、全作品コピー検査を維持する最小の期待値更新（24）をscopeへ追加し、Claude arch review後に変更する。
