import { CorsOptions } from 'cors';

/**
 * Configuration CORS pour l'application Express
 * Sécurise les requêtes cross-origin selon l'environnement
 */

// Domaines autorisés en production
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001', 
  'https://cugino.com',
  'https://www.cugino.com',
  'https://admin.cugino.com',
];

// Configuration développement (permissive)
const developmentCorsOptions: CorsOptions = {
  origin: true, // Autorise toutes les origines en dev
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'X-API-Key',
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Configuration production (restrictive)
const productionCorsOptions: CorsOptions = {
  origin: (origin, callback) => {
    // Autorise les requêtes sans origin (applications mobiles, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS: Origin non autorisée: ${origin}`);
      callback(new Error('Non autorisé par la politique CORS'), false);
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
  ],
  credentials: true,
  preflightContinue: false,
  optionsSuccessStatus: 200,
};

// Export de la configuration selon l'environnement
export const corsOptions: CorsOptions = 
  process.env.NODE_ENV === 'production' 
    ? productionCorsOptions 
    : developmentCorsOptions;

// Configuration spécifique pour les WebSockets (si nécessaire plus tard)
export const websocketCorsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : true,
  credentials: true,
};

console.log(`🌐 CORS configuré pour l'environnement: ${process.env.NODE_ENV || 'development'}`);
