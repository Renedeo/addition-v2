import { Font } from "@/domain/Entity/Typography/core/Font";
import { FontSize } from "@/domain/Entity/Typography/core/FontSize";

export type FontSizeString = 'small' | 'medium' | 'large' | 'x-large';
export type FontWeightValue = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
export type FontWeightString = 'normal' | 'bold' | 'lighter' | 'bolder';
export type FontStyleValue = 'normal' | 'italic' | 'oblique';

export interface Preset<T, U> {
    name: T; // Preset name
    value: U; // Corresponding value
}

export type FontSizePreset = Preset<FontSizeString, FontSize>;
export type FontWeightPreset = Preset<FontWeightString, FontWeightValue>;

export interface Typography {
    heading: Font; // Font settings for headings
    body: Font; // Font settings for body text
    caption?: Font; // Font settings for captions or small text
    button?: Font; // Font settings for buttons
    code?: Font; // Font settings for code snippets
    link?: Font; // Font settings for hyperlinks
}
