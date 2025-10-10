import { RoleUtilisateur } from '@prisma/client';
import { 
  IDomainEntity,
  IFullRepository,
  QueryOptions,
  FilterOptions 
} from '../interfaces/base';

// ========== INTERFACE DE L'ENTITÉ UTILISATEUR ==========

export interface IUtilisateurEntity extends IDomainEntity {
  role: RoleUtilisateur;
  nom: string;
  etablissementId?: number;
}

/**
 * Interface étendue pour l'accès sécurisé au hash du mot de passe
 * Utilisée par le repository et les services internes
 */
export interface IUtilisateurEntityWithPassword extends IUtilisateurEntity {
  motDePasseHash: string;
  verifyPassword?(motDePasse: string): Promise<boolean>;
}

// ========== TYPES POUR LES OPÉRATIONS CRUD ==========

export interface CreateUtilisateurData {
  role: RoleUtilisateur;
  nom: string;
  motDePasseHash: string;
  etablissementId?: number;
}

export interface UpdateUtilisateurData {
  nom?: string;
  motDePasseHash?: string;
}

// ========== INTERFACE DU REPOSITORY ==========

export interface IUtilisateurRepository extends IFullRepository<
  IUtilisateurEntity, 
  CreateUtilisateurData, 
  UpdateUtilisateurData
> {
  // Méthodes spécifiques aux utilisateurs
  findByRole(role: RoleUtilisateur): Promise<IUtilisateurEntity[]>;
  findByEtablissement(etablissementId: number): Promise<IUtilisateurEntity[]>;
  findByNom(nom: string): Promise<IUtilisateurEntity | null>;
  verifyCredentials(nom: string, motDePasse: string): Promise<IUtilisateurEntity | null>;
  changePassword(id: number, nouveauMotDePasse: string): Promise<void>;
}

// ========== INTERFACE DU SERVICE ==========

export interface IUtilisateurService {
  createUtilisateur(data: CreateUtilisateurData): Promise<IUtilisateurEntity>;
  getUtilisateur(id: number): Promise<IUtilisateurEntity | null>;
  updateUtilisateur(id: number, data: UpdateUtilisateurData): Promise<IUtilisateurEntity>;
  deleteUtilisateur(id: number): Promise<void>;
  getUtilisateursByRole(role: RoleUtilisateur): Promise<IUtilisateurEntity[]>;
  getUtilisateursByEtablissement(etablissementId: number): Promise<IUtilisateurEntity[]>;
  verifyCredentials(nom: string, motDePasse: string): Promise<IUtilisateurEntity | null>;
  changePassword(id: number, ancienMotDePasse: string, nouveauMotDePasse: string): Promise<void>;
}
