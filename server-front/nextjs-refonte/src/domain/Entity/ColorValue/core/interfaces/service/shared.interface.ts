import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";

export interface IColorFormatter {
    colorFormatter(color:IColor, to:ColorFormat): IColor;
    supportedFormats(): string[];
    toOriginalFormat(color: IColor, modifiedColor: IColor): IColor;
}
