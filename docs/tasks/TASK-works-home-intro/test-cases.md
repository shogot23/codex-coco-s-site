# Test Cases

## Task

- task-id: TASK-works-home-intro
- related plan: `plan.md`

## Must Check

- [x] Heroの見出し「本の問いを、今日の自分へ。」と目的説明が表示される
- [x] 左の本→中央の白紙を選ぶココちゃん→右のノート/鉛筆の構図全体が見える
- [x] mobileでは768×512版、desktopではsrcset/sizesに応じた候補が読み込まれる
- [x] desktopはcopy左/画像右、mobileはcopy→CTA→画像の順に表示される
- [x] Hero直下の「このページの使い方」に3手順がカードなしで表示される
- [x] 主CTA「気分からワークを探す」が`#work-finder`へ移動する
- [x] finderの重複する説明が整理され、選択と全件表示の案内は残る
- [x] 選択しない場合も全ワークを閲覧できる
- [x] ワーク詳細と関連書籍への既存導線が保たれる
- [x] no-JS時の全件リストと`WORKS_PREVIEW`境界が保たれる
- [x] OGP/X metaとsocial画像の指定・ファイルが変更されていない
- [x] desktop/mobileで画像、文字、CTA、セクション順に崩れがない

## Command Checks

- [x] `npm run verify:frontend`（91 passed / 7 skipped）
- [x] works focused E2E（Chromium/mobile-chrome, 40 passed）
- [x] Claude review gate: arch/diff reviews complete, no blocking issues, `ok: true`

## Release Checks

- [ ] `public/works/works-intro-20260928.jpg` と`public/works/works-intro-20260928-768.jpg`がPRの変更に含まれる
- [ ] PR checks成功、Pages deploy成功
- [ ] cache-bypass公開URLでページ構成・CTAと画像が確認できる
- [ ] 公開HTML内のOGP/X画像が従来のsocial画像を参照する
- [ ] 紹介画像の公開URLが成功応答し、実表示できる

## Plan Review Note

- 表示文言、画像順序、リンク先はSol提供の画像と構成案に基づき確定済み。アプリコード変更はSolのPlanGate承認後に行う。
