import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";


export interface IConverterRegistry {
    register<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<From, To>
    ): void;

    get<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat
    ): IConverter<From, To> | undefined;
}

export interface IConverterConfig {
    converters: Array<{
        fromType: ColorFormat;
        toType: ColorFormat;
        converter: IConverter<IColor, IColor>;
    }>;
}
