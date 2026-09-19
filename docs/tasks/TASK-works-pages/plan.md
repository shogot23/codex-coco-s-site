# 実装計画

承認: ユーザーの PLEASE IMPLEMENT THIS PLAN による。レビュー担当: Claude CLI (glm-5.3)。

- visual thesis: 暖かな紙面とココちゃんの画像、広い余白で一歩を選ぶ静かな入口。画像の文字は切らない。
- content plan: 困りごと・時間 → 準備と手順 → 終了目安と問い → 本 → 出典。
- interaction thesis: 一覧から手順、本から実践へ迷わず進める。リンクのフォーカスと控えめなhoverを使う。

1. worksコレクションと共通取得処理を追加。published既定false、下書き表示はAstro DEVかつWORKS_PREVIEW=1だけ。通常buildでは環境変数を付けても非公開を除外。
2. 画像はsrc/assets/worksに保存し、可視ワークだけの静的画像エンドポイントで既存sharpを使いWebPを生成。全画像のglob importによる下書き画像の意図しない出力を避ける。下書き画像の公開コピーを避ける。
3. /works/、/works/[slug]/、レビュー逆リンクと可視ワーク1件以上のときだけホーム・ナビを追加。0件の/works/は準備中表示。3件の下書きを作る。
4. site-work.jsonを検証してMarkdownと画像を取り込むCLIを追加。参照、本名、必須項目、相対画像、衝突を検証しpublished=falseを強制。既存記事を上書きしない。
5. 制作仕様・定期制作設定にサイト原稿同梱を追加。定期制作は本体ソースに触れずinbox納品まで。プレビュー操作は専用worktreeで行う。
6. テスト・画面確認・Claude arch/grouped diff/cross-check、statusとdailyを記録。公開前にユーザーへプレビュー提示。

変更対象: src/content、src/assets/works、src/utils/works、worksページと共通表示、既存Layout/index/review導線、scripts/work-import、package scripts、e2e、docs、既存coco automation。
