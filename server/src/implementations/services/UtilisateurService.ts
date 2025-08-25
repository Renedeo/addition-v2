import { RoleUtilisateur } from '@prisma/client';
import { IUtilisateurService, IUtilisateurEntity, CreateUtilisateurData, UpdateUtilisateurData, IUtilisateurRepository } from '../../entities/Utilisateur';
import { Utilisateur } from '../entities/Utilisateur';
import { ValidationError, NotFoundError, AuthenticationError } from '../../app-express/middleware/error.middleware';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

/**
 * Implémentation du service pour les utilisateurs
 * Contient la logique métier et orchestre les opérations
 */
export class UtilisateurService implements IUtilisateurService {
  constructor(
    private utilisateurRepository: IUtilisateurRepository,
    private jwtSecret: string = process.env.JWT_SECRET || 'default-secret'
  ) {}

  // ========== OPÉRATIONS CRUD DE BASE ==========

  async createUtilisateur(data: CreateUtilisateurData): Promise<IUtilisateurEntity> {
    // Validation métier
    await this.validateCreateData(data);

    // Hasher le mot de passe si ce n'est pas déjà fait
    let motDePasseHash = data.motDePasseHash;
    if (!motDePasseHash.startsWith('$2b$')) {
      // Ce n'est pas un hash bcrypt, on le hash
      motDePasseHash = await bcrypt.hash(data.motDePasseHash, 10);
    }

    const utilisateurData: CreateUtilisateurData = {
      ...data,
      motDePasseHash,
    };

    // Créer l'utilisateur
    const utilisateur = await this.utilisateurRepository.create(utilisateurData);

    // Logique métier post-création
    await this.onUtilisateurCreated(utilisateur);

    return utilisateur;
  }

  async getUtilisateur(id: number): Promise<IUtilisateurEntity | null> {
    if (id <= 0) {
      throw new ValidationError('L\'ID doit être un nombre positif');
    }

    return this.utilisateurRepository.findById(id);
  }

  async updateUtilisateur(id: number, data: UpdateUtilisateurData): Promise<IUtilisateurEntity> {
    // Vérifier que l'utilisateur existe
    const existingUser = await this.utilisateurRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError(`Utilisateur avec l'ID ${id}`);
    }

    // Validation métier
    await this.validateUpdateData(id, data);

    // Hasher le nouveau mot de passe si fourni
    let updateData = { ...data };
    if (data.motDePasseHash && !data.motDePasseHash.startsWith('$2b$')) {
      updateData.motDePasseHash = await bcrypt.hash(data.motDePasseHash, 10);
    }

    // Mettre à jour
    const updatedUser = await this.utilisateurRepository.update(id, updateData);

    // Logique métier post-mise à jour
    await this.onUtilisateurUpdated(updatedUser, data);

    return updatedUser;
  }

  async deleteUtilisateur(id: number): Promise<void> {
    // Vérifier que l'utilisateur existe
    const existingUser = await this.utilisateurRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundError(`Utilisateur avec l'ID ${id}`);
    }

    // Validation métier pour la suppression
    await this.validateDeletion(existingUser);

    // Supprimer
    await this.utilisateurRepository.delete(id);

    // Logique métier post-suppression
    await this.onUtilisateurDeleted(id, existingUser);
  }

  // ========== OPÉRATIONS MÉTIER SPÉCIFIQUES ==========

  async getUtilisateursByRole(role: RoleUtilisateur): Promise<IUtilisateurEntity[]> {
    return this.utilisateurRepository.findByRole(role);
  }

  async getUtilisateursByEtablissement(etablissementId: number): Promise<IUtilisateurEntity[]> {
    if (etablissementId <= 0) {
      throw new ValidationError('L\'ID de l\'établissement doit être un nombre positif');
    }

    return this.utilisateurRepository.findByEtablissement(etablissementId);
  }

  async verifyCredentials(nom: string, motDePasse: string): Promise<IUtilisateurEntity | null> {
    if (!nom || !motDePasse) {
      throw new ValidationError('Le nom et le mot de passe sont requis');
    }

    const utilisateur = await this.utilisateurRepository.verifyCredentials(nom, motDePasse);
    
    if (utilisateur) {
      // Logique métier : enregistrer la dernière connexion, etc.
      await this.onSuccessfulLogin(utilisateur);
    }

    return utilisateur;
  }

  async changePassword(id: number, ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void> {
    // Vérifier que l'utilisateur existe
    const utilisateur = await this.utilisateurRepository.findById(id);
    if (!utilisateur) {
      throw new NotFoundError(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    // Vérifier l'ancien mot de passe en utilisant la méthode sécurisée de l'entité
    if (utilisateur instanceof Utilisateur) {
      const isOldPasswordValid = await utilisateur.verifyPassword(ancienMotDePasse);
      if (!isOldPasswordValid) {
        throw new AuthenticationError('L\'ancien mot de passe est incorrect');
      }
    } else {
      throw new ValidationError('Type d\'utilisateur non supporté pour cette opération');
    }

    // Valider le nouveau mot de passe
    this.validatePassword(nouveauMotDePasse);

    // Changer le mot de passe via l'entité (plus sécurisé)
    if (utilisateur instanceof Utilisateur) {
      await utilisateur.changePassword(nouveauMotDePasse);
    }

    // Sauvegarder via le repository
    await this.utilisateurRepository.changePassword(id, nouveauMotDePasse);

    // Logique métier post-changement
    await this.onPasswordChanged(utilisateur);
  }

  // ========== MÉTHODES D'AUTHENTIFICATION ==========

  async login(nom: string, motDePasse: string): Promise<{ utilisateur: IUtilisateurEntity; token: string }> {
    const utilisateur = await this.verifyCredentials(nom, motDePasse);
    
    if (!utilisateur) {
      throw new AuthenticationError('Identifiants invalides');
    }

    const token = this.generateJwtToken(utilisateur);

    return { utilisateur, token };
  }

  async validateToken(token: string): Promise<IUtilisateurEntity | null> {
    try {
      const decoded = jwt.verify(token, this.jwtSecret) as any;
      return this.utilisateurRepository.findById(decoded.userId);
    } catch (error) {
      return null;
    }
  }

  // ========== MÉTHODES DE VALIDATION PRIVÉES ==========

  private async validateCreateData(data: CreateUtilisateurData): Promise<void> {
    const errors: string[] = [];

    // Validation du nom
    if (!data.nom || data.nom.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }

    // Vérifier l'unicité du nom
    const existingUser = await this.utilisateurRepository.findByNom(data.nom);
    if (existingUser) {
      errors.push('Ce nom d\'utilisateur existe déjà');
    }

    // Validation du rôle
    if (!Object.values(RoleUtilisateur).includes(data.role)) {
      errors.push('Le rôle spécifié n\'est pas valide');
    }

    // Validation métier : un serveur doit être associé à un établissement
    if (data.role === RoleUtilisateur.serveur && !data.etablissementId) {
      errors.push('Un serveur doit être associé à un établissement');
    }

    // Validation du mot de passe
    if (!data.motDePasseHash) {
      errors.push('Le mot de passe est requis');
    }

    if (errors.length > 0) {
      throw new ValidationError(`Validation échouée: ${errors.join(', ')}`);
    }
  }

  private async validateUpdateData(id: number, data: UpdateUtilisateurData): Promise<void> {
    const errors: string[] = [];

    // Validation du nom si fourni
    if (data.nom !== undefined) {
      if (!data.nom || data.nom.trim().length < 2) {
        errors.push('Le nom doit contenir au moins 2 caractères');
      }

      // Vérifier l'unicité du nom
      const existingUser = await this.utilisateurRepository.findByNom(data.nom);
      if (existingUser && existingUser.id !== id) {
        errors.push('Ce nom d\'utilisateur existe déjà');
      }
    }

    if (errors.length > 0) {
      throw new ValidationError(`Validation échouée: ${errors.join(', ')}`);
    }
  }

  private async validateDeletion(utilisateur: IUtilisateurEntity): Promise<void> {
    // Exemple de règle métier : ne pas supprimer le dernier admin
    if (utilisateur.role === RoleUtilisateur.admin) {
      const admins = await this.utilisateurRepository.findByRole(RoleUtilisateur.admin);
      if (admins.length <= 1) {
        throw new ValidationError('Impossible de supprimer le dernier administrateur');
      }
    }
  }

  private validatePassword(motDePasse: string): void {
    if (!motDePasse || motDePasse.length < 6) {
      throw new ValidationError('Le mot de passe doit contenir au moins 6 caractères');
    }

    // Ajouter d'autres règles de validation selon les besoins
    const hasUpperCase = /[A-Z]/.test(motDePasse);
    const hasLowerCase = /[a-z]/.test(motDePasse);
    const hasNumbers = /\d/.test(motDePasse);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new ValidationError('Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre');
    }
  }

  // ========== MÉTHODES UTILITAIRES PRIVÉES ==========

  private generateJwtToken(utilisateur: IUtilisateurEntity): string {
    const payload = {
      userId: utilisateur.id,
      nom: utilisateur.nom,
      role: utilisateur.role,
      etablissementId: utilisateur.etablissementId,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: '24h' });
  }

  // ========== HOOKS MÉTIER ==========

  private async onUtilisateurCreated(utilisateur: IUtilisateurEntity): Promise<void> {
    console.log(`✅ Utilisateur créé: ${utilisateur.nom} (${utilisateur.role})`);
    
    // Exemple de logique métier post-création
    // - Envoyer un email de bienvenue
    // - Créer des données par défaut
    // - Notifier d'autres services
  }

  private async onUtilisateurUpdated(utilisateur: IUtilisateurEntity, changes: UpdateUtilisateurData): Promise<void> {
    console.log(`✏️ Utilisateur mis à jour: ${utilisateur.nom}`, changes);
    
    // Exemple de logique métier post-mise à jour
    // - Invalider le cache
    // - Notifier d'autres services
  }

  private async onUtilisateurDeleted(id: number, utilisateur: IUtilisateurEntity): Promise<void> {
    console.log(`🗑️ Utilisateur supprimé: ${utilisateur.nom}`);
    
    // Exemple de logique métier post-suppression
    // - Nettoyer les données associées
    // - Invalider les tokens
    // - Notifier d'autres services
  }

  private async onSuccessfulLogin(utilisateur: IUtilisateurEntity): Promise<void> {
    console.log(`🔐 Connexion réussie: ${utilisateur.nom}`);
    
    // Exemple de logique métier post-connexion
    // - Mettre à jour la dernière connexion
    // - Enregistrer l'activité
    // - Vérifier les permissions
  }

  private async onPasswordChanged(utilisateur: IUtilisateurEntity): Promise<void> {
    console.log(`🔑 Mot de passe changé: ${utilisateur.nom}`);
    
    // Exemple de logique métier post-changement de mot de passe
    // - Invalider tous les tokens existants
    // - Envoyer une notification de sécurité
    // - Enregistrer l'événement de sécurité
  }

  // ========== MÉTHODES UTILITAIRES PUBLIQUES ==========

  async getUserPermissions(id: number): Promise<string[]> {
    const utilisateur = await this.getUtilisateur(id);
    if (!utilisateur) {
      throw new NotFoundError(`Utilisateur avec l'ID ${id} non trouvé`);
    }

    // Cast vers la classe concrète pour accéder aux méthodes métier
    if (utilisateur instanceof Utilisateur) {
      return utilisateur.getPermissions();
    }

    // Fallback si ce n'est pas notre implémentation
    switch (utilisateur.role) {
      case RoleUtilisateur.admin:
        return ['read:all', 'write:all', 'delete:all', 'manage:users', 'manage:etablissements'];
      case RoleUtilisateur.serveur:
        return ['read:etablissement', 'write:menus', 'write:commandes', 'read:produits'];
      default:
        return ['read:public'];
    }
  }

  async canUserAccessEtablissement(userId: number, etablissementId: number): Promise<boolean> {
    const utilisateur = await this.getUtilisateur(userId);
    if (!utilisateur) {
      return false;
    }

    // Cast vers la classe concrète pour accéder aux méthodes métier
    if (utilisateur instanceof Utilisateur) {
      return utilisateur.canAccessEtablissement(etablissementId);
    }

    // Fallback - utilisation de la logique métier directe
    return utilisateur.role === RoleUtilisateur.admin || utilisateur.etablissementId === etablissementId;
  }
}
