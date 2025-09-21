import { HSLTORGBConverter } from "@domain/ColorValue/implementations/services/colorConversion/hslTOrgb.converter";
import { RGBTOHEXConverter } from "@domain/ColorValue/implementations/services/colorConversion/rgbTOHex.converter";
import { RGBToHSLConverter } from "@domain/ColorValue/implementations/services/colorConversion/rgbTOhsl.converter";
import { FormatConst } from "@domain/ColorValue/core/constants/colorRepresentation.const";
import { HexToRGBConverter } from "@domain/ColorValue/implementations/services/colorConversion/hexTOrgb.converter";

export const converterConfig = {
    converters: [
        // On pourrait ajouter des convertisseurs par défaut ici
        { fromType: FormatConst.RGB, toType: FormatConst.HEX, converter: new RGBTOHEXConverter() },
        { fromType: FormatConst.RGB, toType: FormatConst.HSL, converter: new RGBToHSLConverter() },
        { fromType: FormatConst.HEX, toType: FormatConst.RGB, converter: new HexToRGBConverter() },
        { fromType: FormatConst.HSL, toType: FormatConst.RGB, converter: new HSLTORGBConverter() },
    ]
}