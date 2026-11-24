# Status

## 現在の状態

- status: 実装とローカル検証が完了。PR・CI・merge・Pages確認は未実施。
- classification: publish/dev-critical
- worktree: /private/tmp/coco-site-choose-a-reading-place-2min-20261124
- branch: codex/works-choose-a-reading-place-2min
- base: origin/main と同じ 879c6450215458935a427cfb4549340e075597b8
- original worktree: dirty状態を保全し、本作業では変更していない。

## 承認と対象範囲

- ユーザーは2026-11-24に「最後までやりきってください」「作業再開してください」と明示した。
- 対象は今回新規制作が成功した「読むところを選ぶ2分」1件。
- 最初の test:works で34件期待 / 35件実数の固定件数不一致を検出。親の指示で承認範囲を2行だけ拡張し、scripts/work-import.test.mjsのテスト名と期待値を34から35へ変更した。他のテスト行動や実装は変更していない。

## 取り込みとコピー確認

- 7点の納品ハッシュがhandoffと一致。canonical PNG SHA-256: f7b54de68fc79fc3a47cf11ba8a30c88f03bdbe773d42607bf857becfb984e02
- 依存未導入で最初のdry-runはsharp未解決エラー。隔離worktreeでnpm ciを実行し、package.json / package-lock.jsonの差分がないことを確認後に再実行した。
- works:import dry-runと通常importは成功。記事は初期状態published:false。
- imported PNGは納品PNGとcmp一致。SHAも上記canonical値と一致。
- PC 1440x900 / mobile 390x844で一覧・詳細・画像・手順・研究出典・関連レビュー導線をPlaywright実ブラウザで確認。mobileのdocument/body幅は390pxで、横overflowなし。
- プレビュー確認後、対象記事のpublishedだけtrueに変更。mobile詳細をreloadし、下書きバナーが消え、内容とリンクが残ることを確認した。
- 公開コピー4点は本人目線・AI/第三者視点の排除・本と経験の根拠・引用/翻案と研究限界を確認。既存の公開レビューとも照合した。

## Claudeレビュー

- Preflightは実glm-5.3、schema valid、exit 0。
- PlanGate初回arch/diffはok:true、blocking 0。小さなadvisoryを記録した。
- 固定件数scope追加後、high effort archは300秒でtimeout。API streamのfirst chunkは受信し、Connection error / rate limit / schema errorはなく、結果JSON未生成。
- 許可された1回のfocused retryはglm-5.3 / lowでarch・diffともok:true、blocking 0。各phaseで初回schema出力にseverity欠落があり、次の同一payloadで修復成功。validatorでschema_valid=true、payloads_identical=trueを確認した。
- 公開コピー4点レビューは実glm-5.3、exit 0、ok:true、blocking 0。advisoryは質問文が二択に見える点。本文・completion・safetyNote・画像で休む/相談/終了を明示しており、レビューも現状で公開可能と判定。ハッシュ済みの入力コピーを保つため文言は変更せず、理由を記録する。
- Plan diffのadvisoryはplan.mdの手順に既知の34/35失敗理由が残る点。statusに実行結果を記録し、承認範囲の理由を追える状態にした。
- 初回のdry-runエラーとtest:works失敗は解消済み。最終差分の実装レビューはPR前に実施する。

## 検証

- works:import dry-run: pass
- works:import通常import: pass、published:false
- 画像byte比較: cmp pass
- test:works初回: 34 pass / 1 fail。固定件数のみの不一致。
- test:works修正後: 35 pass / 0 fail
- verify:frontend: exit 0。lint pass、Astro check 65 files / 0 errors / 0 warnings / 0 hints、build pass、e2e 139 passed / 7 skipped。
- check:works-dist: exit 0、下書き除外確認 pass。
- dist: 一覧・詳細HTMLあり。関連レビュー・ギャラリー・DOIリンク、共有画像、optimized WebP参照を確認。480.webpは480x600、1080.webpは1080x1350。詳細OG画像は1080.webp。noindexなし。

## 要確認・次の工程

- Astro previewのpublished更新HMRでDuplicate id警告が1回出た。実ブラウザ一覧は対象カード1件、production buildとtest:works/check:works-distはpass。公開Pagesで重複がないことも確認する。
- Claude最終レビュー後、最小差分のcommit/push、新規PR、PR state/checks/mergeability確認を行う。
- CI成功とmerge前レビュー後にsquash mergeする。可能ならcodex/codex-automationラベルを付ける。
- Pages deploy後、一覧・詳細・レビュー相互リンク・共有画像・optimized WebPを実URLで検証し、PR URL・merge SHA・deploy結果・公開URLを追記する。
- Playwrightのsnapshot / screenshotは /private/tmp/coco-site-choose-a-reading-place-2min-20261124-evidence/playwright/choose-a-reading-place-2min/ に保持。
- Claudeレビューartifactは /private/tmp/claude-review/ 配下の2026-11-24-choose-a-reading-place関連ディレクトリに保持。
