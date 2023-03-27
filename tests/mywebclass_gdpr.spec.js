<<<<<<< HEAD
const { test, expect } = require('@playwright/test')
// Helper function to accept the privacy policy
async function acceptPrivacyPolicy (page) {
 const agreeButton = await page.$('#agreeButton')
 if (agreeButton) {
   await agreeButton.click()
   await page.waitForTimeout(1000) // Add a small delay to give time for the modal to close
 }
}
test('MyWebClass.org is Google Analytics and GDPR compliant', async ({ page }) => {
// Check for explicit user consent
 await page.goto('http://localhost:3000/')
 await acceptPrivacyPolicy(page) // Add this line
 const cookieBanner = await page.$('text=Privacy and Cookies Policy')
 expect(cookieBanner).toBeTruthy()
 await page.waitForSelector('text=Privacy and Cookies Policy') // Add this line to wait for the element
 const privacyPolicyLink = await page.$('text=Privacy and Cookies Policy')
 await privacyPolicyLink.click()
 const policySections = await page.$$eval('h2', headings => headings.map(h => h.textContent))
 expect(policySections).toContain('Information we collect')
 const secureConnection = page.url().startsWith('https://')
 if (!page.url().startsWith('http://localhost')) {
   expect(secureConnection).toBeTruthy()
 }
})
=======
const { test, expect } = require('@playwright/test');
test('GDPR Cookies are stored', async ({ page, context }) => {  


await page.goto('https://github.com/kptl823/mywebclass-simulation/blob/master/src/index.html');  
await page.getByLabel('I agree to the GDPR and Google Analytics policy.').check();  
await page.waitForTimeout(1000); //  for 1 seconds  
await page.getByRole('button', { name: 'Agree', exact: true }).click();
 const cookies = await context.cookies();  
 const myCookie = cookies.find(cookie => cookie.name === '_ga');  
 expect(myCookie).toBeTruthy();});
>>>>>>> 6879f23d9581e55cb1d108c7241cebf93e7b61fc
