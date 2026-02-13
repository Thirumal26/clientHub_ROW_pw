import { Page, expect, Locator } from "@playwright/test";
import { count } from "console";
import { link } from "fs";
import { request } from "http";
export class slotsGameLibrary{
    readonly page: Page
    readonly slotsSidebar: Locator
    readonly gamelibrarySB: Locator
    readonly sortDropDown: Locator
    readonly sortA_Zbutton: Locator
    readonly certifiedCountryDropDown: Locator
    readonly exclusivityDropDown: Locator
    readonly exclusivityDropDownBtn: Locator
    readonly categoryDropDown: Locator
    readonly categoryDropDownBtn: Locator
    readonly seeMoreBtn: Locator
    readonly hyperplayToggle: Locator
    readonly showUpcomingToggle: Locator
    readonly freeSpinsToggle: Locator
    readonly instantBonusToggle: Locator

    constructor(page:Page){
        this.page = page
        this.slotsSidebar = this.page.getByRole('link', {name: 'Slots'})
        this.gamelibrarySB = this.page.getByRole('link',{name: 'Game Library'})
        this.sortDropDown = this.page.locator('[data-game-library-filter="sort"]')
        .locator('..').locator('.selectize-input')
        this.sortA_Zbutton = this.page.locator('[data-game-library-filter="sort"]').locator('..')
        this.certifiedCountryDropDown = this.page.locator('[data-game-library-filter="certified-country"]')
        .locator('..').locator('.selectize-input')
        this.exclusivityDropDown = this.page.locator('[data-game-library-filter="game-target-market"]')
        .locator('..').locator('.selectize-input')
        this.exclusivityDropDownBtn = this.page.locator('[data-game-library-filter="game-target-market"]')
        .locator('..')
        this.categoryDropDown = this.page.locator('[data-game-library-filter="game-new-studio-filter"]')
        .locator('..').locator('.selectize-input')
        this.categoryDropDownBtn = this.page.locator('[data-game-library-filter="game-new-studio-filter"]')
        .locator('..')
        this.seeMoreBtn = this.page.getByRole("button", {name: 'See More'})
        //Toggle buttons
        this.hyperplayToggle = this.page.locator('[data-game-library-filter="hyperplay"]')
        this.showUpcomingToggle = this.page.locator('[data-game-library-filter="show-upcoming"]')
        this.freeSpinsToggle = this.page.locator('[data-game-library-filter="free-spins"]')
        this.instantBonusToggle = this.page.locator('[data-game-library-filter="has-instant-bonus"]')
    }
    async NavigateSlotsGameLibrary(){
        expect(this.slotsSidebar).toBeTruthy()
        await this.slotsSidebar.click()
        await expect(this.gamelibrarySB).toBeVisible()
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
        const options = this.exclusivityDropDownBtn.locator('.selectize-dropdown-content .option:not(.disabled)')
        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count)
        await options.nth(randomIndex).click()
    }
    async validateGBFiltersCategory(){
        await this.categoryDropDown.click()
        const options = this.categoryDropDownBtn.locator('.selectize-dropdown-content .option:not(.disabled)')
        //await expect(this.page.locator('.selectize-dropdown-content')).toBeVisible()
        const count = await options.count();
        const randomIndex = Math.floor(Math.random() * count)
        await options.nth(randomIndex).click()
        const clear = this.categoryDropDownBtn.locator('.clear')
        clear.click()
    }
    async validateScrollDown(){
        const button = this.seeMoreBtn
        await button.scrollIntoViewIfNeeded()
        if(await this.seeMoreBtn.isVisible()){
            await button.click()
        }
    }
    async validatetoggles(){
        await this.hyperplayToggle.click()
        expect(this.hyperplayToggle).toBeEnabled()
        await this.showUpcomingToggle.click()
        expect(this.showUpcomingToggle).toBeEnabled()
        await this.freeSpinsToggle.click()
        expect(this.freeSpinsToggle).toBeEnabled()
        await this.showUpcomingToggle.click()
        expect(this.showUpcomingToggle).toBeEnabled()
    }
}