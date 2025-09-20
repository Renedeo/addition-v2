import { ColorFormat } from "../../types/colorRepresention.types";
import { IColor } from "../color/color.interface";
import { IConverter } from "../service/converter.interface";


export interface IConverterRegistry {
    register<From, To>(
        fromType: string,
        toType: string,
        converter: IConverter<From, To>
    ): void;

    get<From, To>(
        fromType: string,
        toType: string
    ): IConverter<From, To> | undefined;
}

export interface IConverterConfig {
    converters: Array<{
        fromType: ColorFormat;
        toType: ColorFormat;
        converter: IConverter<IColor, IColor>;
    }>;
}
