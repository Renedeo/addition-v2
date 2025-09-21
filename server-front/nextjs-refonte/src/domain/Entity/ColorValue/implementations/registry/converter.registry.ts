import { IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { RegistryKey } from "@domain/ColorValue/core/types/registry/registry.types";

export class ConverterRegistry implements IConverterRegistry{
    /** 
     * **Type générique :**
     * - `From` : Le type source à convertir  
     * - `To` : Le type cible après conversion
     * 
     * Utilisation d'une Map pour stocker les convertisseurs avec une clé composée des formats source et cible.
    */
    private converters: Map<RegistryKey, IConverter<unknown, unknown>> = new Map();

    register<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<From, To>): void {

        const key = `${fromType}->${toType}` as RegistryKey;
        this.converters.set(key, converter);
    }

    get<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat
    ): IConverter<From, To> | undefined {
        const key = `${fromType}->${toType}` as RegistryKey;
        return this.converters.get(key) as IConverter<From, To> | undefined;
    }

}