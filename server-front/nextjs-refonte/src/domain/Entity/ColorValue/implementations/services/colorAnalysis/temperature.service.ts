import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IColor, IRGBColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { IColorAnalysisService } from "@/domain/Entity/ColorValue/core/interfaces/service/analysis.interface";
import { IColorFormatHandler } from "@/domain/Entity/ColorValue/core/interfaces/service/shared.interface";

interface temperatureOutput {
    temperature: string;
}

export class TemperatureService implements IColorAnalysisService<temperatureOutput> {
    constructor(private colorFormatter: IColorFormatHandler) { }

    analyzeColor(color: IColor): temperatureOutput {
        const preferredColorFormat = this.colorFormatter.formatColor(color, FormatConst.RGB) as IRGBColor;
        const { r, b } = preferredColorFormat.value;
        const temperatureValue = (r - b) / 255;
        return { temperature: temperatureValue > 0 ? "warm" : "cool" };
    }
}

export class KelvinTemperatureService implements IColorAnalysisService<number> {
    constructor(private colorFormatter: IColorFormatHandler) { }

    analyzeColor(color: IColor): number {
        const preferredColorFormat = this.colorFormatter.formatColor(color, FormatConst.RGB) as IRGBColor;
        const { r, g, b } = preferredColorFormat.value;
        const kelvinValue = (r + g + b) / 3;
        return kelvinValue;
    }
}