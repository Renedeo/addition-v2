import { RoleUtilisateur } from '@prisma/client';
import { IUtilisateurEntity } from '../../entities/Utilisateur';
import { DomainEvent } from '../../interfaces/base';
import * as bcrypt from 'bcrypt';

/**
 * Implémentation de l'entité Utilisateur
 * Respecte les principes du Domain-Driven Design
 */
export class Utilisateur implements IUtilisateurEntity {
  public readonly id: number;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public role: RoleUtilisateur;
  public nom: string;
  private _motDePasseHash: string;
  public etablissementId?: number;

  private events: DomainEvent[] = [];
  private isModified: boolean = false;

  /**
   * Getter sécurisé pour le hash du mot de passe
   * Permet l'accès contrôlé selon l'interface
   */
  public get motDePasseHash(): string {
    return this._motDePasseHash;
  }

  /**
   * Setter sécurisé pour le hash du mot de passe
   * Assure que seuls les hashes valides sont acceptés
   */
  public set motDePasseHash(value: string) {
    if (!value) {
      throw new Error('Le hash du mot de passe ne peut pas être vide');
    }
    
    // Vérifier que c'est bien un hash bcrypt ou le hasher si nécessaire
    if (value.startsWith('$2b$') || value.startsWith('$2a$') || value.startsWith('$2y$')) {
      this._motDePasseHash = value;
    } else {
      throw new Error('Le mot de passe doit être fourni via les méthodes sécurisées');
    }
    
    this.markAsModified();
  }

  constructor(data: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    role: RoleUtilisateur;
    nom: string;
    motDePasseHash: string;
    etablissementId?: number;
  }) {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
    this.role = data.role;
    this.nom = data.nom;
    this._motDePasseHash = data.motDePasseHash; // Utilisation du champ privé
    this.etablissementId = data.etablissementId;
  }

  /**
   * Factory method pour créer un nouvel utilisateur de manière sécurisée
   */
  static async create(data: {
    role: RoleUtilisateur;
    nom: string;
    motDePasse: string;
    etablissementId?: number;
  }): Promise<Utilisateur> {
    const now = new Date();
    
    // Validation de la force du mot de passe avant création
    Utilisateur.validatePasswordStrengthStatic(data.motDePasse);
    
    const motDePasseHash = await bcrypt.hash(data.motDePasse, 10);

    const utilisateur = new Utilisateur({
      id: 0, // Sera défini lors de la sauvegarde
      createdAt: now,
      updatedAt: now,
      role: data.role,
      nom: data.nom,
      motDePasseHash,
      etablissementId: data.etablissementId,
    });

    utilisateur.addEvent({
      entityId: utilisateur.id,
      eventType: 'UtilisateurCreated',
      data: { role: data.role, nom: data.nom },
      timestamp: now,
    });

    return utilisateur;
  }

  /**
   * Factory method pour créer un utilisateur à partir de données de base de données
   */
  static fromDatabase(data: {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    role: RoleUtilisateur;
    nom: string;
    motDePasseHash: string;
    etablissementId?: number;
  }): Utilisateur {
    return new Utilisateur(data);
  }

  /**
   * Validation statique de la force du mot de passe
   */
  private static validatePasswordStrengthStatic(motDePasse: string): void {
    if (!motDePasse || motDePasse.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    const hasUpperCase = /[A-Z]/.test(motDePasse);
    const hasLowerCase = /[a-z]/.test(motDePasse);
    const hasNumbers = /\d/.test(motDePasse);
    const hasSpecialChars = /[!@#$%^&*(),.?":{}|<>]/.test(motDePasse);

    const errors: string[] = [];

    if (!hasUpperCase) {
      errors.push('au moins une majuscule');
    }
    if (!hasLowerCase) {
      errors.push('au moins une minuscule');
    }
    if (!hasNumbers) {
      errors.push('au moins un chiffre');
    }
    if (!hasSpecialChars) {
      errors.push('au moins un caractère spécial');
    }

    if (errors.length > 0) {
      throw new Error(`Le mot de passe doit contenir: ${errors.join(', ')}`);
    }
  }

  /**
   * Vérifie si deux utilisateurs sont égaux
   */
  equals(other: Utilisateur): boolean {
    return this.id === other.id;
  }

  /**
   * Valide les données de l'utilisateur
   */
  async validate(): Promise<void> {
    const errors: string[] = [];

    if (!this.nom || this.nom.trim().length < 2) {
      errors.push('Le nom doit contenir au moins 2 caractères');
    }

    if (!this._motDePasseHash) {
      errors.push('Le mot de passe hashé est requis');
    }

    if (!Object.values(RoleUtilisateur).includes(this.role)) {
      errors.push('Le rôle doit être valide');
    }

    // Validation métier : un serveur doit être associé à un établissement
    if (this.role === RoleUtilisateur.serveur && !this.etablissementId) {
      errors.push('Un serveur doit être associé à un établissement');
    }

    if (errors.length > 0) {
      throw new Error(`Validation échouée: ${errors.join(', ')}`);
    }
  }

  /**
   * Retourne les événements du domaine
   */
  getEvents(): DomainEvent[] {
    return [...this.events];
  }

  /**
   * Marque l'entité comme modifiée
   */
  markAsModified(): void {
    this.isModified = true;
    this.updatedAt = new Date();
  }

  /**
   * Vide la liste des événements (après traitement)
   */
  clearEvents(): void {
    this.events = [];
  }

  /**
   * Ajoute un événement du domaine
   */
  private addEvent(event: DomainEvent): void {
    this.events.push(event);
  }

  // ========== MÉTHODES MÉTIER ==========

  /**
   * Change le mot de passe de l'utilisateur de manière sécurisée
   */
  async changePassword(nouveauMotDePasse: string): Promise<void> {
    if (!nouveauMotDePasse || nouveauMotDePasse.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    // Validation supplémentaire du mot de passe
    this.validatePasswordStrength(nouveauMotDePasse);

    const ancienHash = this._motDePasseHash;
    this._motDePasseHash = await bcrypt.hash(nouveauMotDePasse, 10);
    this.markAsModified();

    this.addEvent({
      entityId: this.id,
      eventType: 'PasswordChanged',
      data: { userId: this.id },
      timestamp: new Date(),
    });
  }

  /**
   * Méthode sécurisée pour définir un nouveau hash de mot de passe
   */
  async setPasswordFromPlainText(motDePasse: string): Promise<void> {
    if (!motDePasse || motDePasse.length < 6) {
      throw new Error('Le mot de passe doit contenir au moins 6 caractères');
    }

    this.validatePasswordStrength(motDePasse);
    this._motDePasseHash = await bcrypt.hash(motDePasse, 10);
    this.markAsModified();
  }

  /**
   * Validation de la force du mot de passe (méthode d'instance)
   * Délègue à la méthode statique pour éviter la duplication
   */
  private validatePasswordStrength(motDePasse: string): void {
    Utilisateur.validatePasswordStrengthStatic(motDePasse);
  }

  /**
   * Vérifie un mot de passe de manière sécurisée
   */
  async verifyPassword(motDePasse: string): Promise<boolean> {
    if (!motDePasse) {
      return false;
    }
    
    try {
      return await bcrypt.compare(motDePasse, this._motDePasseHash);
    } catch (error) {
      console.error('Erreur lors de la vérification du mot de passe:', error);
      return false;
    }
  }

  /**
   * Change le rôle de l'utilisateur
   */
  changeRole(nouveauRole: RoleUtilisateur): void {
    const ancienRole = this.role;
    this.role = nouveauRole;
    this.markAsModified();

    // Un serveur doit être associé à un établissement
    if (nouveauRole === RoleUtilisateur.serveur && !this.etablissementId) {
      throw new Error('Un serveur doit être associé à un établissement');
    }

    this.addEvent({
      entityId: this.id,
      eventType: 'RoleChanged',
      data: { ancienRole, nouveauRole, userId: this.id },
      timestamp: new Date(),
    });
  }

  /**
   * Associe l'utilisateur à un établissement
   */
  assignToEtablissement(etablissementId: number): void {
    const ancienEtablissement = this.etablissementId;
    this.etablissementId = etablissementId;
    this.markAsModified();

    this.addEvent({
      entityId: this.id,
      eventType: 'EtablissementAssigned',
      data: { ancienEtablissement, nouvelEtablissement: etablissementId, userId: this.id },
      timestamp: new Date(),
    });
  }

  /**
   * Retire l'utilisateur d'un établissement
   */
  removeFromEtablissement(): void {
    if (this.role === RoleUtilisateur.serveur) {
      throw new Error('Un serveur ne peut pas être retiré de son établissement');
    }

    const ancienEtablissement = this.etablissementId;
    this.etablissementId = undefined;
    this.markAsModified();

    this.addEvent({
      entityId: this.id,
      eventType: 'EtablissementRemoved',
      data: { ancienEtablissement, userId: this.id },
      timestamp: new Date(),
    });
  }

  /**
   * Vérifie si l'utilisateur peut accéder à un établissement
   */
  canAccessEtablissement(etablissementId: number): boolean {
    // Admin peut accéder à tous les établissements
    if (this.role === RoleUtilisateur.admin) {
      return true;
    }

    // Les autres utilisateurs ne peuvent accéder qu'à leur établissement
    return this.etablissementId === etablissementId;
  }

  /**
   * Retourne les permissions de l'utilisateur
   */
  getPermissions(): string[] {
    switch (this.role) {
      case RoleUtilisateur.admin:
        return [
          'read:all',
          'write:all',
          'delete:all',
          'manage:users',
          'manage:etablissements',
        ];
      case RoleUtilisateur.serveur:
        return [
          'read:etablissement',
          'write:menus',
          'write:commandes',
          'read:produits',
        ];
      default:
        return ['read:public'];
    }
  }

  /**
   * Vérifie si l'utilisateur a une permission spécifique
   */
  hasPermission(permission: string): boolean {
    return this.getPermissions().includes(permission);
  }
}
