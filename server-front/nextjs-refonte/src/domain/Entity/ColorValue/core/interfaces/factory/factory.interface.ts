import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IConverterConfig, IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";

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