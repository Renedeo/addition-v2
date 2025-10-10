# Application Express Cugino

## 🚀 Description

Application Express.js pour l'API REST du système de gestion de restaurant Cugino. Cette application intègre notre architecture SOLID avec Domain-Driven Design et propose une API sécurisée avec authentification JWT.

## 🏗️ Architecture

```
src/app-express/
├── app.ts                 # Configuration principale de l'application
├── server.ts              # Point d'entrée et démarrage du serveur
├── config/
│   └── cors.config.ts     # Configuration CORS
├── middleware/
│   ├── auth.middleware.ts # Authentification JWT
│   ├── error.middleware.ts# Gestion d'erreurs globale
│   └── logger.middleware.ts# Logging des requêtes
└── routes/
    ├── auth.routes.ts     # Routes d'authentification
    └── utilisateur.routes.ts# Routes des utilisateurs
```

## 🔧 Fonctionnalités

### Authentification & Autorisation
- ✅ JWT Authentication avec refresh tokens
- ✅ Middleware d'autorisation par rôles
- ✅ Protection contre les attaques courantes
- ✅ Rate limiting

### API Endpoints

#### Authentification (`/api/auth`)
- `POST /login` - Connexion utilisateur
- `POST /register` - Inscription utilisateur
- `POST /logout` - Déconnexion
- `POST /change-password` - Changement de mot de passe (auth requis)
- `GET /me` - Informations utilisateur connecté (auth requis)
- `POST /refresh` - Renouvellement de token (à implémenter)

#### Utilisateurs (`/api/utilisateurs`)
- `GET /` - Liste des utilisateurs (pagination)
- `GET /:id` - Détails d'un utilisateur
- `POST /` - Créer un utilisateur (admin/manager)
- `PUT /:id` - Modifier un utilisateur
- `DELETE /:id` - Supprimer un utilisateur (admin)
- `GET /role/:role` - Utilisateurs par rôle
- `GET /etablissement/:id` - Utilisateurs par établissement

### Sécurité
- 🔒 Hashing bcrypt des mots de passe
- 🔒 Validation JWT avec issuer/audience
- 🔒 CORS configuré par environnement
- 🔒 Helmet pour les en-têtes de sécurité
- 🔒 Rate limiting par IP
- 🔒 Sanitisation des logs (masquage des mots de passe)

### Monitoring & Logs
- 📊 Logging structuré avec niveaux
- 📊 Audit des opérations sensibles
- 📊 Monitoring des performances
- 📊 Health check endpoint

## 🚀 Démarrage

### Prérequis
- Node.js 18+
- PostgreSQL
- Base de données Prisma configurée

### Installation
```bash
# Installer les dépendances
npm install

# Générer les types Prisma
npm run db:generate

# Appliquer les migrations
npm run db:migrate
```

### Configuration
Copier `.env.example` vers `.env` et configurer :

```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/cugino_db"

# Serveur
PORT=3001
NODE_ENV=development

# JWT
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"

# Logs
LOG_LEVEL=debug
```

### Démarrage
```bash
# Mode développement avec hot reload
npm run dev:express

# Mode production
npm run build
npm run start:express
```

## 📡 Utilisation de l'API

### Authentification

1. **Connexion**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"nom": "admin", "motDePasse": "password123"}'
```

2. **Utilisation du token**
```bash
curl -H "Authorization: Bearer <your-jwt-token>" \
  http://localhost:3001/api/auth/me
```

### Endpoints utiles

- **Health Check**: `GET /health`
- **API Info**: `GET /api`
- **Documentation**: `GET /api/docs` (à implémenter)

## 🔍 Tests

```bash
# Vérification TypeScript
npm run type-check

# Tests unitaires (à implémenter)
npm run test

# Tests d'intégration (à implémenter)
npm run test:integration
```

## 🛠️ Développement

### Structure du code
- **Controllers**: Logique de présentation et validation des entrées
- **Middleware**: Authentification, autorisation, logging, erreurs
- **Routes**: Définition des endpoints et leur sécurité
- **Services**: Logique métier (importée de `../implementations/`)

### Principes suivis
- ✅ SOLID principles
- ✅ Domain-Driven Design
- ✅ Clean Architecture
- ✅ Dependency Injection
- ✅ Error Handling centralisé
- ✅ Logging structuré

### Ajout d'une nouvelle route

1. **Créer la route**
```typescript
// src/app-express/routes/example.routes.ts
export const exampleRoutes = (service: ExampleService): Router => {
  const router = Router();
  
  router.get('/', authMiddleware, asyncHandler(async (req, res) => {
    // Logique de la route
  }));
  
  return router;
};
```

2. **Intégrer dans app.ts**
```typescript
this.app.use('/api/example', exampleRoutes(this.exampleService));
```

## 🚨 Gestion d'erreurs

L'application utilise un système centralisé de gestion d'erreurs :

- `ValidationError` (400) - Erreurs de validation
- `AuthenticationError` (401) - Erreurs d'authentification
- `AuthorizationError` (403) - Erreurs d'autorisation
- `NotFoundError` (404) - Ressources introuvables
- `ConflictError` (409) - Conflits de données

## 📈 Performance

- **Rate Limiting**: 100 req/15min par IP
- **Compression**: Gzip activé
- **Caching**: En-têtes appropriés
- **Monitoring**: Logs des requêtes lentes (>1s)

## 🔮 Améliorations futures

- [ ] Swagger/OpenAPI documentation
- [ ] Tests automatisés complets
- [ ] Métriques Prometheus
- [ ] Logging structuré avec ELK
- [ ] Cache Redis
- [ ] Websockets pour temps réel
- [ ] Upload de fichiers
- [ ] Pagination avancée avec curseurs
- [ ] Filtrage et tri complexes
- [ ] Versionning de l'API (v1, v2)

## 📝 Logs

### Niveaux de log
- `error`: Erreurs serveur (5xx)
- `warn`: Erreurs client (4xx), requêtes lentes
- `info`: Requêtes normales
- `debug`: Détails techniques

### Monitoring des événements
- `USER_LOGIN` - Connexions utilisateur
- `USER_REGISTER` - Inscriptions
- `PASSWORD_CHANGE` - Changements de mot de passe
- `USER_CREATE/UPDATE/DELETE` - Gestion des utilisateurs
- `SLOW_REQUEST` - Requêtes lentes
- `AUTH_FAILURE` - Échecs d'authentification

## 🤝 Contribution

1. Respecter l'architecture SOLID existante
2. Ajouter des tests pour les nouvelles fonctionnalités
3. Documenter les nouveaux endpoints
4. Suivre les conventions de nommage TypeScript
5. Gérer les erreurs avec les classes appropriées
