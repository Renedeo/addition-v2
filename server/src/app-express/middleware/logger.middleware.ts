import { Request, Response, NextFunction } from 'express';

/**
 * Interface pour les données de log des requêtes
 */
interface RequestLogData {
  timestamp: string;
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ip: string;
  userId?: string;
  contentLength?: number;
  referer?: string;
}

/**
 * Interface étendue pour les requêtes avec timer
 */
interface RequestWithTimer extends Request {
  startTime?: number;
}

/**
 * Middleware de logging des requêtes HTTP
 * Log toutes les requêtes entrantes avec des informations détaillées
 */
export const requestLogger = (
  req: RequestWithTimer,
  res: Response,
  next: NextFunction
): void => {
  // Marquer le temps de début
  req.startTime = Date.now();

  // Intercepter la fin de la réponse pour logging
  const originalEnd = res.end.bind(res);
  
  res.end = function(chunk?: any, encoding?: any, cb?: any): Response {
    // Calculer le temps de réponse
    const responseTime = Date.now() - (req.startTime || Date.now());
    
    // Collecter les données de log
    const logData: RequestLogData = {
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode: res.statusCode,
      responseTime,
      ip: getClientIP(req),
      userAgent: req.get('User-Agent'),
      userId: (req as any).user?.id,
      contentLength: res.get('Content-Length') ? parseInt(res.get('Content-Length')!) : undefined,
      referer: req.get('Referer'),
    };

    // Déterminer le niveau de log selon le status code
    const logLevel = getLogLevel(res.statusCode);
    
    // Formatter et afficher le log
    logRequest(logData, logLevel);

    // Appeler la méthode originale et retourner le résultat
    return originalEnd(chunk, encoding, cb);
  };

  next();
};

/**
 * Middleware de logging spécifique pour les erreurs d'authentification
 */
export const authLogger = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const originalJson = res.json;
  
  res.json = function(body: any) {
    // Si c'est une erreur d'auth, log avec plus de détails
    if (res.statusCode === 401 || res.statusCode === 403) {
      const authLogData = {
        timestamp: new Date().toISOString(),
        event: 'AUTH_FAILURE',
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        ip: getClientIP(req),
        userAgent: req.get('User-Agent'),
        authorization: req.get('Authorization') ? 'PROVIDED' : 'MISSING',
        attemptedUserId: (req as any).user?.id || 'UNKNOWN',
      };

      console.warn('🔒 Tentative d\'authentification échouée:', JSON.stringify(authLogData, null, 2));
    }

    return originalJson.call(this, body);
  };

  next();
};

/**
 * Middleware de logging pour les opérations sensibles
 */
export const auditLogger = (operation: string) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const originalJson = res.json;
    
    res.json = function(body: any) {
      // Logger uniquement les opérations réussies (2xx)
      if (res.statusCode >= 200 && res.statusCode < 300) {
        const auditData = {
          timestamp: new Date().toISOString(),
          event: 'AUDIT_LOG',
          operation,
          method: req.method,
          url: req.originalUrl,
          statusCode: res.statusCode,
          userId: (req as any).user?.id || 'ANONYMOUS',
          ip: getClientIP(req),
          userAgent: req.get('User-Agent'),
          requestBody: operation.includes('CREATE') || operation.includes('UPDATE') 
            ? sanitizeRequestBody(req.body) 
            : undefined,
        };

        console.info('📝 Opération auditée:', JSON.stringify(auditData, null, 2));
      }

      return originalJson.call(this, body);
    };

    next();
  };
};

/**
 * Obtenir l'IP réelle du client (gère les proxies)
 */
function getClientIP(req: Request): string {
  return (
    req.get('X-Forwarded-For')?.split(',')[0]?.trim() ||
    req.get('X-Real-IP') ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    'unknown'
  );
}

/**
 * Déterminer le niveau de log selon le status code
 */
function getLogLevel(statusCode: number): 'info' | 'warn' | 'error' {
  if (statusCode >= 500) return 'error';
  if (statusCode >= 400) return 'warn';
  return 'info';
}

/**
 * Logger une requête avec formatage approprié
 */
function logRequest(data: RequestLogData, level: 'info' | 'warn' | 'error'): void {
  // Format court pour l'affichage console
  const shortLog = `${data.method} ${data.url} - ${data.statusCode} (${data.responseTime}ms)`;
  
  // Couleurs selon le niveau
  const coloredLog = colorizeLog(shortLog, level, data.statusCode);
  
  // Log simple en console
  console.log(`${getTimestamp()} ${coloredLog}`);
  
  // Log détaillé pour les erreurs ou en mode debug
  if (level === 'error' || process.env.LOG_LEVEL === 'debug') {
    console.log('📊 Détails requête:', JSON.stringify(data, null, 2));
  }
}

/**
 * Coloriser les logs selon le niveau et status
 */
function colorizeLog(message: string, level: string, statusCode: number): string {
  // En production, pas de couleurs (pour les logs structurés)
  if (process.env.NODE_ENV === 'production') {
    return message;
  }

  // Codes couleur ANSI
  const colors = {
    reset: '\x1b[0m',
    red: '\x1b[31m',
    yellow: '\x1b[33m',
    green: '\x1b[32m',
    blue: '\x1b[34m',
    gray: '\x1b[90m',
  };

  if (statusCode >= 500) return `${colors.red}${message}${colors.reset}`;
  if (statusCode >= 400) return `${colors.yellow}${message}${colors.reset}`;
  if (statusCode >= 300) return `${colors.blue}${message}${colors.reset}`;
  if (statusCode >= 200) return `${colors.green}${message}${colors.reset}`;
  
  return `${colors.gray}${message}${colors.reset}`;
}

/**
 * Formater timestamp pour l'affichage
 */
function getTimestamp(): string {
  return new Date().toISOString().replace('T', ' ').replace('Z', '');
}

/**
 * Sanitiser le body des requêtes pour les logs (enlever les mots de passe)
 */
function sanitizeRequestBody(body: any): any {
  if (!body || typeof body !== 'object') return body;
  
  const sensitiveFields = [
    'password', 'motDePasse', 'currentPassword', 'newPassword',
    'token', 'secret', 'key', 'authorization'
  ];
  
  const sanitized = { ...body };
  
  for (const field of sensitiveFields) {
    if (sanitized[field]) {
      sanitized[field] = '[REDACTED]';
    }
  }
  
  return sanitized;
}

/**
 * Middleware pour logger les performances lentes
 */
export const performanceLogger = (thresholdMs: number = 1000) => {
  return (req: RequestWithTimer, res: Response, next: NextFunction): void => {
    req.startTime = Date.now();
    
    const originalEnd = res.end.bind(res);
    
    res.end = function(chunk?: any, encoding?: any, cb?: any): Response {
      const responseTime = Date.now() - (req.startTime || Date.now());
      
      if (responseTime > thresholdMs) {
        const slowRequestData = {
          timestamp: new Date().toISOString(),
          event: 'SLOW_REQUEST',
          method: req.method,
          url: req.originalUrl,
          responseTime,
          threshold: thresholdMs,
          ip: getClientIP(req),
          userId: (req as any).user?.id,
        };
        
        console.warn('🐌 Requête lente détectée:', JSON.stringify(slowRequestData, null, 2));
      }
      
      return originalEnd(chunk, encoding, cb);
    };
    
    next();
  };
};
