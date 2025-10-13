/**
 * Types et interfaces pour le domaine Typography (FontFamily model).
 * Ce fichier expose uniquement des types/modèles (sans logique).
 */

/** Familles génériques CSS reconnues (union string). */
export type FontGenericFamily =
    | "serif"
    | "sans-serif"
    | "monospace"
    | "cursive"
    | "fantasy"
    | "system-ui"
    | "ui-serif"
    | "ui-sans-serif"
    | "ui-monospace"
    | "ui-rounded";

/** Unité de taille de police. */
export type FontSizeUnit = "px" | "em" | "rem" | "%" | "vw" | "vh" | "pt";

/** Labels usuels pour le poids de police. */
export type FontWeightLabel =
    | "thin"
    | "extralight"
    | "light"
    | "normal"
    | "medium"
    | "semibold"
    | "bold"
    | "extrabold"
    | "black";

/** Poids de police : label ou valeur numérique CSS (100..900). */
export type FontWeight = FontWeightLabel | number;

/** Style de police. */
export type FontStyle = "normal" | "italic" | "oblique";

/** Description d'une famille de police utilisée dans l'application. */
export interface IFontFamily {
    /** Nom affichable et utilisé côté CSS (ex: "Inter"). */
    name: string;

    /** Famille générique (fallback) ex: 'sans-serif'. */
    genericFamily: FontGenericFamily;

    /** Indique si la famille provient de Google Fonts ou d'un CDN. */
    isGoogleFont?: boolean;

    /** URL d'import pour charger la police (optionnelle). */
    googleFontUrl?: string;

    /** Variantes disponibles (ex: [400,700] ou ['400','700italic']). */
    variants?: Array<string | number>;

    /** Subsets supportés (ex: ['latin','latin-ext']). */
    subsets?: string[];

    /** Valeur display recommandée pour Google Fonts. */
    display?: "auto" | "block" | "swap" | "fallback" | "optional";
}

/** Taille de police structurée. */
export interface IFontSize {
    value: number;
    unit: FontSizeUnit;
}

/** Configuration complète d'une police (modèle de domaine). */
export interface IFont {
    family: IFontFamily;
    size: IFontSize;
    weight: FontWeight;
    style: FontStyle;
    lineHeight?: number | string;
    letterSpacing?: number | string;
    cssShorthand?: string;
}

/** Constantes utiles par défaut. */
export const DEFAULT_FONT_SIZE: IFontSize = { value: 16, unit: "px" };
export const DEFAULT_FONT_FAMILY: IFontFamily = {
    name: "Inter",
    genericFamily: "sans-serif",
    isGoogleFont: true,
};