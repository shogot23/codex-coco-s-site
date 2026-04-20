# Status

## Task

- task-id: TASK-gallery-genre-taxonomy-drift-2026-04-20
- state: done
- updated: 2026-04-20

## Summary

- 実施内容: Astro 非依存の `src/lib/gallery-taxonomy.ts` を追加し、gallery genre の列挙値・bucket 判定・slug prefix mapping を app / scripts で共有化した。`社会科学` の scripts 側 drift を解消し、gallery 一覧 / 詳細の bucket 判定を pure mapping に寄せた。
- 完了した範囲:
  - taxonomy module 追加
  - schema / gallery pages / scripts の参照整理
  - `社会科学` の import / correction / OCR / slug 判定追随
  - `verify:frontend` 実行
  - Claude review gate 実施
  - Codex review 実行トライ

## Verification Result

- `npm run typecheck`: pass（`npm run verify:frontend` 内）
- `npm run build`: pass（`npm run verify:frontend` 内）
- 追加確認:
  - `npm run verify:frontend`: pass
  - app/scripts 共有 taxonomy import: pass
  - `node scripts/gallery-import.ts --dry-run --override "How_Coincidence_Makes_You_Brian_Klass.jpeg" --genre 社会科学`: pass
  - slug helper compatibility check: `getGalleryGenreSlugPrefix('社会科学') === 'business'` を確認
  - `public/admin/config.yml` は既存のまま schema と整合

## Scope Check

- scope 内で収まっているか: はい。taxonomy と pure mapping のみに限定している。
- 見送った項目: CTA / note-description / purchaseLinks / relatedReview / REVIEW_TAGS / legacy sample data / CMS の自動生成

## Next Action

- 残件: commit / push / draft PR 作成
- 次に見る人へのメモ:
  - `src/content/config.ts` は scripts から import できないため、共通 module は Astro 非依存で保つ
  - `gallery-import --help` は usage を stdout に出さず exit 1 で終わる既存挙動のため、受理確認は `--override ... --genre 社会科学 --dry-run` で実施した
  - Claude review は初回 arch / diff で false positive が出たため、current file content を渡した focused re-review で `ok: true` を確認した
  - Codex review は `codex exec` / `codex exec review` の両方を試行したが、この環境では最終メッセージ回収前に長時間滞留した

## Daily Record

- 記録先: この task の `status.md`
- 記録内容: taxonomy drift 解消タスクの実装、verify、review 実施結果を記録
