import * as testUtils from '../test/utils'

import {expect, test} from '@playwright/test'
import type {ElectronApplication, Page} from 'playwright'
import { ElectronAppInfo, initAppTest } from '../test/helpers'

test.describe('Your test suite', async () => {
  let app: ElectronApplication
  let appWindow: Page
  let appInfo: ElectronAppInfo

  test.beforeAll(async () => {
    const data = await initAppTest()
    app = data.electronApp
    appWindow = data.appWindow
    appInfo = data.appInfo
  })

  test.afterAll(async () => {
    // await util.getPNG(appWindow, 'final_glimpse')
    // await util.saveHTML(appWindow, 'final_glimpse')
    const window = await testUtils.getWindow(app)
    await window.close()
    await app.close()
  })

  test('Your First test: it passes', async () => {
    const title = appWindow.locator('#title')
    await expect(title).toHaveText("Welcome to Electron + React")
  })
})
