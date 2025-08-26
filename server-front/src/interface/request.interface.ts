/**
 * Interface de base pour toutes les requêtes
 * Principe ISP : Propriétés communes minimales
 */
export interface BaseRequest {
  timestamp?: Date;
  requestId?: string;
  userId?: number;
}

/**
 * Interface pour les en-têtes de requête
 * Principe ISP : Séparation des en-têtes
 */
export interface RequestHeaders {
  'Content-Type'?: string;
  'Authorization'?: string;
  'Accept'?: string;
  'Accept-Language'?: string;
  'X-Request-ID'?: string;
  [key: string]: string | undefined;
}

/**
 * Interface pour les méthodes HTTP
 * Principe ISP : Séparation des méthodes
 */
export interface HttpMethod {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' | 'HEAD' | 'OPTIONS';
}

/**
 * Interface pour les requêtes avec corps
 * Principe ISP : Séparation du payload
 */
export interface RequestWithBody<T = Record<string, unknown>> extends BaseRequest {
  body: T;
  headers?: RequestHeaders;
}

/**
 * Interface pour les requêtes avec paramètres de requête
 * Principe ISP : Séparation des query params
 */
export interface RequestWithQuery extends BaseRequest {
  query?: Record<string, string | number | boolean | undefined>;
  search?: string;
}

/**
 * Interface pour les requêtes avec paramètres d'URL
 * Principe ISP : Séparation des params d'URL
 */
export interface RequestWithParams extends BaseRequest {
  params: Record<string, string | number>;
}

/**
 * Interface pour la pagination
 * Principe ISP : Fonctionnalité de pagination séparée
 */
export interface PaginationRequest {
  page?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Interface pour le filtrage
 * Principe ISP : Fonctionnalité de filtrage séparée
 */
export interface FilterRequest {
  filters?: Record<string, string | number | boolean | string[]>;
  search?: string;
  searchFields?: string[];
}

/**
 * Interface pour les requêtes avec upload de fichiers
 * Principe ISP : Fonctionnalité d'upload séparée
 */
export interface FileUploadRequest extends BaseRequest {
  files: File[];
  maxSize?: number;
  allowedTypes?: string[];
  metadata?: Record<string, string | number | boolean>;
}

/**
 * Interface pour les requêtes d'authentification
 * Principe ISP : Spécialisation pour l'auth
 */
export interface AuthRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceInfo?: {
    userAgent: string;
    platform: string;
    language: string;
  };
}

/**
 * Interface pour les requêtes de création d'utilisateur
 * Principe ISP : Spécialisation pour la création
 */
export interface CreateUserRequest extends BaseRequest {
  nom: string;
  email: string;
  password: string;
  role: 'admin' | 'manager' | 'serveur';
  etablissementId?: number;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

/**
 * Interface pour les requêtes de mise à jour d'utilisateur
 * Principe ISP : Spécialisation pour la MAJ
 */
export interface UpdateUserRequest extends BaseRequest {
  nom?: string;
  email?: string;
  role?: 'admin' | 'manager' | 'serveur';
  etablissementId?: number;
  isActive?: boolean;
  profile?: {
    firstName?: string;
    lastName?: string;
    phone?: string;
  };
}

/**
 * Interface pour les requêtes CRUD avec pagination et filtres
 * Composition des interfaces spécialisées
 */
export interface ListRequest 
  extends BaseRequest, 
          PaginationRequest, 
          FilterRequest {
  include?: string[];
  exclude?: string[];
}

/**
 * Interface pour les requêtes de recherche avancée
 * Principe ISP : Fonctionnalité de recherche séparée
 */
export interface SearchRequest extends BaseRequest, PaginationRequest {
  query: string;
  searchFields?: string[];
  highlightFields?: string[];
  fuzzy?: boolean;
  boost?: Record<string, number>;
}

/**
 * Interface pour les requêtes batch
 * Principe ISP : Opérations en lot séparées
 */
export interface BatchRequest<T = Record<string, unknown>> extends BaseRequest {
  operations: Array<{
    operation: 'create' | 'update' | 'delete';
    data: T;
    id?: string | number;
  }>;
  atomic?: boolean;
}

/**
 * Interface pour les requêtes avec cache
 * Principe ISP : Fonctionnalité de cache séparée
 */
export interface CacheableRequest extends BaseRequest {
  cacheKey?: string;
  cacheTTL?: number;
  forceRefresh?: boolean;
  cacheStrategy?: 'memory' | 'redis' | 'database';
}

/**
 * Interface pour les requêtes avec retry
 * Principe ISP : Fonctionnalité de retry séparée
 */
export interface RetryableRequest extends BaseRequest {
  maxRetries?: number;
  retryDelay?: number;
  retryStrategy?: 'linear' | 'exponential';
  retryCondition?: (error: Error) => boolean;
}