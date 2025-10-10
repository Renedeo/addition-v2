import { IEntity } from './entity.interface';

/**
 * Interface pour la persistance
 * Responsabilité : adaptation à la couche de persistance (Dependency Inversion Principle)
 */
export interface IPersistenceAdapter<T extends IEntity> {
  save(entity: T): Promise<T>;
  load(id: number): Promise<T | null>;
  remove(id: number): Promise<void>;
  query(criteria: any): Promise<T[]>;
}
