# Architecture des Interfaces - Système Cugino

## 🏗️ Organisation par Responsabilité

Les interfaces ont été réorganisées selon les **principes SOLID** pour améliorer la maintenabilité et la testabilité du code.

## 📁 Structure des Dossiers

```
src/
├── interfaces/
│   ├── base/                     # Interfaces de base (SOLID)
│   │   ├── entity.interface.ts   # IEntity, IDomainEntity
│   │   ├── readable.interface.ts # IReadable, ISearchable
│   │   ├── writable.interface.ts # IWritable
│   │   ├── updatable.interface.ts# IUpdatable
│   │   ├── deletable.interface.ts# IDeletable
│   │   ├── repository.interface.ts# IRepository (composition)
│   │   ├── service.interface.ts  # IService
│   │   ├── validation.interface.ts# IValidator
│   │   ├── audit.interface.ts    # IAuditable
│   │   ├── transaction.interface.ts# ITransactionManager
│   │   ├── cache.interface.ts    # ICacheable
│   │   ├── events.interface.ts   # IEventEmitter
│   │   ├── query.interface.ts    # QueryOptions, FilterOptions
│   │   ├── persistence.interface.ts# IPersistenceAdapter
│   │   ├── full-repository.interface.ts# IFullRepository
│   │   └── index.ts             # Export centralisé
│   └── index.ts                 # Export principal
├── entities/                    # Interfaces spécifiques par domaine
├── tests/                       # Tests organisés ✨ NOUVEAU
└── ...
```

## 🎯 Principes SOLID Appliqués

### **S** - Single Responsibility Principle
Chaque interface a une seule responsabilité :
- `IReadable` : Opérations de lecture uniquement
- `IWritable` : Opérations de création uniquement
- `IValidator` : Validation des données uniquement

### **O** - Open/Closed Principle
Les interfaces sont ouvertes à l'extension, fermées à la modification.

### **L** - Liskov Substitution Principle
Les implémentations peuvent être substituées sans casser le code.

### **I** - Interface Segregation Principle
Interfaces petites et spécialisées plutôt qu'une grande interface monolithique.

### **D** - Dependency Inversion Principle
Dépendance sur les abstractions, pas les implémentations concrètes.

## 📦 Import des Interfaces

### Nouvelle façon (recommandée) :
```typescript
// Import spécifique
import { IEntity, IReadable } from '../interfaces/base';

// Import depuis le point d'entrée principal
import { IEtablissementEntity } from '../interfaces';
```

### Ancienne façon (encore supportée) :
```typescript
// Toujours fonctionnel grâce au re-export
import { IEntity } from '../interfaces/base-interfaces';
```

## 🔄 Migration

Les fichiers existants continuent de fonctionner grâce aux re-exports, mais il est recommandé de migrer vers la nouvelle structure.

## 🧪 Tests

Les fichiers de test ont été déplacés dans `src/tests/` :
- `test-architecture.ts`
- `test-enums.ts`
- `test-enums-seed.ts`

## 🚀 Avantages de cette Architecture

1. **Maintenabilité** : Chaque interface a une responsabilité claire
2. **Testabilité** : Interfaces plus petites, plus faciles à moquer
3. **Réutilisabilité** : Composition d'interfaces selon les besoins
4. **Évolutivité** : Ajout de nouvelles fonctionnalités sans impacter l'existant
5. **Documentation** : Structure claire et auto-documentée
