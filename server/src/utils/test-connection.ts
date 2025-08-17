import prisma from '../config/database';

/**
 * Test de connexion à la base de données PostgreSQL via Prisma
 */
export async function testConnection(): Promise<boolean> {
  try {
    console.log('🔍 Test de connexion à la base de données...\n');
    
    // Test de la connexion
    await prisma.$connect();
    console.log('✅ Connexion à la base de données établie avec succès.');
    
    // Test d'une requête simple
    const result = await prisma.$queryRaw`SELECT version() as version, current_database() as database`;
    const dbInfo = result as Array<{ version: string; database: string }>;
    
    console.log('📊 Informations de connexion:');
    console.log(`   - Version PostgreSQL: ${dbInfo[0].version.split(' ')[1]}`);
    console.log(`   - Base de données actuelle: ${dbInfo[0].database}`);
    console.log(`   - Environnement: ${process.env.NODE_ENV || 'development'}\n`);
    
    // Test de comptage des tables
    const etablissements = await prisma.etablissement.count();
    const restaurations = await prisma.restauration.count();
    const utilisateurs = await prisma.utilisateur.count();
    const menus = await prisma.menu.count();
    const produits = await prisma.produit.count();
    
    console.log('🎯 Statistiques des données:');
    console.log(`   - Établissements: ${etablissements}`);
    console.log(`   - Restaurations: ${restaurations}`);
    console.log(`   - Utilisateurs: ${utilisateurs}`);
    console.log(`   - Menus: ${menus}`);
    console.log(`   - Produits: ${produits}\n`);
    
    console.log('✅ Tous les tests de connexion sont passés avec succès!');
    return true;
    
  } catch (error) {
    console.error('❌ Erreur lors du test de connexion:', error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

// Exécution du test si ce fichier est appelé directement
if (require.main === module) {
  testConnection();
}
