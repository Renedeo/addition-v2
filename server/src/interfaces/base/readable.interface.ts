import { IEntity } from './entity.interface';

/**
 * Interface pour les opérations de lecture
 * Respecte l'Interface Segregation Principle (ISP)
 */
export interface IReadable<T extends IEntity> {
  findById(id: number): Promise<T | null>;
  findAll(): Promise<T[]>;
  count(): Promise<number>;
}

/**
 * Interface pour les opérations de recherche
 * Responsabilité : recherche et filtrage
 */
export interface ISearchable<T extends IEntity> {
  findWhere(where: Partial<T>): Promise<T[]>;
  findFirst(where: Partial<T>): Promise<T | null>;
  search(query: string): Promise<T[]>;
}
