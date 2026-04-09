# Plan

## Task

- task-id: TASK-review-buffon-autobiography-2026-04-09
- related pbi: pbi-input.md

## Intent

- 何を変えるか: レビュー content 1件 + ギャラリー content 1件を新規追加
- なぜ今やるか: 書籍レビューの定期追加

## Scope Declaration

- 変更対象ファイル:
  - `src/content/reviews/buffon-autobiography.md`（新規）
  - `src/content/gallery/autobiography-buffon.md`（新規）
- 変更しないもの:
  - `src/pages/reviews.astro`
  - `src/pages/reviews/[slug].astro`
  - `src/pages/gallery/[slug].astro`
  - `src/content/config.ts`
  - その他すべての既存ファイル

## Frontmatter 設計

### Review content（buffon-autobiography.md）

```yaml
---
title: "ジャンルイジ・ブッフォン自伝　何度でも立ち上がる"
bookTitle: "ジャンルイジ・ブッフォン自伝　何度でも立ち上がる"
author: "ジャンルイジ・ブッフォン"
description: "ずっと憧れだった人が、道しるべになった。伝説のGKが綴る挫折と復活の軌跡。"
excerpt: "ずっと憧れだった人が、道しるべになった。"
date: 2026-04-09
cover: /uploads/gallery/books/Buffon_Autobiography_Gianluigi_Buffon.png
infographic: /uploads/review/infographic/buffon_autobiography_gianluigi_buffon.png
tags:
  - ノンフィクション
  - 再起
  - 自己理解
recommendedFor:
  - "GK経験者"
  - "今、人生の壁にぶち当たっている人"
  - "ブッフォンが好きな人"
purchaseLinks:
  - label: 楽天で見る
    url: "https://af.moshimo.com/af/c/click?a_id=5459507&p_id=54&pc_id=54&pl_id=616&url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18471013%2F&m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21819467%2F"
published: true
---
```

本文（Markdown body）:
```
ずっと憧れだった人が、道しるべになった。

21世紀最高GKに選ばれたブッフォン。

サッカーを始めたころからGKだった私の、永遠の憧れの選手です。

高校時代、2006年W杯決勝のあのスーパーセーブを食い入るように観ていました。

（ジダンの頭突きを審判に知らせたシーンも、忘れられない笑）

そんな彼が、私と同じ病気に苦しんでいた。

私と同じように立場が変わって、求められる役割を果たせなかった後悔を抱えていた。

スーパーマンのような存在でも、同じように苦しみ、もがく。

でも彼はそれに立ち向かい、克服してきた。

だから"ブッフォン"なのだと。

読み終わったあと、彼への気持ちが「憧れ」から「道しるべ」に変わっていました。
（「聖書」と言いたいところですが、それは胸の内にしまっておきます）

GK経験者は必読。

そして今、人生の壁にぶち当たっているすべての人に届けたい一冊です。

P.S. 書店でこの本を買ったら、レジの方がブッフォンのファンだった！「カシージャスと競ってたのが痺れましたよね！」って。もっと話したかったぜ！！Amazonでばっかりじゃなくて、たまにリアル本屋に行くと素敵な出会いがあるものです。
```

### Gallery content（autobiography-buffon.md）

```yaml
---
title: "ジャンルイジ・ブッフォン自伝　何度でも立ち上がる"
image: "/uploads/gallery/books/Buffon_Autobiography_Gianluigi_Buffon.png"
genre: "自伝"
author: "ジャンルイジ・ブッフォン"
description: "ずっと憧れだった人が、道しるべになった。伝説のGKが綴る挫折と復活の軌跡。"
source_file: "gallery/books/Buffon_Autobiography_Gianluigi_Buffon.png"
relatedReview: "buffon-autobiography"
published: true
---
```

### アフィリエイト URL 変換メモ

- 提供元: `//af.moshimo.com/af/c/click?a_id=5459507&amp;p_id=54&amp;pc_id=54&amp;pl_id=616&amp;url=https%3A%2F%2Fitem.rakuten.co.jp%2Fbook%2F18471013%2F&amp;m=http%3A%2F%2Fm.rakuten.co.jp%2Fbook%2Fi%2F21819467%2F`
- 変換: `//` → `https://`、`&amp;` → `&`（HTML エスケープ解除）
- 改変禁止

### 画像ファイル名（確定）

| 用途 | 確定パス |
|------|---------|
| 表紙 | `public/uploads/gallery/books/Buffon_Autobiography_Gianluigi_Buffon.png` |
| インフォグラフィック | `public/uploads/review/infographic/buffon_autobiography_gianluigi_buffon.png` |

## Implementation Steps

1. clean worktree 確認: `git status --short --branch` で working tree clean を確認
2. feature branch 作成: `git switch -c feat/review-buffon-autobiography`
3. `src/content/reviews/buffon-autobiography.md` を新規作成
4. `src/content/gallery/autobiography-buffon.md` を新規作成
5. 段階検証:
   - `npm run lint`
   - `npm run typecheck`
   - `npm run build`
   - `npm run test:e2e`
   - `npm run verify:frontend`（上記4コマンドの統合実行）
6. `claude-review-gate` でレビュー（ok: true まで反復）
7. commit → push → PR 作成

## Risks And Guards

- 想定リスク: 画像未配置でビルド時にリンク切れ
  - 回避策: frontmatter にパスを記載するが Astro は画像存在を検証しないためビルドは通る。表示は hero fallback で対応。
- 想定リスク: アフィリエイト URL 変換ミス
  - 回避策: 変換前後を明記し、手動確認を test-cases に含める
- scope 外に見つけた事項の扱い: 今回は触れない

## Verification

- 実行するコマンド（repo 既定の順）:
  - `npm run lint`
  - `npm run typecheck`
  - `npm run build`
  - `npm run test:e2e`
  - `npm run verify:frontend`（= lint + typecheck + build + test:e2e の統合）
- 追加確認:
  - `npm run dev` で一覧・詳細・ギャラリーの表示確認
  - review-addition-checklist.md の確認項目（承認済み例外あり → pbi-input.md 参照）

## Approval

- approver: 翔吾（自己承認）
- status: approved
- note: plans/fancy-gliding-storm.md の内容を PlanGate 形式に再構成。Codex レビュー blocking 3件を修正済み。
