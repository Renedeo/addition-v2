/**
 * Interface pour la validation des données
 * Responsabilité : validation et contrôle de conformité
 */
export interface IValidator<T> {
  validate(data: T): Promise<ValidationResult>;
  validateForCreate(data: T): Promise<ValidationResult>;
  validateForUpdate(data: T): Promise<ValidationResult>;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}
