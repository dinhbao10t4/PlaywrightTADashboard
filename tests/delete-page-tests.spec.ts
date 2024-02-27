import {test, expect} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"

test.describe("Delete Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
    });
    
    test("Verify that user can remove any main parent page except Overview page successfully and the order of pages stays persistent as long as there is not children page under it", async ({loginPage, dashboardPage, newPage}) => {
        const parentPageName = Utils.generateRandomString();
        const childPageName = Utils.generateRandomString();

        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(parentPageName);
        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(childPageName, parentPageName);

        // delete the parent page which has child page
        await dashboardPage.goToMainPage(parentPageName);
        await dashboardPage.clickGlobalSettingsButton();
        await dashboardPage.verifyTheMessageWhenDeletingPageThatHasChildPage(parentPageName);
        await dashboardPage.clickDeleteCurrentPageButton();

        // delete the child page
        await dashboardPage.goToChildPage(childPageName, parentPageName);
        await dashboardPage.deleteCurrentPage();
        await dashboardPage.isChildPageDeleted(childPageName, parentPageName);

        // delete the main page
        await dashboardPage.goToMainPage(parentPageName);
        await dashboardPage.deleteCurrentPage();
        await dashboardPage.isMainPageDeleted(parentPageName);
    });
});
