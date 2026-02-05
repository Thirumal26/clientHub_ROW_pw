import {Page, expect, Locator} from '@playwright/test'
export class baseUrl{
    readonly page: Page
    constructor(page:Page){
        this.page = page
    }
    async launchWebsite(){
        await this.page.goto('https://clienthub.pragmaticplay.com/')
    }
}