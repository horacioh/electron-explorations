// playwright.config.ts
import type {PlaywrightTestConfig} from '@playwright/test'

const config: PlaywrightTestConfig = {
  testDir: 'tests',
  outputDir: 'test-results',
  // Fail the build on CI if you accidentally left test.only in the source code.
  forbidOnly: !!process.env.CI,
  snapshotPathTemplate: '{testDir}/__screenshots__/{testFilePath}/{arg}{ext}',
  use: {
    trace: 'retain-on-failure',
    video: 'on',
  },
  retries: 0,
  workers: 1,
  expect: {
    timeout: 10 * 1000,
  },
  timeout: 10 * 1000,
  reporter: process.env.CI ? 'github' : 'list',
  // reporter: [
  //   ['list'],
  //   [
  //     'junit',
  //     {
  //       outputFile: `test-results/test-results-${new Date()
  //         .toISOString()
  //         .replace(/:/g, '_')}.xml`,
  //     },
  //   ],
  // ],
  projects: [
    {
      name: 'e2e',
      testMatch: ['**/*e2e.ts'],
    },
  ],
}
export default config
