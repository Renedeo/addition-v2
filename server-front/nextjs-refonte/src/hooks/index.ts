/**
 * Point d'entrée principal pour tous les hooks personnalisés.
 * 
 * Ce fichier exporte tous les hooks React utilisés dans l'application,
 * qu'ils soient spécifiques au domaine des couleurs ou génériques.
 * 
 * @example
 * ```typescript
 * // Import groupé
 * import { useColorServices, useColorAnalysis, useDebouncedValue } from '@/hooks';
 * 
 * // Dans un composant
 * function ColorComponent() {
 *   const services = useColorServices();
 *   const [color, setColor] = useDebouncedValue(new HEXColor('#ffffff'));
 *   const analysis = useColorAnalysis(color, services);
 *   
 *   // ...
 * }
 * ```
 */

export { useColorServices } from './useColorServices';
export { useColorAnalysis } from './useColorAnalysis';

export { 
  useDebouncedValue, 
  useControlledState, 
  useErrorHandler 
} from '../shared/hooks/common.hooks';

export type { 
  ColorServicesHookResult, 
  ColorAnalysisHookResult, 
  IColorServices, 
  IColorAnalysisResult 
} from './types';

/**
 * Guide d'utilisation des hooks :
 * 
 * ## Hooks de couleur
 * 
 * ### useColorServices
 * Initialise tous les services de couleur nécessaires.
 * ```typescript
 * const services = useColorServices();
 * if (services) {
 *   // Services disponibles
 * }
 * ```
 * 
 * ### useColorAnalysis  
 * Analyse complète d'une couleur.
 * ```typescript
 * const analysis = useColorAnalysis(color, services);
 * if (analysis) {
 *   const level = analysis.saturationInfo.saturationLevel;
 * }
 * ```
 * 
 * ## Hooks génériques
 * 
 * ### useDebouncedValue
 * Différer les mises à jour d'une valeur.
 * ```typescript
 * const [debouncedColor, setColor] = useDebouncedValue('#ffffff', 300);
 * ```
 * 
 * ### useControlledState
 * Gérer un état contrôlé/non-contrôlé.
 * ```typescript
 * const [value, setValue] = useControlledState(prop, defaultValue, onChange);
 * ```
 * 
 * ### useErrorHandler
 * Gestion centralisée des erreurs.
 * ```typescript
 * const { error, clearError, handleError } = useErrorHandler();
 * ```
 */