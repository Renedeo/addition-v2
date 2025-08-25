import { Router, Request, Response } from 'express';
import { UtilisateurService } from '../../implementations/services/UtilisateurService';
import { asyncHandler, ValidationError, NotFoundError, AuthorizationError } from '../middleware/error.middleware';
import { auditLogger } from '../middleware/logger.middleware';
import { RoleUtilisateur } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';

/**
 * Interface pour les requêtes de création/modification d'utilisateur
 */
interface CreateUserRequest {
  nom: string;
  motDePasse: string;
  role: RoleUtilisateur;
  etablissementId?: number;
}

interface UpdateUserRequest {
  nom?: string;
  role?: RoleUtilisateur;
  etablissementId?: number;
}

/**
 * Créer les routes des utilisateurs
 * @param utilisateurService Service utilisateur injecté
 */
export const utilisateurRoutes = (utilisateurService: UtilisateurService): Router => {
  const router = Router();

  /**
   * GET /api/utilisateurs
   * Récupérer tous les utilisateurs (avec pagination)
   */
  router.get('/', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    // Vérification des permissions (optionnel selon le rôle)
    const userRole = (req as any).user?.role;
    if (userRole !== 'admin' && userRole !== 'manager') {
      throw new AuthorizationError('Accès non autorisé');
    }

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const role = req.query.role as RoleUtilisateur;
    const etablissementId = req.query.etablissementId ? parseInt(req.query.etablissementId as string) : undefined;

    let utilisateurs: any[];

    // Filtrer par rôle si spécifié
    if (role) {
      utilisateurs = await utilisateurService.getUtilisateursByRole(role);
    }
    // Filtrer par établissement si spécifié
    else if (etablissementId) {
      utilisateurs = await utilisateurService.getUtilisateursByEtablissement(etablissementId);
    }
    // Sinon récupérer tous les serveurs par défaut (pour commencer)
    else {
      utilisateurs = await utilisateurService.getUtilisateursByRole('serveur');
    }

    // Pagination simple (à améliorer avec Prisma)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedUsers = utilisateurs.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        utilisateurs: paginatedUsers.map((user: any) => ({
          id: user.id,
          nom: user.nom,
          role: user.role,
          etablissementId: user.etablissementId,
          dateCreation: user.createdAt,
          dateMiseAJour: user.updatedAt
        })),
        pagination: {
          page,
          limit,
          total: utilisateurs.length,
          totalPages: Math.ceil(utilisateurs.length / limit)
        }
      }
    });
  }));

  /**
   * GET /api/utilisateurs/role/:role
   * Récupérer les utilisateurs par rôle
   */
  router.get('/role/:role', asyncHandler(async (req: Request, res: Response) => {
    const role = req.params.role as RoleUtilisateur;
    
    // Vérifier que le rôle est valide
    if (!['admin', 'manager', 'serveur'].includes(role)) {
      throw new ValidationError('Rôle invalide');
    }

    const utilisateurs = await utilisateurService.getUtilisateursByRole(role);

    res.status(200).json({
      success: true,
      data: {
        utilisateurs: utilisateurs.map((user: any) => ({
          id: user.id,
          nom: user.nom,
          role: user.role,
          etablissementId: user.etablissementId,
          dateCreation: user.createdAt
        }))
      }
    });
  }));

  /**
   * GET /api/utilisateurs/etablissement/:etablissementId
   * Récupérer les utilisateurs d'un établissement
   */
  router.get('/etablissement/:etablissementId', asyncHandler(async (req: Request, res: Response) => {
    const etablissementId = parseInt(req.params.etablissementId);
    
    if (isNaN(etablissementId) || etablissementId <= 0) {
      throw new ValidationError('ID établissement invalide');
    }

    const utilisateurs = await utilisateurService.getUtilisateursByEtablissement(etablissementId);

    res.status(200).json({
      success: true,
      data: {
        utilisateurs: utilisateurs.map((user: any) => ({
          id: user.id,
          nom: user.nom,
          role: user.role,
          etablissementId: user.etablissementId,
          dateCreation: user.createdAt
        }))
      }
    });
  }));

  /**
   * GET /api/utilisateurs/:id
   * Récupérer un utilisateur par son ID
   */
  router.get('/:id', authMiddleware, asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId) || userId <= 0) {
      throw new ValidationError('ID utilisateur invalide');
    }

    // Vérification que l'utilisateur peut accéder à ces infos
    console.log('Vérification des permissions pour accéder aux infos utilisateur...', req);
    const currentUserId = (req as any).user?.id;
    const currentUserRole = (req as any).user?.role;

    if (currentUserId !== userId && currentUserRole !== 'admin' && currentUserRole !== 'manager') {
      throw new AuthorizationError('Vous ne pouvez consulter que vos propres informations');
    }

    const utilisateur = await utilisateurService.getUtilisateur(userId);
    
    if (!utilisateur) {
      throw new NotFoundError('Utilisateur');
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
  }));

  /**
   * POST /api/utilisateurs
   * Créer un nouvel utilisateur (admin/manager seulement)
   */
  router.post('/', auditLogger('USER_CREATE'), asyncHandler(async (req: Request, res: Response) => {
    // Vérification des permissions
    const currentUserRole = (req as any).user?.role;
    if (currentUserRole !== 'admin' && currentUserRole !== 'manager') {
      throw new AuthorizationError('Seuls les administrateurs et managers peuvent créer des utilisateurs');
    }

    const { nom, motDePasse, role, etablissementId }: CreateUserRequest = req.body;

    // Validation des données
    if (!nom || !motDePasse || !role) {
      throw new ValidationError('Nom, mot de passe et rôle requis');
    }

    if (motDePasse.length < 8) {
      throw new ValidationError('Le mot de passe doit contenir au moins 8 caractères');
    }

    // Hash du mot de passe
    const bcrypt = require('bcrypt');
    const motDePasseHash = await bcrypt.hash(motDePasse, 12);

    const nouvelUtilisateur = await utilisateurService.createUtilisateur({
      nom: nom.trim(),
      motDePasseHash,
      role,
      etablissementId
    });

    res.status(201).json({
      success: true,
      message: 'Utilisateur créé avec succès',
      data: {
        user: {
          id: nouvelUtilisateur.id,
          nom: nouvelUtilisateur.nom,
          role: nouvelUtilisateur.role,
          etablissementId: nouvelUtilisateur.etablissementId,
          dateCreation: nouvelUtilisateur.createdAt
        }
      }
    });
  }));

  /**
   * PUT /api/utilisateurs/:id
   * Modifier un utilisateur
   */
  router.put('/:id', authMiddleware, auditLogger('USER_UPDATE'), asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId) || userId <= 0) {
      throw new ValidationError('ID utilisateur invalide');
    }

    // Vérification des permissions
    const currentUserId = (req as any).user?.id;
    const currentUserRole = (req as any).user?.role;
    
    if (currentUserId !== userId && currentUserRole !== 'admin' && currentUserRole !== 'manager') {
      throw new AuthorizationError('Vous ne pouvez modifier que vos propres informations');
    }

    const { nom, role, etablissementId }: UpdateUserRequest = req.body;

    // Un utilisateur normal ne peut pas changer son rôle
    if (currentUserId === userId && role && currentUserRole !== 'admin') {
      throw new AuthorizationError('Vous ne pouvez pas modifier votre propre rôle');
    }

    // Vérifier que l'utilisateur existe
    const utilisateurExistant = await utilisateurService.getUtilisateur(userId);
    if (!utilisateurExistant) {
      throw new NotFoundError('Utilisateur');
    }

    // Construire les données de mise à jour
    const updateData: any = {};
    if (nom !== undefined) updateData.nom = nom.trim();
    if (role !== undefined) updateData.role = role;
    if (etablissementId !== undefined) updateData.etablissementId = etablissementId;

    const utilisateurMisAJour = await utilisateurService.updateUtilisateur(userId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Utilisateur mis à jour avec succès',
      data: {
        user: {
          id: utilisateurMisAJour.id,
          nom: utilisateurMisAJour.nom,
          role: utilisateurMisAJour.role,
          etablissementId: utilisateurMisAJour.etablissementId,
          dateCreation: utilisateurMisAJour.createdAt,
          dateMiseAJour: utilisateurMisAJour.updatedAt
        }
      }
    });
  }));

  /**
   * DELETE /api/utilisateurs/:id
   * Supprimer un utilisateur (admin seulement)
   */
  router.delete('/:id', authMiddleware, auditLogger('USER_DELETE'), asyncHandler(async (req: Request, res: Response) => {
    const userId = parseInt(req.params.id);
    
    if (isNaN(userId) || userId <= 0) {
      throw new ValidationError('ID utilisateur invalide');
    }

    // Vérification des permissions (admin seulement)
    const currentUserRole = (req as any).user?.role;
    const currentUserId = (req as any).user?.id;
    
    if (currentUserRole !== 'admin') {
      throw new AuthorizationError('Seuls les administrateurs peuvent supprimer des utilisateurs');
    }

    // Empêcher l'auto-suppression
    if (currentUserId === userId) {
      throw new ValidationError('Vous ne pouvez pas supprimer votre propre compte');
    }

    // Vérifier que l'utilisateur existe
    const utilisateur = await utilisateurService.getUtilisateur(userId);
    if (!utilisateur) {
      throw new NotFoundError('Utilisateur');
    }

    await utilisateurService.deleteUtilisateur(userId);

    res.status(200).json({
      success: true,
      message: 'Utilisateur supprimé avec succès'
    });
  }));

  return router;
};
