# 確認項目

## Task

- task-id: TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min
- related plan: `docs/tasks/TASK-works-autopublish-20261021-one-scene-sensory-sketch-3min/plan.md`

## 必須確認

- [x] 7つの source file hash が指定値に一致し、元 `site-work.json` の published が false のまま。
- [x] slug / image filename に既存衝突がなく、関連 review は公開済みで title が「今日も、喫茶店より」と完全一致する。
- [x] taxonomy の mood / concern がすべて既知 ID。
- [x] dry-run が成功してから通常 import し、追加記事は最初 draft。
- [x] desktop と mobile viewport の preview で noindex、一覧・詳細、画像、3手順、出典、関連レビュー導線が読める。
- [x] 公開前4点チェックと Claude の意味確認で blocking がない。
- [x] 公開状態の変更は対象記事の published だけ。
- [x] PR diff は今回の task 記録・記事・画像・`scripts/work-import.test.mjs` の固定作品数23→24更新だけに限られ、全Markdownを走査するコピー検査は維持されている。

## コマンド確認

- [x] `npm run works:import -- <absolute site-work.json> --dry-run`
- [x] `npm run works:import -- <absolute site-work.json>`
- [x] `npm run test:works` は24件全てを含めて通る。期待件数の修正は既存作品コピー検査を保持する1か所のみ。
- [x] `npm run verify:frontend`
- [x] `npm run check:works-dist`
- [ ] PR CI がすべて成功し、mergeable が true。

## 手動確認

- [x] works:preview の出力と HTTP で localhost:4327 を確認し、PC と viewport を mobile サイズへ明示的に切り替えた preview で一覧・詳細を確認する。別 port / 占有の場合は停止する。
- [x] コピーが本人の目線で、AI資料確認事情や第三者語りを含まない。
- [x] book connection が既存レビューの「毎日を楽しめない自分を、急いで直さなくてもよいのかもしれません」という受け止めに支えられ、読了・本中場面を推測しない。
- [x] 引用と日常向け翻案を分け、研究の範囲・限界・短縮版未検証を表示する。
- [ ] dist / production の一覧、詳細、関連レビュー、OG/shared image と HTML 参照の画像 URL が成功する。
- [ ] cache-buster query 付き URL と query のない正規 URL の両方で HTTP 200 を確認し、status・本文・必要な内容を保存して照合する。
- [ ] 作業開始時の `git status --short --branch` をこの task directory の `source-checkout-status-start.txt` に保存し、完了時の同じ出力を `cmp` で照合する。production URL・status・HTML画像URL/SHA/寸法も `production-verification.json` に残す。

## 任意確認

- [ ] ブラウザのスクリーンショットとHTTP応答メタデータを公開証跡として保存する。

## 対象外

- X / Instagram 投稿、既存 inbox 成果物の公開、他 PR の更新。
