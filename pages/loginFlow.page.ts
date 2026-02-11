import { Page, expect, Locator } from "@playwright/test";
import { loginCredentials } from "../fixtures/loginData";
export class loginFlow{
    readonly page: Page
    readonly userNameText: Locator
    readonly passwordText: Locator
    readonly rememberMeCb: Locator
    readonly loginBtn: Locator
    readonly homePageLogo: Locator
    constructor(page:Page){
        this.page = page
        this.userNameText = this.page.getByLabel('Username or Email Address')
        this.passwordText = this.page.getByRole('textbox', {name: 'password'})
        this.rememberMeCb = this.page.getByRole('checkbox', {name: ' Remember Me'})
        this.loginBtn = this.page.getByRole('button',{name: 'Log In'})
        this.homePageLogo = this.page.getByAltText('Pragmatic Play Logo')
    }
    async validateLoginPage(){
        const welcomeText = this.page.locator('.login__content-form__heading')
        await expect(welcomeText).toHaveText('Welcome to the Client Hub!')
    }
    async invalidLoginFlow(){
        const loginDetails = loginCredentials()
        await this.userNameText.fill(loginDetails.userName)
        await expect(this.rememberMeCb).not.toBeChecked()
        await this.rememberMeCb.check()
        await this.loginBtn.click()
    }
    async validLoginFlow(){
        const loginDetails = loginCredentials()
        await this.userNameText.fill(loginDetails.userName)
        await this.passwordText.fill(loginDetails.password)
        await expect(this.rememberMeCb).not.toBeChecked()
        await this.rememberMeCb.check()
        await this.loginBtn.click()
        await expect(this.homePageLogo).toBeVisible()
    }
}