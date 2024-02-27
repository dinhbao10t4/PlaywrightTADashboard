import {test, expect} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import users from "../data/users.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"

test.describe("Create New Page Tests", () => {
    
    test("Verify that Public pages can be visible and accessed by all users of working repository", async ({loginPage, dashboardPage, newPage}) => {
        const newPageName = Utils.generateRandomString();
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(newPageName, undefined, undefined, undefined, true);
        await dashboardPage.isMainPageDisplayed(newPageName);

        // logout and login with new account
        await dashboardPage.logout();
        loginPage.login(configuration.sampleRepository, users.john_user.username, users.john_user.password);
        await dashboardPage.isMainPageDisplayed(newPageName);

        // logout and login with admin
        await dashboardPage.logout();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);

        //delete new page
        await dashboardPage.goToMainPage(newPageName);
        await dashboardPage.deleteCurrentPage();
    });
});
