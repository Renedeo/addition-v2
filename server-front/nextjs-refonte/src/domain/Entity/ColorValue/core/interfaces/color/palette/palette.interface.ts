import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export abstract class PaletteInterface {
    abstract name: string;
    baseColor: IColor;

    constructor(baseColor: IColor) {
        this.baseColor = baseColor;
    }

    protected abstract calculateColor(amount?: number): IColor;

    generatePalette(numberOfColors: number): IColor[] {
        const palette: IColor[] = [];
        for (let i = 0; i < numberOfColors; i++) {
            try {
                const newColor = this.calculateColor(i * 10);
                palette.push(newColor);
            }
            catch (error) {
                console.warn('Overing color adjustment limits:', error);
                break;
            }
        }
        return palette;
    }
}