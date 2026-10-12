# Test Cases

## Task

- task-id: TASK-works-autopublish-20261012-another-possibility-note-3min
- related plan: plan.md

## Must Check

- [x] 追加後のcurrent work Markdownは21件。初回npm run test:worksは35件中34件成功で、固定件数テストだけが21 !== 20で失敗した。証跡を参照する。
- [x] 改訂PlanGateのClaude arch→diff合格後、scripts/work-import.test.mjs:188のテスト名 all20→all21 と190行目の件数期待値20→21だけを更新し、全ファイルを回すreader-copy guard loopと判定ロジックを維持してnpm run test:worksが通る。
- [x] 7納品ファイルの期待SHA-256/byte、親確認のjob一致が成立する
- [x] PNGの実寸が1080×1350（4:5）で、image-qa.jsonのfinal_sizeと一致する。不一致ならdry-runへ進まない
- [x] slug/画像pathが未使用で、relatedReview `watashi-ga-machigatteru-kamosirenai` が公開済み、bookTitleが同Review title「私が間違っているかもしれない」と完全一致する
- [x] moods/concernsがtaxonomyに存在し、受領JSONの手順・画像名・出典・注記が維持される
- [x] dry-runとprivate importが成功し、import後のpublishedはfalse、追加は対象Markdown/画像だけ
- [x] input画像とimport画像がbyte一致する
- [x] desktop 1440×960とmobile 390×844で一覧・詳細・画像・手順・Review導線・出典・未検証・安全注記・noindexを確認する
- [x] 公開コピー4点: 本人の目線、AI調査/第三者Review目線なし、本と本人の経験の根拠、引用/翻案と研究限界/未検証を保持
- [x] 思考経路4点: 具体的な心配、本の問い、見方を変えなくてよい余地、休む/相談/保留/終了も含む選択可能な一歩
- [x] 危険、虐待、ハラスメント、強い恐怖を感じる場面を対象外とし、被害の正当化を避ける記載がある
- [x] preview合格後だけ対象のpublishedをtrueにする
- [x] test:works、verify:frontend、check:works-dist、build出力の検証に成功する
- [ ] 独立Sol reviewerの全差分arch/diff/crossが、対象HEADに対して成立しblocking 0。merge直前にも最新exact HEADを同じ独立reviewerが確認する
- [ ] PR差分はscope内、PRはmergeable、必要CI成功。squash mergeとPages公開検証が成功する
- [x] build HTMLがwork詳細から関連Reviewと共有画像を正しく参照し、対象メディアがdistへ生成される
- [ ] Pages deploy後にcache-bypassで一覧・詳細・Review相互リンク・共有画像のURLをdesktop/mobileで確認し、HTMLが参照する最適化AVIF/WebPを取得できる
- [ ] 元checkout、他worktree、制作納品・job/historyが不変

## Limited Test Scope

- 追加するファイルはscripts/work-import.test.mjsのみ。変更は188行目のテスト名 all20→all21 と190行目のassert.equal期待値20→21の2箇所。
- reader-copy guardの本体、全ファイル走査loop、failure coverage、製品コードの挙動、他のテストは変更しない。
- PlanGate改訂のClaude arch→diffが成立するまでtest fileを変更しない。変更後にnpm run test:worksがpassしなければ、他のコマンドへ進まず停止する。
- 初回failure evidence: /private/tmp/coco-site-another-possibility-evidence/2026-10-13/test-works-initial-failure.md。

## Command Checks

- [x] npm run works:import -- <absolute site-work.json> --dry-run
- [x] npm run works:import -- <absolute site-work.json>
- [x] npm run test:works
- [x] npm run verify:frontend
- [x] npm run check:works-dist
- [x] git diff --check

## Manual Checks

- [x] private previewのdesktop/mobile一覧・詳細・画像・手順・出典・安全注記・Review相互導線/noindex
- [x] 公開コピーにAI調査状況と第三者review視点がない
- [x] 原典研究の課題・対象・限界と今回の3分版未検証を正しく区別する
- [x] 短縮版で関係改善や気分変化を保証しない
- [x] 安全に尋ねる/保留/休む/相談/ここで終える選択肢が読める

## Optional Checks

- [ ] なし。公開完了に必要な確認はすべてMust Checkに記載。

## Out Of Scope

- 過去inbox成果物の公開
- X/Instagram投稿
- 制作画像の生成/再生成、制作納品・job/historyの編集
