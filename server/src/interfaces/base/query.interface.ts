import { IEntity } from './entity.interface';

/**
 * Types pour les filtres et options de requête
 * Responsabilité : définition des paramètres de requête
 */
export interface QueryOptions {
  limit?: number;
  offset?: number;
  orderBy?: Record<string, "asc" | "desc">;
  include?: string[];
  select?: string[];
}

export interface FilterOptions<T> {
  where?: Partial<T>;
  search?: string;
  dateRange?: {
    field: keyof T;
    from?: Date;
    to?: Date;
  };
}

/**
 * Interface pour les opérations avancées
 * Responsabilité : requêtes complexes et opérations bulk
 */
export interface IAdvancedOperations<T extends IEntity> {
  findWithOptions(
    filter: FilterOptions<T>,
    options: QueryOptions
  ): Promise<{
    data: T[];
    total: number;
    hasMore: boolean;
  }>;

  aggregate(operations: AggregateOperation[]): Promise<Record<string, any>>;

  bulkOperation(operation: BulkOperation<T>): Promise<BulkResult>;
}

export interface AggregateOperation {
  field: string;
  operation: "count" | "sum" | "avg" | "min" | "max";
}

export interface BulkOperation<T> {
  type: "create" | "update" | "delete";
  data: T[] | Partial<T>;
  where?: Partial<T>;
}

export interface BulkResult {
  success: boolean;
  affectedRows: number;
  errors?: any[];
}
