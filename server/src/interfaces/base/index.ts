/**
 * Export centralisé de toutes les interfaces de base
 * Organisation par responsabilité selon les principes SOLID
 */

// Entités de base
export * from './entity.interface';

// Opérations CRUD (Interface Segregation Principle)
export * from './readable.interface';
export * from './writable.interface';
export * from './updatable.interface';
export * from './deletable.interface';

// Compositions
export * from './repository.interface';
export * from './service.interface';

// Fonctionnalités spécialisées (Single Responsibility Principle)
export * from './validation.interface';
export * from './audit.interface';
export * from './transaction.interface';
export * from './cache.interface';
export * from './events.interface';
export * from './query.interface';
export * from './persistence.interface';

// Repository complet
export * from './full-repository.interface';
