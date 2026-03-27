# Frontend Playbook

## 1. Pre-Implementation Check

作業前に必ず 3 点だけ決める。

- `visual thesis`: 最初の 1 画面をどういう構図と感情で見せるか
- `content plan`: 実コピー、実画像、主要セクションをどの順で見せるか
- `interaction thesis`: 最初の CTA、主要遷移、hover / motion を何のために置くか

この 3 点が書けない場合は、component 実装に入らない。

## 2. Visual References

- 参考画像は「雰囲気の参照」と「そのまま流用禁止」を分けて扱う。
- 既存サイトがすでに持っている色、余白、キャラクター文脈を上書きしない。
- 参考を増やしすぎるより、1つの visual thesis に収束させる。

## 3. Real Copy First

- `src/content/` や既存ページの文言があるなら、ダミーテキストより先に使う。
- hero では brand name `読書 with Coco` を明示し、読書とココちゃんの関係が一目で伝わる文にする。
- first viewport では “読書で生まれた世界を、ココちゃんが旅する。” を損なう情報過多を避ける。

## 4. Hero And Section Narrative

- first viewport は one composition。主役は 1つに絞る。
- hero は「brand」「世界観」「最重要CTA」を同時に読める密度で設計する。
- section はカードを足す前に、余白、見出し、画像の比率、順番で差を出す。
- cards は一覧整理に必要な場面だけで使う。物語導線を card grid に逃がさない。

## 5. Verify Standard

- desktop と mobile の両方で確認する。
- 最低限の確認対象:
  - top page 表示
  - primary CTA クリック
  - main navigation の主要遷移
  - 横スクロールや大きな崩れがないこと
- 実装完了時は `npm run verify:frontend` を通す。

## 6. Minimal Codex Request Template

```md
Visual thesis:
- 

Content plan:
- 

Interaction thesis:
- 

Constraints:
- 読書 with Coco の世界観を壊さない
- generic SaaS 風にしない
- cards を増やしすぎない

Verify:
- desktop
- mobile
- npm run verify:frontend
```
