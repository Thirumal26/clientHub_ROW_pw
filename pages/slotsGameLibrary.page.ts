import { Page, expect, Locator } from "@playwright/test";
import { request } from "http";
export class slotsGameLibrary{
    readonly page: Page
    readonly slotsSidebar: Locator
    readonly gamelibrarySB: Locator
    readonly sortDropDown: Locator

    constructor(page:Page){
        this.page = page
        this.slotsSidebar = this.page.locator('.sidebar-menu__item--icon-casino')
        this.gamelibrarySB = this.page.getByRole('link',{name: 'Game Library'})
        this.sortDropDown = this.page.locator('select.selectized[name="sort"]')

    }
    async NavigateSlotsGameLibrary(){
        await this.slotsSidebar.click()
        await this.gamelibrarySB.click()
        const apiRequest = this.page.waitForResponse(response => response.url()
        .includes('/BE-PROD/slot/en.json') && response.status() === 200)
        const apiResponse = await apiRequest
        expect(apiResponse.ok()).toBeTruthy()
        expect(apiResponse.status()).toBe(200)
        await expect(this.page).toHaveURL(/\/slots\/game-library\/?/)
        expect(this.page.waitForLoadState())
    }
    async validateGBFilters(){
        await this.sortDropDown.click()
        const sortA_Z = this.sortDropDown.getByRole('button', {name: 'A-Z'})
        await sortA_Z.click()
        const sortFilter = this.page.locator('[data-game-library-filter="sort"]').locator('..');
        await expect(sortFilter.locator('.selectize-input .item')).toHaveText('A-Z');
    }
    

}