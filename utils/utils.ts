import {Constants} from "./constants"

export class Utils {
    public static isEmpty(str: string | undefined): boolean {
        return str == null || str == undefined || str.trim() == '';
    }

    public static generateRandomString(): string {
        return Math.floor(Math.random() * Date.now()).toString(36);
    };

    public static delay(timeout: number = Constants.WAIT_TIMEOUT) {
        return new Promise( resolve => setTimeout(resolve, timeout));
    };

    public static replacingSpacesWithNbsp(str: string): string {
        return str.replace(/ /g, '\u00a0');
    }

    public static isStringArraySorted(arr: string[]) {
        let arrayCopy = [...arr];
        arrayCopy.sort((one, two) => (one > two ? 1 : -1));
        return JSON.stringify(arrayCopy) === JSON.stringify(arr);
    }
}
