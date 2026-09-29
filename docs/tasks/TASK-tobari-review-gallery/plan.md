# Plan

## Task

- task-id: TASK-tobari-review-gallery
- related pbi: `pbi-input.md`
- classification: publish/dev-critical

## Intent

- レビュー本文に本人の違和感と見方の変化を残し、最後に家族・ココちゃんとの時間へ向かう小さな行動を置く。
- ギャラリーは夕景とココちゃんの余韻を見せ、関連レビューへつなぐ。

## Visual / Content / Interaction Thesis

- visual: 本・ココちゃん・学びを一つの静かな夕景に収める。本の表紙はユーザー提供の実物写真に合わせ、文字と意匠を目視で照合する。
- content: `仕方がない` の違和感 → 本を読んでの気づき → ただ一緒にいる短い時間 → 読者への問い。
- interaction: Review を主導線、Gallery を余韻のページ、楽天アフィリエイトを補助リンクとする。

## Scope Declaration

- 変更対象: `src/content/reviews/tobari-no-mukou-kokubun-wakabayashi.md`, `src/content/gallery/essay-tobari-no-mukou.md`, `public/uploads/review/infographic/tobari_no_mukou_kokubun_wakabayashi.png`, `public/uploads/gallery/books/Tobari_no_Mukou_Coco.png`, `public/media/manifest.json`, `docs/tasks/TASK-tobari-review-gallery/{pbi-input,plan,test-cases,status,daily-2026-09-29}.md`。
- 変更しないもの: 既存ページ・コンポーネント・package 依存、main checkout の既存変更、inbox 原本。
- 並列 work: 単一コンテンツで画像と文章・メディア生成が依存するため単独実施。

## Steps

1. 専用 worktree と branch の clean 状態を確認する。
2. PlanGate 3文書を記録し、スコープを自己承認する。公開前の独立 reviewer は Claude とする。
3. 元ギャラリー画像の作業前 SHA-256 と実物表紙写真の SHA-256 を status に記録し、実物写真を非公開 inbox に保管する。画像生成ツールで既存ギャラリー場面の本だけを実物表紙に置き換え、拡大照合する。合格した画像と infographic を配置し、書誌・ブランド方針に合う Review/Gallery と相互リンク、もしもリンクを追加する。
4. media manifest を生成し、元画像・公開画像の寸法、SHA、infographic の `cmp`、画像中の文字を確認する。
5. `npm run check:content`, `npm run lint`, `npm run typecheck`, `npm run build`, `npm run test:e2e`, `npm run verify:frontend` を実行し、生成 HTML と desktop/mobile を確認する。
6. status と daily に結果を残し、Claude review gate の必須 phase を完了する。blocking と未レビューを残さない。
7. 差分と PR checks を確認し、squash merge、main 同期、branch cleanup、Pages と公開 HTML/media を確認する。

## Risks / Guards

- 書影の虚偽: 画像生成ツールでユーザー提供の実物写真を参照して本だけ差し替える。題名・著者名・帯の読める文章・意匠を拡大照合し、誤字や変形があれば公開しない。Gallery は `visualOrigin: ai-generated` とし、元画像と表紙写真は公開しない。合格しない場合は Codex が Claude review gate 前に Review/Gallery の公開を中止し、status に不合格理由と再制作判定を記録する。
- アフィリエイト URL: HTMLを貼らず、エンティティを一度だけ decode した HTTPS URL を schema に保存する。1px 画像は使わない。
- dirty main: 専用 worktree に限定し、main の未追跡・変更ファイルを触らない。
- 既存作品の公開境界: 新規 Review/Gallery のみに published:true を設定し、ほかは変更しない。

## Approval

- approver: Codex (owner self-approval; user requested implementation and merge)
- reviewer: Claude review gate (post-plan/post-change/pre-PR/pre-merge)
- status: approved
- date: 2026-09-29
