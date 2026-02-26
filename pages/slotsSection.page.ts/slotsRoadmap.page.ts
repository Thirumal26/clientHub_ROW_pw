import { Page, expect, Locator } from "@playwright/test";
export class slotsRoadmap{
    readonly page: Page
    readonly slotsBtn: Locator
    readonly roadmapBtn: Locator
    readonly roadmapText: Locator
    readonly roadmapTableHeaders: Locator
    readonly roadmapGames: Locator
    readonly roadmapCalendar: Locator
    readonly mediapackLabel: Locator
    readonly avaForTestingLabel: Locator
    readonly avaForOperatorsLabel: Locator
    readonly filterYearText: Locator
    readonly yearLabelText: Locator
    readonly yearDrowdown: Locator

    constructor (page: Page){
        this.page = page
        this.slotsBtn = this.page.getByRole('link', {name: 'Slots'})
        this.roadmapBtn = this.page.getByRole('link', {name: 'Roadmap', exact: true})
        this.roadmapText = this.page.locator('.roadmap__body-title-header')
        this.roadmapTableHeaders = this.page.locator('.roadmap__body-games__heading td')
        this.roadmapGames = this.page.locator('#roadmap-container tr.roadmap__body-games__single td .name a')
        this.roadmapCalendar = this.page.locator('#roadmap-calender-data .clndr .month')
        this.mediapackLabel = this.page.getByText('Game Media Pack Available')
        this.avaForTestingLabel = this.page.getByText('Game Available for Testing')
        this.avaForOperatorsLabel = this.page.locator('.clndr-legend__single').getByText('Game Available for Operators')
        this.filterYearText = this.page.locator('.roadmap-filter-label').nth(0)
        this.yearLabelText = this.page.locator('.selectize-input .item').nth(0)
        this.yearDrowdown = this.page.locator('.roadmap-filter-label').nth(0)
    }
    async validateRoadmapLandingPage(){
        await this.slotsBtn.click()
        await expect(this.roadmapBtn).toBeVisible()
        const roadmapApi = this.page.waitForResponse(Response => Response.url().includes('/slots/roadmap/')&&
        Response.status()===200)
        await this.roadmapBtn.click()
        const apiResponse = await roadmapApi
        expect(apiResponse.ok()).toBeTruthy()
        expect(apiResponse.status()).toBe(200)
        const roadmapHeaderText = await this.roadmapText.innerHTML()
        expect(roadmapHeaderText).toMatch('Roadmap')
        await this.page.waitForSelector(
            '#data-roadmap-headers td:has-text("Upcoming Games")'
        );
        const headerTitles =  await this.roadmapTableHeaders.allInnerTexts()
        console.log(headerTitles)
        expect(headerTitles).toEqual
        (["Upcoming Games", "Country", "Media Pack", "Available for Testing", "Available for Operators"])
    }
    async validateRoadmapGames(){
        const firstLinkedGame = this.roadmapGames.first()
        await Promise.all([
            this.page.waitForNavigation(),
            firstLinkedGame.click(),
        ])
        const validatePage = this.page.locator('.header__breadcrumbs')
        await expect(validatePage).toContainClass('header__breadcrumbs')
        this.page.goBack()
    }
    async validateCalendar(){
        const uiMonth = (await this.roadmapCalendar.textContent())?.trim()
        const currentMonth = new Date().toLocaleString('default',{month: 'long',year: 'numeric'})
        expect(uiMonth).toBe(currentMonth)
    }
    async validateCalendarLabels(){
        expect(this.mediapackLabel).toContainText('Game Media Pack Available')
        expect(this.avaForTestingLabel).toContainText('Game Available for Testing')
        expect(this.avaForOperatorsLabel).toContainText('Game Available for Operators')
    }
    async validateYearFilter(){
        const yearText = await this.filterYearText.textContent()
        expect(yearText).toMatch('Year')
        await this.filterYearText.click()
        const randomYearSelect = this.page.locator('.option')
        const count = await randomYearSelect.count()
        console.log(count)
        const randomIndex = Math.floor(Math.random()*count)
        await randomYearSelect.nth(randomIndex) .click()
        const yearTextDd = await this.filterYearText.textContent()
        const year = await this.yearLabelText.textContent()
        await expect(this.page.locator('#roadmap-container tr.roadmap__body-games__single td div.copyable').first()
          ).toContainText(new RegExp(year?.trim()!))
    }
}