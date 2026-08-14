# PBI Input

## Task

- task-id: `TASK-saikyo-no-dairinin-review-2026-08-13`
- title: 『最強の代理人』レビュー公開
- owner: shogo
- date: 2026-08-13

## Request Summary

- 依頼の要約: 提供されたインフォグラフィックと書籍内容を踏まえたレビューを、もしもアフィリエイトの楽天リンクとともにReviewsへ反映する。Galleryにはインフォグラフィックを流用せず、別途提供されたGallery画像で既存作品と同じ形式の展示を追加する。
- 背景: 前段でブランド原典、KADOKAWA公式書誌・全目次、著者インタビューを照合し、レビュー完成稿を作成済み。

## Goal

- 達成したいこと: 『最強の代理人 欧州最前線の代理人が日本サッカーを強くする』のレビュー詳細とGallery作品を公開し、両一覧への掲載と相互導線を成立させる。
- 完了条件: Reviewではインフォグラフィック、Galleryでは専用画像が使われ、レビュー本文、編集メタデータ、余韻メモ、相互リンク、正しく正規化された購入リンクが表示され、既存frontend verifyとClaude review gateを通過する。

## Scope

- 含める: 新規review Markdown、新規gallery Markdown、Review用インフォグラフィックとGallery用画像の公開用コピー、画像派生manifest、Gallery SSR初期件数で全章の代表を保つ最小修正、コンテンツ順に依存していた既存E2Eの導線契約修正、reset直後のDOM差し替え競合を再試行可能なassertionで待つReviews E2E安定化、タスク記録。
- 含めない: Review/Galleryテンプレートの変更、既存コンテンツの修正、購入導線のUI変更、Galleryでのインフォグラフィック使用。

## Constraints

- 既存運用との整合: ブランド正本、content guidelines、AI operations、既存review schema、frontend verify、Claude review gateに従う。
- 納期 / 優先度: 現在の依頼として優先実施。
- 触ってよいファイルや領域: `src/content/reviews/`、`src/content/gallery/`、`public/uploads/review/infographic/`、`public/uploads/gallery/books/`、`public/media/manifest.json`、`src/pages/gallery.astro`のSSR初期選定、`tests/e2e/site-smoke.spec.ts`のReviews一覧から詳細へ進む1導線、`tests/e2e/reviews-readability.spec.ts`のレイアウト計測待機、本タスク記録のみ。

## References

- 関連ドキュメント: `docs/brand/reading-with-coco-brand-strategy.md`、`docs/brand/reading-with-coco-content-guidelines.md`、`docs/brand/reading-with-coco-ai-operations.md`
- 関連 issue / PR: なし。

## Notes

- 領域固有メモ: もしもHTMLは既存の`purchaseLinks`形式に合わせ、`href`の`&amp;`を`&`へ正規化する。計測画像は既存schema・既存Reviewsで未使用のため追加しない。Gallery用の`inbox/gallery/12951457-47A6-4C20-8804-B0372006C1BD.png`は『最強の代理人』とココちゃんを描いた1122×1402画像で、Review用インフォグラフィックとは別物であることを目視確認済み。
- 未確定事項: なし。初回buildで全件由来の`#chapter-horizon`リンクに対し、先頭8件由来のSSR本文に同章がなくなる既存境界を新規追加が顕在化させたため、分類・日時を曲げず初期8件に各章代表を含める。初回E2EではReviews初期棚から外れた旧作品名の固定locatorが2件timeoutしたため、作品名ではなく「初期棚の先頭から詳細へ進む」導線契約へ直す。PR前の再検証ではreset直後の一覧DOM差し替え中に単発`evaluate`が切断済み要素を拾い、`display`が空文字になる競合を5回中3回再現したため、同じレイアウト契約を再試行可能なassertionで測る。
