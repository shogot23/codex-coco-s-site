# Test Cases

## Task

- task-id: TASK-works-voice-audit-20261006
- related plan: plan.md

## Must Check

- [x] 全19件の公開workを監査し、対象5件と理由をprivate auditへ記録する。
- [x] 5件のbookConnectionが本人視点となり、既存の本人Reviewの記述に根拠を持つ。
- [x] `feeling-one-word-note-3min` のfrontmatter/bodyが一致し、「原著本文は未読」「出版社提供目次を確認」等のAI監査開示が公開文から消える。
- [x] `公開レビューにある/レビューにある/レビューから/レビューで受け取った` 等の対象表現が公開work copyに残らない。
- [x] 5件以外の14 work、手順、研究・安全説明、sources、images、Review link、slug/classification、`published: true` が変更されない。
- [x] 変更範囲外の表示・画像に差分がない。

## Command Checks

- [x] `npm run test:works`
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`

## Manual Checks

- [x] 5ページのfrontmatter/bodyとReviewの一人称根拠を目視で照合する。
- [x] build outputで新コピーと既存relatedReview導線、画像参照を確認する。
- [ ] PR merge後のPages HTMLをcache-bypassで取得し、対象コピーと画像・リンクが正しく表示されることを確認する。

## Run Results

- `npm run test:works`: 28 passed, 0 failed.
- `npm run verify:frontend`: 101 passed, 7 skipped; lint/typecheck/build passed.
- `npm run check:works-dist`: draft exclusion verified across dist.
- Pages公開確認はmerge後に行い、確定結果はprivate release/completion evidenceへ保存する。

## Out Of Scope

- 今回やらない確認: 他ページ文の書き換え、研究の追加調査、画像の再検証/再生成、taxonomy/renderer/UI変更。
