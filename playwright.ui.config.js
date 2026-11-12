import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: 'screens.spec.js',
  workers: 1,
  use: {
    baseURL: 'http://127.0.0.1:4188/',
    headless: true,
    ...(process.env.PLAYWRIGHT_CHANNEL ? { channel: process.env.PLAYWRIGHT_CHANNEL } : {}),
  },
  webServer: {
    command: 'npx --no-install vite preview --host 127.0.0.1 --port 4188 --strictPort',
    url: 'http://127.0.0.1:4188/',
    reuseExistingServer: false,
  },
  reporter: 'list',
});
