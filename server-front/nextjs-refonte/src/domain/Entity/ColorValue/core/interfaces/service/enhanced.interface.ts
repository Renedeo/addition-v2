import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface IEnhancedColorService<TInput extends IColor, TOutput extends IColor> {
    enhanceColor(color: TInput, ...args:unknown[]): TOutput;
}