import { converterConfig } from "@/domain/Entity/ColorValue/implementations/core/constants/converter.const";
import { IColorConversionFactory } from "@domain/ColorValue/core/interfaces/factory/factory.interface";
import { IConverterConfig, IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConverter } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";
import { ConverterRegistry } from "@domain/ColorValue/implementations/registry/converter.registry";

/**
 * Factory pour créer et configurer les registres de conversion de couleurs.
 * 
 * Cette factory encapsule la création des registres de convertisseurs et permet
 * d'initialiser facilement un système de conversion complet avec une configuration
 * par défaut ou personnalisée.
 * 
 * @example
 * ```typescript
 * const factory = new ColorConversionFactory();
 * 
 * // Registre avec configuration par défaut
 * const defaultRegistry = factory.createDefaultRegistry();
 * 
 * // Registre avec configuration personnalisée
 * const customRegistry = factory.createRegistry(customConfig);
 * 
 * // Ajouter un convertisseur à un registre existant
 * factory.addConverter(registry, 'RGB', 'LAB', new RGBToLABConverter());
 * ```
 */
export class ColorConversionFactory implements IColorConversionFactory {
    /**
     * Crée un registre de convertisseurs avec une configuration donnée.
     * 
     * @param config - Configuration optionnelle contenant les convertisseurs à enregistrer
     * @returns Nouveau registre de convertisseurs
     * 
     * @example
     * ```typescript
     * const config = {
     *   converters: [
     *     { fromType: 'RGB', toType: 'HEX', converter: new RGBToHEXConverter() }
     *   ]
     * };
     * const registry = factory.createRegistry(config);
     * ```
     */
    createRegistry(config?: IConverterConfig): IConverterRegistry {
        const registry = new ConverterRegistry();

        if (config) {
            for (const { fromType, toType, converter } of config.converters) {
                registry.register(fromType, toType, converter);
            }
        }

        return registry;
    }

    /**
     * Crée un registre avec la configuration par défaut.
     * Inclut tous les convertisseurs de base (RGB, HEX, HSL).
     * 
     * @returns Registre pré-configuré avec les convertisseurs standards
     * 
     * @example
     * ```typescript
     * const factory = new ColorConversionFactory();
     * const registry = factory.createDefaultRegistry();
     * // Le registre contient déjà tous les convertisseurs de base
     * ```
     */
    createDefaultRegistry(): IConverterRegistry {
        return this.createRegistry(
            converterConfig
        );
    }

    /**
     * Ajoute un convertisseur à un registre existant.
     * Permet d'étendre les capacités de conversion d'un registre.
     * 
     * @param registry - Registre de convertisseurs à étendre
     * @param fromType - Format source de la conversion
     * @param toType - Format cible de la conversion
     * @param converter - Instance du convertisseur à ajouter
     * 
     * @example
     * ```typescript
     * const registry = factory.createDefaultRegistry();
     * factory.addConverter(registry, 'RGB', 'LAB', new RGBToLABConverter());
     * // Le registre peut maintenant convertir RGB vers LAB
     * ```
     */
    addConverter(
        registry: IConverterRegistry,
        fromType: ColorFormat,
        toType: ColorFormat,
        converter: IConverter<unknown, unknown>
    ): void {
        registry.register(fromType, toType, converter);
    }
}