# Plan

## Task

- task-id: TASK-works-home-intro
- related PBI: `pbi-input.md`

## Review Classification

- `publish/dev-critical`: 公開UIの情報設計、ページ構成、CTAを変更する。

## Visual Thesis

- 左の開いた本から、中央で白紙を選ぶココちゃん、右のノートと鉛筆へ視線が流れる画像を、ワークの使い方そのものを示す場面として見せる。desktopではcopyと画像を左右に置き、画像全体を読み取れる比率を保つ。mobileではcopy→CTA→画像の順に並べ、768px幅の画像を配信する。

## Content Plan

- Heroに「読書 with Coco / ワーク」、H1「本の問いを、今日の自分へ。」、説明「本から生まれた問いを、手元で試せる短いワークにしました。今の気分や気がかりから、合いそうなひとつを選べます。」を置く。
- Hero直下にカードを使わず細い区切りを設け、「このページの使い方」を〈気分や気がかりを選ぶ／合いそうなワークをひとつ開く／紙やメモで数分試す〉の3手順で案内する。
- その後にfinder、ワーク一覧を続け、finderの重複導入文は簡潔に整える。既存の個別ワークと関連書籍への導線を保つ。

## Interaction Thesis

- Heroの主CTA「気分からワークを探す」は`#work-finder`へ移動する。finderに移動した後も選択を強制せず、全件を見られる状態を保つ。
- 個々のワークから手順へ進み、関連書籍へ戻れる既存導線を維持する。

## Scope Declaration

- 変更対象: `src/pages/works/index.astro`, `src/styles/works.css`, 受領した紹介画像と768px派生画像のページ用配置、必要最小限の `tests/e2e/works.spec.ts`、本PlanGate一式、完了時の作業記録。
- 変更しないもの: OGP/Xカード・meta・social画像、検索ロジック、公開/プレビュー境界、個別ワーク内容、他ページ。
- 元mainのdirty/untracked workは専用worktreeで保護する。

## Implementation Steps

1. 受領済みの新画像と具体的な構成メモを確認し、実画像の比率・余白・視線誘導がページ構成に合うことを確かめる。
2. 本planとtest casesのClaude plan reviewを完了し、結果をSolへ承認用に報告する。承認まではアプリコードを変更しない。
3. 承認後にページの情報順、CTA、画像配置を最小差分で実装する。既存の絞り込みと公開境界は触れない。
4. desktop/mobileでページ全体の流れ、CTA到達、画像の可読性を確認し、必要なE2E確認を行う。
5. `npm run verify:frontend`、Claude review gateを完了し、PR/CI/merge/Pagesと公開HTML・参照メディアを確認する。

## Progress

- Step 1・2: 完了。新画像と構成案を受領し、Claude plan review `ok: true` を確認後、Solが承認。
- Step 3・4: 完了。ページ・CSS・E2E確認を更新し、desktop/mobileをSolが視覚承認。Sol提供の768px画像をmobile向けに配信するpicture sourceと、responsive srcset/sizesを追加。
- Step 5: frontend verify完了。変更後のClaude reviewとPR/公開確認を進行中。

## Verification

- `npm run verify:frontend`
- desktop/mobileでfirst viewport、画像から説明/CTAへの視線、セクション順、finder CTA、ワーク詳細と関連書籍導線を確認。
- 公開ワーク一覧、JavaScript無効時の一覧、`WORKS_PREVIEW` 境界が保たれることを確認。
- OGP/X用metaとsocial画像参照が変わらないことを確認。
- Claude review gateは変更規模に応じた必須phaseを全て通し、blockingなしを確認する。
- PR merge後、Pages deploy、cache-bypass公開HTML、画像URLと表示を確認する。

## Approval

- approver: Sol (親エージェント)
- status: approved
- note: 2026-09-28にSolが新画像・具体案・Claude plan review結果を確認して承認。画像をPRへ含め、OGP/X指定は維持する。
