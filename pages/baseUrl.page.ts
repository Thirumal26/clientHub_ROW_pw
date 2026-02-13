import {Page, expect, Locator} from '@playwright/test'
import { baseURL } from '../utils/baseUrl'
export class Url{
    readonly page: Page
    constructor(page:Page){
        this.page = page
    }
    async launchWebsite(){
        const base_Url = baseURL()
        await this.page.goto(base_Url.site_Url)
    }
}