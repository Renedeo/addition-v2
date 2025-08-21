import { IEntity } from './entity.interface';

/**
 * Interface pour les événements/notifications
 * Responsabilité : gestion des événements et notifications
 */
export interface IEventEmitter<T extends IEntity> {
  onCreated(callback: (entity: T) => void): void;
  onUpdated(callback: (entity: T, changes: Partial<T>) => void): void;
  onDeleted(callback: (id: number) => void): void;
  emit(event: string, data: any): void;
}
