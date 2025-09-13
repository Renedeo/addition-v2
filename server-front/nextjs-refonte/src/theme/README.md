# 🎨 Theme System Architecture

Ce document décrit le plan de développement complet pour l'architecture de thème extensible du projet Refonte.

## 📋 Table des matières

- [Vue d'ensemble](#vue-densemble)
- [Architecture](#architecture)
- [Plan de développement](#plan-de-développement)
- [Tests](#tests)
- [Structure finale](#structure-finale)

## 🎯 Vue d'ensemble

Le système de thème permet :
- ✨ **Multi-thèmes** : Plusieurs thèmes personnalisables
- 🌙 **Mode sombre/clair** : Support complet dark/light mode
- 🎛️ **Sélection dynamique** : Changement de thème en temps réel
- 💾 **Persistance** : Sauvegarde des préférences utilisateur
- 📱 **Responsive** : Adaptation automatique aux devices
- ♿ **Accessibilité** : Conformité WCAG

## 🏗️ Architecture

```
src/theme/
├── types/           # Interfaces TypeScript
├── tokens/          # Design tokens de base
├── components/      # Styles des composants
├── instances/       # Instances de thèmes
├── context/         # React Context & Provider
├── hooks/           # Hooks personnalisés
├── utils/           # Utilitaires et helpers
└── __tests__/       # Tests unitaires
```

---

## 🚀 Plan de développement

### 🏗️ **Phase 1 : Fondations (Architecture de base)**

#### 1.1 Types et Interfaces ⚙️
- [ ] Créer `types/index.ts` avec les interfaces de base
- [ ] Définir `Theme`, `ThemeTokens`, `ThemeMode`, `ThemeName`
- [ ] Structurer les types pour les composants et variantes
- [ ] Créer les types utilitaires et helpers
- [ ] **🧪 Test unitaire** : Validation des types TypeScript et compilation

#### 1.2 Structure des dossiers 📁
- [ ] Créer tous les dossiers de l'architecture
- [ ] Ajouter les fichiers `index.ts` dans chaque dossier
- [ ] Configurer les exports centralisés
- [ ] **🧪 Test unitaire** : Vérification des imports/exports

#### 1.3 Design Tokens de base 🎨
- [ ] Créer `tokens/colors.ts` avec la palette de couleurs
- [ ] Implémenter `tokens/spacing.ts` pour l'espacement
- [ ] Configurer `tokens/typography.ts` pour la typographie
- [ ] Ajouter `tokens/breakpoints.ts` pour le responsive
- [ ] Créer `tokens/shadows.ts` et `tokens/borders.ts`
- [ ] **🧪 Test unitaire** : Validation des tokens et structure des données

---

### 🎨 **Phase 2 : Thèmes (Implémentation)**

#### 2.1 Premier thème (Default Light) ☀️
- [ ] Créer `instances/default/light.ts`
- [ ] Implémenter les tokens de couleurs pour le mode light
- [ ] Définir les styles de composants de base
- [ ] Configurer les variantes (primary, secondary, etc.)
- [ ] **🧪 Test unitaire** : Rendu correct du thème default light

#### 2.2 Mode Dark 🌙
- [ ] Créer `instances/default/dark.ts`
- [ ] Adapter les couleurs pour le mode sombre
- [ ] Maintenir la cohérence des contrastes
- [ ] Tester la lisibilité et accessibilité
- [ ] **🧪 Test unitaire** : Validation du thème dark et contraste WCAG

#### 2.3 Thèmes additionnels 🎭
- [ ] Créer un deuxième thème `instances/corporate/`
- [ ] Implémenter les modes light/dark pour corporate
- [ ] Valider l'extensibilité de l'architecture
- [ ] Documenter le processus de création de thème
- [ ] **🧪 Test unitaire** : Tests de régression sur tous les thèmes

---

### ⚛️ **Phase 3 : Context et Hooks (State Management)**

#### 3.1 ThemeContext 🔄
- [ ] Créer `context/ThemeContext.tsx`
- [ ] Implémenter le `ThemeProvider` avec state management
- [ ] Gérer l'état global des thèmes et modes
- [ ] Ajouter la logique de résolution de thème
- [ ] **🧪 Test unitaire** : Tests du Context et Provider React

#### 3.2 Hook useTheme 🪝
- [ ] Créer `hooks/useTheme.ts`
- [ ] Implémenter les fonctions `setTheme`, `setMode`, `toggleMode`
- [ ] Ajouter les utilitaires `isLight`, `isDark`, `isAuto`
- [ ] Gérer la logique de résolution automatique
- [ ] **🧪 Test unitaire** : Tests du hook avec React Testing Library

#### 3.3 Persistance 💾
- [ ] Implémenter la sauvegarde localStorage
- [ ] Détecter les préférences système `prefers-color-scheme`
- [ ] Restaurer l'état au chargement de l'application
- [ ] Gérer les cas d'erreur et fallbacks
- [ ] **🧪 Test unitaire** : Tests de persistance et détection système

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

## 📁 Structure finale

```
src/theme/
├── types/
│   ├── index.ts          # Interfaces principales
│   ├── tokens.ts         # Types des design tokens
│   ├── components.ts     # Types des composants
│   └── utils.ts          # Types utilitaires
├── tokens/
│   ├── index.ts          # Export centralisé
│   ├── colors.ts         # Palette de couleurs
│   ├── spacing.ts        # Système d'espacement
│   ├── typography.ts     # Configuration typographique
│   ├── breakpoints.ts    # Points de rupture
│   ├── shadows.ts        # Ombres et élévations
│   └── borders.ts        # Bordures et rayons
├── components/
│   ├── index.ts          # Export centralisé
│   ├── button.ts         # Styles boutons
│   ├── input.ts          # Styles inputs
│   ├── card.ts           # Styles cartes
│   └── ...              # Autres composants
├── instances/
│   ├── index.ts          # Export de tous les thèmes
│   ├── default/
│   │   ├── index.ts      # Thème default complet
│   │   ├── light.ts      # Tokens mode light
│   │   └── dark.ts       # Tokens mode dark
│   ├── corporate/
│   │   ├── index.ts
│   │   ├── light.ts
│   │   └── dark.ts
│   └── ...              # Autres thèmes
├── context/
│   ├── index.ts          # Export du context
│   ├── ThemeContext.tsx  # Context React
│   └── ThemeProvider.tsx # Provider component
├── hooks/
│   ├── index.ts          # Export des hooks
│   ├── useTheme.ts       # Hook principal
│   └── useMediaQuery.ts  # Hook utilitaire
├── utils/
│   ├── index.ts          # Export des utilitaires
│   ├── cssVariables.ts   # Injection CSS vars
│   ├── storage.ts        # Persistance localStorage
│   ├── detection.ts      # Détection système
│   └── helpers.ts        # Fonctions utilitaires
├── __tests__/
│   ├── types.test.ts     # Tests des types
│   ├── tokens.test.ts    # Tests des tokens
│   ├── hooks.test.ts     # Tests des hooks
│   ├── context.test.ts   # Tests du context
│   ├── utils.test.ts     # Tests des utilitaires
│   └── integration.test.tsx # Tests d'intégration
├── README.md             # Ce fichier
└── index.ts              # Export principal du module
```

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