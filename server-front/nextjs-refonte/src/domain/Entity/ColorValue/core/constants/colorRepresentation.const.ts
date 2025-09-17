export const FormatConst = {
    RGB: 'RGB',
    HSL: 'HSL',
    HEX: 'HEX'
} as const;


export type ColorRepresentationConst = {
    readonly RGB: {r: number; g: number; b: number; a?: number}
    readonly HSL: {h: number; s: number; l: number; a?: number};
    readonly HEX: {hex: string, a?: number};
} 