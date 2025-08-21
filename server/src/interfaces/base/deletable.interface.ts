/**
 * Interface pour les opérations de suppression
 * Responsabilité : suppression d'entités
 */
export interface IDeletable {
  delete(id: number): Promise<void>;
  deleteMany(where: any): Promise<{ count: number }>;
}
