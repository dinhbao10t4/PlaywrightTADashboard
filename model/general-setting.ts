export class GeneralSetting {
    private name: string;
    private itemType: string;
    private relatedData: string;
    
    public constructor(name: string, itemType?: string, relatedData?: string) {
        this.name = name;
        if(itemType) this.itemType = itemType;
        if(relatedData) this.relatedData = relatedData;
    }

    public getName(): string {
        return this.name;
    }

    public getItemType(): string {
        return this.itemType;
    }

    public getRelatedData(): string {
        return this.relatedData;
    }

    public setName(name: string) {
        this.name = name;
    }

    public setItemType(itemType: string) {
        this.itemType = itemType;
    }

    public setRelatedData(relatedData: string) {
        this.relatedData = relatedData;
    }
}
