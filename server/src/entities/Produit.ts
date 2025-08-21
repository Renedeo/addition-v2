import { 
  IDomainEntity,
  IFullRepository,
  QueryOptions,
  FilterOptions 
} from '../interfaces/base';

// ========== INTERFACE DE L'ENTITÉ PRODUIT ==========

export interface IProduitEntity extends IDomainEntity {
  nom: string;
  prix: number;
  description?: string;
  categories?: any; // JSON
  menuId: number;
}

// ========== TYPES POUR LES OPÉRATIONS CRUD ==========

export interface CreateProduitData {
  nom: string;
  prix: number;
  description?: string;
  categories?: any;
  menuId: number;
}

export interface UpdateProduitData {
  nom?: string;
  prix?: number;
  description?: string;
  categories?: any;
}

// ========== INTERFACE DU REPOSITORY ==========

export interface IProduitRepository extends IFullRepository<
  IProduitEntity, 
  CreateProduitData, 
  UpdateProduitData
> {
  // Méthodes spécifiques aux produits
  findByMenu(menuId: number): Promise<IProduitEntity[]>;
  findByPriceRange(min: number, max: number): Promise<IProduitEntity[]>;
  findByCategory(category: string): Promise<IProduitEntity[]>;
  searchByName(nom: string): Promise<IProduitEntity[]>;
  getMostExpensive(limit?: number): Promise<IProduitEntity[]>;
  getCheapest(limit?: number): Promise<IProduitEntity[]>;
  getAveragePrice(): Promise<number>;
}

// ========== INTERFACE DU SERVICE ==========

export interface IProduitService {
  createProduit(data: CreateProduitData): Promise<IProduitEntity>;
  getProduit(id: number): Promise<IProduitEntity | null>;
  updateProduit(id: number, data: UpdateProduitData): Promise<IProduitEntity>;
  deleteProduit(id: number): Promise<void>;
  getProduitsByMenu(menuId: number): Promise<IProduitEntity[]>;
  searchProduits(query: string): Promise<IProduitEntity[]>;
  getProduitsByPriceRange(min: number, max: number): Promise<IProduitEntity[]>;
}
