# PBI Input

## Task

- task-id: TASK-works-home-intro
- title: `/works/` の紹介画像とホーム構成を目的・使い方・CTAに合わせる
- owner: Luna
- date: 2026-09-28

## Request Summary

- `/works/` の紹介画像を、ワークの目的と使い方が伝わり、次の行動を促す内容へ作り変える。
- ワークホームのページ構成を新画像と一致させ、画像・コピー・ページ内導線を一続きの説明にする。

## Goal

- 達成したいこと: 初めて訪れた読者が、本の問いを日常で試す短いワークの目的と使い方を理解し、気分や気がかりに合うワークへ進める。
- 完了条件: 引き渡された画像と構成メモに沿って実装し、既存の検索機能・全件一覧・詳細/関連書籍導線・公開境界を保つ。desktop/mobileで構成とCTAを確認し、frontend verifyとClaude review gateを完了する。

## Scope

- 含める: `src/pages/works/index.astro`, `src/styles/works.css`, `public/works/works-intro-20260928.jpg`（1536×1024）と`public/works/works-intro-20260928-768.jpg`（768×512）のページ内紹介画像、必要最小限の既存E2E確認、本PlanGateと完了記録。
- 含めない: 画像生成・編集（Solが担当）, OGP/Xカード/metaと既存social画像, 個別ワーク本文・公開状態, finderの絞り込みロジック, 他ページ。

## Constraints

- 分類: `publish/dev-critical`。PlanGate、Claude review gate、frontend検証を適用する。
- 元mainのdirty/untracked作業を変更しない。専用worktree `/Users/shogo/Projects/coco-works-home-intro` と `codex/works-home-intro` を使う。
- 実装着手条件: 新画像ファイルと画像に合わせた具体的な構成メモの受領、およびPlanGate承認。
- `/works/` のOGP/Xカードは新画像から独立して維持する。

## References

- `AGENTS.md`, `docs/parallel-dev-config.md`, `docs/process/lightweight-plangate.md`
- `docs/brand/reading-with-coco-brand-strategy.md`, `docs/brand/reading-with-coco-content-guidelines.md`, `docs/brand/reading-with-coco-ai-operations.md`
- `docs/reading-with-coco-design-doctrine.md`, `docs/frontend-playbook.md`, `DESIGN.md`, `src/styles/theme.css`
- 既存の`docs/tasks/TASK-works-hero-refine/`と`src/pages/works/index.astro`

## Confirmed Inputs

- 受領画像は左に開いた本、中央に3枚の白紙と1枚を選ぶココちゃん、右にノートと鉛筆が描かれている。1536×1024版は401KB、Sol作成の768×512版は120KB。
- 具体構成: desktop Heroは左にブランド表記、H1「本の問いを、今日の自分へ。」、目的説明、CTA「気分からワークを探す」→`#work-finder`。右に画像を全体が見える比率で表示。mobileはcopy→CTA→画像。
- Hero直下にカードを使わず細い区切りで「このページの使い方」を置き、〈気分や気がかりを選ぶ／合いそうなワークをひとつ開く／紙やメモで数分試す〉の3手順を示す。その後にfinder、一覧を続ける。重複するfinder導入文は短く整える。
- 実装前にSolによるPlanGate承認が必要。
