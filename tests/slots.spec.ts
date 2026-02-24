import {test} from '@playwright/test'
import { Url } from '../pages/baseUrl.page'
import { loginFlow } from '../pages/loginFlow.page'
import { slotsGameLibrary } from '../pages/slotsSection.page.ts/slotsGameLibrary.page'
test.describe('Slots page validation for ClientHub ROW', ()=> {
    test.beforeEach('Launch Site', async ({page})=>{
        const launch = new Url(page)
        await launch.launchWebsite()
    })
    test('Slots page', async({page})=> {
        const validLoginCredentials = new loginFlow(page)
        const slots = new slotsGameLibrary(page)
        await validLoginCredentials.validLoginFlow()
        await slots.NavigateSlotsGameLibrary()
        await slots.validateGBFiltersSlots()
        await slots.validateGBFiltersCertifiedCountry()
        await slots.validateGBFiltersExclusivity()
        await slots.validateGBFiltersCategory()
    })
    test('filter toggles',async({page})=>{
        const validLoginCredentials = new loginFlow(page)
        const slotsFilter = new slotsGameLibrary(page)
        await validLoginCredentials.validLoginFlow()
        await slotsFilter.NavigateSlotsGameLibrary()
        await slotsFilter.validatetoggles()
        await slotsFilter.validateScrollDown()
    })
})