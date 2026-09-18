import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: 'works.spec.ts',
  use: { baseURL: 'http://127.0.0.1:4327', screenshot: 'only-on-failure' },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 1080 } } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 7'] } },
  ],
  webServer: { command: 'npm run works:preview', port: 4327, reuseExistingServer: false, timeout: 120000 },
});
