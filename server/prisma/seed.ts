import { PrismaClient, MomentMenu, TypeEtablissement, RoleUtilisateur } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  console.log('🌱 Début du seeding...');

  // Nettoyage des données existantes
  await prisma.produit.deleteMany();
  await prisma.menu.deleteMany();
  await prisma.utilisateur.deleteMany();
  await prisma.restauration.deleteMany();
  await prisma.etablissement.deleteMany();

  // Insertion d'établissements de test
  const etablissements = await prisma.etablissement.createMany({
    data: [
      {
        type: TypeEtablissement.restaurant,
        nom: 'Cugino Centrale',
        information: 'Restaurant italien traditionnel au cœur de la ville'
      },
      {
        type: TypeEtablissement.restaurant,
        nom: 'Cugino Marina',
        information: 'Restaurant avec vue sur le port'
      },
      {
        type: TypeEtablissement.cafe,
        nom: 'Cugino Café',
        information: 'Café-bar décontracté pour petit-déjeuner et pause'
      }
    ]
  });

  // Récupération des IDs des établissements
  const etablissementsList = await prisma.etablissement.findMany();
  const [cugino1, cugino2] = etablissementsList;

  // Insertion de restaurations
  const restaurations = await prisma.restauration.createMany({
    data: [
      {
        etablissementId: cugino1.id,
        typeCuisine: 'italienne',
        capacite: 80,
        horairesOuverture: {
          lundi: '11:00-22:00',
          mardi: '11:00-22:00',
          mercredi: '11:00-22:00',
          jeudi: '11:00-22:00',
          vendredi: '11:00-23:00',
          samedi: '11:00-23:00',
          dimanche: '12:00-21:00'
        },
        telephone: '+33 1 42 34 56 78'
      },
      {
        etablissementId: cugino2.id,
        typeCuisine: 'méditerranéenne',
        capacite: 120,
        horairesOuverture: {
          lundi: '12:00-22:30',
          mardi: '12:00-22:30',
          mercredi: '12:00-22:30',
          jeudi: '12:00-22:30',
          vendredi: '12:00-23:30',
          samedi: '12:00-23:30',
          dimanche: '12:00-22:00'
        },
        telephone: '+33 1 43 45 67 89'
      }
    ]
  });

  // Récupération des restaurations
  const restaurationsList = await prisma.restauration.findMany();
  const [resto1, resto2] = restaurationsList;

  // Insertion d'utilisateurs
  await prisma.utilisateur.createMany({
    data: [
      {
        role: RoleUtilisateur.admin,
        nom: 'Marco Rossi',
        motDePasseHash: '$2b$10$dummy.hash.for.admin.user',
        etablissementId: cugino1.id
      },
      {
        role: RoleUtilisateur.manager,
        nom: 'Sofia Bianchi',
        motDePasseHash: '$2b$10$dummy.hash.for.manager.user',
        etablissementId: cugino1.id
      },
      {
        role: RoleUtilisateur.serveur,
        nom: 'Luca Verdi',
        motDePasseHash: '$2b$10$dummy.hash.for.serveur.user',
        etablissementId: cugino1.id
      },
      {
        role: RoleUtilisateur.manager,
        nom: 'Elena Russo',
        motDePasseHash: '$2b$10$dummy.hash.for.manager.user',
        etablissementId: cugino2.id
      },
      {
        role: RoleUtilisateur.serveur,
        nom: 'Antonio Neri',
        motDePasseHash: '$2b$10$dummy.hash.for.serveur.user',
        etablissementId: cugino2.id
      }
    ]
  });

  const menusData = [
    { moment: MomentMenu.dejeuner, restaurationId: resto1.id, actif: true },
    { moment: MomentMenu.diner, restaurationId: resto1.id, actif: true },
    { moment: MomentMenu.dejeuner, restaurationId: resto2.id, actif: true },
    { moment: MomentMenu.diner, restaurationId: resto2.id, actif: true }
  ];

  const menus: Awaited<ReturnType<typeof prisma.menu.create>>[] = [];
  for (const menuData of menusData) {
    const menu = await prisma.menu.create({ data: menuData });
    menus.push(menu);
  }

  // Insertion de produits
  const produitsData = [
    // Menu déjeuner Cugino Centrale (menus[0])
    {
      nom: 'Spaghetti Carbonara',
      prix: 14.50,
      description: 'Spaghetti aux œufs, lardons et parmesan',
      categories: ['pâtes', 'plat principal'],
      menuId: menus[0].id
    },
    {
      nom: 'Pizza Margherita',
      prix: 12.00,
      description: 'Tomate, mozzarella, basilic frais',
      categories: ['pizza', 'plat principal'],
      menuId: menus[0].id
    },
    {
      nom: 'Salade César',
      prix: 9.50,
      description: 'Salade romaine, croûtons, parmesan, sauce césar',
      categories: ['salade', 'entrée'],
      menuId: menus[0].id
    },
    {
      nom: 'Tiramisu',
      prix: 6.00,
      description: 'Dessert italien traditionnel au café',
      categories: ['dessert', 'sucré'],
      menuId: menus[0].id
    },
    // Menu dîner Cugino Centrale (menus[1])
    {
      nom: 'Risotto aux champignons',
      prix: 16.00,
      description: 'Risotto crémeux aux cèpes et champignons de saison',
      categories: ['riz', 'plat principal'],
      menuId: menus[1].id
    },
    {
      nom: 'Osso Buco',
      prix: 22.00,
      description: 'Jarret de veau braisé à la milanaise',
      categories: ['viande', 'plat principal'],
      menuId: menus[1].id
    }
  ];

  await prisma.produit.createMany({ data: produitsData });

  console.log('✅ Seeding terminé avec succès!');
  console.log(`📊 Créé: ${etablissements.count} établissements, ${restaurations.count} restaurations, 5 utilisateurs, 4 menus, ${produitsData.length} produits`);
}

main()
  .catch((e) => {
    console.error('❌ Erreur durant le seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
