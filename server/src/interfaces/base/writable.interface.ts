import { IEntity } from './entity.interface';

/**
 * Interface pour les opérations d'écriture
 * Responsabilité : création d'entités
 */
export interface IWritable<T extends IEntity, TCreate, TUpdate> {
  create(data: TCreate): Promise<T>;
  createMany(data: TCreate[]): Promise<{ count: number }>;
}
