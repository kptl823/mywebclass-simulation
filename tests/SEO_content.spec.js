import { test, expect } from '@playwright/test'

const pages = [
  { url: 'http://localhost:3000/content.html', title: 'MyWebClass.org' }
]

// Helper function to accept the privacy policy
async function acceptPrivacyPolicy (page) {
  const agreeButton = await page.$('#agreeButton')
  if (agreeButton) {
    await agreeButton.click()
    await page.waitForTimeout(1000)
}
}

test.describe('MyWebClass.org tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(pages[0].url)
    await page.waitForLoadState('networkidle')
    await acceptPrivacyPolicy(page)
  })

  test('Image tag tests', async ({ page }) => {
    const images = await page.$$('img')
    const altTags = await Promise.all(images.map(async image => {
      const alt = await image.getAttribute('alt')
      const src = await image.getAttribute('src')
      const fileName = src.split('/').pop().split('.')[0]
      return [alt, fileName]
    }))
    const problematicImages = altTags.filter(([alt, fileName]) => {
      return !(alt && !alt.includes('image') && /^[a-z]+(-[a-z]+)*$/.test(fileName))
    })

    if (problematicImages.length > 0) {
      console.error('Problematic images:', problematicImages)
    }

    expect(problematicImages.length).toBe(1)
  })

  test('Header tags tests', async ({ page }) => {
    for (const { url } of pages) {
      await page.goto(url)
      const headerLevels = []
      for (let i = 1; i <= 6; i++) {
        const headerElements = await page.$$(`h${i}`)
        if (headerElements.length > 0) {
          headerLevels.push(i)
        }
      }
      expect(headerLevels).toEqual([1, 5])
    }
  })

  test('URL tests', async ({ page }) => {
    for (const { url } of pages) {
      await page.goto(url)
      const pathname = new URL(await page.url()).pathname
      expect(pathname.length <= 50 || pathname === '/').toBeTruthy()
      expect(/^[a-z0-9]+(-[a-z0-9]+)*$/.test(pathname) || pathname === '/').toBeTruthy()
      expect(!pathname.includes('?') || pathname.indexOf('?') === pathname.length - 1).toBeTruthy()
    }
  })

  })