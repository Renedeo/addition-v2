
import { FormatConst } from "@/domain/Entity/ColorValue/core/constants/colorRepresentation.const";
import { IHEXColor } from "@/domain/Entity/ColorValue/core/interfaces/color/color.interface";
import { ColorFormat, HEXColorValue } from "@/domain/Entity/ColorValue/core/types/colorRepresention.types";
import { isValidHexFormat, normalizeHex, isValidAlpha } from "@/shared/utils/validation.utils";
import { roundToPrecision } from "@/shared/utils/format.utils";

/**
 * Classe représentant une couleur au format HEX.
 * Permet de manipuler et valider les couleurs HEX avec alpha optionnel.
 *
 * Exemple d'utilisation :
 * ```typescript
 * const hexColor = new HEXColor("#ff5733", 0.8);
 * console.log(hexColor.stringValue()); // "#ff5733cc"
 * ```
 */
export class HEXColor implements IHEXColor {
    format: ColorFormat = FormatConst.HEX;
    value: HEXColorValue;
    a?: number;

    /**
     * Crée une instance de HEXColor.
     * @param hex La valeur HEX de la couleur (ex: "#ff5733" ou "ff5733")
     * @param a La valeur alpha (opacité) entre 0 et 1 (optionnelle)
     * @throws {Error} Si la valeur HEX ou alpha est invalide
     */
    constructor(hex: string, a?: number) {
        // Normalise le format HEX (ajoute # si absent)
        const normalizedHex = normalizeHex(hex);

        if (this.isValid(normalizedHex, a) === false) {
            throw new Error("Invalid HEX or Alpha values");
        }

        this.value = { hex: normalizedHex };
        if (a) this.a = a;
    }

    /**
     * Retourne la valeur HEX sous forme de string, avec alpha si présent.
     */
    stringValue(): string {
        const hex = this.value.hex.toLowerCase(); // Déjà avec #

        if (this.a) {
            const alpha = roundToPrecision(this.a * 255, 0).toString(16).padStart(2, "0");
            return `${hex}${alpha}`;
        }
        return hex;
    }

    /**
     * Vérifie si les valeurs HEX et alpha sont valides.
     * @param hex La valeur HEX à valider
     * @param a La valeur alpha à valider (optionnelle)
     * @returns {boolean} True si les valeurs sont valides, sinon false
     */
    private isValid(hex: string, a?: number): boolean {
        return isValidHexFormat(hex) && (a ? isValidAlpha(a) : true);
    }
}