サイト掲載用原稿の追加（ワークページ導入）:
従来の6ファイルに加え、同じ納品フォルダに site-work.json を作成してください。サイトへの取り込み・commit・PR・merge・公開は行わず、掲載準備までに留めます。既存の画像・原稿・出典・レビュー要件はそのまま維持してください。

site-work.json の仕様:
version=1、slug（半角英小文字・数字・ハイフンの恒久ID）、title（ワーク名）、description、readerWorry、durationMinutes（整数1〜30）、imageFilename（同じフォルダの納品PNG名）、imageAlt、relatedReview（公開済みレビューのファイル名から.mdを除く）、bookTitle（レビューtitleと完全一致）、bookConnection（本からの着想と翻案を区別）、completion（終了目安）、question（振り返る問い）、evidenceNote（研究介入と今回の短縮版の違い）、safetyNote（対象範囲・中止目安）、sources（labelとhttps URLの配列）、body（Markdown）、published=false を含めます。bodyは「## 用意するもの」「## 手順」と番号付き手順を含み、画像・frozen-specと一致させ、HTMLや画像埋め込みは入れません。変化は保証せず、短縮版自体が未検証であることを明示してください。

サイト内の公開レビューと確実に紐付けられる候補を選びます。site-work.jsonもClaudeレビューと最終保存・byte一致確認の対象に加えます。公開準備であることを最終報告に記載してください。納品先に既存site-work.jsonがある場合は上書きしません。サイト原稿を用意できない場合は、その回のサイト掲載準備が未完了である理由を報告し、公開可能とは扱わないでください。リポジトリに docs/works-publishing.md が存在する場合はその仕様を参照し、まだ存在しない場合もこのJSON仕様を用いて納品できます。
