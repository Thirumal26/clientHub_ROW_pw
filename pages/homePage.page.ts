import { Page, Locator, expect } from "@playwright/test";
export class homePage{
    readonly page: Page
    readonly msgSlider: Locator
    readonly bannerSlider: Locator
    readonly hpBlockHeadings: Locator
    readonly upcomingReleaseGames: Locator
    readonly enhanceWidget: Locator
    readonly slotsSecTextHp: Locator
    readonly slotsCards: Locator
    readonly slotsActiveCardDate: Locator
    readonly lcSecTextHp: Locator
    readonly lcCards: Locator
    readonly lcActiveCardDate: Locator

    constructor(page:Page){
        this.page = page
        this.msgSlider = this.page.locator('messageSlider__messages')
        this.bannerSlider = this.page.locator('div.slick-slide:not(.slick-cloned) a.heroSlider__slide')
        this.hpBlockHeadings = this.page.locator('.block__heading-title')
        this.upcomingReleaseGames = this.page.locator('.upcomingReleases__releases-single')
        this.enhanceWidget = this.page.getByText('Pragmatic Play ENHANCE')
        this.slotsSecTextHp = this.page.locator('.block__heading-title', { hasText: 'Slots' })
        this.slotsCards = this.slotsSecTextHp.locator('.gamesSlider__games-single')
        this.slotsActiveCardDate = this.slotsCards.locator('.gamesSlider__games-single__content-date')


    }
    async validateMsgSlider(){
        await expect.soft(this.msgSlider).not.toBeEmpty()
    }
    async validateBannerSlider(){
        const bannerCount = await this.bannerSlider.count()
        expect.soft(bannerCount).toBeGreaterThan(0)
    }
    async validateHomepageBlockHeadings(){
        const blockHeadingCount = await this.hpBlockHeadings.count()
        expect(blockHeadingCount).toEqual(7)
    }
    async validateUpcomingReleaseGames(){
        const upcomingReleaseGamesCount = await this.upcomingReleaseGames.count()
        expect(upcomingReleaseGamesCount).toBeGreaterThan(0)
        if(upcomingReleaseGamesCount>0){
            const firstCardURelease = this.upcomingReleaseGames.first()
            const releaseDateText = await 
            firstCardURelease.locator('.upcomingReleases__releases-single__date').innerText()
            function parseReleaseDate(dateText: string): Date {
                const cleaned = dateText
                  .replace(/(\d+)(st|nd|rd|th)/, '$1')
                  .trim()
                return new Date(cleaned)
              }
            const releaseDate = parseReleaseDate(releaseDateText)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            expect(releaseDate.getTime()).toBeGreaterThan(today.getTime())
        }
    }
    async validateEnhanceWidget(){
        expect(this.enhanceWidget).toBeVisible()
    }
    async validateSlotsSectionHP(){
        const cardsCount = await this.slotsCards.count()
        if(cardsCount>0){
            const slotActCardDateText = await this.slotsActiveCardDate.innerText()
            function parseReleaseDate(dateText: string): Date {
                const cleaned = dateText
                  .replace(/(\d+)(st|nd|rd|th)/, '$1')
                  .trim()
                return new Date(cleaned)
              }
            const releaseDate = parseReleaseDate(slotActCardDateText)
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            expect(releaseDate.getTime()).toBeLessThanOrEqual(today.getTime())
        }
    }
    async validateLCSectionHp(){

    }
}