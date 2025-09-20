import { FormatConst } from "../../core/constants/colorRepresentation.const";
import { IConverterRegistry } from "../../core/interfaces/registry/registry.interface";
import { IColorConversionService, IIntermediateColorConversionService } from "../../core/interfaces/service/converter.interface";
import { ColorFormat } from "../../core/types/colorRepresention.types";

export class ColorConversionService implements IColorConversionService, IIntermediateColorConversionService {
    constructor(private registry: IConverterRegistry) { }

    convert<From, To>(from: From, fromType: ColorFormat, toType: ColorFormat): To {
        // Si les types source et cible sont identiques, retourner l'objet tel quel
        if (fromType === toType) {
            return from as unknown as To;
        }

        const converter = this.registry.get<From, To>(fromType, toType);
        if (converter) {
            return converter.convert(from);
        }

        // Si aucun convertisseur direct n'est trouvé
        // Tenter une conversion via un format intermédiaire (ex: RGB)
        const intermediateType: ColorFormat = FormatConst.RGB;

        const ViaIntermediate = this.convertViaIntermediate(from, fromType, toType, intermediateType);
        if (ViaIntermediate) {
            return ViaIntermediate as To;
        }

        throw new Error(`No converter registered for ${fromType} to ${toType}`);
    }

    convertViaIntermediate<From, To>(
        from: From,
        fromType: ColorFormat,
        toType: ColorFormat,
        intermediateType: ColorFormat
    ): To {
        // Convertir de 'From' à 'Intermediate'
        const toIntermediateConverter = this.registry.get<From, unknown>(fromType, intermediateType);

        if (!toIntermediateConverter) {
            throw new Error(`No converter registered for ${fromType} to ${intermediateType}`);
        }
        const intermediateValue = toIntermediateConverter.convert(from);

        // Convertir de 'Intermediate' à 'To'
        const fromIntermediateConverter = this.registry.get<unknown, To>(intermediateType, toType);
        if (!fromIntermediateConverter) {
            throw new Error(`No converter registered for ${intermediateType} to ${toType}`);
        }
        return fromIntermediateConverter.convert(intermediateValue);
    }

    canConvert(fromType: ColorFormat, toType: ColorFormat): boolean {
        return !!this.registry.get(fromType, toType);
    }
}