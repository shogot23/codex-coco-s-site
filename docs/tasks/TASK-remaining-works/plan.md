# 実装計画

分類: publish/dev-critical。ユーザーのサイト反映依頼を承認根拠として進める。mainの未追跡ファイル・原本パッケージは保持する。

- visual thesis: 既存の暖色・書体・余白と原本のココちゃん画像を継承する。
- content plan: 未掲載11件の画像と手順を照合し、本からの着想・研究介入・未検証の短縮版を区別して掲載。出典と中止条件を保持する。
- interaction thesis: 困りごとから選ぶ→手元で試す→関連図書へ進む。レビューのない2冊は既存ギャラリーへ進み、そこからワークへ戻れる。

## 変更対象

- src/content/works と src/assets/works: 11件を追加。原本画像のSHAを維持。
- src/content/config.ts、src/utils/works.ts、scripts/work-import.mjs: relatedReviewとrelatedGalleryのどちらか一方を必須とする。公開済み・書名一致・ギャラリー詳細生成可を確認する。
- ワーク詳細、レビュー詳細、ギャラリー詳細: 任意参照を安全に扱い、双方向リンクと既存もしもリンク・広告開示を表示する。
- testsと運用文書: ギャラリーのみの参照、取り込み境界、全14件のPC/mobile往復を検証する。

## 公開手順

原稿・原画像・原典・制作時検証記録を照合。取り込みは下書き固定とし、今回承認済み11件のみ公開状態へ変更する。Claude arch→grouped diff→cross-check、verify:frontendを通し、PR・CI・squash merge・Pages・本番確認まで行う。掲載条件を満たせないものは理由を残して非公開とする。
