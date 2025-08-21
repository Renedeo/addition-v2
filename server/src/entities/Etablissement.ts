import { TypeEtablissement } from '@prisma/client';
import { 
  IDomainEntity,
  IFullRepository,
  QueryOptions,
  FilterOptions 
} from '../interfaces/base';

// ========== INTERFACE DE L'ENTITÉ ÉTABLISSEMENT ==========

export interface IEtablissementEntity extends IDomainEntity {
  type: TypeEtablissement;
  nom: string;
  information?: string;
}

// ========== TYPES POUR LES OPÉRATIONS CRUD ==========

export interface CreateEtablissementData {
  type: TypeEtablissement;
  nom: string;
  information?: string;
}

export interface UpdateEtablissementData {
  nom?: string;
  information?: string;
}

// ========== INTERFACE DU REPOSITORY ==========

export interface IEtablissementRepository extends IFullRepository<
  IEtablissementEntity, 
  CreateEtablissementData, 
  UpdateEtablissementData
> {
  // Méthodes spécifiques aux établissements
  findByType(type: TypeEtablissement): Promise<IEtablissementEntity[]>;
  findByNom(nom: string): Promise<IEtablissementEntity | null>;
  getWithRestaurationStats(id: number): Promise<{
    etablissement: IEtablissementEntity;
    totalRestaurations: number;
    totalCapacite: number;
  } | null>;
}

// ========== INTERFACE DU SERVICE ==========

export interface IEtablissementService {
  createEtablissement(data: CreateEtablissementData): Promise<IEtablissementEntity>;
  getEtablissement(id: number): Promise<IEtablissementEntity | null>;
  updateEtablissement(id: number, data: UpdateEtablissementData): Promise<IEtablissementEntity>;
  deleteEtablissement(id: number): Promise<void>;
  getEtablissementsByType(type: TypeEtablissement): Promise<IEtablissementEntity[]>;
  getFullEtablissementInfo(id: number): Promise<{
    etablissement: IEtablissementEntity;
    restaurations: any[]; // Will be defined later
    utilisateurs: any[];  // Will be defined later
    statistiques: any;
  } | null>;
}
