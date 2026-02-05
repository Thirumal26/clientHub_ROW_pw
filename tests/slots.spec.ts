import {test} from '@playwright/test'
import { baseUrl } from '../pages/baseUrl.page'
import { loginFlow } from '../pages/loginFlow.page'
import { slotsGameLibrary } from '../pages/slotsGameLibrary.page'
test.describe('Slots page validation for ClientHub ROW', ()=> {
    test.beforeEach('Launch Site', async ({page})=>{
        const launch = new baseUrl(page)
        await launch.launchWebsite()
    })
    test('Slots page', async({page})=> {
        const validLoginCredentials = new loginFlow(page)
        const slots = new slotsGameLibrary(page)
        await validLoginCredentials.validLoginFlow()
        await slots.NavigateSlotsGameLibrary()
    })
})