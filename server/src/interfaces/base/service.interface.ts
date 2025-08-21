import { IEntity } from './entity.interface';

/**
 * Interface abstraite pour les services métier
 * Responsabilité : logique métier (Dependency Inversion Principle)
 */
export interface IService<T extends IEntity, TCreate, TUpdate> {
  getById(id: number): Promise<T | null>;
  getAll(): Promise<T[]>;
  create(data: TCreate): Promise<T>;
  update(id: number, data: TUpdate): Promise<T>;
  delete(id: number): Promise<void>;
  search(query: string): Promise<T[]>;
}
