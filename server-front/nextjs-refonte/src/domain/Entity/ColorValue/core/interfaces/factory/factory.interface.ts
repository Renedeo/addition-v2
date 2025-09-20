import { ColorFormat } from "../../types/colorRepresention.types";
import { IConverterConfig, IConverterRegistry } from "../registry/registry.interface";
import { IConverter } from "../service/converter.interface";

export interface IColorConversionFactory {
    createRegistry(config?: IConverterConfig): IConverterRegistry;
    createDefaultRegistry(): IConverterRegistry;
    addConverter(
        registry: IConverterRegistry,
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<unknown, unknown>
    ): void;
}