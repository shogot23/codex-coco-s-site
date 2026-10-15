# 実装計画

ユーザー承認: 監査案の全対応とPR・mergeを2026-10-15に依頼済み。
実装owner: Codex。reviewer: Claude CLI / glm-5.3（read-only）。計画レビュー後に実装開始。

## 体験の定義
- visual thesis: 温かな紙面と既存のココちゃん画像を組み合わせ、短い導入と余白で読書の入口を伝える。
- content plan: Aboutは紹介→持ち帰れるものと実例→使い方→作り手→制作と購入方針→読書。Profileはココちゃん→性格と関係→実作品→書き手と選書の視点→読書。
- interaction thesis: 主CTAはレビュー、副CTAはギャラリー。本文のアンカーと具体的な実作品リンクで理解と回遊を支える。既存の控えめなhoverを踏襲し、不要な動きは加えない。
- 既存の共通shellに合わせ、full bleed landing化せず二つの紹介ページの静けさを保つ。brand・画像・CTAの一画面内到達を優先する。

## 対象
- src/pages/about.astro, profile.astro: 重複説明の整理、本文Markdownの意味のある見出し、公開作品の紹介。
- src/content/about/about.md, profile/profile.md, src/content/config.ts: 日本語タイトル、短い共有紹介を任意frontmatterとして分離。本文は通常のMarkdownとして描画し段落番号への依存を除く。
- src/styles/about-profile.css: 両ページに限った共通の紙面・人物紹介・導線スタイル。既存の長い専用CSSを整理。
- src/pages/index.astro, gallery.astro, src/layouts/Layout.astro: サイト紹介・リンク名を統一。
- tests/e2e/site-smoke.spec.ts: 既存のAbout/Profileの前提を更新し、実際の回遊とfirst viewportを検証。
- docs/tasks/TASK-about-profile-reader-guide/: 計画、根拠、検証、状態、daily。

## 事実の扱い
書き手は既存の最初の3冊で公開している「役割や環境が変わる日々で本に支えられてきた」という範囲と、公開レビューにある視点を使う。氏名、職業、診療等の情報を推定しない。
犬の誕生日等は既存公開値を維持。新しい写真の出自を断定しない。実際のココちゃんの紹介と、画像中の案内役の表現を区別する。
AI利用は画像制作と文章整理・表現検討の補助を説明し、原著の確認状況など内部の制作記録は本文へ持ち込まない。

## 実施順と完了条件
1. 計画をClaude arch review、blocking 0で実装。
2. ページ・本文・共有フィールド・導線・既存テストを更新。
3. npm run verify:frontend（lint→typecheck→build→E2E）。必要な不具合修正後に再実行。
4. desktop/mobileで実画面を目視、主要CTAと作品・相互リンクをクリック。
5. 規模に応じたClaude arch / grouped diff / cross-checkを完了。すべてok:true、blocking 0でcommit。
6. PR・CIと対象差分を確認、squash merge。Pages成功と公開HTML・参照画像のHTTPを検証。
7. 元mainはdirty変更と競合しない場合のみff-only同期。task branchをcleanupし、managed worktreeをarchive。

## 計画レビュー
Claude/glm-5.3 arch ok:true（2026-10-15）。advisory対応: 共有フィールドはoptionalで固定fallbackを用意、共通CSSは.guide-page内に限定し固有配置はページクラスで分離する。本文アンカーの実在とクリックをE2Eへ追加する。実装ownerが計画を承認。最終変更は再度arch/diff/cross-checkで確認する。

CMS連携補完: cms/decap/config.ymlのAbout/Profileラベルと任意frontmatter欄も合わせる。既存のCMS保存で新フィールドを失わないための同一scopeの対応。

アクセシビリティ補完: tests/e2e/technical-audit.spec.tsの既存axe検証対象にProfileを追加する。
