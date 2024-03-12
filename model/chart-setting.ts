export class ChartSetting {
    private title: string;
    private series: string;

    public constructor(series: string, title?: string) {
        this.series = series;
        if(title) this.title = title;
    }

    public getTitle(): string {
        return this.title;
    }

    public getSeries(): string {
        return this.series;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public setSeries(series: string) {
        this.series = series;
    }
}
