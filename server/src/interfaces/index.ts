/**
 * Export principal des interfaces
 * Organisation selon les principes SOLID
 */

// Export des interfaces de base organisées par responsabilité
export * from './base';

// Export des entités du domaine
export * from '../entities/Etablissement';
export * from '../entities/Restauration';
export * from '../entities/Utilisateur';
export * from '../entities/Menu';
export * from '../entities/Produit';

// Types utilitaires pour l'ensemble du système
export type Result<T, E = Error> = {
  success: true;
  data: T;
} | {
  success: false;
  error: E;
};

export type PaginatedResult<T> = {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasNext: boolean;
  hasPrevious: boolean;
};

export type SortOrder = 'asc' | 'desc';

export type DatabaseConnection = {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
};

export type SystemConfiguration = {
  database: DatabaseConnection;
  cache: {
    enabled: boolean;
    ttl: number;
    maxSize: number;
  };
  logging: {
    level: 'error' | 'warn' | 'info' | 'debug';
    enabled: boolean;
  };
  security: {
    jwtSecret: string;
    passwordSaltRounds: number;
    sessionTimeout: number;
  };
};
