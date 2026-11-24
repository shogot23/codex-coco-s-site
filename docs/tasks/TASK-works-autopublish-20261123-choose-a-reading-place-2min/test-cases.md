# Test Cases

## Task

- task-id: TASK-works-autopublish-20261123-choose-a-reading-place-2min
- related plan: plan.md

## Must Check

- [ ] PlanGate作成直前のworktreeがcleanで、直後に追加された未追跡ファイルがpbi-input.md / plan.md / test-cases.mdの3件だけであり、HEADが最新 `origin/main` と一致する
- [ ] 7点すべての入力ハッシュが引継ぎ記録と一致し、canonical画像SHAが指定値と一致する
- [ ] slug、関連レビュー、書名、気分/悩みID、1080x1350画像に不一致や衝突がない
- [ ] dry-runが成功し、通常import後も対象記事が `published: false`
- [ ] Markdownと画像が意図した内容で追加され、画像byteが入力と一致する
- [ ] PC・モバイルの一覧と詳細で画像、手順、出典、関連レビュー導線が読める
- [ ] 公開コピー4点を確認する: 本人目線、AI/第三者視点の排除、本と本人の経験の根拠、引用/翻案と研究限界の明示
- [ ] プレビュー確認に問題がない場合、対象記事の `published` だけを `true` にする
- [ ] scope外差分や既存ファイルの変更がない
- [ ] 追加対象のワークMarkdown 35件に合わせて、`scripts/work-import.test.mjs` の該当テスト名と期待値だけが34から35へ変わっている

## Command Checks

- [ ] `npm run works:import -- <absolute site-work.json> --dry-run`
- [ ] `npm run works:import -- <absolute site-work.json>`
- [ ] `npm run test:works`
- [ ] `npm run verify:frontend`
- [ ] `npm run check:works-dist`

## Manual Checks

- [ ] localhost:4327のプレビューをPC viewportで確認する
- [ ] 同じプレビューをモバイルviewportに切り替えて再確認する
- [ ] 本のレビューへ遷移でき、詳細の画像・手順・出典・研究限界・安全案内が表示される
- [ ] Pages公開後に一覧、詳細、関連レビュー、共有画像、HTML参照の最適化画像を確認する

## Optional Checks

- [ ] GitHubで利用可能な場合は `codex/codex-automation` ラベルを付与する

## Out Of Scope

- 今回やらない確認: X・Instagram実投稿、画像再生成、他ワークの公開や既存ページの再編集、許可した2行以外のテスト変更
