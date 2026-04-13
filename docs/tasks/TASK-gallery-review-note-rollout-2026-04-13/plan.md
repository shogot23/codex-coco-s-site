# Plan: Gallery Review Note Rollout

## 変更概要

`autobiography-buffon` を基準実装として、レビュー記事を持つ他5ページに `note` フィールドを横展開する。

## 対象ファイル

| File | 変更内容 |
|------|---------|
| `src/content/gallery/business-036e1a.md` | note 追加 |
| `src/content/gallery/business-ebf8ca.md` | note 追加 |
| `src/content/gallery/manga-hyakuemu.md` | note 追加 |
| `src/content/gallery/novel-c251be.md` | note 追加 |
| `src/content/gallery/novel-seiten.md` | note 追加 |

## テンプレートロジック（変更なし）

```
pageDescription = description ?? note ?? fallback
sceneMemo = note ?? description ?? fallback
heroMemoVisible = sceneMemo !== pageDescription
```

note 追加により `sceneMemo !== pageDescription` → `heroMemoVisible = true` となり、What Lingers に note 文が表示される。

## note 内容

| ページ | note |
|--------|------|
| 死ぬ瞬間の5つの後悔 | 「まだ間に合う」という感覚が、読み終わったあともそっと背中を押している。 |
| 楽園の楽園 | 答えが出ない問いを抱えたまま、それでも次の一歩を踏み出す不思議な力が残る。 |
| ひゃくえむ。 | 走り終わったあとの静けさのなかで、自分の10秒がどこにあるのかが響き続ける。 |
| 列 | 自分を誰かと比べてしまう癖に、列のなかでふと気づく。その揺れが残る。 |
| 青天 | 倒れて見上げた空は、思ったより近かった。その距離感が、いつまでも目に残る。 |

## 副作用

- 関連シーンカード: `summary = note ?? description` → note が表示される（望ましい）
- JSON-LD: `pageDescription`（description）を使用 → 影響なし
