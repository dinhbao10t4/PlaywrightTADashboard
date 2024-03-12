import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import { AdministerItem } from "../enum/administer-items";

test.describe("View Data Profiles Tests", () => {
    test.beforeEach(async ({ loginPage, dashboardPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.goToAdministerItemPage(AdministerItem.DATA_PROFILES);
    });

    test("Verify that all Pre-set Data Profiles are populated correctly", async ({dataProfilesPage}) => {
        await dataProfilesPage.verifyPreSetDataProfilesArePopulatedCorrectly();
    });

    test("Verify that Data Profiles are listed alphabetically", async ({dataProfilesPage}) => {
        await dataProfilesPage.verifyDataProfilesAreListedAlphabetically();
    });
});
