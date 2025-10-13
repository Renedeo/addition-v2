import type { RegisteredRecord } from "@domain/Entity/Typography/core/interfaces/registry/registry.interface";
import type { FontFactoryOptions } from "@domain/Entity/Typography/core/interfaces/factory/factory.interface";

/**
 * IFontRegistrar
 * Responsabilité : expose les opérations d'enregistrement/recherche de familles
 * sans s'occuper du chargement DOM.
 */
export interface IFontRegistrar {
  registerFamily(options: FontFactoryOptions, overwrite?: boolean): RegisteredRecord;
}

export default IFontRegistrar;
