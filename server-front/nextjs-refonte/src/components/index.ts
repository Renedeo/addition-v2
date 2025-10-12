/**
 * Point d'entrée principal pour tous les composants React.
 * 
 * Ce fichier exporte tous les composants utilisés dans l'application,
 * organisés par catégorie fonctionnelle.
 * 
 * @example
 * ```typescript
 * // Import groupé
 * import { 
 *   Header,
 *   ColorSelection, 
 *   ColorInformation 
 * } from '@/components';
 * ```
 */

// Composants de structure et navigation
export { Header } from './Tests/testComponents/Header';

// Composants de sélection et interaction
export { ColorSelection } from './Tests/testComponents/ColorSelection';
export { ColorSelectionPanel } from './Tests/testComponents/ColorSelectionPanel';

// Composants d'affichage d'information
export { ColorInformation } from './Tests/testComponents/ColorInformation';
export { ColorInformationPanel } from './Tests/testComponents/ColorInformationPanel';
export { ColorIndicator } from './Tests/testComponents/ColorIndicator';
export { LabelledColorDot } from './Tests/testComponents/LabelledColorDot';
export { ColorValueCard } from './Tests/testComponents/ColorValueCard';

// Composants d'analyse et métriques
export { AnalysisCard } from './Tests/testComponents/AnalysisCard';
export { ContrastRatio } from './Tests/testComponents/ContrastRatio';

// Composants d'amélioration et génération
export { EnhanceColor } from './Tests/testComponents/enhance';
export { PaletteGenerator } from './Tests/testComponents/PaletteGenerator';

// Interfaces des composants
export type { ColorInformationProps } from './Tests/core/interfaces/component.test.interface';

/**
 * Guide d'organisation des composants :
 * 
 * ## Structure hiérarchique
 * 
 * ### Composants de haut niveau (Panels)
 * Orchestrent plusieurs composants plus simples :
 * - `ColorSelectionPanel` : Gestion complète de la sélection
 * - `ColorInformationPanel` : Affichage complet des informations
 * 
 * ### Composants de fonctionnalité (Features)
 * Encapsulent une fonctionnalité spécifique :
 * - `ColorSelection` : Sélection de couleur avec synchronisation
 * - `ContrastRatio` : Calcul et affichage du contraste
 * - `PaletteGenerator` : Génération de palettes de couleurs
 * 
 * ### Composants d'affichage (Display)
 * Affichent des données sans logique complexe :
 * - `ColorIndicator` : Point coloré simple
 * - `ColorValueCard` : Carte d'affichage d'une valeur
 * - `AnalysisCard` : Carte d'analyse générique
 * 
 * ## Patterns utilisés
 * 
 * ### Composition over Inheritance
 * Les composants complexes composent des composants simples plutôt que d'hériter.
 * 
 * ### Props Interface Segregation
 * Chaque composant a une interface de props spécifique et minimale.
 * 
 * ### Render Props / Children Props
 * Certains composants acceptent des fonctions de rendu pour la flexibilité.
 * 
 * ### Memoization
 * Utilisation de `React.memo` et hooks pour optimiser les performances.
 * 
 * ## Exemples d'utilisation
 * 
 * ### Interface complète
 * ```tsx
 * function ColorAnalysisApp() {
 *   const [primaryColor, setPrimaryColor] = useState(new HEXColor('#ff5733'));
 *   const [backgroundColor, setBackground] = useState(new HEXColor('#ffffff'));
 *   const services = useColorServices();
 *   const analysis = useColorAnalysis(primaryColor, services);
 * 
 *   return (
 *     <div>
 *       <Header />
 *       <div className="flex gap-6">
 *         <ColorSelectionPanel
 *           primaryColor={primaryColor}
 *           backgroundColor={backgroundColor}
 *           setPrimaryColor={setPrimaryColor}
 *           setBackgroundColor={setBackground}
 *           services={services}
 *           colorAnalysis={analysis}
 *         />
 *         <ColorInformationPanel
 *           primaryColor={primaryColor}
 *           backgroundColor={backgroundColor}
 *           colorAnalysis={analysis}
 *           services={services}
 *         />
 *       </div>
 *     </div>
 *   );
 * }
 * ```
 * 
 * ### Composants individuels
 * ```tsx
 * function SimpleColorDisplay({ color }: { color: IColor }) {
 *   return (
 *     <div className="flex items-center gap-2">
 *       <ColorIndicator color={color} />
 *       <span>{color.stringValue()}</span>
 *     </div>
 *   );
 * }
 * ```
 */