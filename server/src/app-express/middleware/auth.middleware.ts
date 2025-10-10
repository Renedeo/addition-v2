import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticationError, AuthorizationError } from './error.middleware';

/**
 * Interface pour le payload JWT décodé
 */
interface JWTPayload {
  id: number;
  email?: string;
  nom: string;
  role: string;
  iat: number;
  exp: number;
  iss: string;
  aud: string;
}

/**
 * Interface étendue pour les requêtes avec utilisateur authentifié
 */
export interface AuthenticatedRequest extends Request {
  user: {
    id: number;
    nom: string;
    role: string;
    email?: string;
  };
}

/**
 * Middleware d'authentification JWT
 * Vérifie et décode le token JWT depuis l'en-tête Authorization
 */
export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    // Récupérer le token depuis l'en-tête Authorization
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      throw new AuthenticationError('Token d\'authentification manquant');
    }

    // Vérifier le format "Bearer <token>"
    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      throw new AuthenticationError('Format de token invalide. Utilisez: Bearer <token>');
    }

    const token = tokenParts[1];
    
    // Récupérer la clé secrète
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      console.error('🚨 JWT_SECRET non défini dans les variables d\'environnement');
      throw new Error('Configuration serveur manquante');
    }

    // Décoder et vérifier le token
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: 'cugino-api',
      audience: 'cugino-client'
    }) as JWTPayload;

    // Ajouter les informations utilisateur à la requête
    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      nom: decoded.nom,
      role: decoded.role,
      email: decoded.email
    };

    next();

  } catch (error: any) {
    // Gestion des erreurs JWT spécifiques
    if (error.name === 'TokenExpiredError') {
      throw new AuthenticationError('Token expiré');
    }
    
    if (error.name === 'JsonWebTokenError') {
      throw new AuthenticationError('Token invalide');
    }
    
    if (error.name === 'NotBeforeError') {
      throw new AuthenticationError('Token pas encore valide');
    }

    // Autres erreurs d'authentification
    if (error instanceof AuthenticationError) {
      throw error;
    }

    // Erreur inattendue
    console.error('🚨 Erreur lors de la vérification du token:', error);
    throw new AuthenticationError('Erreur d\'authentification');
  }
};

/**
 * Middleware d'autorisation par rôle
 * Vérifie que l'utilisateur a l'un des rôles autorisés
 */
export const authorizeRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;
    
    if (!user) {
      throw new AuthenticationError('Utilisateur non authentifié');
    }

    if (!allowedRoles.includes(user.role)) {
      throw new AuthorizationError(
        `Accès refusé. Rôles autorisés: ${allowedRoles.join(', ')}`
      );
    }

    next();
  };
};

/**
 * Middleware d'autorisation pour les administrateurs uniquement
 */
export const adminOnly = authorizeRoles(['admin']);

/**
 * Middleware d'autorisation pour les managers et administrateurs
 */
export const managerOrAdmin = authorizeRoles(['manager', 'admin']);

/**
 * Middleware d'autorisation pour tous les rôles authentifiés
 */
export const anyAuthenticated = authorizeRoles(['admin', 'manager', 'serveur']);

/**
 * Middleware optionnel : extrait l'utilisateur du token s'il existe, mais n'exige pas l'authentification
 */
export const optionalAuth = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      // Pas de token, continuer sans utilisateur
      return next();
    }

    const tokenParts = authHeader.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      // Format invalide, continuer sans utilisateur
      return next();
    }

    const token = tokenParts[1];
    const jwtSecret = process.env.JWT_SECRET;
    
    if (!jwtSecret) {
      return next();
    }

    // Essayer de décoder le token
    const decoded = jwt.verify(token, jwtSecret, {
      issuer: 'cugino-api',
      audience: 'cugino-client'
    }) as JWTPayload;

    // Ajouter les informations utilisateur si le token est valide
    (req as AuthenticatedRequest).user = {
      id: decoded.id,
      nom: decoded.nom,
      role: decoded.role,
      email: decoded.email
    };

  } catch (error) {
    // En cas d'erreur, continuer sans utilisateur (auth optionnelle)
  }
  
  next();
};

/**
 * Middleware pour vérifier que l'utilisateur peut accéder à ses propres ressources
 * ou qu'il est admin/manager
 */
export const ownerOrAdmin = (getUserIdFromParams: (req: Request) => number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user = (req as AuthenticatedRequest).user;
    
    if (!user) {
      throw new AuthenticationError('Utilisateur non authentifié');
    }

    const targetUserId = getUserIdFromParams(req);
    
    // Admin et manager peuvent accéder à tout
    if (user.role === 'admin' || user.role === 'manager') {
      return next();
    }

    // Utilisateur normal peut accéder seulement à ses propres ressources
    if (user.id === targetUserId) {
      return next();
    }

    throw new AuthorizationError('Vous ne pouvez accéder qu\'à vos propres ressources');
  };
};
