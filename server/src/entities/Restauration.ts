import { 
  IDomainEntity,
  IFullRepository,
  QueryOptions,
  FilterOptions 
} from '../interfaces/base';

// ========== INTERFACE DE L'ENTITÉ RESTAURATION ==========

export interface IRestaurationEntity extends IDomainEntity {
  etablissementId: number;
  typeCuisine?: string;
  capacite?: number;
  horairesOuverture?: any; // JSON
  telephone?: string;
}

// ========== TYPES POUR LES OPÉRATIONS CRUD ==========

export interface CreateRestaurationData {
  etablissementId: number;
  typeCuisine?: string;
  capacite?: number;
  horairesOuverture?: any;
  telephone?: string;
}

export interface UpdateRestaurationData {
  typeCuisine?: string;
  capacite?: number;
  horairesOuverture?: any;
  telephone?: string;
}

// ========== INTERFACE DU REPOSITORY ==========

export interface IRestaurationRepository extends IFullRepository<
  IRestaurationEntity, 
  CreateRestaurationData, 
  UpdateRestaurationData
> {
  // Méthodes spécifiques aux restaurations
  findByEtablissement(etablissementId: number): Promise<IRestaurationEntity[]>;
  findByCapaciteMinimum(capacite: number): Promise<IRestaurationEntity[]>;
  findByTypeCuisine(typeCuisine: string): Promise<IRestaurationEntity[]>;
  getWithMenusAndProducts(id: number): Promise<{
    restauration: IRestaurationEntity;
    menus: any[]; // Will be defined later
    totalProduits: number;
  } | null>;
}

// ========== INTERFACE DU SERVICE ==========

export interface IRestaurationService {
  createRestauration(data: CreateRestaurationData): Promise<IRestaurationEntity>;
  getRestauration(id: number): Promise<IRestaurationEntity | null>;
  updateRestauration(id: number, data: UpdateRestaurationData): Promise<IRestaurationEntity>;
  deleteRestauration(id: number): Promise<void>;
  getRestaurationsByEtablissement(etablissementId: number): Promise<IRestaurationEntity[]>;
  checkDisponibilite(id: number, nombrePersonnes: number): Promise<boolean>;
}
