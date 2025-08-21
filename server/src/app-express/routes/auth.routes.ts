import { Router, Request, Response } from 'express';
import { UtilisateurService } from '../../implementations/services/UtilisateurService';
import { asyncHandler, ValidationError, AuthenticationError } from '../middleware/error.middleware';
import { authLogger, auditLogger } from '../middleware/logger.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { RoleUtilisateur } from '@prisma/client';
import jwt from 'jsonwebtoken';

/**
 * Interface pour les requêtes d'authentification
 */
interface LoginRequest {
  nom: string; // Utilise 'nom' au lieu d'email selon notre schema
  motDePasse: string;
}

interface RegisterRequest {
  nom: string;
  motDePasse: string;
  role?: RoleUtilisateur;
  etablissementId?: number;
}

interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

/**
 * Générer un token JWT pour un utilisateur
 */
const generateJWTToken = (utilisateur: any, jwtSecret: string): string => {
  return jwt.sign(
    {
      id: utilisateur.id,
      email: utilisateur.email,
      role: utilisateur.role,
      nom: utilisateur.nom
    },
    jwtSecret,
    {
      expiresIn: '24h',
      issuer: 'cugino-api',
      audience: 'cugino-client'
    }
  );
};

/**
 * Créer les routes d'authentification
 * @param utilisateurService Service utilisateur injecté
 */
export const authRoutes = (utilisateurService: UtilisateurService): Router => {
  const router = Router();

  // Appliquer le middleware de logging d'authentification
  router.use(authLogger);

  /**
   * POST /api/auth/login
   * Connexion utilisateur
   */
  router.post('/login', auditLogger('USER_LOGIN'), asyncHandler(async (req: Request, res: Response) => {
    const { nom, motDePasse }: LoginRequest = req.body;

    // Validation des données d'entrée
    if (!nom || !motDePasse) {
      throw new ValidationError('Nom d\'utilisateur et mot de passe requis');
    }

    try {
      // Tentative de connexion avec notre service
      const utilisateur = await utilisateurService.verifyCredentials(nom, motDePasse);
      
      if (!utilisateur) {
        throw new AuthenticationError('Identifiants invalides');
      }

      // Générer le token JWT
      const token = generateJWTToken(utilisateur, process.env.JWT_SECRET || 'default-secret');

      // Réponse de succès
      res.status(200).json({
        success: true,
        message: 'Connexion réussie',
        data: {
          token: token,
          user: {
            id: utilisateur.id,
            nom: utilisateur.nom,
            role: utilisateur.role,
            etablissementId: utilisateur.etablissementId,
            dateCreation: utilisateur.createdAt,
            dateMiseAJour: utilisateur.updatedAt
          }
        }
      });

    } catch (error) {
      // Log de tentative de connexion échouée
      console.warn(`🔐 Tentative de connexion échouée pour: ${nom}`, {
        timestamp: new Date().toISOString(),
        ip: req.ip,
        userAgent: req.get('User-Agent')
      });
      
      throw new AuthenticationError('Identifiants invalides');
    }
  }));

  /**
   * POST /api/auth/register
   * Inscription d'un nouvel utilisateur
   */
  router.post('/register', auditLogger('USER_REGISTER'), asyncHandler(async (req: Request, res: Response) => {
    const { nom, motDePasse, role, etablissementId }: RegisterRequest = req.body;

    // Validation des données obligatoires
    if (!nom || !motDePasse) {
      throw new ValidationError('Nom et mot de passe requis');
    }

    // Validation de la force du mot de passe
    if (motDePasse.length < 8) {
      throw new ValidationError('Le mot de passe doit contenir au moins 8 caractères');
    }

    try {
      // Création de l'utilisateur (le hashing sera fait par le service)
      const nouvelUtilisateur = await utilisateurService.createUtilisateur({
        nom: nom.trim(),
        motDePasseHash: motDePasse, // Mot de passe en clair, sera hashé par le service
        role: role || 'serveur', // Rôle par défaut pour l'inscription
        etablissementId
      });

      // Générer un token pour la connexion automatique
      const token = generateJWTToken(nouvelUtilisateur, process.env.JWT_SECRET || 'default-secret');

      // Réponse de succès
      res.status(201).json({
        success: true,
        message: 'Utilisateur créé avec succès',
        data: {
          user: {
            id: nouvelUtilisateur.id,
            nom: nouvelUtilisateur.nom,
            role: nouvelUtilisateur.role,
            etablissementId: nouvelUtilisateur.etablissementId,
            dateCreation: nouvelUtilisateur.createdAt,
            dateMiseAJour: nouvelUtilisateur.updatedAt
          },
          token: token
        }
      });

    } catch (error: any) {
      // Gestion des erreurs spécifiques
      if (error.message.includes('nom')) {
        throw new ValidationError('Ce nom d\'utilisateur est déjà utilisé');
      }
      
      throw error;
    }
  }));

  /**
   * POST /api/auth/logout
   * Déconnexion (pour l'instant, juste une confirmation côté client)
   */
  router.post('/logout', auditLogger('USER_LOGOUT'), asyncHandler(async (req: Request, res: Response) => {
    // Dans une implémentation plus avancée, on pourrait :
    // - Invalider le token dans une blacklist
    // - Logger la déconnexion avec l'ID utilisateur
    
    res.status(200).json({
      success: true,
      message: 'Déconnexion réussie'
    });
  }));

  /**
   * POST /api/auth/change-password
   * Changement de mot de passe (nécessite authentification)
   */
  router.post('/change-password', authMiddleware, auditLogger('PASSWORD_CHANGE'), asyncHandler(async (req: Request, res: Response) => {
    const { currentPassword, newPassword }: ChangePasswordRequest = req.body;
    
    // Récupérer l'utilisateur depuis le token
    const userId = (req as AuthenticatedRequest).user.id;

    // Validation des données
    if (!currentPassword || !newPassword) {
      throw new ValidationError('Mot de passe actuel et nouveau mot de passe requis');
    }

    if (newPassword.length < 8) {
      throw new ValidationError('Le nouveau mot de passe doit contenir au moins 8 caractères');
    }

    try {
      // Utiliser le service pour changer le mot de passe
      await utilisateurService.changePassword(
        userId,
        currentPassword,
        newPassword
      );

      res.status(200).json({
        success: true,
        message: 'Mot de passe modifié avec succès'
      });

    } catch (error: any) {
      if (error.message.includes('ancien') || error.message.includes('actuel')) {
        throw new AuthenticationError('Mot de passe actuel incorrect');
      }
      throw error;
    }
  }));

  /**
   * GET /api/auth/me
   * Récupérer les informations de l'utilisateur connecté
   */
  router.get('/me', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    const userId = (req as AuthenticatedRequest).user.id;

    try {
      // Récupérer l'utilisateur depuis la base
      const utilisateur = await utilisateurService.getUtilisateur(userId);
      
      if (!utilisateur) {
        throw new AuthenticationError('Utilisateur non trouvé');
      }

      res.status(200).json({
        success: true,
        data: {
          user: {
            id: utilisateur.id,
            nom: utilisateur.nom,
            role: utilisateur.role,
            etablissementId: utilisateur.etablissementId,
            dateCreation: utilisateur.createdAt,
            dateMiseAJour: utilisateur.updatedAt
          }
        }
      });

    } catch (error) {
      throw new AuthenticationError('Impossible de récupérer les informations utilisateur');
    }
  }));

  /**
   * POST /api/auth/refresh
   * Renouvellement de token (pour une implémentation future)
   */
  router.post('/refresh', asyncHandler(async (req: Request, res: Response) => {
    // Pour l'instant, retourner une erreur "non implémenté"
    res.status(501).json({
      success: false,
      message: 'Renouvellement de token non encore implémenté'
    });
  }));

  return router;
};
