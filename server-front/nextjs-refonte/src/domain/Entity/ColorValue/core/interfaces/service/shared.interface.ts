import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface IColorFormatter {
    preferredFormat(color:IColor): IColor;
    supportedFormats(): string[];
}