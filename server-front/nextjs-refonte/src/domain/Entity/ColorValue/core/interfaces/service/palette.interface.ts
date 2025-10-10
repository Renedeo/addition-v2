import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

export interface IPaletteColorService {
    name: string;
    baseColor: IColor; // Base color of the palette
}

export interface IPaletteGeneratorService extends IPaletteColorService {
    generatePalette(numberOfColors: number): IColor[];
}

export abstract class BasePaletteGenerator {
    baseColor: IColor;
    abstract name: string;
    
    constructor(baseColor: IColor) {
        this.baseColor = baseColor;
    }

    abstract calculateColor(color: IColor, amount: number): IColor;

    generatePalette(numberOfColors: number): IColor[] {
        const palette: IColor[] = [];
        const amountStep = Math.floor(100 / numberOfColors);

        for (let i = 0; i < numberOfColors; i++) {
            try {
                const color = this.calculateColor(this.baseColor, i * amountStep);
                palette.push(color);
            } catch (error) {
                // console.error("Error generating color:", error);
                continue;
            }
        }
        return palette;
    };
}