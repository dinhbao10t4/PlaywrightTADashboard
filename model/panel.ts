import { ChartSetting } from "./chart-setting";

export class Panel {
    private name: string;
    private type: string;
    private dataProfile: string;
    private chartSetting: ChartSetting;

    public constructor(name: string, chartSetting: ChartSetting, type?: string, dataProfile?: string) {
        this.name = name;
        this.chartSetting = chartSetting;
        if(type) this.type = type;
        if(dataProfile) this.dataProfile = dataProfile;
    }

    public getName(): string {
        return this.name;
    }

    public getChartSetting(): ChartSetting {
        return this.chartSetting;
    }

    public getType(): string {
        return this.type;
    }

    public getDataProfile(): string {
        return this.dataProfile;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setChartSetting(chartSetting: ChartSetting) {
        this.chartSetting = chartSetting;
    }

    public setType(type: string) {
        this.type = type;
    }

    public setDataProfile(dataProfile: string) {
        this.dataProfile = dataProfile;
    }
}
