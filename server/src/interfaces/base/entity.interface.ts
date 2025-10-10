/**
 * Interface de base pour toutes les entités
 * Respecte le Single Responsibility Principle (SRP)
 */
export interface IEntity {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Interface abstraite pour les entités du domaine (Domain-Driven Design)
 */
export interface IDomainEntity extends IEntity {
  equals(other: IDomainEntity): boolean;
  validate(): Promise<void>;
  getEvents(): DomainEvent[];
  markAsModified(): void;
}

export interface DomainEvent {
  entityId: number;
  eventType: string;
  data: Record<string, any>;
  timestamp: Date;
}
