# Status

- result: サイト原稿と最終GLMレビュー・ローカル検証は完了。PR/CI/merge/Pages、本番公開確認は未完了。
- updated: 2026-11-19 Asia/Tokyo
- scope: 『敗北のスポーツ学』「その場の条件を見る2分メモ」1件のみ。
- branch: `codex/works-notice-the-conditions-2min-20261118`
- base: `bf14198dcffc65d0ef3211109795b742002c88ce`（最新origin/mainへ同期）

## 完了した確認

- 制作jobと指定inboxの必須7点は指定SHA-256およびbyte比較が一致。`delivery-manifest.json`も同じ7点を記録。
- `site-work.json`の値、サイトMarkdownの各frontmatter項目・本文、画像SHAを照合。入力の画像は1080×1350、サイト画像SHAは `9befba995705f18be1bb9d7a006f3fb51ea03985ebb245f4d28dca2fdc36fc0c`。本文と画像は納品どおり。
- 書名 `敗北のスポーツ学` と公開レビュー `haiboku-no-sports-gaku` が一致。気分/悩み分類IDは既存taxonomy。slug/assetの衝突なし。
- 既存公開レビューと原稿との往復リンクを確認。読者向けコピー4点（本人視点、AI調査事情/第三者視点の排除、本と経験の根拠、引用/翻案と研究限界）を確認。
- `npm run test:works`: 固定件数テスト名と期待数を33から34へ更新し、35/35成功。公開状態trueの最終原稿でも35/35成功。
- `npm run test:works-preview`: desktop Chromium / mobile Chromeで80/80成功。対象作品のround-trip、画像比率、手順数、研究限界、レビュー相互導線、横幅、アクセシビリティを確認。プレビューHTMLは `noindex, nofollow`。
- `npm run verify:frontend`: lint / typecheck / build / E2E成功。typecheckは65 files・0 errors/warnings/hints、E2Eは137 passed / 7 skipped。
- `npm run check:works-dist`: `Draft exclusion verified across dist`。
- 通常buildのdistに一覧、詳細、レビュー双方の導線、OG/Twitter画像URLを確認。HTML参照の480×600 WebP SHA `4cf0596ce22ce400e662ba6c2cad839b3e643919bda9b8ca30e1c90ef12209ed`（113,384 bytes）、1080×1350 WebP SHA `4d4d23517eb9318fe2327b263adb22b9d2d6f0fa77f4a953112a541a3d896364`（433,254 bytes）。
- 対象Markdownだけ `published: true`。slugは維持。PR未作成のため、現時点では本番公開ではない。

## Claude review

- 継続arch/diffレビュー: glm-5.3/high、実モデルglm-5.3、StructuredOutput成功、exit 0、`ok:true`、blocking 0。選択肢表記の差と本とのつながり段落の二重表示がadvisory。凍結済み原稿を保持し、この範囲では変更しない。件数テストは全Markdownを数えるため公開状態に依存しない。
- GLMレビューは完了。commit / PR / CI / merge前cross-check / Pagesへ進む前に、差分と検証状態を再確認する。

## 未完了

- 差分/範囲の最終確認、commit/push/PR、`codex`等のラベル、CI/mergeable確認、merge前cross-check、squash merge、main同期と安全な作業枝整理。
- Pages実行成功、cache-bypassした公開一覧・詳細・レビュー往復リンク、公開HTML OG/Twitter、HTML参照480/1080 WebPのbyte照合。
- 公開確認前のため、PR/merge/deploy/public URLは未確認。元dirty main worktree、制作job/納品/historyは変更していない。

## 再開点

PlanGateの承認済み範囲で公開コピーと固定件数の最小diff reviewを完了する。blocking 0と全検証成功を確認後にPR工程へ進み、Pagesと公開URL/画像bytesを確認して最終状態を更新する。
