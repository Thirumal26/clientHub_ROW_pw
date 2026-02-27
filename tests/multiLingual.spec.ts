import {test} from '@playwright/test'
import { loginFlow } from '../pages/loginFlow.page'
import { mulitlingual } from '../pages/multilingual.page'
import { Url } from '../pages/baseUrl.page'
test.describe('Client Hub Multilingual', ()=> {
    test.beforeEach('Launch site', async({page})=> {
        const launch = new Url(page)
        await launch.launchWebsite()
    })
    test('Validate URLs for multilingial', async({page})=>{
        test.setTimeout(120000)
        const validLoginCredentials = new loginFlow(page)
        const multilingualCheck = new mulitlingual(page)
        await validLoginCredentials.validLoginFlow()
        await multilingualCheck.validateDropdownLanguages()
    })
})