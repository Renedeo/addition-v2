// Test des imports d'enums depuis Prisma Client
import { 
  PrismaClient,
  TypeEtablissement,
  RoleUtilisateur,
  MomentMenu
} from '@prisma/client';

console.log('🔍 Test des enums importés depuis Prisma Client\n');

// 1. Vérification de TypeEtablissement
console.log('📍 TypeEtablissement:');
console.log('- RESTAURANT:', TypeEtablissement.restaurant);
console.log('- HOTEL:', TypeEtablissement.hotel);
console.log('- BAR:', TypeEtablissement.bar);
console.log('- CAFE:', TypeEtablissement.cafe);

// 2. Vérification de RoleUtilisateur
console.log('\n👤 RoleUtilisateur:');
console.log('- ADMIN:', RoleUtilisateur.admin);
console.log('- MANAGER:', RoleUtilisateur.manager);
console.log('- SERVEUR:', RoleUtilisateur.serveur);

// 3. Vérification de MomentMenu
console.log('\n🍽️ MomentMenu:');
console.log('- PETIT_DEJEUNER:', MomentMenu.petit_dejeuner);
console.log('- DEJEUNER:', MomentMenu.dejeuner);
console.log('- DINER:', MomentMenu.diner);
console.log('- BRUNCH:', MomentMenu.brunch);

// 4. Test d'utilisation des enums dans une requête
const prisma = new PrismaClient();

async function testEnumsInQuery() {
  try {
    console.log('\n🔄 Test d\'utilisation des enums dans une requête...');
    
    // Compter les établissements par type
    const countRestaurants = await prisma.etablissement.count({
      where: {
        type: TypeEtablissement.restaurant
      }
    });
    
    const countHotels = await prisma.etablissement.count({
      where: {
        type: TypeEtablissement.hotel
      }
    });
    
    console.log(`✅ Restaurants trouvés: ${countRestaurants}`);
    console.log(`✅ Hôtels trouvés: ${countHotels}`);
    
    // Test avec les rôles utilisateurs
    const countAdmins = await prisma.utilisateur.count({
      where: {
        role: RoleUtilisateur.admin
      }
    });
    
    console.log(`✅ Admins trouvés: ${countAdmins}`);
    
    // Test avec les moments de menu
    const menusActifs = await prisma.menu.findMany({
      where: {
        moment: MomentMenu.dejeuner,
        actif: true
      }
    });
    
    console.log(`✅ Menus déjeuner actifs: ${menusActifs.length}`);
    
  } catch (error) {
    console.error('❌ Erreur lors du test:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
testEnumsInQuery();
