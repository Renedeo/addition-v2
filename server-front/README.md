# Server-Front - Application Next.js

Ce projet est une application Next.js moderne utilisant React 19, TypeScript et Tailwind CSS v4, construite avec une architecture modulaire respectant les principes SOLID.

## 🎯 But du Projet

Développer une application front-end complète avec :
- **Architecture modulaire** - Séparation claire des responsabilités
- **Système de thème** - Gestion des thèmes sombre/clair avec persistance
- **TypeScript strict** - Typage complet pour la robustesse du code
- **Principes SOLID** - Architecture maintenable et extensible
- **Tests automatisés** - Validation continue de la qualité

## 📁 Structure du Projet

```
server-front/
├── src/
│   ├── app/                     # Pages et layouts Next.js
│   │   ├── page.tsx            # Page d'accueil
│   │   └── test/               # Page de test des composants
│   ├── components/             # Composants réutilisables
│   ├── context/                # Contextes React
│   │   └── themeContext/       # Gestion des thèmes
│   │       ├── ThemeContext.tsx
│   │       ├── ThemeProvider.tsx
│   │       ├── ThemeProviderWithDI.tsx
│   │       └── services/       # Services d'abstraction
│   └── theme/                  # Système de thème modulaire
│       ├── interface/          # Types et interfaces
│       └── implementation/     # Implémentations concrètes
├── theme-test/                 # Tests et validation du thème
└── README.md                   # Documentation (ce fichier)
```

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Développement
```bash
npm run dev
```
Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

### Build de production
```bash
npm run build
```

### Tests et validation
```bash
npm run type-check
```

## 📈 Progression du Projet

### ✅ Phase 1 - Fondations (Terminée)
- [x] Configuration Next.js 15 avec Turbopack
- [x] Configuration TypeScript strict
- [x] Configuration Tailwind CSS v4
- [x] Structure de base des dossiers

### ✅ Phase 2 - Système de Thème (Terminée)
- [x] Architecture interface/implémentation
- [x] Types TypeScript complets (ColorScale, Typography, Spacing)
- [x] Thème de base avec couleurs/typographie/espacement
- [x] Context React pour la gestion des thèmes
- [x] Persistance localStorage avec gestion SSR
- [x] Tests de validation du système

### ✅ Phase 3 - Architecture SOLID (Terminée)
- [x] Analyse et amélioration de l'architecture
- [x] Implémentation du principe d'inversion de dépendance (DIP)
- [x] Séparation des responsabilités (SRP)
- [x] Services d'abstraction pour le stockage
- [x] Pattern dependency injection

### 🔄 Phase 4 - Développement Fonctionnel (En cours)
- [ ] Composants de base réutilisables
- [ ] Pages principales de l'application
- [ ] Navigation et routing
- [ ] Gestion des états globaux
- [ ] Formulaires et validation

### 📋 Tâches Restantes

#### Priorité Haute
1. **Composants UI de base**
   - [ ] Button avec variantes de thème
   - [ ] Input/Form components
   - [ ] Card et Layout components
   - [ ] Navigation component

2. **Pages principales**
   - [ ] Dashboard/accueil fonctionnel
   - [ ] Page de paramètres avec sélecteur de thème
   - [ ] Pages d'erreur (404, 500)

3. **États et données**
   - [ ] Context pour la gestion d'état global
   - [ ] Services API (si nécessaire)
   - [ ] Gestion des erreurs

#### Priorité Moyenne
4. **Optimisation et performance**
   - [ ] Lazy loading des composants
   - [ ] Optimisation des images
   - [ ] Code splitting avancé

5. **Tests automatisés**
   - [ ] Configuration Jest/Testing Library
   - [ ] Tests unitaires des composants
   - [ ] Tests d'intégration
   - [ ] Tests E2E avec Playwright

#### Priorité Basse
6. **Documentation et qualité**
   - [ ] Documentation Storybook
   - [ ] Guide de contribution
   - [ ] CI/CD pipeline

## 🛠 Technologies Utilisées

- **Next.js 15** - Framework React avec Turbopack
- **React 19** - Bibliothèque UI moderne
- **TypeScript** - Typage statique
- **Tailwind CSS v4** - Framework CSS utilitaire
- **Lucide React** - Icônes modernes

## 🎨 Système de Thème

Le projet utilise un système de thème avancé avec :
- **Séparation interface/implémentation** pour la maintenabilité
- **Support thème sombre/clair** avec transition fluide
- **Persistance localStorage** avec gestion SSR
- **Types TypeScript complets** pour la sécurité
- **Architecture extensible** pour de futurs thèmes

## 📝 Notes de Développement

Ce README est un document vivant mis à jour régulièrement pour refléter l'état actuel et les prochaines étapes du projet. Chaque phase complétée est documentée avec les détails d'implémentation.
