# ワークをサイトの下書きへつなぐ

ワークの原本は `inbox/work` に残し、サイト用原稿を `site-work.json` として同梱する。公開はプレビュー確認後。画像・手順・研究原典・本名・Claudeレビューの制作時検証は従来どおり行う。

## 制作時の納品

従来の6ファイルに `site-work.json` を追加する。次の項目を持つJSONを作る。実例は初回3件の `src/content/works/*.md` の内容に対応する。

- `version`: 1。`slug`: 半角英小文字・数字・ハイフンによる恒久ID。
- `title`, `description`, `readerWorry`, `durationMinutes`（整数1〜30）。
- `imageFilename`: 同じ納品フォルダの1080×1350 PNGファイル名。`imageAlt`: 画像の情景が伝わる説明。
- `relatedReview`: 既存レビューのファイル名から `.md` を除いたID。`bookTitle`: そのレビューのtitleと完全一致。
- `bookConnection`: 本から受け取った問いとワークのつながり。本の引用と日常向けの翻案を区別する。
- `completion`: 終わりの目安。`question`: 振り返る問い。
- `evidenceNote`: 研究で試した課題と今回の短縮版の違い。`safetyNote`: 対象範囲と中止する目安。
- `sources`: `{ "label": "原典名", "url": "https://..." }` の配列。
- `body`: `## 用意するもの` と `## 手順` を含むMarkdown。番号付きの手順を画像・frozen-specと一致させる。HTML・画像埋め込みは使わない。
- `published`: false。

研究介入の効果を短縮版に転用しない。ページ側でも「この短縮ワーク自体は未検証」を必ず表示する。自動生成の文章は公開許可にはならない。

## 取り込みと確認

承認された実装用worktreeで実行する。定期制作はこの操作を行わず、inbox納品までに留める。

```sh
npm run works:import -- /absolute/path/site-work.json --dry-run
npm run works:import -- /absolute/path/site-work.json
npm run works:preview
```

- 本が存在し公開済みか、本名が一致するか、必須項目・PNG寸法・パス・衝突を確認する。レビューは既存の単一行title形式に対応する。未対応のYAML記法を推測しない。
- `src/content/works/<slug>.md` と `src/assets/works/<slug>.png` を追加し、必ず非公開にする。既存ファイルの上書きオプションはない。既存記事の改訂は差分を確認して別途行う。
- ロック `.works-import.lock` が残った場合は進行中の処理がないことと記事・画像の状態を確認してから復旧する。
- プレビューはlocalhost:4327だけで起動する。`WORKS_PREVIEW=1` とAstroの開発モードが両方必要。全ページにnoindexを付ける。共有ホストへ公開しない。
- 通常ビルドは環境変数を付けても下書きを除外。下書き画像も静的画像エンドポイントから出力しない。公開ワーク0件ならホーム・ナビの導線を隠し、一覧は準備中表示。

## 公開確認後

ユーザーの確認後、対象の `published` だけをtrueに変更する。URLのslugは維持し、原稿・関連レビュー・画像・出典を再確認。`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` とClaudeレビューを通し、PR経由で公開する。デプロイ完了後に一覧・詳細・本への相互リンク・共有画像を確認する。

X・Instagramへの実投稿は別途依頼時に行う。投稿単体で手順や問いを渡し、公開された個別ワークURLを補助導線として添える。投稿のために未公開URLを共有しない。
