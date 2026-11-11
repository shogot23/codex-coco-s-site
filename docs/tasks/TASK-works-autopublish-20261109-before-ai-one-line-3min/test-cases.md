# Test Cases

## Task
- task-id: TASK-works-autopublish-20261109-before-ai-one-line-3min
- related plan: `docs/tasks/TASK-works-autopublish-20261109-before-ai-one-line-3min/plan.md`

## Must Check
- [ ] inbox 7点が指定SHAと一致し、historyがSHA `5d05d108ab809b16ace866c74e85622c5f54f00b9bf34e3ac051d92005f1fea2` のまま。
- [ ] 公開レビューID/title一致、slug/image衝突なし、taxonomy既知、dry-run/通常import成功、初期 `published:false`。
- [ ] 一覧と本文に困りごと→見方の余地→選べる小さな一歩がある。振り返りの問いと休む/相談/終了も選べる。
- [ ] 研究の12分介入と3分翻案を区別し、短縮版未検証を表示。手順・出典・画像が一致。
- [ ] PC/モバイルで一覧、詳細、関連レビュー、画像、導線を確認。プレビューは非公開・noindex（ページのHTMLソースでrobots metaを確認）。公開後は実HTMLでnoindexが外れたことも確認。
- [ ] 公開後の一覧/詳細/レビュー相互リンク、OG、HTML参照WebPが実URLで確認できる。
- [ ] scope外差分なし。元main/inbox/historyは変更されない。

## Command Checks
- [ ] `npm run test:works`
- [ ] `npm run verify:frontend`
- [ ] `npm run check:works-dist`

## Approved Minimal Test Repair
- 前回停止時の失敗は固定件数テスト1件。Markdownを31件検出し、既存期待値30との不一致だった。
- 対象テスト名を `all 30 current work Markdown files pass the narrow reader-copy guard` から `all 31 current work Markdown files pass the narrow reader-copy guard` にし、同テストの件数期待値を31にする。
- 修正後に `npm run test:works` が通ることを確認する。失敗時は追加変更せず停止する。

## Approved E2E Recovery
- `tests/e2e/works.spec.ts` の購入URL抽出を、既存の複数行 `url:` 形式と、関連レビューが使う1行JSON `purchaseLinks` 形式に対応させる。両形式とも `https://af.moshimo.com/` URLだけを期待リストへ含める。
- 既存形式の抽出を維持し、1行JSON形式は `JSON.parse` で読む。
- 購入URLの存在、実ページURLとの一致、`target` / `rel`、アフィリエイト開示文の全アサーションを維持する。
- 今回承認範囲はE2Eテスト内の抽出処理だけ。レビューMarkdown、公開ページ、依存、CIは変更しない。
- PlanGateレビューでblocking 0を確認後に修正し、`verify:frontend` を再実行する。失敗時は追加変更せず停止する。

## Stop Conditions
- [ ] 失敗、衝突、未解決blocking、固定件数テスト失敗時は次工程へ進まず再開地点を記録。
- [ ] X/Instagram投稿、画像再生成、CI設定変更をしない。
