
import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";
import { IConverterRegistry } from "@domain/ColorValue/core/interfaces/registry/registry.interface";
import { IConversionCapabilityService, IDirectConversionService, IIntermediateColorConversionService } from "@domain/ColorValue/core/interfaces/service/converter.interface";
import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";

/**
 * Service principal de conversion de couleurs entre différents formats (HEX, RGB, HSL, etc).
 * Utilise un registre de convertisseurs pour effectuer les conversions directes ou via un format intermédiaire.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const service = new ColorConversionService(registry);
 * const rgb = service.convert(hexColor, FormatConst.HEX, FormatConst.RGB);
 * ```
 */
export interface IColorConversionService extends IDirectConversionService, IConversionCapabilityService, IIntermediateColorConversionService {
    getSupportedFormats(): ColorFormat[];
}

export class ColorConversionService implements IColorConversionService {
    constructor(private registry: IConverterRegistry) { }

    /**
     * Convertit une couleur d'un format à un autre.
     * Si les formats sont identiques, retourne l'objet tel quel.
     * Si aucun convertisseur direct n'est trouvé, tente une conversion via un format intermédiaire (par défaut RGB).
     * @param from Couleur source
     * @param fromType Format source
     * @param toType Format cible
     * @returns Couleur convertie au format cible
     */
    convert<From, To>(from: From, fromType: ColorFormat, toType: ColorFormat): To {
        if (fromType === toType) {
            return from as unknown as To;
        }

        const converter = this.registry.get<From, To>(fromType, toType);
        if (converter) {
            return converter.convert(from);
        }

        // Conversion via format intermédiaire (ex: RGB)
        const intermediateType: ColorFormat = FormatConst.RGB;
        const ViaIntermediate = this.convertViaIntermediate(from, fromType, toType, intermediateType);
        if (ViaIntermediate) {
            return ViaIntermediate as To;
        }

        throw new Error(`No converter registered for ${fromType} to ${toType}`);
    }

    /**
     * Convertit une couleur via un format intermédiaire (ex: HEX -> RGB -> HSL).
     * @param from Couleur source
     * @param fromType Format source
     * @param toType Format cible
     * @param intermediateType Format intermédiaire
     * @returns Couleur convertie au format cible
     */
    convertViaIntermediate<From, To>(
        from: From,
        fromType: ColorFormat,
        toType: ColorFormat,
        intermediateType: ColorFormat
    ): To {
        const toIntermediateConverter = this.registry.get<From, unknown>(fromType, intermediateType);
        if (!toIntermediateConverter) {
            throw new Error(`No converter registered for ${fromType} to ${intermediateType}`);
        }
        const intermediateValue = toIntermediateConverter.convert(from);

        const fromIntermediateConverter = this.registry.get<unknown, To>(intermediateType, toType);
        if (!fromIntermediateConverter) {
            throw new Error(`No converter registered for ${intermediateType} to ${toType}`);
        }
        return fromIntermediateConverter.convert(intermediateValue);
    }

    /**
     * Vérifie si une conversion directe est possible entre deux formats.
     * @param fromType Format source
     * @param toType Format cible
     * @returns True si la conversion est possible
     */
    canConvert(fromType: ColorFormat, toType: ColorFormat): boolean {
        return !!this.registry.get(fromType, toType);
    }

    /**
     * Retourne la liste des formats supportés par le service.
     */
    getSupportedFormats(): ColorFormat[] {
        return this.registry.getSupportedFormats();
    }
}