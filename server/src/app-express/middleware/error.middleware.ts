import { Request, Response, NextFunction } from 'express';

/**
 * Interface pour les erreurs personnalisées
 */
export interface AppError extends Error {
  statusCode?: number;
  code?: string;
  isOperational?: boolean;
  details?: any;
}

/**
 * Classe d'erreur personnalisée pour l'application
 */
export class CustomError extends Error implements AppError {
  public statusCode: number;
  public code: string;
  public isOperational: boolean;
  public details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    code: string = 'INTERNAL_ERROR',
    isOperational: boolean = true,
    details?: any
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = isOperational;
    this.details = details;

    // Maintient la stack trace (seulement en développement)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

/**
 * Erreurs spécifiques au domaine métier
 */
export class ValidationError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 400, 'VALIDATION_ERROR', true, details);
  }
}

export class AuthenticationError extends CustomError {
  constructor(message: string = 'Non authentifié') {
    super(message, 401, 'AUTHENTICATION_ERROR', true);
  }
}

export class AuthorizationError extends CustomError {
  constructor(message: string = 'Non autorisé') {
    super(message, 403, 'AUTHORIZATION_ERROR', true);
  }
}

export class NotFoundError extends CustomError {
  constructor(resource: string = 'Ressource') {
    super(`${resource} non trouvé(e)`, 404, 'NOT_FOUND', true);
  }
}

export class ConflictError extends CustomError {
  constructor(message: string) {
    super(message, 409, 'CONFLICT_ERROR', true);
  }
}

export class DatabaseError extends CustomError {
  constructor(message: string, details?: any) {
    super(message, 500, 'DATABASE_ERROR', true, details);
  }
}

/**
 * Middleware principal de gestion d'erreurs
 * Doit être le dernier middleware dans la chaîne
 */
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log de l'erreur
  logError(error, req);

  // Extraction des informations d'erreur
  const {
    statusCode = 500,
    message = 'Erreur interne du serveur',
    code = 'INTERNAL_ERROR',
    details
  } = error;

  // Réponse d'erreur standardisée
  const errorResponse = {
    success: false,
    error: {
      code,
      message: sanitizeErrorMessage(message, statusCode),
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack,
        details
      })
    }
  };

  // Envoi de la réponse
  res.status(statusCode).json(errorResponse);
};

/**
 * Middleware pour capturer les erreurs asynchrones
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<any>
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Middleware pour les routes non trouvées
 */
export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = new NotFoundError(`Route ${req.method} ${req.originalUrl}`);
  next(error);
};

/**
 * Logging des erreurs
 */
function logError(error: AppError, req: Request): void {
  const logData = {
    timestamp: new Date().toISOString(),
    level: error.statusCode && error.statusCode < 500 ? 'warn' : 'error',
    message: error.message,
    code: error.code,
    statusCode: error.statusCode,
    path: req.originalUrl,
    method: req.method,
    userAgent: req.get('User-Agent'),
    ip: req.ip,
    userId: (req as any).user?.id,
    ...(error.statusCode && error.statusCode >= 500 && {
      stack: error.stack,
      details: error.details
    })
  };

  if (logData.level === 'error') {
    console.error('🚨 Erreur serveur:', JSON.stringify(logData, null, 2));
  } else {
    console.warn('⚠️ Erreur client:', JSON.stringify(logData, null, 2));
  }
}

/**
 * Sanitize les messages d'erreur pour éviter la fuite d'informations sensibles
 */
function sanitizeErrorMessage(message: string, statusCode: number): string {
  // En production, masquer les détails des erreurs internes
  if (process.env.NODE_ENV === 'production' && statusCode >= 500) {
    return 'Une erreur interne s\'est produite';
  }
  
  return message;
}

/**
 * Gestionnaire global pour les promesses non gérées
 */
process.on('unhandledRejection', (reason: any, promise: Promise<any>) => {
  console.error('🚨 Promesse non gérée détectée:', reason);
  console.error('À la promesse:', promise);
  
  // En production, on peut choisir d'arrêter le processus
  if (process.env.NODE_ENV === 'production') {
    console.error('🛑 Arrêt du processus...');
    process.exit(1);
  }
});

/**
 * Gestionnaire global pour les exceptions non capturées
 */
process.on('uncaughtException', (error: Error) => {
  console.error('🚨 Exception non capturée:', error);
  
  // Arrêt immédiat en cas d'exception non capturée
  console.error('🛑 Arrêt immédiat du processus...');
  process.exit(1);
});
