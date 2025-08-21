import { MomentMenu } from '@prisma/client';
import { 
  IDomainEntity,
  IFullRepository,
  QueryOptions,
  FilterOptions 
} from '../interfaces/base';

// ========== INTERFACE DE L'ENTITÉ MENU ==========

export interface IMenuEntity extends IDomainEntity {
  moment: MomentMenu;
  dateCreation: Date;
  actif: boolean;
  restaurationId: number;
}

// ========== TYPES POUR LES OPÉRATIONS CRUD ==========

export interface CreateMenuData {
  moment: MomentMenu;
  actif: boolean;
  restaurationId: number;
}

export interface UpdateMenuData {
  actif?: boolean;
}

// ========== INTERFACE DU REPOSITORY ==========

export interface IMenuRepository extends IFullRepository<
  IMenuEntity, 
  CreateMenuData, 
  UpdateMenuData
> {
  // Méthodes spécifiques aux menus
  findByMoment(moment: MomentMenu): Promise<IMenuEntity[]>;
  findActiveMenus(): Promise<IMenuEntity[]>;
  findByRestauration(restaurationId: number): Promise<IMenuEntity[]>;
  getWithProduits(id: number): Promise<{
    menu: IMenuEntity;
    produits: any[]; // Will be defined later
    totalProduits: number;
    prixMoyen: number;
  } | null>;
  activateMenu(id: number): Promise<void>;
  deactivateMenu(id: number): Promise<void>;
}

// ========== INTERFACE DU SERVICE ==========

export interface IMenuService {
  createMenu(data: CreateMenuData): Promise<IMenuEntity>;
  getMenu(id: number): Promise<IMenuEntity | null>;
  updateMenu(id: number, data: UpdateMenuData): Promise<IMenuEntity>;
  deleteMenu(id: number): Promise<void>;
  getActiveMenusByMoment(moment: MomentMenu): Promise<IMenuEntity[]>;
  getMenuWithProducts(id: number): Promise<{
    menu: IMenuEntity;
    produits: any[];
  } | null>;
  activateMenu(id: number): Promise<void>;
  deactivateMenu(id: number): Promise<void>;
}
