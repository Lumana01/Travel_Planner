import { test } from '@playwright/test';
import { LoginPage } from '../pageobject/login.po';
const testData = require ('../fixtures/loginFixture.json')


test.beforeEach(async ({ page }) =>{
 await page.goto('/');
})

test.describe('Valid login tests',() =>{
    test('Login using valid username and password', async ({ page })=>{
        const login = new LoginPage(page);
        await login.Login(testData.validUser.userName, testData.validUser.password);
        await login.verifyValidLogin()
    });

test.describe('Invalid login tests',() => {
    test('Login using invalid username and invalid password', async ({ page })=>{
        const login = new LoginPage(page);
        await login.Login(testData.inValidUser.userName, testData.validUser.password);
        await login.verifyInvalidLogin();

    });
});
})