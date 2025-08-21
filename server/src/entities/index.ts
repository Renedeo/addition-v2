// Export des interfaces d'entités
export * from './Etablissement';
export * from './Restauration';
export * from './Utilisateur';
export * from './Menu';
export * from './Produit';

// Types utilitaires pour les entités
export type EntityId = number;

export type EntityTimestamps = {
  createdAt: Date;
  updatedAt: Date;
};

export type BaseEntity = {
  id: EntityId;
} & EntityTimestamps;

// Interface commune pour toutes les entités
export interface IBaseEntity {
  id: EntityId;
  createdAt: Date;
  updatedAt: Date;
  equals(other: IBaseEntity): boolean;
  validate(): Promise<void>;
}

// Types pour les relations entre entités
export type EtablissementWithRelations = {
  restaurations?: any[];
  utilisateurs?: any[];
};

export type RestaurationWithRelations = {
  etablissement?: any;
  menus?: any[];
};

export type MenuWithRelations = {
  restauration?: any;
  produits?: any[];
};

export type ProduitWithRelations = {
  menu?: any;
};

export type UtilisateurWithRelations = {
  etablissement?: any;
};
