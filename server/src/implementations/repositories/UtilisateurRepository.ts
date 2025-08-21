import { PrismaClient, RoleUtilisateur } from '@prisma/client';
import { IUtilisateurRepository, IUtilisateurEntity, IUtilisateurEntityWithPassword, CreateUtilisateurData, UpdateUtilisateurData } from '../../entities/Utilisateur';
import { Utilisateur } from '../entities/Utilisateur';
import { ValidationResult, AuditLog, QueryOptions, FilterOptions, BulkOperation, BulkResult, AggregateOperation } from '../../interfaces/base';
import * as bcrypt from 'bcrypt';

/**
 * Implémentation du repository pour les utilisateurs
 * Utilise Prisma comme couche de persistance
 */
export class UtilisateurRepository implements IUtilisateurRepository {
  constructor(private prisma: PrismaClient) {}

  // ========== OPÉRATIONS DE LECTURE ==========

  async findById(id: number): Promise<IUtilisateurEntity | null> {
    const user = await this.prisma.utilisateur.findUnique({
      where: { id },
    });

    return user ? this.mapToEntity(user) : null;
  }

  async findAll(): Promise<IUtilisateurEntity[]> {
    const users = await this.prisma.utilisateur.findMany();
    return users.map(user => this.mapToEntity(user));
  }

  async count(): Promise<number> {
    return this.prisma.utilisateur.count();
  }

  // ========== OPÉRATIONS DE RECHERCHE ==========

  async findWhere(where: Partial<IUtilisateurEntity>): Promise<IUtilisateurEntity[]> {
    const users = await this.prisma.utilisateur.findMany({
      where: {
        role: where.role,
        nom: where.nom,
        etablissementId: where.etablissementId,
      },
    });
    return users.map(user => this.mapToEntity(user));
  }

  async findFirst(where: Partial<IUtilisateurEntity>): Promise<IUtilisateurEntity | null> {
    const user = await this.prisma.utilisateur.findFirst({
      where: {
        role: where.role,
        nom: where.nom,
        etablissementId: where.etablissementId,
      },
    });
    return user ? this.mapToEntity(user) : null;
  }

  async search(query: string): Promise<IUtilisateurEntity[]> {
    const users = await this.prisma.utilisateur.findMany({
      where: {
        nom: {
          contains: query,
          mode: 'insensitive',
        },
      },
    });
    return users.map(user => this.mapToEntity(user));
  }

  // ========== OPÉRATIONS D'ÉCRITURE ==========

  async create(data: CreateUtilisateurData): Promise<IUtilisateurEntity> {
    const user = await this.prisma.utilisateur.create({
      data: {
        role: data.role,
        nom: data.nom,
        motDePasseHash: data.motDePasseHash,
        etablissementId: data.etablissementId,
      },
    });

    await this.logAction('CREATE', user.id);
    return this.mapToEntity(user);
  }

  async createMany(data: CreateUtilisateurData[]): Promise<{ count: number }> {
    const result = await this.prisma.utilisateur.createMany({
      data: data.map(item => ({
        role: item.role,
        nom: item.nom,
        motDePasseHash: item.motDePasseHash,
        etablissementId: item.etablissementId,
      })),
    });

    return { count: result.count };
  }

  // ========== OPÉRATIONS DE MISE À JOUR ==========

  async update(id: number, data: UpdateUtilisateurData): Promise<IUtilisateurEntity> {
    const user = await this.prisma.utilisateur.update({
      where: { id },
      data: {
        nom: data.nom,
        motDePasseHash: data.motDePasseHash,
        updatedAt: new Date(),
      },
    });

    await this.logAction('UPDATE', id);
    return this.mapToEntity(user);
  }

  async updateMany(where: Partial<IUtilisateurEntity>, data: UpdateUtilisateurData): Promise<{ count: number }> {
    const result = await this.prisma.utilisateur.updateMany({
      where: {
        role: where.role,
        etablissementId: where.etablissementId,
      },
      data: {
        nom: data.nom,
        motDePasseHash: data.motDePasseHash,
        updatedAt: new Date(),
      },
    });

    return { count: result.count };
  }

  // ========== OPÉRATIONS DE SUPPRESSION ==========

  async delete(id: number): Promise<void> {
    await this.prisma.utilisateur.delete({
      where: { id },
    });

    await this.logAction('DELETE', id);
  }

  async deleteMany(where: any): Promise<{ count: number }> {
    const result = await this.prisma.utilisateur.deleteMany({
      where,
    });

    return { count: result.count };
  }

  // ========== MÉTHODES SPÉCIFIQUES AUX UTILISATEURS ==========

  async findByRole(role: RoleUtilisateur): Promise<IUtilisateurEntity[]> {
    const users = await this.prisma.utilisateur.findMany({
      where: { role },
    });
    return users.map(user => this.mapToEntity(user));
  }

  async findByEtablissement(etablissementId: number): Promise<IUtilisateurEntity[]> {
    const users = await this.prisma.utilisateur.findMany({
      where: { etablissementId },
    });
    return users.map(user => this.mapToEntity(user));
  }

  async findByNom(nom: string): Promise<IUtilisateurEntity | null> {
    const user = await this.prisma.utilisateur.findFirst({
      where: { nom },
    });
    return user ? this.mapToEntity(user) : null;
  }

  async verifyCredentials(nom: string, motDePasse: string): Promise<IUtilisateurEntity | null> {
    const user = await this.prisma.utilisateur.findFirst({
      where: { nom },
    });

    if (!user) {
      return null;
    }

    const isValid = await bcrypt.compare(motDePasse, user.motDePasseHash);
    if (!isValid) {
      return null;
    }

    // Retourner l'entité via la factory pour sécuriser l'accès
    const utilisateur = this.mapToEntity(user);
    
    // Vérification supplémentaire avec l'entité si possible
    if (utilisateur instanceof Utilisateur) {
      const doubleCheck = await utilisateur.verifyPassword(motDePasse);
      return doubleCheck ? utilisateur : null;
    }

    return utilisateur;
  }

  async changePassword(id: number, nouveauMotDePasse: string): Promise<void> {
    const motDePasseHash = await bcrypt.hash(nouveauMotDePasse, 10);
    
    await this.prisma.utilisateur.update({
      where: { id },
      data: { 
        motDePasseHash,
        updatedAt: new Date(),
      },
    });

    await this.logAction('CHANGE_PASSWORD', id);
  }

  // ========== VALIDATION ==========

  async validate(data: IUtilisateurEntity): Promise<ValidationResult> {
    const errors: any[] = [];

    if (!data.nom || data.nom.trim().length < 2) {
      errors.push({
        field: 'nom',
        message: 'Le nom doit contenir au moins 2 caractères',
        code: 'MIN_LENGTH',
      });
    }

    // Vérifier l'unicité du nom
    const existing = await this.prisma.utilisateur.findFirst({
      where: { 
        nom: data.nom,
        id: { not: data.id },
      },
    });

    if (existing) {
      errors.push({
        field: 'nom',
        message: 'Ce nom d\'utilisateur existe déjà',
        code: 'DUPLICATE',
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  async validateForCreate(data: IUtilisateurEntity): Promise<ValidationResult> {
    return this.validate(data);
  }

  async validateForUpdate(data: IUtilisateurEntity): Promise<ValidationResult> {
    return this.validate(data);
  }

  // ========== AUDIT ==========

  async logAction(action: string, entityId: number, userId?: number): Promise<void> {
    // Implémentation simple - pourrait être déplacée vers un service d'audit dédié
    console.log(`AUDIT: ${action} on Utilisateur ${entityId} by user ${userId || 'system'} at ${new Date().toISOString()}`);
  }

  async getAuditTrail(entityId: number): Promise<AuditLog[]> {
    // Implémentation basique - dans un vrai projet, il faudrait une table d'audit
    return [];
  }

  // ========== CACHE ==========

  async getFromCache(key: string): Promise<IUtilisateurEntity | null> {
    // Implémentation basique - dans un vrai projet, utiliser Redis ou similaire
    return null;
  }

  async setCache(key: string, value: IUtilisateurEntity, ttl?: number): Promise<void> {
    // Implémentation basique
    console.log(`CACHE: Setting ${key} with TTL ${ttl || 'default'}`);
  }

  async invalidateCache(pattern: string): Promise<void> {
    console.log(`CACHE: Invalidating pattern ${pattern}`);
  }

  async clearCache(): Promise<void> {
    console.log('CACHE: Clearing all cache');
  }

  // ========== ÉVÉNEMENTS ==========

  onCreated(callback: (entity: IUtilisateurEntity) => void): void {
    // Implémentation basique - dans un vrai projet, utiliser un EventEmitter
    console.log('EVENT: onCreated callback registered');
  }

  onUpdated(callback: (entity: IUtilisateurEntity, changes: Partial<IUtilisateurEntity>) => void): void {
    console.log('EVENT: onUpdated callback registered');
  }

  onDeleted(callback: (id: number) => void): void {
    console.log('EVENT: onDeleted callback registered');
  }

  emit(event: string, data: any): void {
    console.log(`EVENT: Emitting ${event} with data`, data);
  }

  // ========== OPÉRATIONS AVANCÉES ==========

  async findWithOptions(
    filter: FilterOptions<IUtilisateurEntity>,
    options: QueryOptions
  ): Promise<{ data: IUtilisateurEntity[]; total: number; hasMore: boolean }> {
    const where: any = {};

    if (filter.where) {
      Object.assign(where, filter.where);
    }

    if (filter.search) {
      where.nom = {
        contains: filter.search,
        mode: 'insensitive',
      };
    }

    const total = await this.prisma.utilisateur.count({ where });
    const users = await this.prisma.utilisateur.findMany({
      where,
      skip: options.offset,
      take: options.limit,
      orderBy: options.orderBy,
    });

    return {
      data: users.map(user => this.mapToEntity(user)),
      total,
      hasMore: (options.offset || 0) + users.length < total,
    };
  }

  async aggregate(operations: AggregateOperation[]): Promise<Record<string, any>> {
    const result: Record<string, any> = {};

    for (const op of operations) {
      switch (op.operation) {
        case 'count':
          result[`${op.field}_count`] = await this.prisma.utilisateur.count();
          break;
        // Ajouter d'autres opérations selon les besoins
      }
    }

    return result;
  }

  async bulkOperation(operation: BulkOperation<IUtilisateurEntity>): Promise<BulkResult> {
    try {
      let affectedRows = 0;

      switch (operation.type) {
        case 'create':
          if (Array.isArray(operation.data)) {
            // Vérifier que les données contiennent les champs requis pour la création
            const createData = operation.data as any[];
            const validCreateData: CreateUtilisateurData[] = createData.map(item => ({
              role: item.role,
              nom: item.nom,
              motDePasseHash: item.motDePasseHash || item._motDePasseHash || '$2b$10$defaulthash',
              etablissementId: item.etablissementId,
            }));
            
            const result = await this.createMany(validCreateData);
            affectedRows = result.count;
          }
          break;
        
        case 'update':
          if (operation.where && !Array.isArray(operation.data)) {
            const result = await this.updateMany(operation.where, operation.data as UpdateUtilisateurData);
            affectedRows = result.count;
          }
          break;
          
        case 'delete':
          if (operation.where) {
            const result = await this.deleteMany(operation.where);
            affectedRows = result.count;
          }
          break;
      }

      return {
        success: true,
        affectedRows,
      };
    } catch (error) {
      return {
        success: false,
        affectedRows: 0,
        errors: [error],
      };
    }
  }

  // ========== MÉTHODES PRIVÉES ==========

  private mapToEntity(data: any): IUtilisateurEntity {
    return Utilisateur.fromDatabase({
      id: data.id,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      role: data.role,
      nom: data.nom,
      motDePasseHash: data.motDePasseHash,
      etablissementId: data.etablissementId,
    });
  }
}
