const { test, expect } = require('@playwright/test');
test('GDPR Cookies are stored', async ({ page, context }) => {  


await page.goto('https://github.com/kptl823/mywebclass-simulation/blob/master/src/index.html');  
await page.getByLabel('I agree to the GDPR and Google Analytics policy.').check();  
await page.waitForTimeout(1000); //  for 1 seconds  
await page.getByRole('button', { name: 'Agree', exact: true }).click();
 const cookies = await context.cookies();  
 const myCookie = cookies.find(cookie => cookie.name === '_ga');  
 expect(myCookie).toBeTruthy();});
