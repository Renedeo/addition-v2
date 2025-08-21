import { IEntity } from './entity.interface';

/**
 * Interface pour les opérations de modification
 * Responsabilité : mise à jour d'entités existantes
 */
export interface IUpdatable<T extends IEntity, TUpdate> {
  update(id: number, data: TUpdate): Promise<T>;
  updateMany(where: Partial<T>, data: TUpdate): Promise<{ count: number }>;
}
