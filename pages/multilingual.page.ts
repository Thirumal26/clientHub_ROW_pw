import { Page, expect, Locator } from "@playwright/test";
export class mulitlingual{
    readonly page: Page
    readonly langDropDown: Locator
    readonly langCountDb: Locator

    constructor(page: Page){
        this.page = page
        this.langDropDown = this.page.locator('.header__languages')
        this.langCountDb = this.page.locator('.lang-switcher__sub-menu__link')
    }
    async validateDropdownLanguages(){
        const countlangDb = await this.langCountDb.count()
        for(let i=0;i<countlangDb;i++){
            console.log(await this.langDropDown.isVisible())
            console.log(await this.langDropDown.isEnabled())
            await this.langDropDown.click()
            const link = this.langCountDb.nth(i)
            const href = await link.getAttribute('href')
            await link.click()
            await expect(this.page).toHaveURL(href!)
        }
    }
}