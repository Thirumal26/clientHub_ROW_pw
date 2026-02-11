import {test} from '@playwright/test'
import { baseUrl } from "../pages/baseUrl.page";
import { loginFlow } from '../pages/loginFlow.page';
import { loginCredentials } from '../fixtures/loginData';
test.describe('Login flows of ClientHub-ROW', ()=>{
    test.beforeEach('Launch Site', async ({page})=>{
        const launch = new baseUrl(page)
        await launch.launchWebsite()
    })
    test('InValid Login credentials', async({page})=> {
        const validLoginCredentials = new loginFlow(page)
        await validLoginCredentials.validateLoginPage()
        await validLoginCredentials.invalidLoginFlow()
    })
    test('Valid Login credentials', async({page})=> {
        const validLoginCredentials = new loginFlow(page)
        await validLoginCredentials.validateLoginPage()
        await validLoginCredentials.validLoginFlow()
    })
})