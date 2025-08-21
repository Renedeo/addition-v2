import { PrismaClient, TypeEtablissement, RoleUtilisateur, MomentMenu } from '@prisma/client';

const prisma = new PrismaClient();

async function testEnumsInSeedData() {
  console.log('🔍 Test des enums dans les données seed\n');

  try {
    // Test des TypeEtablissement
    console.log('📍 Test TypeEtablissement:');
    const restaurants = await prisma.etablissement.findMany({
      where: { type: TypeEtablissement.restaurant }
    });
    console.log(`✅ ${restaurants.length} restaurants trouvés`);
    restaurants.forEach(r => console.log(`   - ${r.nom} (${r.type})`));

    const cafes = await prisma.etablissement.findMany({
      where: { type: TypeEtablissement.cafe }
    });
    console.log(`✅ ${cafes.length} cafés trouvés`);
    cafes.forEach(c => console.log(`   - ${c.nom} (${c.type})`));

    // Test des RoleUtilisateur
    console.log('\n👤 Test RoleUtilisateur:');
    const admins = await prisma.utilisateur.findMany({
      where: { role: RoleUtilisateur.admin }
    });
    console.log(`✅ ${admins.length} admin(s) trouvé(s)`);
    admins.forEach(a => console.log(`   - ${a.nom} (${a.role})`));

    const managers = await prisma.utilisateur.findMany({
      where: { role: RoleUtilisateur.manager }
    });
    console.log(`✅ ${managers.length} manager(s) trouvé(s)`);
    managers.forEach(m => console.log(`   - ${m.nom} (${m.role})`));

    const serveurs = await prisma.utilisateur.findMany({
      where: { role: RoleUtilisateur.serveur }
    });
    console.log(`✅ ${serveurs.length} serveur(s) trouvé(s)`);
    serveurs.forEach(s => console.log(`   - ${s.nom} (${s.role})`));

    // Test des MomentMenu
    console.log('\n🍽️ Test MomentMenu:');
    const menusDejeuer = await prisma.menu.findMany({
      where: { moment: MomentMenu.dejeuner },
      include: { restauration: { include: { etablissement: true } } }
    });
    console.log(`✅ ${menusDejeuer.length} menu(s) déjeuner trouvé(s)`);
    menusDejeuer.forEach(m => console.log(`   - ${m.restauration.etablissement.nom} (${m.moment})`));

    const menusDiner = await prisma.menu.findMany({
      where: { moment: MomentMenu.diner },
      include: { restauration: { include: { etablissement: true } } }
    });
    console.log(`✅ ${menusDiner.length} menu(s) dîner trouvé(s)`);
    menusDiner.forEach(m => console.log(`   - ${m.restauration.etablissement.nom} (${m.moment})`));

    // Test de requête combinée avec plusieurs enums
    console.log('\n🔄 Test requête combinée:');
    const restaurantsAvecMenus = await prisma.etablissement.findMany({
      where: { 
        type: TypeEtablissement.restaurant,
        restaurations: {
          some: {
            menus: {
              some: {
                moment: MomentMenu.dejeuner,
                actif: true
              }
            }
          }
        }
      },
      include: {
        restaurations: {
          include: {
            menus: {
              where: { moment: MomentMenu.dejeuner, actif: true },
              include: { produits: true }
            }
          }
        }
      }
    });

    console.log(`✅ ${restaurantsAvecMenus.length} restaurant(s) avec menu déjeuner actif`);
    restaurantsAvecMenus.forEach(r => {
      console.log(`   - ${r.nom}`);
      r.restaurations.forEach(resto => {
        resto.menus.forEach(menu => {
          console.log(`     📋 Menu ${menu.moment}: ${menu.produits.length} produits`);
        });
      });
    });

    console.log('\n🎉 Tous les enums fonctionnent parfaitement !');

  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Exécuter le test
testEnumsInSeedData();
