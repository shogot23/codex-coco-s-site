# Test Cases

## Task

- task-id: TASK-works-voice-20261006-just-being-together
- related plan: plan.md

## Must Check

- [x] frontmatter bookConnection と本文「本とのつながり」が、ユーザー指定文と一致する
- [x] 本文導入の「公開レビューから受け取った」が「読んで受け取った」へ変わる
- [x] 公開コピーに「原著全文は未読」「出版社書誌・紹介・目次を確認」「レビュー筆者」が残らない
- [x] 既存Reviewの一人称表現だけを根拠とし、別の個人経験を追加しない
- [x] 研究・未検証注記、安全文、手順、画像、slug、Review ID、published状態が変わらない
- [x] scope外のファイルに変更がない
- [ ] production HTMLで対象文とReviewリンクが確認できる

## Command Checks

- [x] npm run test:works
- [x] npm run verify:frontend
- [x] npm run check:works-dist

## Manual Checks

- [x] diffで対象範囲と文言を目視確認する
- [x] 公開Reviewの対応する一人称文と照合する
- [ ] cache-bypass公開URLで本文・Review導線を確認する

## Optional Checks

- [x] git diff --check
- [ ] PR CIでfrontend-verifyが成功する
- [ ] Pages deployと公開HTMLの再取得が成功する

## Out Of Scope

- 原著全文や研究の追加調査
- 画像生成/編集や画像検証のやり直し
- SNS投稿
- 他の作品・レビュー・分類・デザインの変更
