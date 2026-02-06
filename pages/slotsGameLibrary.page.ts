import { Page, expect, Locator } from "@playwright/test";
import { count } from "console";
import { request } from "http";
export class slotsGameLibrary{
    readonly page: Page
    readonly slotsSidebar: Locator
    readonly gamelibrarySB: Locator
    readonly sortDropDown: Locator
    readonly sortA_Zbutton: Locator
    readonly certifiedCountryDropDown: Locator
    readonly exclusivityDropDown: Locator
    readonly categoryDropDown: Locator

    constructor(page:Page){
        this.page = page
        this.slotsSidebar = this.page.locator('.sidebar-menu__item--icon-casino')
        this.gamelibrarySB = this.page.getByRole('link',{name: 'Game Library'})
        this.sortDropDown = this.page.locator('[data-game-library-filter="sort"]')
        .locator('..').locator('.selectize-input')
        this.sortA_Zbutton = this.page.locator('[data-game-library-filter="sort"]').locator('..')
        this.certifiedCountryDropDown = this.page.locator('[data-game-library-filter="certified-country"]')
        .locator('..').locator('.selectize-input')
        this.exclusivityDropDown = this.page.locator('[data-game-library-filter="game-target-market"]')
        .locator('..').locator('selectize-input')
        this.categoryDropDown = this.page.locator('[data-game-library-filter="game-new-studio-filter"]')
        .locator('..').locator('selectize-input')

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
    async validateGBFiltersSlots(){
        await this.sortDropDown.click()
        const sortA_ZbuttonClick = this.sortA_Zbutton.locator('.selectize-dropdown .option', { hasText: 'A-Z' })
        await sortA_ZbuttonClick.click()
        const sortFilter = this.page.locator('[data-game-library-filter="sort"]').locator('..');
        await expect(sortFilter.locator('.selectize-input .item')).toHaveText('A-Z');
    }
    async validateGBFiltersCertifiedCountry(){
        await this.certifiedCountryDropDown.click()
        const options = this.page.locator('.selectize-dropdown-content .option:not(.disabled)')
        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count)
        await options.nth(randomIndex).click()
    }
    async validateGBFiltersExclusivity(){
        await this.exclusivityDropDown.click()
        const options = this.page.locator('.selectize-dropdown-content .option:not(.disabled)')
        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count)
        await options.nth(randomIndex).click()
    }
    async validateGBFiltersCategory(){
        await this.categoryDropDown.click()
        const options = this.page.locator('.selectize-dropdown-content .option:not(.disabled)')
        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count)
        await options.nth(randomIndex).click()
        const clear = this.page.locator('.clear')
        clear.click()
    }



}