import { FormatConst } from "../../core/constants/colorRepresentation.const";
import { IColorAnalysis } from "../../core/interfaces/service/colorAnalysis.interface";
import { IConverter } from "../../core/interfaces/service/converter.interface";
import { ColorFormat } from "../../core/types/colorRepresention.types";
import { ColorAnalysisRegistry } from "../registry/analysis.registry";
import { ConverterRegistry } from "../registry/converter.registry";
import { HexToRGBConverter } from "../services/hexTOrgb.converter";
import { HSLTORGBConverter } from "../services/hslTOrgb.converter";
import { RGBTOHEXConverter } from "../services/rgbTOHex.converter";
import { RGBToHSLConverter } from "../services/rgbTOhsl.converter";

export class ColorConversionFactory  {
    static createRegistry() {
        return new ConverterRegistry();
    }

    static createDefaultRegistry(): ConverterRegistry {
        const registry = new ConverterRegistry();
        // Ici, on pourrait enregistrer des convertisseurs par défaut si nécessaire
        // par exemple :
        registry.registerConverter(FormatConst.RGB, FormatConst.HEX, new RGBTOHEXConverter());
        registry.registerConverter(FormatConst.RGB, FormatConst.HSL, new RGBToHSLConverter());
        registry.registerConverter(FormatConst.HEX, FormatConst.RGB, new HexToRGBConverter());
        registry.registerConverter(FormatConst.HSL, FormatConst.RGB, new HSLTORGBConverter());
        return registry;
    }

    addConverter(
        registry: ConverterRegistry, 
        fromType: ColorFormat, 
        toType: ColorFormat, 
        converter: IConverter<unknown, unknown>
    ): void {
        registry.registerConverter(fromType, toType, converter);
    }
}