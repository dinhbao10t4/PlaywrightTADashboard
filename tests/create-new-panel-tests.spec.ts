import {test} from "../fixtures/page.objects"
import configuration from "../config/configuration.json"
import panelItemPreset from "../data/panel-items.json"
import { AdministerItem } from "../enum/administer-items";
import { PanelItem } from "../enum/panel-items";
import { ChartSetting } from "../model/chart-setting"; 
import { Panel } from "../model/panel";
import { Series } from "../enum/series";

test.describe("Create New Panel Tests", () => {
    let chartSetting: ChartSetting;
    let panel: Panel;

    test.beforeEach(async ({ loginPage, dashboardPage, panelPage }) => {
        await loginPage.goto();
        await loginPage.login(configuration.sampleRepository, configuration.admin.username, configuration.admin.password);
        await dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        chartSetting = new ChartSetting(Series.NAME);
        panel = new Panel("zbox", chartSetting);

        await panelPage.openAddNewPanelForm();
        await panelPage.addNewPanel(panel);
    });

    test("Verify that when 'Choose panels' form is expanded all pre-set panels are populated and sorted correctly ", async ({dashboardPage}) => {
        await dashboardPage.openChoosePanelArea();
        await dashboardPage.verifyPanelItemDataCorrectly(PanelItem.CHARTS, panelItemPreset.charts);
        await dashboardPage.verifyPanelItemDataCorrectly(PanelItem.HEAT_MAPS, panelItemPreset.heatMaps);
        await dashboardPage.verifyPanelItemDataCorrectly(PanelItem.INDICATORS, panelItemPreset.indicator);
        await dashboardPage.verifyPanelItemDataCorrectly(PanelItem.REPORTS, panelItemPreset.reports);
    });

    test.afterEach(async ({ panelPage, dashboardPage }) => {
        await dashboardPage.goToAdministerItemPage(AdministerItem.PANELS);
        await panelPage.deletePanel(panel.getName());
    });
});
