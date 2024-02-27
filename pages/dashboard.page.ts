import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import { format } from 'util';
import { Utils } from "../utils/utils"
import messages from "../data/messages.json"

export class DashboardPage extends BasePage {
    readonly globalSettingsButton: Locator;
    readonly deleteCurrentPageButton: Locator;
    globalSettingFeature: string = "//a[contains(text(), '%s')]";
    mainPageDynamicStr: string = "//div[@id='main-menu']//li/a[text()='%s']";
    childPageDynamicStr: string = "//div[@id='main-menu']//li/a[text()='%s']/following-sibling::ul/li/a[text()='%s']";
    
    constructor(page: Page) {
        super(page);
        this.globalSettingsButton = this.page.locator(".mn-setting");
        this.deleteCurrentPageButton = this.page.locator("//a[contains(text(), 'Delete')]");
    }

    async isDisplayed() {
        await expect(this.page).toHaveTitle(/Execution Dashboard/);
    }

    async clickGlobalSettingsButton() {
        await this.globalSettingsButton.click();
    }

    async goToGlobalSettingsFeature(featureName: string) {
        await this.clickGlobalSettingsButton();
        await this.page.locator(format(this.globalSettingFeature, featureName)).click();
    }

    async isMainPageDisplayed(pageName: string) {
        await expect(this.page.locator(format(this.mainPageDynamicStr, pageName))).toBeVisible();
    }

    async isMainPageDeleted(pageName: string) {
        await expect(this.page.locator(format(this.mainPageDynamicStr, pageName))).toBeHidden();
    }

    async goToMainPage(pageName: string) {
        await this.page.locator(format(this.mainPageDynamicStr, pageName)).click();
    }
    
    async goToChildPage(childPageName: string, parentPageName: string) {
        await this.page.locator(format(this.mainPageDynamicStr, parentPageName)).hover();
        await this.page.locator(format(this.childPageDynamicStr, parentPageName, childPageName)).click();
    }

    async isChildPageDeleted(childPageName: string, parentPageName: string) {
        await this.page.locator(format(this.mainPageDynamicStr, parentPageName)).hover();
        await expect(this.page.locator(format(this.childPageDynamicStr, parentPageName, childPageName))).toBeHidden();
    }

    async deleteCurrentPage() {
        Utils.delay();
        await this.clickGlobalSettingsButton();
        this.page.once('dialog', async(dialog) => {
            await dialog.accept();
        });
        await this.clickDeleteCurrentPageButton();
    }

    async clickDeleteCurrentPageButton() {
        await this.deleteCurrentPageButton.click();
    }

    async verifyTheMessageWhenDeletingPageThatHasChildPage(pageName: string) {
        this.page.once('dialog', async dialog => {
            this.page.once('dialog', async dialog => {
                await expect.soft(dialog.message().trim()).toEqual(format(messages.delete_page_warning_essage, pageName));
                await dialog.accept();
            });
            await expect.soft(dialog.message().trim()).toEqual(messages.delete_page_confirm_message);
            await dialog.accept();
        });
    }
}