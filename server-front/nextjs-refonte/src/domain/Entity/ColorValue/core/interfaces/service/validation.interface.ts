import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface IColorValidator {
    isValid(color: IColor): boolean;
}