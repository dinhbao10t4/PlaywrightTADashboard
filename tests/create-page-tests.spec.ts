import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import users from "../data/users.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"
import { Constants } from "../utils/constants"
import { MainPage } from "../model/main-page"

test.describe("Create New Page Tests", () => {
    let mainPage;
    
    test.beforeEach(async ({ loginPage, dashboardPage, newPage }) => {
        mainPage = new MainPage(Utils.generateRandomString(), Constants.EMPTY_STRING, Constants.EMPTY_STRING, Constants.EMPTY_STRING, true);
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(mainPage);
    });
    
    test("Verify that Public pages can be visible and accessed by all users of working repository", async ({loginPage, dashboardPage}) => {
        await dashboardPage.goToMainPage(mainPage.getName());
        await dashboardPage.verifyMainPageDisplays(mainPage.getName());

        // logout and login with new account
        await dashboardPage.logout();
        await loginPage.login(configuration.sampleRepository, users.johnUser.username, users.johnUser.password);
        await dashboardPage.verifyMainPageDisplays(mainPage.getName());
    });

    test.afterEach(async ({ loginPage, dashboardPage }) => {
        // logout and login with admin
        await dashboardPage.logout();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);

        //delete new page
        await dashboardPage.goToMainPage(mainPage.getName());
        await dashboardPage.deleteCurrentPage();
    });
});
