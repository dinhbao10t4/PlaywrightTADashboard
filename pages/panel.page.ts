import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./base.page";
import { Panel } from "../model/panel";
import { format } from "util";

export class PanelPage extends BasePage {
    readonly addNewLink: Locator;
    readonly displayNameTextbox: Locator;
    readonly seriesSeletion: Locator;
    readonly okButton: Locator;

    private readonly deletePanelLinkDynamicStr: string = "//div[@id='ccontent']//table//td/a[text()='%s']/parent::td/following-sibling::td/a[text()='Delete']";

    constructor(page: Page) {
        super(page);
        this.addNewLink = this.page.locator("//div[@id='ccontent']//div[@class='panel_tag2']/a[text()='Add New']");
        this.displayNameTextbox = this.page.locator("#txtDisplayName");
        this.seriesSeletion = this.page.locator("#cbbSeriesField");
        this.okButton = this.page.locator("#OK");
    }

    async openAddNewPanelForm() {
        await this.addNewLink.click();
    }

    async verifyOtherControlIsDisabled() {
        let isClickable = false;
        try {
            await this.addNewLink.click({
                timeout: 3000,
            });
            isClickable = true;
        } catch (error) {
        }

        await expect(isClickable).toBe(false);
    }

    async addNewPanel(panel: Panel) {
        await this.displayNameTextbox.fill(panel.getName());
        await this.seriesSeletion.selectOption(panel.getChartSetting().getSeries().toLocaleLowerCase());

        await this.okButton.click();
    }

    async deletePanel(panelName: string) {
        this.page.once('dialog', async(dialog) => {
            await dialog.accept();
        });
        
        await this.page.locator(format(this.deletePanelLinkDynamicStr, panelName)).click();
    }
}
