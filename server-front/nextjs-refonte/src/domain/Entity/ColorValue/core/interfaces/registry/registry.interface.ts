import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IColor } from "@domain/ColorValue/core/interfaces/color/color.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";

/**
 * Interface pour le registre des convertisseurs de couleurs.
 * Gère l'enregistrement, la récupération et la découverte des convertisseurs.
 * 
 * @interface IConverterRegistry
 * 
 * @example
 * ```typescript
 * const registry = new ConverterRegistry();
 * registry.register('RGB', 'HEX', new RGBToHEXConverter());
 * const converter = registry.get('RGB', 'HEX');
 * ```
 */
export interface IConverterRegistry {
    /**
     * Enregistre un convertisseur pour une paire de formats.
     * 
     * @param fromType - Format source de la conversion
     * @param toType - Format cible de la conversion
     * @param converter - Instance du convertisseur
     * 
     * @example
     * ```typescript
     * registry.register('RGB', 'HSL', new RGBToHSLConverter());
     * ```
     */
    register<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<From, To>
    ): void;

    /**
     * Récupère un convertisseur pour une paire de formats.
     * 
     * @param fromType - Format source
     * @param toType - Format cible
     * @returns Convertisseur ou undefined si non trouvé
     * 
     * @example
     * ```typescript
     * const converter = registry.get('RGB', 'HEX');
     * if (converter) {
     *   const hexColor = converter.convert(rgbColor);
     * }
     * ```
     */
    get<From, To>(
        fromType: ColorFormat,
        toType: ColorFormat
    ): IConverter<From, To> | undefined;

    /**
     * Retourne la liste de tous les formats supportés.
     * 
     * @returns Tableau des formats de couleur supportés
     */
    getSupportedFormats(): ColorFormat[];
}

/**
 * Configuration pour initialiser un registre de convertisseurs.
 * Contient une liste de convertisseurs à enregistrer automatiquement.
 * 
 * @interface IConverterConfig
 * 
 * @example
 * ```typescript
 * const config: IConverterConfig = {
 *   converters: [
 *     { fromType: 'RGB', toType: 'HEX', converter: new RGBToHEXConverter() },
 *     { fromType: 'HEX', toType: 'RGB', converter: new HEXToRGBConverter() }
 *   ]
 * };
 * ```
 */
export interface IConverterConfig {
    /** Liste des convertisseurs à enregistrer */
    converters: Array<{
        /** Format source */
        fromType: ColorFormat;
        /** Format cible */
        toType: ColorFormat;
        /** Instance du convertisseur */
        converter: IConverter<IColor, IColor>;
    }>;
}
