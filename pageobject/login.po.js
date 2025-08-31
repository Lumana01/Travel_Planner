const { expect } = require("@playwright/test");

exports.LoginPage = class LoginPage{
    constructor(page) {
        this.page=page;
        this.usernameInput = '#email';
        this.passwordInput = '//input[@placeholder="Password"]';
        this.loginButton = '//button[@id="Submit"]';
        this.logOutButton = '//button[@id="LogOut"]';
        this.loginValidation='//p[contains(text(),"Click on any contact to view the Contact Details")]';
        this.alterMessage='//span[@id="error"]';

    }

    async login(username, password){
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.usernameInput).fill(username);
        await this.page.locator(this.passwordInput).fill(password);
        await this.page.locator(this.loginButton).click();
}


    async verifyValidLogin(){
        const loginValidation = await this.page.locator(this.loginValidation);
        await this.page.waitForTimeout(2000);
        expect(this.logOut).toBeVisible;
        await expect (loginValidation). toHaveText("Click on any contact to view the Contact Details");
  }

    async verifyInvalidLogin(){
        const InvalidLogin = await this.page.locator(this.alterMessage);
        await expect (InvalidLogin). toHaveText("Incorrect username and password");
  } 
}