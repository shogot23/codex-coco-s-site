# Test Cases

## Task

- task-id: `TASK-playwright-gallery-mobile-smoke`
- related plan: `docs/tasks/TASK-playwright-gallery-mobile-smoke/plan.md`

## Must Check

- [ ] gallery detail (`novel-seiten`) が表示でき、主要見出し・画像・review 導線が生きている
- [ ] gallery detail (`business-0d597c`) が表示でき、purchaseLinks fallback と review 一覧導線が生きている
- [ ] `mobile-chrome` で home の header / nav / hero CTA が viewport 内で実用的に見える
- [ ] 既存 smoke が壊れていない
- [ ] scope 外の変更が入っていない

## Command Checks

- [ ] `npx playwright test tests/e2e/site-smoke.spec.ts --project=chromium --project=mobile-chrome`
- [ ] `npm run lint`
- [ ] `npm run typecheck`
- [ ] `npm run build`
- [ ] `npm run test:e2e`
- [ ] `npm run verify:frontend`

## Manual Checks

- [ ] 追加 locator が既存の naming / expect style に沿っている
- [ ] mobile 専用 test が desktop project に影響していない
- [ ] gallery detail slug が実在 content に基づいている

## Optional Checks

- [ ] Claude review gate で blocking issue がないこと

## Out Of Scope

- 今回やらない確認: screenshot regression、Playwright config の整理、spec 分割
