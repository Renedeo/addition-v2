import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { PrismaClient } from '@prisma/client';

// Import des routes
import { utilisateurRoutes } from './routes/utilisateur.routes';
import { authRoutes } from './routes/auth.routes';

// Import des middlewares
import { errorHandler } from './middleware/error.middleware';
import { requestLogger } from './middleware/logger.middleware';
import { corsOptions } from './config/cors.config';

// Import des services et repositories
import { UtilisateurRepository, UtilisateurService } from '../implementations';

/**
 * Configuration de l'application Express
 * Intègre nos interfaces SOLID avec Express.js
 */
export class ExpressApp {
  public app: Application;
  private prisma: PrismaClient;

  // Services injectés
  private utilisateurRepository!: UtilisateurRepository;
  private utilisateurService!: UtilisateurService;

  constructor() {
    this.app = express();
    this.prisma = new PrismaClient();

    // Injection de dépendances
    this.initializeDependencies();

    // Configuration de l'application
    this.configureMiddlewares();
    this.configureRoutes();
    this.configureErrorHandling();
  }

  /**
   * Initialisation des dépendances (Dependency Injection)
   */
  private initializeDependencies(): void {
    console.log('🔧 Initialisation des dépendances...');

    // Repository layer
    this.utilisateurRepository = new UtilisateurRepository(this.prisma);

    // Service layer
    this.utilisateurService = new UtilisateurService(
      this.utilisateurRepository,
      process.env.JWT_SECRET || 'default-secret-key'
    );

    console.log('✅ Dépendances initialisées');
  }

  /**
   * Configuration des middlewares globaux
   */
  private configureMiddlewares(): void {
    console.log('🛡️ Configuration des middlewares...');

    // Sécurité de base
    this.app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));

    // CORS
    this.app.use(cors(corsOptions));

    // Compression
    this.app.use(compression());

    // Rate limiting
    const limiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100, // limite chaque IP à 100 requêtes par fenêtre
      message: {
        error: 'Trop de requêtes depuis cette IP, réessayez plus tard.',
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
    this.app.use('/api/', limiter);

    // Body parsers
    this.app.use(express.json({
      limit: '10mb',
    }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    // Logger personnalisé
    this.app.use(requestLogger);

    console.log('✅ Middlewares configurés');
  }

  /**
   * Configuration des routes
   */
  private configureRoutes(): void {
    console.log('🛣️ Configuration des routes...');

    // Route de santé
    this.app.get('/health', this.healthCheck.bind(this));

    // Route d'information de l'API
    this.app.get('/api', this.apiInfo.bind(this));

    // Routes d'authentification
    this.app.use('/api/auth', authRoutes(this.utilisateurService));

    // Routes des utilisateurs
    this.app.use('/api/utilisateurs', utilisateurRoutes(this.utilisateurService));

    // Route 404 pour les routes non trouvées
    this.app.use(this.notFoundHandler.bind(this));

    console.log('✅ Routes configurées');
  }

  /**
   * Configuration de la gestion d'erreurs
   */
  private configureErrorHandling(): void {
    console.log('Configuration de la gestion d\'erreurs...');

    // Middleware de gestion d'erreurs (doit être le dernier)
    this.app.use(errorHandler);

    console.log('Gestion d\'erreurs configurée');
  }

  /**
   * Health check endpoint
   */
  private async healthCheck(req: Request, res: Response): Promise<void> {
    try {
      // Vérifier la connexion à la base de données
      await this.prisma.$queryRaw`SELECT 1`;

      const healthStatus = {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected',
        memory: process.memoryUsage(),
        version: process.env.npm_package_version || '1.0.0',
      };

      res.status(200).json(healthStatus);
    } catch (error) {
      res.status(503).json({
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      });
    }
  }

  /**
   * API information endpoint
   */
  private apiInfo(req: Request, res: Response): void {
    const apiInfo = {
      name: 'Cugino Restaurant Management API',
      version: '1.0.0',
      description: 'API REST pour la gestion des restaurants Cugino',
      architecture: 'SOLID + Domain-Driven Design',
      endpoints: {
        health: '/health',
        auth: '/api/auth',
        users: '/api/utilisateurs',
      },
      documentation: '/api/docs',
      timestamp: new Date().toISOString(),
    };

    res.status(200).json(apiInfo);
  }

  /**
   * Gestionnaire pour les routes non trouvées
   */
  private notFoundHandler(req: Request, res: Response): void {
    res.status(404).json({
      error: 'Route non trouvée',
      message: `La route ${req.method} ${req.originalUrl} n'existe pas`,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Démarrage du serveur
   */
  public async start(port: number = 3000): Promise<void> {
    try {
      // Connexion à la base de données
      await this.prisma.$connect();
      console.log('✅ Connexion à la base de données établie');

      // Démarrage du serveur
      this.app.listen(port, () => {
        console.log('🚀 Serveur Cugino démarré !');
        console.log(`📍 URL: http://localhost:${port}`);
        console.log(`🏥 Health check: http://localhost:${port}/health`);
        console.log(`📚 API info: http://localhost:${port}/api`);
        console.log(`🔐 Auth: http://localhost:${port}/api/auth`);
        console.log(`👥 Users: http://localhost:${port}/api/utilisateurs`);
      });

    } catch (error) {
      console.error('❌ Erreur lors du démarrage:', error);
      await this.shutdown();
      process.exit(1);
    }
  }

  /**
   * Arrêt propre de l'application
   */
  public async shutdown(): Promise<void> {
    console.log('🛑 Arrêt du serveur...');

    try {
      await this.prisma.$disconnect();
      console.log('✅ Connexion à la base de données fermée');
    } catch (error) {
      console.error('❌ Erreur lors de la fermeture de la DB:', error);
    }
  }

  /**
   * Getter pour accéder aux services (pour les tests)
   */
  public getServices() {
    return {
      utilisateurService: this.utilisateurService,
      utilisateurRepository: this.utilisateurRepository,
      prisma: this.prisma,
    };
  }
}
