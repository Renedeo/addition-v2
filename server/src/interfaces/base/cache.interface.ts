/**
 * Interface pour la gestion du cache
 * Responsabilité : mise en cache et optimisation des performances
 */
export interface ICacheable<T> {
  getFromCache(key: string): Promise<T | null>;
  setCache(key: string, value: T, ttl?: number): Promise<void>;
  invalidateCache(pattern: string): Promise<void>;
  clearCache(): Promise<void>;
}
