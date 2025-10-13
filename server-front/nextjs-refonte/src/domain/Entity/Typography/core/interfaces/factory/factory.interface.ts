/**
 * Contrat de la factory pour créer / normaliser des IFontFamily.
 * Micro-module dédié (Factory interface).
 */

import type { IFontFamily } from "@domain/Entity/Typography/core/types/fontFamily.type";

/** Options minimales passées à la factory pour construire une font family. */
export type FontFactoryOptions = Partial<IFontFamily> & { name: string };

/** Interface du contrat de la factory. */
export interface IFontFactory {
  /**
   * Crée et normalise une IFontFamily à partir des options fournies.
   * Doit lancer une erreur si les options sont invalides (ex: name manquant).
   */
  create(options: FontFactoryOptions): IFontFamily;

  /**
   * Produit une URL d'import Google Fonts (format css2) si applicable.
   * Retourne undefined si la famille n'est pas une Google Font ou si non applicable.
   */
  buildGoogleFontsUrl(options: FontFactoryOptions, baseUrl?: string): string | undefined;
}

export default IFontFactory;
