/**
 * Interface pour la gestion des transactions
 * Responsabilité : gestion des transactions base de données
 */
export interface ITransactionManager {
  executeInTransaction<T>(operation: () => Promise<T>): Promise<T>;
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
