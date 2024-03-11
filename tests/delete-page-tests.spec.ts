import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import { Utils } from "../utils/utils"
import { GlobalSetting } from "../enum/global-settings"
import { MainPage } from "../model/main-page";

test.describe("Delete Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
    });
    
    test("Verify that user can remove any main parent page except Overview page successfully and the order of pages stays persistent as long as there is not children page under it", async ({loginPage, dashboardPage, newPage}) => {
        let parentPage = new MainPage(Utils.generateRandomString());
        let childPage = new MainPage(Utils.generateRandomString(), parentPage.getName());

        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(parentPage);
        await dashboardPage.goToGlobalSettingsFeature(GlobalSetting.ADD_PAGE);
        await newPage.createNewPage(childPage);

        // delete the parent page which has child page
        await dashboardPage.goToMainPage(parentPage.getName());
        await dashboardPage.verifyTheMessageWhenDeletingPageThatHasChildPage(parentPage.getName());
        await dashboardPage.deleteCurrentPage();

        // delete the child page
        await dashboardPage.goToChildPage(childPage.getName(), childPage.getParentPage());
        await dashboardPage.deleteCurrentPage();
        await dashboardPage.verifyChildPageDelete(childPage.getName(), childPage.getParentPage());

        // delete the main page
        await dashboardPage.goToMainPage(parentPage.getName());
        await dashboardPage.deleteCurrentPage();
        await dashboardPage.verifyMainPageDelete(parentPage.getName());
    });
});
