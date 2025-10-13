/**
 * ICssGenerator
 * Responsabilité : génération des chaînes CSS liées aux fonts.
 */

import type { IFont, IFontFamily } from "@domain/Entity/Typography/core/types/fontFamily.type";

export interface ICssGenerator {
  /** Retourne la string CSS `font-family` avec fallbacks. */
  getCssFontFamily(family: IFontFamily): string;

  /** Retourne la shorthand CSS complète pour une IFont donnée. */
  toCssShorthand(font: IFont): string;
}

export default ICssGenerator;
