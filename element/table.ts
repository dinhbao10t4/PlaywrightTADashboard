import { Page } from "@playwright/test";
import {format} from 'util';

export class Table {
    private tableLocator: string = "//div[@id='ccontent']//table";
    private readonly cellDynamicLocator: string = "//div[@id='ccontent']//table/tbody/tr/td[count(//th[text()='%s']/preceding-sibling::th)+1]";

    constructor(private readonly page: Page) {
    }

    async getColumnDataByColumnHeader(headerName: string) {
        const cellLocators = format(this.cellDynamicLocator, headerName);
        const elements = this.page.locator(cellLocators);
        const data = await elements.locator(':scope').allInnerTexts();
        return data;
    }
}
