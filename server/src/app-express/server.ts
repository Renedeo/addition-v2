import dotenv from 'dotenv';
import { ExpressApp } from './app';

// Charger les variables d'environnement
dotenv.config();

/**
 * Point d'entrée principal de l'application Cugino
 */
async function startServer() {
  try {
    console.log('🚀 Démarrage de l\'application Cugino...');
    
    // Créer l'instance de l'application
    const app = new ExpressApp();
    
    // Port depuis les variables d'environnement ou défaut
    const port = parseInt(process.env.PORT || '3001');
    
    // Démarrer le serveur
    await app.start(port);
    
    // Gestionnaire d'arrêt propre
    process.on('SIGTERM', async () => {
      console.log('📴 Signal SIGTERM reçu, arrêt en cours...');
      await app.shutdown();
      process.exit(0);
    });
    
    process.on('SIGINT', async () => {
      console.log('📴 Signal SIGINT reçu, arrêt en cours...');
      await app.shutdown();
      process.exit(0);
    });
    
  } catch (error) {
    console.error('❌ Erreur fatale lors du démarrage:', error);
    process.exit(1);
  }
}

// Démarrer l'application
if (require.main === module) {
  startServer();
}

export { startServer };
