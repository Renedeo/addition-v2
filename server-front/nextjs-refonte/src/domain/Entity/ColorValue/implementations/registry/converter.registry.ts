import { IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { RegistryKey } from "@domain/ColorValue/core/types/registry/registry.types";

/**
 * Implémentation concrète du registre de convertisseurs de couleurs.
 * Utilise une Map interne pour stocker et récupérer les convertisseurs
 * basée sur une clé composée des formats source et cible.
 * 
 * @class ConverterRegistry
 * @implements {IConverterRegistry}
 * 
 * @example
 * ```typescript
 * const registry = new ConverterRegistry();
 * registry.register('RGB', 'HEX', new RGBToHEXConverter());
 * 
 * const converter = registry.get('RGB', 'HEX');
 * if (converter) {
 *   const hexColor = converter.convert(rgbColor);
 * }
 * ```
 */
export class ConverterRegistry implements IConverterRegistry{
    /** 
     * **Type générique :**
     * - `From` : Le type source à convertir  
     * - `To` : Le type cible après conversion
     * 
     * Utilisation d'une Map pour stocker les convertisseurs avec une clé composée des formats source et cible.
    */
    private converters: Map<RegistryKey, IConverter<unknown, unknown>> = new Map();

    /**
     * Enregistre un convertisseur pour une paire de formats spécifiée.
     * La clé est composée sous la forme "FORMAT_SOURCE->FORMAT_CIBLE".
     * 
     * @param fromType - Format source de la conversion
     * @param toType - Format cible de la conversion
     * @param converter - Instance du convertisseur à enregistrer
     */
    register<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<From, To>): void {

        const key = `${fromType}->${toType}` as RegistryKey;
        this.converters.set(key, converter);
    }

    /**
     * Récupère un convertisseur pour une paire de formats spécifiée.
     * 
     * @param fromType - Format source
     * @param toType - Format cible
     * @returns Le convertisseur correspondant ou undefined si non trouvé
     */
    get<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat
    ): IConverter<From, To> | undefined {
        const key = `${fromType}->${toType}` as RegistryKey;
        return this.converters.get(key) as IConverter<From, To> | undefined;
    }

    /**
     * Retourne la liste de tous les formats de couleur supportés.
     * Extrait les formats depuis les clés des convertisseurs enregistrés.
     * 
     * @returns Tableau des formats supportés sans doublons
     */
    getSupportedFormats(): ColorFormat[] {
        const formats = new Set<ColorFormat>();
        this.converters.forEach((_, key) => {
            const [fromType, toType] = key.split("->") as [ColorFormat, ColorFormat];
            formats.add(fromType);
            formats.add(toType);
        });
        return Array.from(formats);
    }

}