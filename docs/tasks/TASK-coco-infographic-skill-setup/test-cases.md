# Test Cases

## Task

- task-id: TASK-coco-infographic-skill-setup
- related plan: `docs/tasks/TASK-coco-infographic-skill-setup/plan.md`

## Must Check

- [ ] 目的の変更が反映される
- [ ] scope 外の変更が入っていない
- [ ] 既存の主要導線や既存文書との整合が崩れていない

## Command Checks

- [ ] `python3 scripts/save_generated_image.py --help`
- [ ] `python3 scripts/save_generated_image.py --source <test-image> --title <test-title> --dry-run`

## Manual Checks

- [ ] skill に「本の特定 → 調査 → 原稿 → 画像生成 → 保存」の順序が明記されている
- [ ] 保存先が `/Users/shogo/Projects/codex-coco-s-site-main/inbox/infographic` に設定されている

## Optional Checks

- [ ] Claude review gate の diff review を通す
- [ ] 将来の eval 用にテストプロンプト候補を README に記録する

## Out Of Scope

- 今回やらない確認: 実際の画像生成 API 品質比較、サイト掲載後の見た目検証
