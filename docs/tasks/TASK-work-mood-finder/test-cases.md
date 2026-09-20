# Test Cases

## Task

- task-id: `TASK-work-mood-finder`
- related plan: `docs/tasks/TASK-work-mood-finder/plan.md`

## Must Check

- [ ] 気分だけを選ぶと、その気分に分類されたワークだけが候補になる。
- [ ] 悩みだけを選ぶと、その悩みに分類されたワークだけが候補になる。
- [ ] 気分と悩みを選ぶと、両方に一致するワークが片方一致より先に並ぶ。
- [ ] 気分と悩みのどちらにも一致しないワークは非表示になる。
- [ ] 「選択をクリア」で両組のradioが未選択へ戻り、公開中の全ワーク表示へ戻る。
- [ ] 結果件数と選択状態が支援技術へ伝わり、キーボードだけで操作できる。
- [ ] 2組の単一選択がradioとして伝わり、矢印キーで選択を移せる。
- [ ] JavaScript無効時は選択UIを表示せず、全ワークと詳細リンクを利用できる。
- [ ] 同じ一致段階の候補は、選択前の既存順を保つ。
- [ ] 全ワークの気分と悩みのそれぞれに、許可済み分類が一つ以上あり、未知値や空配列を受け付けない。12分類の各項目が少なくとも1件の公開ワークで使われている。
- [ ] 既存の詳細ページ、関連書籍、購入リンク、下書きpreview、公開buildの境界が維持される。
- [ ] scope 外の変更が入っていない。

## Command Checks

- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run test:works`
- [ ] `npm run test:works-preview`
- [ ] `npm run check:works-dist`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] desktopとmobileで、選択肢、結果、画像、CTAの間に横はみ出しや重なりがない。
- [ ] 選択時の切り替えが急かす印象にならず、`prefers-reduced-motion` で不要な動きを抑える。
- [ ] 「合いそうなワーク」という表現になっており、診断・効果保証・過剰な断定がない。
- [ ] ココちゃんを含む既存画像が候補の主役として見え、選択UIがgeneric SaaS風のカード群になっていない。
- [ ] axeで選択UI、結果件数、詳細リンクにアクセシビリティ違反がない。

## Import Checks

- [ ] 正しい気分・悩み配列を持つ `site-work.json` を取り込める。
- [ ] 気分または悩みが配列でない、空、未知値を含む、重複する場合は取り込みを拒否する。
- [ ] dry-run、非公開強制、既存ファイル非上書きの挙動が変わらない。

## Out Of Scope

- 自由入力の意味解析、AI推薦、回答の永続化、個人情報の収集、ワークの効果測定は確認対象に含めない。
