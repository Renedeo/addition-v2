/**
 * Interface pour l'audit et logging
 * Responsabilité : traçabilité et historique des actions
 */
export interface IAuditable {
  logAction(action: string, entityId: number, userId?: number): Promise<void>;
  getAuditTrail(entityId: number): Promise<AuditLog[]>;
}

export interface AuditLog {
  id: number;
  action: string;
  entityId: number;
  userId?: number;
  timestamp: Date;
  changes?: Record<string, any>;
}
