/**
 * Interfaces du domaine ColorValue.
 * 
 * Ce module centralise toutes les interfaces utilisées dans le domaine
 * de gestion des couleurs, organisées par catégorie.
 */

// Interfaces de couleur
export * from './color';

// Interfaces de service
export * from './service/analysis.interface';
export * from './service/converter.interface';
export * from './service/enhanced.interface';
export * from './service/palette.interface';
export * from './service/shared.interface';

// Interfaces d'architecture
export * from './factory/factory.interface';
export * from './registry/registry.interface';