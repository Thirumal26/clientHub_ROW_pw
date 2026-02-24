import {test} from '@playwright/test'
import { loginFlow } from '../pages/loginFlow.page'
import { slotsRoadmap } from '../pages/slotsSection.page.ts/slotsRoadmap.page'
import { Url } from '../pages/baseUrl.page'
test.describe('Slots Roadmap page', ()=> {
    test.beforeEach('Launch site', async({page})=>{
        const launch = new Url(page)
        await launch.launchWebsite()
    })
    test('Slots Roadmap page ',async ({page}) => {
        const validLoginCredentials = new loginFlow(page)
        const slotsRoadmapTest = new slotsRoadmap(page)
        await validLoginCredentials.validLoginFlow()
        await slotsRoadmapTest.validateRoadmapLandingPage()
        await slotsRoadmapTest.validateRoadmapGames()
        await slotsRoadmapTest.validateCalendar()
        await slotsRoadmapTest.validateCalendarLabels()
    })
})