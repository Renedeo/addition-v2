/**
 * IFontLoader
 * Responsabilité : chargement de ressources fonts côté client (DOM).
 *
 * Important : cette interface représente une dépendance d'infrastructure et doit
 * être implémentée côté platform (client). Les méthodes doivent être sûres en SSR.
 */

export interface IFontLoader {
  /**
   * Charge la ressource (ex: via <link rel="stylesheet" href="...">) pour la family
   * identifiée par `nameOrKey`. Retourne l'élément inséré ou undefined si non applicable.
   */
  loadToDocument(nameOrKey: string): HTMLLinkElement | undefined;
}

export default IFontLoader;
