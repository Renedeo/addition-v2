import { converterConfig } from "@/domain/Entity/ColorValue/implementations/core/constants/converter.const";
import { IColorConversionFactory } from "@domain/ColorValue/core/interfaces/factory/factory.interface";
import { IConverterConfig, IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { ConverterRegistry } from "@domain/ColorValue/implementations/registry/converter.registry";


export class ColorConversionFactory implements IColorConversionFactory{
    createRegistry(config?: IConverterConfig): IConverterRegistry {
        const registry = new ConverterRegistry();

        if (config) {
            for (const { fromType, toType, converter } of config.converters) {
                registry.register(fromType, toType, converter);
            }
        }

        return registry;
    }

    createDefaultRegistry(): IConverterRegistry {
        return this.createRegistry(
            converterConfig
        );
    }

    addConverter(
        registry: IConverterRegistry,
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<unknown, unknown>
    ): void {
        registry.register(fromType, toType, converter);
    }
}