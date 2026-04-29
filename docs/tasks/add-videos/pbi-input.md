# PBI Input

## Task

- task-id: add-videos
- title: 動画3本を Videos ページに追加
- owner: Claude
- date: 2026-04-29

## Request Summary

- 依頼の要約: inbox/movie/ のMP4動画3本を Moving Fragments ページに追加する
- 背景: YouTube/Instagram 埋め込みのみ対応の現状から、自己ホスト MP4 再生機能を追加する必要がある

## Goal

- 達成したいこと: 3本の動画が /videos/ ページで再生可能になること
- 完了条件: 動画表示・再生・既存動画への影響なし・verify:frontend 通過

## Scope

- 含める: MP4 配置、schema 拡張、テンプレート拡張、コンテンツファイル作成
- 含めない: 既存動画（sora-01/02/03）の変更、サムネイル生成、UI デザイン変更

## Constraints

- 既存運用との整合: Astro Content Collections の仕組みに従う
- 納期 / 優先度: 即時
- 触ってよいファイルや領域: src/content/config.ts, src/pages/videos.astro, src/content/videos/, public/videos/

## References

- 関連ドキュメント: plans/squishy-nibbling-boole.md

## Notes

- ffmpeg が利用できないためサムネイルは生成しない
- videoSrc のあるエントリは thumbnail 不要とする
