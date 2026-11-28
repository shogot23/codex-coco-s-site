# PBI Input

## Task

- task-id: TASK-works-autopublish-20261127-back-to-the-cup-1min
- title: 「一杯に戻る1分」を新規成功分としてサイト公開
- owner: 指定実行 gpt-6-luna / max、単一writer
- date: 2026-11-27

## Request Summary

- 依頼の要約: 2026-11-27の「Coco毎日の修復ワーク」で制作・検証・納品まで完了した1件だけを、既存のワーク掲載機能から公開する。
- 背景: `docs/works-publishing.md` 冒頭の継続承認は、自動公開設定の更新後に新規完成した成果物を対象とする。この当回成果物は7点納品、Studio jobとの照合、history 40→41を完了している。親タスクの実turn_contextログで本実行が `gpt-6-luna / max` と照合済み。

## Goal

- 達成したいこと: slug `back-to-the-cup-1min`、書名『今日も、喫茶店より』、ワーク「一杯に戻る1分」を、既存レビュー `kyomo-kissaten-yori-sato-mitsuharu` と正しく結び付け、1件だけ公開する。
- 完了条件: 下書きプレビューと4点の読者向け文言確認、Claude review gate、指定検証、PR CI、merge後Pages、公開一覧・詳細・レビュー相互リンク・共有画像の独立確認を完了し、確認した公開URLと画像の証拠を記録する。公開確認前は完了扱いにしない。

## Scope

- 含める:
  - `src/content/works/back-to-the-cup-1min.md` と `src/assets/works/back-to-the-cup-1min.png` の追加。`works:import` の入力は納品原本の `site-work.json`。
  - `published:false` のままPC・mobile previewを確認し、所定レビュー後に対象Markdownの `published` だけを `true` にする。
  - 本PlanGate文書、完了時の `status.md`、当日記録（`inbox/daily/2026-11-27.md` に統一）。
- 含めない:
  - 原本、履歴、元repoのdirty main、他のslug/記事/画像/設定の変更、制作や画像再生成、X/Instagram投稿、設定更新前に完成した既存納品物の公開。
  - CI・レビュー・検証・公開確認の失敗を迂回する修正。固定件数テストは通常変更しないが、11/28 amendment 条件を満たす場合に限る既存テスト2行の期待値同期は例外とする。

## Constraints

- 既存運用との整合: `docs/works-publishing.md`、`docs/parallel-dev-config.md`、ブランド各文書、`claude-review-gate`、`pr-merge` に従う。元repoは多数のdirty/untrackedファイルを含むため変更しない。最新 `origin/main` 起点の `/private/tmp` 隔離worktreeと新規 `codex/` branchを単一writerとして使う。
- 納期 / 優先度: 継続承認の対象となる当回1件を、各ゲート合格時にのみ前進させる。
- 触ってよいファイルや領域: 上記の対象Markdown/画像、当タスクディレクトリの記録、当日daily。テストコードは原則変更しない。実失敗が当回Markdown1件分の固定件数差だけと確認できる場合は、PlanGate amendmentのClaude review合格後に `scripts/work-import.test.mjs` の既存テスト名と期待値の2行だけを36から37へ同期し、既存 `test:works` を再実行する。

## References

- 関連ドキュメント: `AGENTS.md`、`docs/parallel-dev-config.md`、`docs/works-publishing.md`、`docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/brand/reading-with-coco-ai-operations.md`、`docs/reading-with-coco-design-doctrine.md`、`docs/process/lightweight-plangate.md`。
- 納品原本: `/Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-11-27_2230_back-to-the-cup-1min`。`site-work.json` SHA-256 `83a92e8244feaaba4b8019a67c31f165d1cbf62af13c94b671a9c3dd0d0657c5`、PNG SHA-256 `0c304f5fdbf5d57c0d9a18925f24b550a12da34db0a4ab42b7ad9da919eb8f83`。
- 書誌: KADOKAWA公式、佐藤満春『今日も、喫茶店より』、紙ISBN 9784043302048、https://www.kadokawa.co.jp/product/322605000626/。
- 本文接続の根拠: 公開レビュー `src/content/reviews/kyomo-kissaten-yori-sato-mitsuharu.md` の35–41行。
- 研究: Colombo et al. (2024), DOI 10.1007/s10902-024-00721-2, https://link.springer.com/article/10.1007/s10902-024-00721-2 。97成人の出来事単位・被験者内無作為割付、日常の快い出来事への数分の注意、1週間後の想起と快さの自己評価を扱う。公開文には研究条件との差と30秒短縮版未検証を保つ。

## Notes

- 領域固有メモ: 読者の悩みは「夜になっても今日の出来を採点し続ける」。一覧 `readerWorry` / `description`、本文 `body` の冒頭と番号付き手順、振り返りの `completion` / `question` に、任意の30秒・見方の余地・「休む・相談する・ここで終える」がつながることをPC/mobile previewで目視し、既存 `tests/e2e/works.spec.ts` の `work and book round trip: back-to-the-cup-1min` と `scripts/work-import.test.mjs` のimport・コピーガードを実行して確認する。テスト方式やE2Eは変更しない。固定件数の既存テスト名・期待値だけは、2026-11-28 amendmentの条件とClaude reviewを満たす場合に限り2行同期する。
- 公開文4点チェック（この一覧を定義元として、plan/test-casesも同じ基準を参照する）:
  1. ユーザー本人の目線で書く。
  2. AIの調査状況・未読事情と、レビューを第三者として語る視点を公開文へ持ち込まない。
  3. 本と本人の受け止めは公開レビュー35–41行で裏付けられる内容に限り、読了や個人体験を推測しない。書籍全文と紙版・公開版の逐語一致は未確認。
  4. 本からの引用・著者の手順と日常向け翻案を区別し、研究の実測条件との差と30秒短縮版未検証を明記する。
- 未確定事項: なし。slug・本・公開レビュー・元画像の衝突は最新origin/main上で事前確認する。

## 2026-11-28 継続指示による限定変更

- `npm run test:works` の実結果は35件中34 pass / 1 fail。唯一の失敗は `all 36 current work Markdown files pass the narrow reader-copy guard` で、実数37・期待値36。`origin/main` のMarkdownは36件、現worktreeの追加分は `src/content/works/back-to-the-cup-1min.md` のみで、他テストに失敗はない。
- ユーザーの「最後まで実施」継続依頼と親の限定委任に基づき、この差が再確認できた場合だけ、既存 `scripts/work-import.test.mjs` の当該テスト名と `assert.equal` 期待値を36→37に変更する。テスト設計・他の期待値・新規テストは変更しない。
- テストソース変更前にこのPBI・plan・test-cases amendmentのClaude reviewを完了する。review不合格または実際の失敗がこの固定件数差以外にもある場合は停止し、追加修正へ広げない。
