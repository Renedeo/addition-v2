import { ColorFormat } from "@domain/ColorValue/core/types/colorRepresention.types";

/**
 * Type pour les clés du registre de convertisseurs.
 * Utilise un template literal type pour garantir le format "SOURCE->CIBLE".
 * 
 * @example
 * ```typescript
 * const key: RegistryKey = "RGB->HEX"; // ✅ Valide
 * const invalidKey: RegistryKey = "RGB-HEX"; // ❌ Erreur TypeScript
 * ```
 */
export type RegistryKey = `${ColorFormat}->${ColorFormat}`;