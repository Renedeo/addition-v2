/**
 * Types partagés et génériques utilisés à travers l'application.
 * Centralise les types réutilisables pour éviter la duplication.
 */

// Types d'erreur communs
export interface AppError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// Types de résultats génériques
export interface ServiceResult<T> {
  success: boolean;
  data?: T;
  error?: AppError;
}

// Types de validation
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Types utilitaires
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Types de callback communs
export type EventCallback<T = void> = (data: T) => void;
export type AsyncCallback<T = void> = (data: T) => Promise<void>;

// Types de configuration
export interface AppConfig {
  debug: boolean;
  apiUrl?: string;
  theme: 'light' | 'dark' | 'auto';
}