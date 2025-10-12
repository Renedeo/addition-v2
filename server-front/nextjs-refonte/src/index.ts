/**
 * Point d'entrée principal de l'application.
 * 
 * Ce fichier centralise tous les exports publics de l'application
 * et fournit une interface claire pour l'importation des modules.
 * 
 * @example
 * ```typescript
 * // Import depuis le point d'entrée principal
 * import { 
 *   HEXColor, 
 *   useColorServices, 
 *   ColorSelection,
 *   ERROR_MESSAGES 
 * } from '@/src';
 * ```
 */

export * from './domain/Entity/ColorValue';
export * from './hooks';
export * from './components';
export * from './shared';

/**
 * Guide d'utilisation de l'architecture :
 * 
 * ## Structure en couches
 * 
 * ### Domain Layer (/domain)
 * - **Entités** : HEXColor, RGBColor, HSLColor
 * - **Services** : ColorConversionService, SaturationService, etc.
 * - **Interfaces** : Contrats pour l'extensibilité
 * - **Types** : Définitions TypeScript partagées
 * 
 * ### Application Layer (/hooks)
 * - **Hooks métier** : useColorServices, useColorAnalysis
 * - **Hooks génériques** : useDebouncedValue, useErrorHandler
 * - **Types** : Interfaces pour les hooks
 * 
 * ### Presentation Layer (/components)
 * - **Panels** : Composants de haut niveau
 * - **Features** : Composants fonctionnels
 * - **Display** : Composants d'affichage
 * - **Interfaces** : Props des composants
 * 
 * ### Shared Layer (/shared)
 * - **Constants** : Constantes globales
 * - **Utils** : Fonctions utilitaires
 * - **Types** : Types génériques
 * - **Hooks** : Hooks réutilisables
 * 
 * ## Patterns architecturaux
 * 
 * ### Domain-Driven Design (DDD)
 * Le domaine métier (couleurs) est isolé et indépendant.
 * 
 * ### Dependency Injection
 * Les services sont injectés via constructeurs ou hooks.
 * 
 * ### Factory Pattern
 * Création centralisée des registres et services.
 * 
 * ### Strategy Pattern
 * Algorithmes interchangeables (convertisseurs, analyseurs).
 * 
 * ### Observer Pattern
 * Hooks React pour la réactivité des données.
 * 
 * ## Exemple d'utilisation complète
 * 
 * ```typescript
 * import { 
 *   HEXColor, 
 *   useColorServices, 
 *   useColorAnalysis,
 *   ColorSelectionPanel,
 *   ColorInformationPanel,
 *   useDebouncedValue
 * } from '@/src';
 * 
 * function ColorStudio() {
 *   // Initialisation des services
 *   const services = useColorServices();
 *   
 *   // État des couleurs avec debounce
 *   const [primaryColor, setPrimaryColor] = useDebouncedValue(
 *     new HEXColor('#ff5733'), 
 *     200
 *   );
 *   const [backgroundColor, setBackgroundColor] = useDebouncedValue(
 *     new HEXColor('#ffffff'), 
 *     200
 *   );
 *   
 *   // Analyse de la couleur principale
 *   const colorAnalysis = useColorAnalysis(primaryColor, services);
 *   
 *   if (!services || !colorAnalysis) {
 *     return <div>Loading...</div>;
 *   }
 *   
 *   return (
 *     <div className="color-studio">
 *       <div className="panels-container">
 *         <ColorSelectionPanel
 *           primaryColor={primaryColor}
 *           backgroundColor={backgroundColor}
 *           setPrimaryColor={setPrimaryColor}
 *           setBackgroundColor={setBackgroundColor}
 *           services={services}
 *           colorAnalysis={colorAnalysis}
 *         />
 *         <ColorInformationPanel
 *           primaryColor={primaryColor}
 *           backgroundColor={backgroundColor}
 *           colorAnalysis={colorAnalysis}
 *           services={services}
 *         />
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 */