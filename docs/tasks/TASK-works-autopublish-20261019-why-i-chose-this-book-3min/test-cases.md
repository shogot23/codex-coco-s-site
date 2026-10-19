# Test Cases

## Task

- task-id: TASK-works-autopublish-20261019-why-i-chose-this-book-3min
- related plan: plan.md

## Must Check

- [x] 7納品ファイルが承認SHA/byteと一致し、PNGは1080×1350。
- [x] 書名/著者/ISBN、公開review title、taxonomy、slug/画像衝突が正しい。
- [x] 本人の既存reviewの「通読で採点」「選んだ日の関心」だけを根拠にし、読了/経験を足さない。
- [x] 悩み→問いから試す→見方の余地→開く/置く/休む/中止/相談を本文・画像で確認する。
- [x] AI調査事情・第三者レビュー視点を公開文に含めず、翻案・研究限界・短縮版未検証を保つ。
- [x] dry-run/import後はpublished:false。previewはnoindexでPC/モバイル表示を確認する。
- [x] 公開時は今回記事のpublishedだけtrueで、ローカルdistに今回分が反映された。
- [ ] Pagesに他の意図しない差分がなく、今回の記事だけが公開されている。

## Input Manifest (Read Only)

納品元: /Users/shogo/Projects/codex-coco-s-site-main/inbox/work/2026-10-19_2157_why-i-chose-this-book-3min

| ファイル | byte | SHA-256 |
| --- | ---: | --- |
| frozen-spec.md | 5271 | c0f070741b54e09ed951a8b0db31ae8895716ad44af2cefafa668d6cf1cffabd |
| report.md | 3297 | b95d9ea1d0dbd0c21803412a10118040a78f265489bee86c8395ee0d28f90a34 |
| site-work.json | 5939 | 7af174af17109dbc8b2749db3b937bfa64cba769e0c81c05404603623764d2e3 |
| sources.md | 2449 | b024126ab9aa480704112f29b58b370e8e96bab7488f07f64a5a251eb4887874 |
| verification.md | 3537 | 046543771d17a8affbac0bc189ee49bf6bb8daeadfb6eed3f202c60b706841ec |
| x-post.txt | 418 | 0de315dd8e69fd36b79f89e8a196c6796b5e37c989e53264bf8149728b20729e |
| 積ん読の本_3分の選んだ理由メモ.png | 2863465 | bb586c16f6a1fdb681d48fe3a1a6809e2f738a820b1cf8820fc1670429729882 |

## Command Checks

- [x] npm run test:works
- [x] npm run verify:frontend
- [x] npm run check:works-dist
- [ ] Claude gate、PR checks、mergeable、squash merge、Pages完了

## Manual Checks

- [x] 1440×900で一覧・詳細・画像・手順・本への導線を確認し、横overflowなし。
- [x] 390×844で一覧・詳細・画像・手順・本への導線を確認し、横overflowなし。
- [x] ローカルdist HTMLで関連レビューURL、共有画像、HTML参照の最適化480/1080画像を確認する。
- [ ] Pages実HTMLで関連レビューURL、共有画像、HTML参照画像を確認する。
- [x] scope外変更がなく、元checkoutと納品7ファイルが不変。

## Out Of Scope

- 既存の公開記事・過去inboxの追加、SNS投稿、画像再生成、他PR/worktree。
