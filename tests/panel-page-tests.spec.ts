import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import { AdministerItem } from "../enum/administer-items";

test.describe("Panel Page Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
    });

    test("Verify that when 'Add New Panel' form is on focused all other control/form is disabled or locked.", async ({dashboardPage, panelPage}) => {
        await dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        await panelPage.openAddNewPanelForm();
        await panelPage.verifyOtherControlIsDisabled();
    });
});
