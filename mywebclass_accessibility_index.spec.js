const { test, expect } = require('@playwright/test')
test.describe('Accessibility tests for MyWebClass.org', () => {  let page;
  test.beforeAll(async ({ browser }) => {    page = await browser.newPage();  });
  test.afterAll(async () => {    await page.close();  });
  test('Images have alt text', async () => {    await page.goto('http://localhost:3000/');    const imagesWithoutAltText = await page.$$eval('img:not([alt])', imgs => imgs.map(img => img.src));    expect(imagesWithoutAltText.length).toBe(0);  });
  test('Newsletter input has a label', async () => {    await page.goto('http://localhost:3000/');    const label = await page.$('label[for="newsletter1"]');    expect(label).toBeTruthy();  });});
  const ariaCurrentAttr = await currentLink.getAttribute('aria-current');  expect(ariaCurrentAttr).toBe('page');