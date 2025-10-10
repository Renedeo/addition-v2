export type FontSizeUnit = 'px' | 'em' | 'rem' | '%';

export interface FontSize {
    value: number; // Numeric value of the font size
    unit: FontSizeUnit; // Unit of the font size
}
