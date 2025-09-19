import { HexToRGBConverter } from "../../implementations/services/hexTOrgb.converter";
import { HSLTORGBConverter } from "../../implementations/services/hslTOrgb.converter";
import { RGBTOHEXConverter } from "../../implementations/services/rgbTOHex.converter";
import { RGBToHSLConverter } from "../../implementations/services/rgbTOhsl.converter";
import { FormatConst } from "./colorRepresentation.const";

export const converterConfig = {
    converters: [
        // On pourrait ajouter des convertisseurs par défaut ici
        { fromType: FormatConst.RGB, toType: FormatConst.HEX, converter: new RGBTOHEXConverter() },
        { fromType: FormatConst.RGB, toType: FormatConst.HSL, converter: new RGBToHSLConverter() },
        { fromType: FormatConst.HEX, toType: FormatConst.RGB, converter: new HexToRGBConverter() },
        { fromType: FormatConst.HSL, toType: FormatConst.RGB, converter: new HSLTORGBConverter() },
    ]
}