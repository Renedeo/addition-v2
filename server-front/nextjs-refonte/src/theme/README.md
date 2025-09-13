# 🎨 Theme System Architecture

Ce document décrit le plan de développement complet pour l'architecture de thème extensible du projet Refonte.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Plan de développement](#plan-de-développement)
- [Tests](#tests)
- [Structure finale](#structure-finale)

## 🎯 Vue d'ensemble

Le système de thème suit les principes **SOLID** et **Domain-Driven Design (DDD)** pour assurer :
- ✨ **Multi-thèmes** : Plusieurs thèmes personnalisables
- 🌙 **Mode sombre/clair** : Support complet dark/light mode
- 🎛️ **Sélection dynamique** : Changement de thème en temps réel
- 💾 **Persistance** : Sauvegarde des préférences utilisateur
- 📱 **Responsive** : Adaptation automatique aux devices
- ♿ **Accessibilité** : Conformité WCAG
- 🏗️ **Architecture SOLID** : Code maintenable et extensible
- 🎯 **Domain-Driven Design** : Séparation claire des responsabilités

## 🏗️ Architecture DDD + SOLID

### 🎯 Couches Architecture

```
src/theme/
├── domain/              # Couche métier (Domain Layer)
│   ├── entities/        # Entités métier avec identité
│   ├── valueObjects/    # Objets valeur immutables
│   ├── aggregates/      # Agrégats racines
│   ├── repositories/    # Interfaces des repositories
│   └── services/        # Services du domaine
├── infrastructure/      # Couche infrastructure
│   ├── repositories/    # Implémentations concrètes
│   ├── persistence/     # Adaptateurs de stockage
│   └── external/        # Services externes
├── application/         # Couche application
│   ├── useCases/        # Cas d'usage métier
│   ├── services/        # Services applicatifs
│   └── dto/             # Data Transfer Objects
└── presentation/        # Couche présentation
    ├── hooks/           # Hooks React
    ├── components/      # Composants UI
    └── providers/       # Context Providers
```

### 🎭 Principes SOLID appliqués

- **S**ingle Responsibility : Chaque classe/module a une seule responsabilité
- **O**pen/Closed : Ouvert à l'extension, fermé à la modification
- **L**iskov Substitution : Les thèmes sont interchangeables
- **I**nterface Segregation : Interfaces spécialisées et cohésives
- **D**ependency Inversion : Dépendance aux abstractions, pas aux concrétions

---

## 🚀 Plan de développement

### 🏗️ **Phase 1 : Fondations DDD (Architecture de base)**

#### 1.1 Domain Layer - Types et Interfaces ⚙️

- [ ] Créer `domain/entities/Theme.ts` - Entité Theme avec identité
- [ ] Créer `domain/entities/Brand.ts` - Entité Brand pour l'identité visuelle
- [ ] Définir `domain/valueObjects/Color.ts` - Objet valeur pour les couleurs
- [ ] Définir `domain/valueObjects/Spacing.ts` - Objet valeur pour l'espacement
- [ ] Définir `domain/valueObjects/Typography.ts` - Objet valeur pour la typographie
- [ ] Créer `domain/aggregates/DesignSystem.ts` - Agrégat racine
- [ ] Définir `domain/repositories/ThemeRepository.ts` - Interface repository
- [ ] **🧪 Test unitaire** : Validation des entités, value objects et agrégats

#### 1.2 Application Layer - Use Cases 🎯

- [ ] Créer `application/useCases/SwitchThemeUseCase.ts`
- [ ] Créer `application/useCases/CreateThemeUseCase.ts`
- [ ] Créer `application/useCases/UpdateThemeUseCase.ts`
- [ ] Créer `application/services/ThemeApplicationService.ts`
- [ ] Définir `application/dto/` pour les transferts de données
- [ ] **🧪 Test unitaire** : Tests des cas d'usage et services applicatifs

#### 1.3 Infrastructure Layer - Implémentations 🛠️

- [ ] Créer `infrastructure/repositories/LocalThemeRepository.ts`
- [ ] Créer `infrastructure/persistence/StorageAdapter.ts`
- [ ] Implémenter `infrastructure/external/SystemThemeDetector.ts`
- [ ] Configurer les adaptateurs et mappers
- [ ] **🧪 Test unitaire** : Tests des repositories et adaptateurs

---

### 🎨 **Phase 2 : Domain Implementation (Implémentation métier)**

#### 2.1 Value Objects et Design Tokens ☀️

- [ ] Implémenter `Color` value object avec validation hexadécimale
- [ ] Créer `Spacing` value object avec unités cohérentes
- [ ] Développer `Typography` value object avec échelle modulaire
- [ ] Créer les collections de tokens (ColorPalette, SpacingScale)
- [ ] Ajouter la validation et l'immutabilité des value objects
- [ ] **🧪 Test unitaire** : Tests des value objects et invariants métier

#### 2.2 Entities et Aggregates �

- [ ] Implémenter l'entité `Theme` avec identité unique
- [ ] Créer l'agrégat `DesignSystem` avec rules métier
- [ ] Ajouter les méthodes métier (validateContrast, generateVariants)
- [ ] Implémenter les événements du domaine (ThemeChanged, etc.)
- [ ] Gérer les invariants métier et validation
- [ ] **🧪 Test unitaire** : Tests des entités, agrégats et règles métier

#### 2.3 Domain Services 🔧

- [ ] Créer `ThemeCompatibilityService` pour validation WCAG
- [ ] Implémenter `ThemeGenerationService` pour création automatique
- [ ] Ajouter `ThemeValidationService` pour cohérence métier
- [ ] Créer `ColorContrastService` pour accessibilité
- [ ] **🧪 Test unitaire** : Tests des services du domaine

---

### ⚛️ **Phase 3 : Infrastructure et Application (Couches techniques)**

#### 3.1 Infrastructure Layer �️

- [ ] Implémenter `LocalThemeRepository` avec localStorage
- [ ] Créer `SystemThemeDetector` pour préférences OS
- [ ] Développer `StorageAdapter` pour persistance
- [ ] Ajouter `ThemeMapper` pour transformation données
- [ ] Gérer les erreurs et fallbacks d'infrastructure
- [ ] **🧪 Test unitaire** : Tests d'infrastructure et mocks

#### 3.2 Application Services 🔄

- [ ] Créer `ThemeApplicationService` orchestrant les use cases
- [ ] Implémenter les DTOs pour les transferts de données
- [ ] Ajouter la validation des inputs utilisateur
- [ ] Gérer les transactions et la cohérence des données
- [ ] Implémenter les événements applicatifs
- [ ] **🧪 Test unitaire** : Tests des services applicatifs

#### 3.3 Use Cases Implementation 🎯

- [ ] Implémenter `SwitchThemeUseCase` avec validation métier
- [ ] Créer `CreateCustomThemeUseCase` avec rules
- [ ] Ajouter `ExportThemeUseCase` pour partage
- [ ] Développer `ImportThemeUseCase` avec validation
- [ ] **🧪 Test unitaire** : Tests end-to-end des cas d'usage

---

### 🧩 **Phase 4 : Composants de base (UI Components)**

#### 4.1 Composants primitifs 🔲
- [ ] Créer `components/button.ts` avec variants
- [ ] Implémenter `components/input.ts` et `components/textarea.ts`
- [ ] Ajouter `components/card.ts` et `components/container.ts`
- [ ] Définir les états (hover, focus, disabled, etc.)
- [ ] **🧪 Test unitaire** : Tests de rendu et variants des composants

#### 4.2 Composants de thème 🎛️
- [ ] Créer `ThemeSelector` (dropdown de sélection)
- [ ] Implémenter `ModeToggle` (switch dark/light)
- [ ] Ajouter `ThemePreview` (aperçu des thèmes)
- [ ] Créer `ThemeDebugger` pour le développement
- [ ] **🧪 Test unitaire** : Tests d'interaction utilisateur

#### 4.3 CSS Variables dynamiques 🎨
- [ ] Créer `utils/cssVariables.ts`
- [ ] Injection automatique des CSS custom properties
- [ ] Synchronisation avec les design tokens
- [ ] Optimisation des performances de rendu
- [ ] **🧪 Test unitaire** : Tests d'injection CSS et performance

---

### 🎛️ **Phase 5 : Interface utilisateur (UX)**

#### 5.1 Page de test 🧪
- [ ] Créer `/app/theme-test/page.tsx`
- [ ] Showcase de tous les composants et variants
- [ ] Interface de test pour tous les thèmes et modes
- [ ] Validation visuelle de l'expérience utilisateur
- [ ] **🧪 Test unitaire** : Tests end-to-end avec Playwright

#### 5.2 Navigation et settings ⚙️
- [ ] Intégrer le sélecteur dans la navigation principale
- [ ] Créer une page de settings avancée `/app/settings/theme`
- [ ] Ajouter les animations de transition entre thèmes
- [ ] Implémenter les raccourcis clavier
- [ ] **🧪 Test unitaire** : Tests de navigation et accessibilité

---

### 🔧 **Phase 6 : Optimisations (Performance)**

#### 6.1 Bundle optimization 📦
- [ ] Implémenter le code splitting des thèmes
- [ ] Lazy loading des thèmes non-utilisés
- [ ] Optimisation du CSS généré (purge, minification)
- [ ] Analyse de la taille des bundles
- [ ] **🧪 Test unitaire** : Tests de performance et bundle size

#### 6.2 DevTools 🛠️
- [ ] Créer des utilitaires de debug en développement
- [ ] Ajouter des logs détaillés pour le développement
- [ ] Implémenter un système de profiling
- [ ] Créer une documentation interactive
- [ ] **🧪 Test unitaire** : Tests des outils de développement

---

### 📱 **Phase 7 : Responsive et Accessibilité**

#### 7.1 Responsive design 📱
- [ ] Adapter les thèmes pour mobile/tablet/desktop
- [ ] Tester sur différentes tailles d'écran
- [ ] Optimiser les breakpoints et typography scale
- [ ] Valider les touch targets et interactions
- [ ] **🧪 Test unitaire** : Tests responsive avec différentes viewports

#### 7.2 Accessibilité ♿
- [ ] Validation des contrastes de couleurs (WCAG AA/AAA)
- [ ] Support complet navigation clavier
- [ ] Compatibilité screen readers (ARIA labels)
- [ ] Tests avec outils d'accessibilité automatisés
- [ ] **🧪 Test unitaire** : Tests d'accessibilité automatisés

---

### 🚀 **Phase 8 : Finalisation**

#### 8.1 Tests complets 🧪
- [ ] Suite complète de tests unitaires
- [ ] Tests d'intégration end-to-end
- [ ] Tests de performance et mémoire
- [ ] Tests de régression sur tous les browsers
- [ ] **🧪 Test unitaire** : Coverage 100% et CI/CD

#### 8.2 Documentation 📚
- [ ] Documentation complète des APIs
- [ ] Guide d'utilisation pour les développeurs
- [ ] Exemples d'implémentation et cas d'usage
- [ ] Storybook avec tous les composants
- [ ] **🧪 Test unitaire** : Tests de la documentation et exemples

---

## 🧪 Tests

### Types de tests par phase

| Phase | Tests de compilation | Tests unitaires | Tests d'intégration | Tests E2E |
|-------|---------------------|------------------|-------------------|-----------|
| 1     | ✅ TypeScript       | ✅ Types         | ❌               | ❌        |
| 2     | ✅ Build           | ✅ Tokens        | ✅ Rendu         | ❌        |
| 3     | ✅ Build           | ✅ Hooks         | ✅ Context       | ❌        |
| 4     | ✅ Build           | ✅ Components    | ✅ UI            | ✅ Flow   |
| 5+    | ✅ Build           | ✅ Complet       | ✅ Complet       | ✅ Complet|

### Outils de test

```bash
# Tests unitaires
npm run test              # Jest + React Testing Library
npm run test:watch        # Mode watch
npm run test:coverage     # Coverage report

# Tests E2E
npm run test:e2e          # Playwright

# Tests de build
npm run build             # Vérification build
npm run type-check        # Validation TypeScript

# Tests de performance
npm run test:perf         # Bundle analyzer
```

---

## 📁 Structure finale DDD

```
src/theme/
├── domain/                    # 🎯 COUCHE MÉTIER
│   ├── entities/             # Entités métier avec identité
│   │   ├── Theme            # Entité principale du thème
│   │   └── Brand            # Identité visuelle/marque
│   ├── valueObjects/         # Objets valeur immutables
│   │   ├── Color            # Gestion des couleurs
│   │   ├── Spacing          # Système d'espacement
│   │   ├── Typography       # Système typographique
│   │   ├── ColorPalette     # Collections de couleurs
│   │   └── SpacingScale     # Échelles d'espacement
│   ├── aggregates/           # Agrégats racines
│   │   └── DesignSystem     # Orchestration du système
│   ├── repositories/         # Interfaces de persistence
│   │   ├── ThemeRepository  # Gestion des thèmes
│   │   └── BrandRepository  # Gestion des marques
│   ├── services/             # Services du domaine
│   │   ├── ThemeValidation  # Validation métier
│   │   ├── ColorContrast    # Calculs d'accessibilité
│   │   └── ThemeGeneration  # Génération automatique
│   └── events/               # Événements du domaine
│       ├── ThemeChanged     # Changement de thème
│       └── ThemeCreated     # Création de thème
├── infrastructure/            # 🛠️ COUCHE INFRASTRUCTURE
│   ├── repositories/         # Implémentations concrètes
│   │   ├── LocalTheme       # Stockage local
│   │   └── RemoteTheme      # API distante
│   ├── persistence/          # Adaptateurs de stockage
│   │   ├── StorageAdapter   # localStorage/sessionStorage
│   │   └── IndexedDB        # Base locale avancée
│   ├── external/             # Services externes
│   │   ├── SystemDetector   # Détection thème OS
│   │   └── BrowserAPI       # APIs navigateur
│   └── mappers/              # Transformation données
│       ├── ThemeMapper      # Entité ↔ DTO
│       └── ColorMapper      # Conversions couleurs
├── application/               # 🎯 COUCHE APPLICATION
│   ├── useCases/             # Cas d'usage métier
│   │   ├── SwitchTheme      # Changement de thème
│   │   ├── CreateTheme      # Création personnalisée
│   │   ├── UpdateTheme      # Modification
│   │   ├── ExportTheme      # Export/partage
│   │   └── ImportTheme      # Import/validation
│   ├── services/             # Services applicatifs
│   │   ├── ThemeService     # Orchestration principale
│   │   └── ThemeOrchestrator# Coordination complexe
│   ├── dto/                  # Objets de transfert
│   │   ├── ThemeDTO         # DTO principal
│   │   ├── CreateThemeDTO   # Données création
│   │   └── UpdateThemeDTO   # Données modification
│   └── ports/                # Interfaces externes
│       ├── ThemePort        # Port thèmes
│       └── StoragePort      # Port stockage
└── presentation/              # 🎨 COUCHE PRÉSENTATION
    ├── hooks/                # Hooks React
    │   ├── useTheme         # Hook principal
    │   ├── useThemeMode     # Gestion mode dark/light
    │   └── useMediaQuery    # Responsive design
    ├── components/           # Composants UI
    │   ├── ThemeSelector    # Sélecteur de thème
    │   ├── ModeToggle       # Basculer mode
    │   ├── ThemePreview     # Aperçu visuel
    │   └── ThemeDebugger    # Outils développement
    ├── providers/            # Contexts React
    │   ├── ThemeProvider    # Provider principal
    │   └── ThemeContext     # Context state
    └── adapters/             # Adaptateurs UI
        ├── ReactAdapter     # Intégration React
        └── CSSVariables     # Variables CSS dynamiques
```

### 📖 Légende de la structure

- **Modules** : Représentent des fonctionnalités cohérentes
- **Noms sans extension** : Peuvent contenir plusieurs fichiers reliés
- **🎯 🛠️ 🎨** : Icônes pour identifier rapidement les couches DDD
- **Commentaires** : Rôle et responsabilité de chaque module

---

## 🎯 Ordre de développement recommandé

1. **Phase 1.1** → Types et interfaces (base solide)
2. **Phase 1.3** → Design tokens de base (couleurs, espaces)
3. **Phase 2.1** → Premier thème default light
4. **Phase 3.1-3.2** → Context et hook useTheme
5. **Phase 2.2** → Mode dark
6. **Phase 4.1** → Composants de base
7. **Phase 5.1** → Page de test et validation
8. **Phases suivantes** → selon les besoins du projet

---

## 🤝 Contribution

Pour ajouter un nouveau thème :
1. Créer un dossier dans `instances/nom-theme/`
2. Implémenter les fichiers `light.ts` et `dark.ts`
3. Ajouter l'export dans `instances/index.ts`
4. Créer les tests unitaires correspondants
5. Mettre à jour cette documentation

---

**🚀 Prêt à commencer ? Let's build an amazing theme system!**