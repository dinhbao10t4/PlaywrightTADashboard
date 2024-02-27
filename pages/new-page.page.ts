import { Page, Locator } from "@playwright/test";
import { BasePage } from "./base.page";
import {Utils} from "../utils/utils";

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

    async createNewPage(newpageName: string, parentPage?: string, numberOfColumn?: string, displayAfter?: string, isPublic?: boolean) {
        await this.newPageNameTextbox.fill(newpageName);
        if (!Utils.isEmpty(parentPage) && parentPage != undefined) {
            await this.parentPageSelection.selectOption(parentPage);
        }
        if (!Utils.isEmpty(numberOfColumn) && numberOfColumn != undefined) {
            await this.numberOfColumnSelection.selectOption(numberOfColumn);
        }
        if (!Utils.isEmpty(displayAfter) && displayAfter != undefined) {
            await this.displayAfterSelection.selectOption(displayAfter);
        }
        if (isPublic != null && isPublic != undefined) {
            await this.publicCheckbox.check();
        }
        await this.okButton.click();
    }
}