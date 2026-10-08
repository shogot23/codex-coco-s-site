# Test Cases

## Task

- task-id: TASK-works-autopublish-20261007-thought-phrase-note-3min
- related plan: plan.md

## Must Check

- [ ] 7納品ファイルの期待SHA/byte/cmpと制作全ゲート完了証跡が一致する
- [ ] slugとasset pathが未使用で、relatedReviewが公開済み、bookTitleがReview titleと完全一致する
- [ ] mood/concern IDsがtaxonomyに存在し、手順・画像・研究注記・安全注記が受領JSONのまま保持される
- [ ] dry-runとprivate importが成功し、対象記事はpublished:false、対象Markdown/画像だけが追加される
- [ ] dry-runと通常importの両方が終了コード0となり、共有importer内のassertReaderFacingWorkCopyがreturn/write前に実行されていることをコード経路と成功結果で確認する
- [ ] PCと390×844 mobileのpreviewで一覧・詳細・画像・手順・出典・安全注記・未検証注記・Review導線・noindexを確認する
- [ ] 公開コピーの著者目線4点を確認する: bookConnection/bodyが本人の目線、AIの調査状況と第三者Review目線なし、本の説明と読書経験の根拠あり、引用/翻案の区別と研究限界/短縮版未検証を維持
- [ ] preview後は対象Markdownのpublishedだけをtrueにする
- [ ] test:works、verify:frontend、check:works-distとClaude gateが成功し、配布物とリンクが成立する
- [ ] PRの変更範囲・mergeability・CI・squash merge、Pages一覧/詳細/Review/画像HTTP応答が成功する
- [ ] 元checkoutのdirty内容とinbox納品物が不変である

## Command Checks

- [ ] npm run works:import -- <absolute site-work.json> --dry-run
- [ ] npm run works:import -- <absolute site-work.json>
- [ ] npm run test:works
- [ ] npm run verify:frontend
- [ ] npm run check:works-dist
- [ ] git diff --check

## Manual Checks

- [ ] desktop previewで一覧・詳細・画像・3手順・出典・Review導線を確認する
- [ ] 390×844 mobile previewで同じ項目と横スクロールの有無を確認する
- [ ] 文面と本の説明が本人の目線で、AI調査状況や第三者Review説明を含まないことを確認する
- [ ] 手順が日常向け翻案として示され、研究介入との違い、未検証、対象範囲、中止・休息・相談の選択肢が読めることを確認する

## Optional Checks

- [ ] 実ビルド出力の一覧・詳細URLとHTML参照メディアを確認する
- [ ] 公開後にcache-bypassでPagesの一覧・詳細・Review相互リンク・共有画像と480/1080 WebPを確認する

## Out Of Scope

- SNSへの投稿
- 画像の再生成、制作物/制作job/historyの編集、過去ワークの遡及公開
