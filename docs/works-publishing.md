# ワークをサイトの下書きへつなぐ

ワークの原本は `inbox/work` に残し、サイト用原稿を `site-work.json` として同梱する。公開はプレビュー確認後。画像・手順・研究原典・本名・Claudeレビューの制作時検証は従来どおり行う。

「Coco毎日の修復ワーク」の自動公開設定が更新された後に、新規に完成した成果物には、ユーザーが制作後のサイト自動公開を継続承認している。対象の制作が全検証を通過した場合だけ、同じ実行内の `gpt-6-luna` が下記のプレビュー・レビュー・PR・CI・デプロイ確認を進める。設定更新前に完成した `inbox/work` 成果物はこの承認の対象外。個別依頼による公開では従来どおりユーザーの確認を受ける。

## 制作時の納品

従来の6ファイルに `site-work.json` を追加する。次の項目を持つJSONを作る。実例は初回3件の `src/content/works/*.md` の内容に対応する。

- `version`: 1。`slug`: 半角英小文字・数字・ハイフンによる恒久ID。
- `title`, `description`, `readerWorry`, `durationMinutes`（整数1〜30）。
- `moods`: `src/data/work-taxonomy.json` の気分IDを1つ以上、`concerns`: 同ファイルの悩みIDを1つ以上。各ワークは両方の軸を必ず持ち、未知のIDや重複は取り込まない。
- `imageFilename`: 同じ納品フォルダの1080×1350 PNGファイル名。`imageAlt`: 画像の情景が伝わる説明。
- `relatedReview` または `relatedGallery` のどちらか一方: 既存の公開レビュー、または詳細ページを持つ公開ギャラリーのファイル名から `.md` を除いたID。`bookTitle` は参照先のtitleと完全一致。レビューがある本は `relatedReview` を使う。
- `bookConnection`: 本から受け取った問いとワークのつながり。本の引用と日常向けの翻案を区別する。
- `completion`: 終わりの目安。`question`: 振り返る問い。
- `evidenceNote`: 研究で試した課題と今回の短縮版の違い。`safetyNote`: 対象範囲と中止する目安。
- `sources`: `{ "label": "原典名", "url": "https://..." }` の配列。
- `body`: `## 用意するもの` と `## 手順` を含むMarkdown。番号付きの手順を画像・frozen-specと一致させる。HTML・画像埋め込みは使わない。
- `published`: false。

研究介入の効果を短縮版に転用しない。ページ側でも「この短縮ワーク自体は未検証」を必ず表示する。自動生成の文章は公開許可にはならない。

## 取り込みと確認

承認された実装用worktreeで実行する。定期制作では、inbox納品・history追記・byte一致確認まで完了した後に限り、`gpt-6-luna` が最新の `origin/main` から作った隔離worktree内でこの操作を行う。制作失敗時やLunaを指定できない場合は進めない。

```sh
npm run works:import -- /absolute/path/site-work.json --dry-run
npm run works:import -- /absolute/path/site-work.json
npm run works:preview
```

- 本が存在し公開済みか、本名が一致するか、必須項目・PNG寸法・パス・衝突を確認する。参照先のtitle・公開状態・ギャラリーのnote/descriptionは既存の単一行スカラー形式に対応する。記号を含む値は引用符で囲む。未対応のYAML記法を推測しない。
- `src/content/works/<slug>.md` と `src/assets/works/<slug>.png` を追加し、必ず非公開にする。既存ファイルの上書きオプションはない。既存記事の改訂は差分を確認して別途行う。
- ロック `.works-import.lock` が残った場合は進行中の処理がないことと記事・画像の状態を確認してから復旧する。
- プレビューはlocalhost:4327だけで起動する。`WORKS_PREVIEW=1` とAstroの開発モードが両方必要。全ページにnoindexを付ける。共有ホストへ公開しない。
- 通常ビルドは環境変数を付けても下書きを除外。下書き画像も静的画像エンドポイントから出力しない。公開ワーク0件ならホーム・ナビの導線を隠し、一覧は準備中表示。

定期制作のサイト工程は、隔離worktreeを単一writerとして使う。元の作業ツリーや既存の未追跡ファイルは変更しない。PlanGateの対象・承認根拠・検証結果を記録し、下書き状態でPC・モバイルのページ、画像、手順、本への導線を確認する。モバイルはブラウザのviewportを切り替えて確認する。既存slugや画像との衝突、不一致、確認失敗時は公開へ進まない。

## 公開確認後

個別依頼ではユーザーの確認後、定期制作の新規成功分では上記の継続承認とプレビュー確認後、対象の `published` だけをtrueに変更する。URLのslugは維持し、原稿・関連レビュー・画像・出典を再確認。`npm run test:works`、`npm run verify:frontend`、`npm run check:works-dist` とClaudeレビューを通し、PR経由で公開する。CI成功と差分・merge可能状態を確認してsquash mergeする。Pagesのデプロイ完了後に、公開URLの一覧・詳細・本への相互リンク・共有画像を確認する。制作成功、サイト工程の失敗、公開確認完了は別々に報告し、公開URLが確認できない間は公開完了と記載しない。

X・Instagramへの実投稿は別途依頼時に行う。投稿単体で手順や問いを渡し、公開された個別ワークURLを補助導線として添える。投稿のために未公開URLを共有しない。
