import { IColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";

export interface ILightnessAdjustmentService {
    adjustLightness(color: IColor, amount: number): IColor;
}