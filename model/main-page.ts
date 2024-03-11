export class MainPage {
    private name: string;
    private parentPage: string;
    private numberOfColumn: string;
    private displayAfter: string;
    private public: boolean;
    
    public constructor(name: string, parentPage?: string, numberOfColumn?: string, displayAfter?: string, isPublic?: boolean) {
        this.name = name;
        if(parentPage) this.parentPage = parentPage;
        if(numberOfColumn) this.numberOfColumn = numberOfColumn;
        if(displayAfter) this.displayAfter = displayAfter;
        if(isPublic) this.public = isPublic;
    }

    public getName(): string {
        return this.name;
    }

    public getParentPage(): string {
        return this.parentPage;
    }

    public getNumberOfColumn(): string {
        return this.numberOfColumn;
    }

    public getDisplayAfter(): string {
        return this.displayAfter;
    }

    public isPublic(): boolean {
        return this.public;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setParentPage(parentPage: string) {
        this.parentPage = parentPage;
    }

    public setNumberOfColumn(numberOfColumn: string) {
        this.numberOfColumn = numberOfColumn;
    }

    public setDisplayAfter(displayAfter: string) {
        this.displayAfter = displayAfter;
    }

    public setPublic(isPublic: boolean) {
        this.public = isPublic;
    }
}
