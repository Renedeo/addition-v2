import { FormatConst } from "../../core/constants/colorRepresentation.const";
import {  RGBColor } from "../../core/interfaces/color/color.interface";
import { IConverter, IConverterRegistry } from "../../core/interfaces/service/converter.interface";
import { ColorFormat } from "../../core/types/colorRepresention.types";
import { RegistryKey } from "../../core/types/registry/registry.types";

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

    convert<From, To>(
        from: From,
        fromType: ColorFormat,
        toType: ColorFormat,
        intermediateType: ColorFormat = FormatConst.RGB
    ): To | undefined {
        // Si les types source et cible sont identiques, retourner l'objet tel quel
        if (fromType === toType) {
            try {
                return from as unknown as To;
            } catch {
                console.warn("Verifier que l'objet à convertir est du type du format source spécifié.");
                throw (new Error("L'objet à convertir n'est pas du type du format source spécifié."));
            }
        }

        // Maintenant les format sont différents
        // Récupère le convertisseur enregistré pour la clé donnée
        const converter = this.get<From, To>(fromType, toType);

        if (converter) {
            return converter.convert(from);
        }

        // Aucun convertisseur trouvé pour cette paire de types
        // Tenter une conversion indirecte via un format intermédiaire (ex: RGB)
        console.warn(`Aucun convertisseur direct trouvé pour la conversion de ${fromType} à ${toType}. Tentative de conversion via un format intermédiaire.`);

        // const intermediateType: ColorFormat = FormatConst.RGB;
        if (fromType !== intermediateType && toType !== intermediateType) {
            const toIntermediateConverter = this.get<From, RGBColor>(fromType, intermediateType);
            const fromIntermediateConverter = this.get<RGBColor, To>(intermediateType, toType);

            if (toIntermediateConverter && fromIntermediateConverter) {
                const intermediateValue = toIntermediateConverter.convert(from);
                return fromIntermediateConverter.convert(intermediateValue);
            }
        }

        console.warn(`Aucun convertisseur trouvé pour la conversion de ${fromType} à ${toType}, même via un format intermédiaire.`);
        throw (new Error(`Aucun convertisseur trouvé pour la conversion de ${fromType} à ${toType}, même via un format intermédiaire.`));

    }
}