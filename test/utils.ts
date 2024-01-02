import type {ElectronApplication, Page} from 'playwright'
import {_electron as electron} from 'playwright'
import fs from 'node:fs'
import path from 'node:path'

export async function launchApp({
  offline = false,
  useTempPath = false,
}: {
  offline?: boolean
  useTempPath?: boolean
} = {}) {
  const app: ElectronApplication = await electron.launch({
    executablePath:
      'out/Mintter-darwin-arm64/Mintter.app/Contents/MacOS/Mintter',
    offline: offline,
    env: useTempPath
      ? Object.assign(process.env, {
          USE_TEMP_DB: useTempPath,
        })
      : process.env,
  })
  return app
}

export async function getWindow(app: ElectronApplication) {
  const appWindow: Page = await app.firstWindow()
  // await appWindow.setViewportSize(viewportSize)
  return appWindow
}

export function getRecordingPath(platform: string, fileName?: string) {
    const paths = ['test-output', platform, 'screenshots'];
    if (fileName) {
      paths.push(fileName);
    }
    return path.join(...paths);
  }
  
  export async function pause(ms: number) {
    return new Promise(f => setTimeout(f, ms));
  }

  export async function logHTML(page: Page) {
    await page.content().then((content) => {
      console.log(content)
    })
  }
  
  export async function saveHTML(page: Page, fileName: string) {
    const pageSource = await page.content()
    await fs.promises.writeFile(`screenshots/${fileName}.html`, pageSource)
  }
  
  export async function getPNG(page: Page, fileName: string) {
    await page.screenshot({path: `screenshots/${fileName}.png`, fullPage: true})
  }