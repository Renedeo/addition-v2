import { IEntity } from './entity.interface';
import { IRepository } from './repository.interface';
import { IValidator } from './validation.interface';
import { IAuditable } from './audit.interface';
import { ICacheable } from './cache.interface';
import { IEventEmitter } from './events.interface';
import { IAdvancedOperations } from './query.interface';

/**
 * Interface unifiée pour un Repository complet respectant SOLID
 * Compose toutes les capacités nécessaires pour un repository moderne
 */
export interface IFullRepository<T extends IEntity, TCreate, TUpdate>
  extends IRepository<T, TCreate, TUpdate>,
    IValidator<T>,
    IAuditable,
    ICacheable<T>,
    IEventEmitter<T>,
    IAdvancedOperations<T> {}
