# PBI Input: Site Brand Experience Refresh

## Request

読書withCoco の理念や思想をより体現するため、既存の世界観を保ったまま次の5点を最小差分で改善する。

- mobile first viewport でココちゃんの存在が見えやすい状態にする
- 画像読込前の見え方をやわらげる
- 内部設計っぽいコピーを読者向けの言葉へ寄せる
- Reviews の長い一覧感を弱める
- 「今日の小さな一歩」を Reviews 一覧に固定表示する

## Classification

- `publish/dev-critical`
- 公開 UI / copy / frontend behavior の変更のため、実装後に frontend verify と Claude review gate を行う。

## Scope

含める:

- Home mobile hero の CSS 調整
- Gallery / GalleryBrowse の読者向けコピー調整と画像枠 placeholder 調整
- Reviews 一覧のコピー調整、2グループ化、「今日の小さな一歩」固定表示
- 主役画像への限定的な `fetchpriority="high"` 追加

含めない:

- review schema / content frontmatter の追加
- Review detail の表示変更
- responsive image pipeline / srcset / sizes の新規導入
- `src/styles/theme.css` の変更
- 既存未追跡 `inbox/infographic/` と `output/` の変更
