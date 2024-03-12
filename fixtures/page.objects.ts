import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { DashboardPage } from '../pages/dashboard.page';
import { NewPage } from '../pages/new-page.page';
import { PanelPage } from '../pages/panel.page';
import { DataProfilesPage } from '../pages/data-profiles.page';

export type PageObjects = {
    loginPage: LoginPage;
    dashboardPage: DashboardPage;
    newPage: NewPage;
    panelPage: PanelPage;
    dataProfilesPage: DataProfilesPage;
};

export const test = base.extend<PageObjects>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    dashboardPage: async ({ page }, use) => {
        await use(new DashboardPage(page));
    },
    newPage: async ({ page }, use) => {
        await use(new NewPage(page));
    },
    panelPage: async ({ page }, use) => {
        await use(new PanelPage(page));
    },
    dataProfilesPage: async ({ page }, use) => {
        await use(new DataProfilesPage(page));
    }
});

export { expect, Page, Locator } from "@playwright/test";
