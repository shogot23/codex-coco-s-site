# Test Cases

## Task
- task-id: TASK-works-autopublish-20261117-choose-a-revisit-time-3min
- related plan: `plan.md`

## Must Check
- [x] 最新baseにslug/画像衝突がない。7点はPNG、`site-work.json`、`sources.md`、`report.md`、`x-post.txt`、`frozen-spec.md`、`verification.md` とし、SHAと `published:false` を確認する。
- [x] dry-runが成功し、通常importは対象Markdown・PNGだけを追加する。
- [x] draft previewの一覧・詳細・画像・3手順・出典・本への導線をdesktop/mobileで確認する。
- [x] 4点（本人の声、AI/第三者視点なし、根拠と経験範囲、翻案と研究限界）を意味で確認する。
- [x] `npm run test:works` の停止原因を記録する固定件数テスト名が `all 33 current work Markdown files pass the narrow reader-copy guard`、期待値が33、実ファイル数も33で一致する。PlanGate amendmentのGLM-5.3承認後に、この名称と期待値だけを変更する。
- [x] 公開時は `published` だけがfalseからtrueへ変わり、slug・本文・画像は不変。
- [x] `test:works`、`verify:frontend`、`check:works-dist` が成功する。
- [ ] distとPagesの一覧・詳細・関連レビュー相互リンク・OG/Twitter・480/1080 WebPを照合する。（ローカルdistは確認済み。Pages公開確認は未実施。）
- [x] 変更が対象2ファイル・固定件数テストの2行・本task記録に限られる。

## Stop Conditions
- 衝突、プレビュー/画像/文面の不一致、検証・Claude・CI・Pagesの失敗時は次段階へ進まない。

## Out Of Scope
- 過去納品、SNS投稿、画像再生成、既存の無関係な変更。
