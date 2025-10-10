import { IEntity } from './entity.interface';
import { IReadable, ISearchable } from './readable.interface';
import { IWritable } from './writable.interface';
import { IUpdatable } from './updatable.interface';
import { IDeletable } from './deletable.interface';

/**
 * Interface de repository complète
 * Compose toutes les interfaces CRUD (Interface Segregation Principle)
 */
export interface IRepository<T extends IEntity, TCreate, TUpdate>
  extends IReadable<T>,
    IWritable<T, TCreate, TUpdate>,
    IUpdatable<T, TUpdate>,
    IDeletable,
    ISearchable<T> {}
