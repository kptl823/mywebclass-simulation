
import { test, expect } from '@playwright/test';

test.describe('MyWebClass.org internationalization', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.setExtraHTTPHeaders({ 'Accept-Language': 'en' }); // set the Accept-Language header to "en"
    await page.goto('http://localhost:3000/content.html');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test(' display  in "en" when the "Accept-Language" header set to "en"', async () => {
    // Check if the lang attribute of the HTML tag is set to "en"
    const langAttribute = await page.getAttribute('html', 'lang');
    expect(langAttribute).toBe('en', 'The lang attribute of the HTML tag is not set to "en".');

  });
});