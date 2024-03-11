import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import {Utils} from "../utils/utils";
import { MainPage } from "../model/main-page";

export class NewPage extends BasePage {
    readonly newPageNameTextbox: Locator;
    readonly parentPageSelection: Locator;
    readonly numberOfColumnSelection: Locator;
    readonly displayAfterSelection: Locator;
    readonly publicCheckbox: Locator;
    readonly okButton: Locator;

    constructor(page: Page) {
        super(page);
        this.newPageNameTextbox = this.page.locator("#name");
        this.parentPageSelection = this.page.locator("#parent");
        this.numberOfColumnSelection = this.page.locator("#columnnumber");
        this.displayAfterSelection = this.page.locator("#afterpage");
        this.publicCheckbox = this.page.locator("#ispublic");
        this.okButton = this.page.locator("#OK");
    }

    async createNewPage(mainPage: MainPage, newpageName?: string, parentPage?: string, numberOfColumn?: string, displayAfter?: string, isPublic?: boolean) {
        await this.newPageNameTextbox.fill(mainPage.getName());
        if (!Utils.isEmpty(mainPage.getParentPage()) && mainPage.getParentPage() != undefined) {
            await this.parentPageSelection.selectOption(mainPage.getParentPage());
        }
        if (!Utils.isEmpty(mainPage.getNumberOfColumn()) && mainPage.getNumberOfColumn() != undefined) {
            await this.numberOfColumnSelection.selectOption(mainPage.getNumberOfColumn());
        }
        if (!Utils.isEmpty(mainPage.getDisplayAfter()) && mainPage.getDisplayAfter() != undefined) {
            await this.displayAfterSelection.selectOption(mainPage.getDisplayAfter());
        }
        if (mainPage.isPublic() != null && mainPage.isPublic() != undefined) {
            await this.publicCheckbox.check();
        }
        await this.okButton.click();
    }
}