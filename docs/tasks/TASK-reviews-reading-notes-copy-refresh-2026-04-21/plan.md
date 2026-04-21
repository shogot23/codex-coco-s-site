# Plan

## Task

- task-id: TASK-reviews-reading-notes-copy-refresh-2026-04-21
- related pbi: `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/pbi-input.md`

## Intent

- 目的: Reviews ページ右カラム `READING NOTES` の 2 ブロックを、レビュー一覧ページの紹介としてより自然に読める文言へ更新する。
- 背景: 現状は `reviewCards` 由来の `tags` / `recommendedFor` 集約値がそのまま出ており、`その他` のような分類語や個別レビュー向けのおすすめ対象が混ざって、一覧ページの役割説明としては焦点が甘い。

## Visual / Content / Interaction Thesis

- visual thesis: 既存の静かな hero と右カラムのしおり感は維持し、見た目を変えずに意味だけを澄ませる。
- content plan: `棚にある言葉` は現状維持しつつ、テーマタグは「このページで出会える観点」、cue は「このページを開く動機」に読み替える。
- interaction thesis: CTA や featured review の主導線を奪わず、右カラムを「ここで何が見つかるか」を短時間で把握するための見取り図として機能させる。

## Current-State Findings

- 実装箇所: `src/pages/reviews.astro` の `hero-panel`。
- 現在のデータソース:
  - テーマタグ: `reviewCards[].tags` を集計した `spotlightThemes`
  - `こんな気分の日に`: `reviewCards[].recommendedFor` を重複排除した `readingCues`
- 現在のズレ:
  - `tags` 上位に `その他` が出るため、一覧ページ紹介として意味が弱い。
  - `recommendedFor` は「ゴールキーパーとしてプレーしてきた人」のような個別記事向け粒度を含み、ページ全体の来訪動機としては狭すぎる。
- ページ全体で実際に得られるもの:
  - 再起 / 自己理解 / 青春の熱 / 働き方と人生の問い / 世界の見え方の変化といった複数軸のレビュー
  - テーマ、抜粋、おすすめ対象のどこからでも一冊を選べる導線
  - 「次の一冊をひらく前に、言葉の余韻をひとくち。」という hero copy に沿う静かな選書入口

## Scope Declaration

- 変更対象ファイル:
  - `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/pbi-input.md`
  - `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/plan.md`
  - `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/test-cases.md`
  - `docs/tasks/TASK-reviews-reading-notes-copy-refresh-2026-04-21/status.md`
  - `src/pages/reviews.astro`
  - `inbox/daily/2026-04-21.md`
- 変更しないもの:
  - `src/pages/reviews.astro` のレイアウト / CSS / CTA 構造
  - 左 hero copy
  - featured review / review stream / afterword の文言
  - `src/content/reviews/*.md` の実データ

## Non-Scope

- READING NOTES 以外のエリアのコピー改修
- latest review 導線の新設や移設
- 新しいブロック追加や別導線追加
- 他ページや他コンテンツへの反映
- デザイン刷新やリファクタ

## Wording Update Policy

- テーマタグは、個別本のジャンル分類ではなく「一覧ページで出会える観点」として成立させる。
- cue は、特定の読者属性ではなく「このページを開く自然な動機」として書く。
- 文言は hero の静かなトーンを壊さず、ただし用途が一読で分かる具体性は残す。
- `本 × ココちゃん × 学び` のうち、今回は「本」と「学び」の入口としての明瞭さを優先し、過剰に抽象的な言い回しは避ける。

## Candidate Comparison Summary

- テーマタグ案 A:
  - `再起と自己理解`
  - `青春とまっすぐさ`
  - `働き方と人生の問い`
  - `世界の見え方をひらく本`
- テーマタグ案 B:
  - `立ち止まりと再出発`
  - `熱をくれる物語`
  - `働き方と生き方`
  - `考えをほどく読書`
- 比較要約: A は現在のレビュー群の実際の傾向に忠実で、一覧を開いたときに何が並ぶかを想像しやすい。B は柔らかいが、抽象度が上がり実内容との対応がやや見えにくい。

- `こんな気分の日に` 案 A:
  - `今の自分に合う一冊があるか、まず一覧をのぞきたい日`
  - `物語の熱と、立ち止まって考える読書の両方を見比べたい日`
  - `テーマや抜粋から、読む前の距離感をつかみたい日`
- `こんな気分の日に` 案 B:
  - `次の一冊を、気分や関心から探したい日`
  - `背中を押してくれる本と、考え込める本のどちらにも開いていたい日`
  - `レビューの余韻から、自分に合う入口を見つけたい日`
- 比較要約: A はページ内の実導線である「一覧」「テーマ」「抜粋」に触れていて、ページ紹介としての解像度が高い。B は詩的でトーンは合うが、どこで選べるかの説明が弱い。

## Final Adopted Copy

- テーマタグ:
  - `再起と自己理解`
  - `青春とまっすぐさ`
  - `働き方と人生の問い`
  - `世界の見え方をひらく本`
- `こんな気分の日に`:
  - `今の自分に合う一冊があるか、まず一覧をのぞきたい日`
  - `物語の熱と、立ち止まって考える読書の両方を見比べたい日`
  - `テーマや抜粋から、読む前の距離感をつかみたい日`
- 採用理由: 現在のレビュー群の幅を保ちながら、個別記事の対象者説明ではなく「このページで何が見つかるか」「どういう日に開くか」がそのまま読めるため。

## Parallel Work Check

- [ ] P1: 同時に進めるべき独立タスクが2つ以上ある
- [ ] P2: 各タスクの対象（ファイル・調査範囲）が完全に分離されている
- [ ] P3: 順序に依存がない（どちらが先でも成立する）

すべて未チェックのため、単独で進める。

## Implementation Steps

1. task 文書を作成し、現状把握・候補比較・最終採用案・検証方針を固定する。
2. `src/pages/reviews.astro` の READING NOTES 用 theme / cue を、集約データからページ紹介用の固定文言へ置き換える。
3. 差分が最小であることを確認し、frontend verify 一式を実行する。
4. `claude-review-gate` を通し、必要があれば最小差分で修正して再検証する。
5. `status.md` と daily を更新し、結果と残件有無を記録する。

## Risks And Guards

- 想定リスク:
  - 文言が抽象寄りになり、一覧ページで見つかる内容が逆に想像しづらくなる。
  - 固定文言化で現在のレビュー群とズレた表現を入れてしまう。
  - 不要な構造変更や CSS 変更に scope が広がる。
- 回避策:
  - 候補比較を task 文書に残し、実レビューの傾向との対応を明示してから採用する。
  - ランタイム差分を `src/pages/reviews.astro` の文言定義だけに限定する。
  - verify と目視系確認で hero / CTA / featured review に副作用がないことを確認する。
- scope 外に見つけた事項の扱い: 今回は `status.md` にメモするだけで実装しない。

## Verification

- 実行するコマンド:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`
- 追加確認:
  - `git diff --stat`
  - `git diff -- src/pages/reviews.astro`
  - `dist/reviews/index.html` またはブラウザで、右カラム文言・CTA・featured review に副作用がないことを確認する

## Approval

- approver: owner self
- status: approved
- note: ユーザー依頼と repo の Lightweight PlanGate に従い、本 plan を今回タスクの Source of Truth として自己承認する。
