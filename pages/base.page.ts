import { Page, Locator } from '@playwright/test';

export abstract class BasePage {
    readonly page: Page;
    readonly accountTab: Locator;
    readonly logoutButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.accountTab = this.page.locator("//ul[@class='head-menu']//a[@href='#Welcome']");
        this.logoutButton = this.page.locator("//ul[@class='head-menu']//a[@href='logout.do']");
    }

    async logout() {
        await this.accountTab.click();
        await this.logoutButton.click();
    }
}
