const { test, expect } = require('@playwright/test');

test.describe('Internationalization', () => {
  let page;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    await page.goto('http://localhost:3000');
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('valid lang attribute', async () => {
    const langAttribute = await page.getAttribute('html', 'lang');
    expect(langAttribute).toBeTruthy();
    expect(langAttribute).toMatch(/^[a-zA-Z]{2}(-[a-zA-Z]{2})?$/);
  });
});