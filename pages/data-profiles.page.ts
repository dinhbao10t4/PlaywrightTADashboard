import { Page, Locator, expect } from "@playwright/test"
import { BasePage } from "./base.page"
import dataProfileData from "../data/data-profiles.json"
import { Table } from "../element/table";
import { Utils } from "../utils/utils";
import { format } from 'util';
import {GeneralSetting} from "../model/general-setting";

export class DataProfilesPage extends BasePage {
    private dataProfileTable: Table;
    private readonly DATA_PROFILE_HEADER: string = "Data Profile";
    readonly addNewDataLink: Locator;

    readonly settingNameTextbox: Locator;
    readonly settingTypeSelection: Locator;
    readonly settingRelatedDataSelection: Locator;

    readonly actionButtonDynamicStr: string = "//table/tbody/tr/td/input[@value='%s']";
    readonly sortFieldNameDynamicStr: string = "//table[@id='profilesettings']/tbody/tr/td/span[@class='sortFieldName' and text()='%s']";

    readonly fieldSelection: Locator;
    readonly addLevelButton: Locator;

    constructor(page: Page) {
        super(page);
        this.dataProfileTable = new Table(page);
        this.addNewDataLink = this.page.locator("//div[@id='ccontent']//a[text()='Add New']");

        this.settingNameTextbox = this.page.locator("#txtProfileName");
        this.settingTypeSelection = this.page.locator("#cbbEntityType");
        this.settingRelatedDataSelection = this.page.locator("#cbbSubReport");

        this.fieldSelection = this.page.locator("#cbbFields");
        this.addLevelButton = this.page.locator("#btnAddSortField");
    }

    async goToAddNewDataProfileForm() {
        this.addNewDataLink.click();
    }

    async fillGeneralSetting(generalSetting: GeneralSetting) {
        await this.settingNameTextbox.fill(generalSetting.getName());

        if (!Utils.isEmpty(generalSetting.getItemType()) && generalSetting.getItemType() != undefined) {
            await this.settingTypeSelection.selectOption(generalSetting.getItemType());
        }

        if (!Utils.isEmpty(generalSetting.getRelatedData()) && generalSetting.getRelatedData() != undefined) {
            await this.settingRelatedDataSelection.selectOption(generalSetting.getRelatedData());
        }

        await this.clickNextButton();
    }

    async fillDisplayField() {
        // TODO
        await this.clickNextButton();
    }

    async addLevel(field: string) {
        await this.fieldSelection.selectOption(field);
        await this.addLevelButton.click();
    }

    async verifyLevelAdded(field: string) {
        await expect(this.page.locator(format(this.sortFieldNameDynamicStr, field))).toBeVisible();
    }

    async clickBackButton() {
        await this.page.locator(format(this.actionButtonDynamicStr, "Back")).click();
    }

    async clickNextButton() {
        await this.page.locator(format(this.actionButtonDynamicStr, "Next")).click();
    }

    async clickFinishButton() {
        await this.page.locator(format(this.actionButtonDynamicStr, "Finish")).click();
    }

    async clickCancelButton() {
        await this.page.locator(format(this.actionButtonDynamicStr, "Cancel")).click();
    }

    async verifyPreSetDataProfilesArePopulatedCorrectly() {
        let result = true;
        await this.dataProfileTable.getColumnDataByColumnHeader(this.DATA_PROFILE_HEADER).then((data: string[]) => {
            for (var val of dataProfileData.dataProfilesPreSet) {
                if (data.includes(Utils.replacingSpacesWithNbsp(val)) == false) {
                    result = false;
                    break;
                }
            }
        });
        await expect(result).toBe(true);
    }

    async verifyDataProfilesAreListedAlphabetically() {
        let result = false;
        await this.dataProfileTable.getColumnDataByColumnHeader(this.DATA_PROFILE_HEADER).then((data: string[]) => {
            result = Utils.isStringArraySorted(data);
        });
        await expect(result).toBe(true);
    }
}
