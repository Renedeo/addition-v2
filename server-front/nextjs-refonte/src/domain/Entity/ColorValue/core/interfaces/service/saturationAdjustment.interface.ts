import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface ISaturationAdjustmentService {
    adjustSaturation(color: IColor, amount: number): IColor;
}