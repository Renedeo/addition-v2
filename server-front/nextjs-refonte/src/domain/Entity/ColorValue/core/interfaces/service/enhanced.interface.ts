import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface IEnhancedColorService {
    enhanceColor(color: IColor, ...args:unknown[]): IColor;
}