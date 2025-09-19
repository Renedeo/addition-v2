import { converterConfig } from "../../core/constants/converter.const";
import { IConverter, IConverterConfig, IConverterRegistry } from "../../core/interfaces/service/converter.interface";
import { ColorFormat } from "../../core/types/colorRepresention.types";
import { ConverterRegistry } from "../registry/converter.registry";


export class ColorConversionFactory {
    static createRegistry(config?: IConverterConfig): IConverterRegistry {
        const registry = new ConverterRegistry();

        if (config) {
            for (const { fromType, toType, converter } of config.converters) {
                registry.register(fromType, toType, converter);
            }
        }

        return registry;
    }

    static createDefaultRegistry(): IConverterRegistry {
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