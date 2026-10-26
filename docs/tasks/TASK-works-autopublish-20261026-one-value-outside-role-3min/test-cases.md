# Test Cases

## Task

- task-id: TASK-works-autopublish-20261026-one-value-outside-role-3min
- related plan: plan.md

## Must Check

- [ ] 受領7ファイルのSHA-256とjob/inbox間のcmpが一致する。
- [ ] 書名・公開レビュー `haiboku-no-sports-gaku`・slug `one-value-outside-role-3min` が一致し、既存content/imageとの衝突がない。
- [ ] import dry-runが成功し、取り込み後の `published:false` と画像SHA/1080x1350を確認する。
- [ ] 本人の声4点: 本人の目線、AI監査/第三者視点なし、本と本人の経験の根拠、引用/翻案と研究限界の明示。
- [ ] 役割喪失の強い想起を求めず、選べない/苦しい場合の空欄・終了・休息・相談を残す。
- [ ] previewでPC/mobileの一覧・詳細・画像・3手順・本リンク・研究と安全注記・全ページnoindex・横overflowなしを確認する。
- [ ] 公開差分は対象Markdownの `published` 以外で増えない。slugは固定。
- [ ] 変更差分が宣言scope内で、既存ファイルの変更がない。
- [ ] PR headの必須CI checksがすべて成功し、state=open・draft=false・mergeableでchanged filesがscope内。
- [ ] Pages deployがmerge SHAに対して成功し、cache-bypassの本番一覧・詳細・関連レビュー・共有画像・HTML参照最適化画像がHTTP確認を通る。

## Command Checks

- [ ] `npm run works:import -- <site-work.json> --dry-run`
- [ ] `npm run test:works`
- [ ] `npm run verify:frontend`
- [ ] `npm run check:works-dist`
- [ ] `git diff --check`

## Manual Checks

- [ ] Preview desktop 1440px: 一覧/詳細遷移、本文、画像、関連レビュー導線、noindex。
- [ ] Preview mobile 390px: 同上、手順を全て読める、横overflowなし。
- [ ] distに公開URLとHTML参照画像が出力され、下書き状態のpreviewでpublic distへ混入しない。
- [ ] 本番一覧/詳細/関連レビュー/共有画像/HTML参照の最適化画像がcache-bypass HTTP確認を通る。

## Conditional Checks

- [ ] 既存テストが件数固定を理由に失敗する場合のみ、その期待件数を一箇所で最小更新する。

## Out Of Scope

- X/Instagram投稿、画像生成・編集、UI刷新、既存ワーク/レビュー変更、既存PRや元checkoutの変更。
