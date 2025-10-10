import { FontSize } from "@/domain/Entity/Typography/core/FontSize";
import { FontWeightValue, FontStyleValue } from "@/domain/Entity/Typography/core/typography.interface";


export interface Font {
    family: string; // Font family (e.g., 'Arial', 'Roboto')
    size: FontSize; // Font size
    weight?: FontWeightValue; // Font weight
    style?: FontStyleValue; // Font style
    lineHeight?: string | number; // Line height (e.g., '1.5', '20px')
    letterSpacing?: string; // Letter spacing (e.g., '0.1em')
}
