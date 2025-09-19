export const FormatConst = {
    RGB: 'RGB',
    HSL: 'HSL',
    HEX: 'HEX'
} as const;

const hexPattern = /^#([0-9A-F]{3}){1,2}$/i;
// export type ColorRepresentationConst = {
//     readonly RGB: {r: number; g: number; b: number; a?: number}
//     readonly HSL: {h: number; s: number; l: number; a?: number}
//     readonly HEX: {hex: string, a?: number};
// } 

