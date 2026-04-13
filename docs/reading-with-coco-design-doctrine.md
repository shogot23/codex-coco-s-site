# Reading with Coco Design Doctrine

## 1. Site Core

- サイトの核は「本 × ココちゃん × 学び」。
- 体験の核は “読書で生まれた世界を、ココちゃんが旅する。”。
- 本の紹介だけで終わらせず、読書から広がる景色、感情、学びの余韻まで見せる。
- トップページは機能一覧ではなく、最初の1冊を開く前の「物語の表紙」として扱う。

## 2. Visual Thesis

- first viewport は one composition で設計する。
- 最初の一画面で `読書 with Coco` のブランド名、世界観、主要CTA を同時に読める密度にする。
- 整理された UI よりも、このサイトでしか成立しない構図と印象を優先する。
- generic SaaS 風、テンプレ風、量産型 LP 風には寄せない。

## 3. Content Plan

- 情報の順番は「機能の説明」ではなく「読後の余韻が深まる順番」で組む。
- hero の直後から、本とココちゃんの関係、そこから見える景色、レビューやギャラリーへの導線をつなげる。
- 実コピー、実画像、実レビュー、実ギャラリーをダミーより優先する。
- 3要素のどれかが欠ける場合は、構成を見直してから実装する。

## 4. Interaction Thesis

- 主要な操作は「世界観を壊さずに深く入る」ために置く。
- primary CTA は最短で読書体験に入れる導線とし、第一候補は `レビューを見る`。
- secondary CTA は補助導線とし、第一候補は `ギャラリーを見る`。
- hover / motion / scroll effect は飾りではなく、視線誘導と物語の切り替わりを支える用途に限る。

## 5. Tone And Mood

- やわらかさ、静けさ、好奇心、読後の余韻を同時に感じるトーンを保つ。
- ココちゃんの存在は「かわいい装飾」ではなく、読書世界を旅する案内役として扱う。
- 親しみやすさは保ちつつ、幼すぎる演出や過剰にポップなテンションには寄せない。

## 6. Layout Rules

- hero は brand、世界観、主要CTA を一画面で伝える。
- cards は一覧整理に必要な場面だけで使い、物語導線そのものを card grid にしない。
- 余白、タイポグラフィ、画像比率、視線の流れで魅せる。
- section は narrative で接続し、情報の塊ではなく場面転換として扱う。
- mobile / desktop の両方で世界観が崩れない構図を前提にする。

## 7. Copy Rules

- hero copy は読書とココちゃんの関係が一目でわかる文にする。
- 説明口調で機能を列挙するより、読書から広がる情景や学びを短く濃く伝える。
- brand name `読書 with Coco` は hero-level の強さで見せる。
- CTA 文言は抽象化しすぎず、実際の行き先が想像できる具体性を持たせる。

## 8. Visual Rules

- ココちゃん関連ビジュアルを最重要アセットとして扱う。
- 本だけ、UIだけ、テキストだけで完結させず、「本から生まれた世界」を視覚で示す。
- 色、余白、質感は静かな物語性を優先し、無機質なプロダクト画面に寄せない。
- 参考画像は雰囲気の参照に留め、既存ブランド文脈を上書きしない。

## 9. CTA Priority

1. 主CTA 第一候補は `レビューを見る`
2. 副CTA 第一候補は `ギャラリーを見る`
3. 他のCTAを前に出す場合は、「本 × ココちゃん × 学び」への導線として優先すべき理由を説明できること

## 10. Implementation Rules

- 実装前に `visual thesis` / `content plan` / `interaction thesis` を短く残す。
- 色・余白・角丸・影・フォントの判断は `DESIGN.md` を参照する。トークン値の正本は `src/styles/theme.css`。
- typography / color / spacing を先に決め、component 分割は後から行う。
- 既存の Astro 構成、content collections、brand tone を壊さない。
- 新規 UI 案は「整っているか」ではなく「読書 with Coco らしいか」を先に評価する。
- 実装判断に迷ったら、この doctrine と `frontend-playbook.md` の両方を見て、ブランド優先で決める。

## 11. Verify Rules

- desktop / mobile の両方で first viewport の印象、CTA 到達性、レイアウト崩れを確認する。
- 少なくとも top page、主要遷移、primary CTA、secondary CTA を確認する。
- frontend 変更後は `npm run lint` → `npm run typecheck` → `npm run build` → `npm run test:e2e` の順で確認する。
- UI 調整途中は短い反復確認でよいが、完了時は full smoke を通す。

## 12. Definition Of Done

- repo 内に doctrine の参照先があり、次の frontend PR から迷わず使える。
- `visual thesis` / `content plan` / `interaction thesis` が依頼文、作業ログ、または PR に残っている。
- brand と first viewport の意図が壊れていない。
- ココちゃん関連ビジュアルの扱いが弱まっていない。
- mobile / desktop の確認が終わっている。
- `lint` / `typecheck` / `build` / `test:e2e` が必要範囲で通っている。
