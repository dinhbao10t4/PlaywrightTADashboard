import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import { AdministerItem } from "../enum/administer-items";
import { GeneralSetting } from "../model/general-setting";
import { Field } from "../enum/field";

test.describe("View Data Profiles Tests", () => {
    test.beforeEach(async ({ loginPage, dashboardPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.goToAdministerItemPage(AdministerItem.DATA_PROFILES);
    });

    test("Verify that user is able to add levels of fields ", async ({dataProfilesPage}) => {
        let generalSetting = new GeneralSetting("Test");
        await dataProfilesPage.goToAddNewDataProfileForm();
        await dataProfilesPage.fillGeneralSetting(generalSetting);
        await dataProfilesPage.fillDisplayField();
        
        await dataProfilesPage.addLevel(Field.NAME);
        await dataProfilesPage.verifyLevelAdded(Field.NAME);

        await dataProfilesPage.addLevel(Field.LOCATION);
        await dataProfilesPage.verifyLevelAdded(Field.LOCATION);
    });
});
