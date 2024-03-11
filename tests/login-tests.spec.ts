import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import users from "../data/users.json"

test.describe("Login Tests", () => {
    test.beforeEach(async ({ loginPage }) => {
        await loginPage.goto();
    });

    test("user can login specific repository successfully via Dashboard login page with correct credentials", async ({loginPage, dashboardPage}) => {
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.verifyDashBoardDisplays();
    });

    test("Verify that user fails to login specific repository successfully via Dashboard login page with incorrect credentials", async ({loginPage}) => {
        loginPage.verifyTheErrorMessageIsDisplayed();
        await loginPage.login(configuration.sampleRepository, users.invalidUser.username, users.invalidUser.password);
    });
});
