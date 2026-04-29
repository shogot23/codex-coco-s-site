# Plan

## Task

- task-id: add-videos
- related pbi: pbi-input.md

## Intent

- 何を変えるか: videos Content Collection に videoSrc / note フィールドを追加し、自己ホスト MP4 のインライン再生を可能にする
- なぜ今やるか: inbox に動画3本が格納されており、サイトへの反映が求められている

## Scope Declaration

- 変更対象ファイル:
  - src/content/config.ts
  - src/pages/videos.astro
  - src/content/videos/aoten.md (新規)
  - src/content/videos/jinsei-kouhan-no-senryakusho.md (新規)
  - src/content/videos/youll-never-walk-alone.md (新規)
  - public/videos/*.mp4 (新規)
- 変更しないもの:
  - 既存動画コンテンツ (sora-01/02/03)
  - レイアウト・スタイルの大幅変更

## Parallel Work Check

- [x] P1: schema 拡張とコンテンツファイル作成は独立
- [x] P2: 各タスクの対象が完全に分離されている
- [ ] P3: schema が先、コンテンツが後の順序依存あり → 単独で進める

## Implementation Steps

1. MP4 ファイルを public/videos/ にコピー
2. schema 拡張 (config.ts): videoSrc, note 追加、thumbnail optional 化
3. テンプレート拡張 (videos.astro): <video> タグ対応 + note 個別表示
4. コンテンツファイル3件作成
5. verify:frontend で検証

## Risks And Guards

- 想定リスク: 既存 sora 動画の thumbnail required 制約でビルドエラー
- 回避策: thumbnail optional 化の際に undefined も許容する
- scope 外に見つけた事項の扱い: 別タスクとして記録

## Verification

- 実行するコマンド:
  - `npm run typecheck`
  - `npm run build`
  - `npm run verify:frontend`
- 追加確認: 既存 sora 動画が影響を受けていないこと

## Approval

- approver: self
- status: approved
- note: 個人運用での自己承認
