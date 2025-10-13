/**
 * Contrat du registre / repository pour stocker et récupérer les familles de police.
 * Micro-module dédié (Registry interface).
 */

import type { IFontFamily } from "@domain/Entity/Typography/core/types/fontFamily.type";

/** Options pour l'enregistrement. */
export interface RegisterOptions {
  overwrite?: boolean;
  key?: string;
}

/** Enregistrement retourné par register. */
export interface RegisteredRecord {
  key: string;
  family: IFontFamily;
}

/** Contrat du repository / registry. */
export interface IFontRegistry {
  register(familyOrOptions: IFontFamily | Partial<IFontFamily> & { name: string }, opts?: RegisterOptions): RegisteredRecord;

  get(nameOrKey: string): IFontFamily | undefined;

  has(nameOrKey: string): boolean;

  list(): IFontFamily[];

  unregister(nameOrKey: string): boolean;

  clear(): void;
}

export default IFontRegistry;
