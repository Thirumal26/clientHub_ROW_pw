import { Page, expect, Locator } from "@playwright/test";
import { request } from "http";
export class slotsGameLibrary{
    readonly page: Page
    readonly slotsSidebar: Locator
    readonly gamelibrarySB: Locator
    readonly sortDropDown: Locator
    readonly sortA_Zbutton: Locator

    constructor(page:Page){
        this.page = page
        this.slotsSidebar = this.page.locator('.sidebar-menu__item--icon-casino')
        this.gamelibrarySB = this.page.getByRole('link',{name: 'Game Library'})
        this.sortDropDown = this.page.locator('[data-game-library-filter="sort"]').locator('..')
        .locator('.selectize-input')
        this.sortA_Zbutton = this.page.locator('[data-game-library-filter="sort"]').locator('..')
        // .locator('selectize-dropdown-content')
    }
    async NavigateSlotsGameLibrary(){
        expect(this.slotsSidebar).toBeTruthy()
        await this.slotsSidebar.click()
        await this.gamelibrarySB.click()
        const apiRequest = this.page.waitForResponse(response => response.url()
        .includes('/BE-PROD/slot/en.json') && response.status() === 200)
        const apiResponse = await apiRequest
        expect(apiResponse.ok()).toBeTruthy()
        expect(apiResponse.status()).toBe(200)
        await expect(this.page).toHaveURL(/\/slots\/game-library\/?/)
    }
    async validateGBFilters(){
        await this.sortDropDown.click()
        const sortA_ZbuttonClick = this.sortA_Zbutton.locator('.selectize-dropdown .option', { hasText: 'A-Z' })
        await sortA_ZbuttonClick.click()
        const sortFilter = this.page.locator('[data-game-library-filter="sort"]').locator('..');
        await expect(sortFilter.locator('.selectize-input .item')).toHaveText('A-Z');
    }
    

}