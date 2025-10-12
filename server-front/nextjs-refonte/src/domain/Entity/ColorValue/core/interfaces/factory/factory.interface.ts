import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { IConverterConfig, IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";

/**
 * Interface pour les factories de conversion de couleurs.
 * Fournit des méthodes pour créer et configurer des registres de convertisseurs.
 * 
 * @interface IColorConversionFactory
 * 
 * @example
 * ```typescript
 * class MyFactory implements IColorConversionFactory {
 *   createDefaultRegistry(): IConverterRegistry {
 *     // Implémentation
 *   }
 * }
 * ```
 */
export interface IColorConversionFactory {
    /**
     * Crée un registre de convertisseurs avec une configuration optionnelle.
     * 
     * @param config - Configuration contenant les convertisseurs à enregistrer
     * @returns Nouveau registre de convertisseurs
     */
    createRegistry(config?: IConverterConfig): IConverterRegistry;
    
    /**
     * Crée un registre avec la configuration par défaut.
     * Inclut les convertisseurs standards (RGB, HEX, HSL).
     * 
     * @returns Registre pré-configuré avec les convertisseurs de base
     */
    createDefaultRegistry(): IConverterRegistry;
    
    /**
     * Ajoute un convertisseur à un registre existant.
     * 
     * @param registry - Registre de convertisseurs à étendre
     * @param fromType - Format source de la conversion
     * @param toType - Format cible de la conversion
     * @param converter - Instance du convertisseur à ajouter
     */
    addConverter(
        registry: IConverterRegistry,
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<unknown, unknown>
    ): void;
}