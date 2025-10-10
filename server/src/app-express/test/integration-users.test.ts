import { afterAll, beforeAll, beforeEach, describe, it, expect } from '@jest/globals';
import { RoleUtilisateur } from '@prisma/client';
import { ExpressApp } from '../app';
import { TestUtils, TestUser } from './test.utils';

/**
 * Suite de tests d'intégration pour les opérations CRUD des utilisateurs
 * 
 * Tests couverts :
 * - Récupération d'un utilisateur par ID (GET /api/utilisateurs/:id)
 * - Mise à jour d'un utilisateur (PUT /api/utilisateurs/:id)
 * - Suppression d'un utilisateur (DELETE /api/utilisateurs/:id)
 * - Liste des utilisateurs (GET /api/utilisateurs)
 * - Changement de mot de passe (POST /api/auth/change-password)
 * - Tests d'autorisation et de validation
 */
describe('API Users CRUD Integration', () => {
    // Initialisation des instances de test
    const expressApp = new ExpressApp();
    const testUtils = new TestUtils(expressApp);
    
    // Tokens et IDs des utilisateurs de test
    let authToken: string;
    let adminToken: string;
    let testUserId: number;
    let adminUserId: number;
    
    // Données des utilisateurs de test
    let testUser: TestUser;
    let adminUser: TestUser;

    beforeAll(async () => {
        // Initialiser la connexion à la base de données
        await testUtils.initializeDatabase('tests CRUD utilisateurs');
    });

    beforeEach(async () => {
        // Nettoyer la base et préparer les utilisateurs de test
        await testUtils.cleanupTestUsers();

        // Créer des utilisateurs uniques pour chaque test
        testUser = testUtils.createTestUser({
            nom: 'crud_user_' + Date.now()
        });
        
        adminUser = testUtils.createAdminUser({
            nom: 'admin_user_' + Date.now()
        });

        try {
            // Créer et récupérer les données de l'admin
            const adminData = await testUtils.registerAndGetData(adminUser);
            if (adminData) {
                adminToken = adminData.token;
                adminUserId = adminData.user.id;
            }

            // Créer et récupérer les données de l'utilisateur normal
            const userData = await testUtils.registerAndGetData(testUser);
            if (userData) {
                authToken = userData.token;
                testUserId = userData.user.id;
            }

            console.log('🧹 Base nettoyée et utilisateurs de test créés');
        } catch (error) {
            console.log('⚠️ Erreur lors de la préparation:', error);
        }
    });

    afterAll(async () => {
        // Nettoyer et fermer la connexion
        await testUtils.closeDatabase('tests CRUD utilisateurs');
    });

    /**
     * Tests de récupération d'utilisateur par ID
     * Couvre : authentification, autorisation, utilisateur inexistant
     */
    describe('GET /api/utilisateurs/:id', () => {
        /**
         * Test : Récupération réussie avec token valide
         * Vérification : données utilisateur retournées correctement
         */
        it('should get user by id with valid token', async () => {
            const res = await testUtils.makeAuthenticatedRequest('get', `/api/utilisateurs/${testUserId}`, authToken)
                .send({ user: { id: testUserId } });

            testUtils.logResponse('Get user by ID', res);

            testUtils.expectSuccess(res);
            expect(res.body.data).toHaveProperty('user');
            expect(res.body.data.user).toHaveProperty('id', testUserId);
            expect(res.body.data.user).toHaveProperty('nom', testUser.nom);
            expect(res.body.data.user).toHaveProperty('role', testUser.role);
        });

        /**
         * Test : Accès non autorisé sans token
         * Vérification : erreur 401 retournée
         */
        it('should return 401 without authorization token', async () => {
            const res = await testUtils.makeRequest('get', `/api/utilisateurs/${testUserId}`);
            testUtils.expectError(res, 401);
        });

        /**
         * Test : Utilisateur inexistant
         * Vérification : erreur 404 retournée
         */
        it('should return 404 for non-existent user', async () => {
            const res = await testUtils.makeAuthenticatedRequest('get', '/api/utilisateurs/99999', adminToken);
            testUtils.expectError(res, 404);
        });
    });

    /**
     * Tests de mise à jour d'utilisateur
     * Couvre : validation des données, autorisation, authentification
     */
    describe('PUT /api/utilisateurs/:id', () => {
        /**
         * Test : Mise à jour réussie avec données valides
         * Vérification : utilisateur mis à jour correctement
         */
        it('should update user with valid data', async () => {
            const updateData = { nom: 'updated_user_' + Date.now() };

            const res = await testUtils.makeAuthenticatedRequest('put', `/api/utilisateurs/${testUserId}`, authToken)
                .send(updateData);

            testUtils.logResponse('Update user', res);

            testUtils.expectSuccess(res);
            expect(res.body.data).toHaveProperty('user');
            expect(res.body.data.user).toHaveProperty('nom', updateData.nom);
        });

        /**
         * Test : Validation des données invalides
         * Vérification : erreur 400 pour nom vide
         */
        it('should return 400 for invalid data', async () => {
            const invalidData = { nom: '' }; // Nom vide

            const res = await testUtils.makeAuthenticatedRequest('put', `/api/utilisateurs/${testUserId}`, authToken)
                .send(invalidData);

            testUtils.expectError(res, 400);
        });

        /**
         * Test : Accès non autorisé sans token
         * Vérification : erreur 401 retournée
         */
        it('should return 401 without authorization token', async () => {
            const updateData = { nom: 'new_name' };

            const res = await testUtils.makeRequest('put', `/api/utilisateurs/${testUserId}`)
                .send(updateData);

            testUtils.expectError(res, 401);
        });
    });

    /**
     * Tests de suppression d'utilisateur
     * Couvre : privilèges admin, autorisation, authentification
     */
    describe('DELETE /api/utilisateurs/:id', () => {
        /**
         * Test : Suppression réussie avec privilèges admin
         * Vérification : utilisateur supprimé correctement
         */
        it('should delete user with admin privileges', async () => {
            // Créer un utilisateur à supprimer
            const userToDelete = testUtils.createTestUser({
                nom: 'delete_me_' + Date.now(),
                motDePasse: 'DeleteMe123!'
            });

            const userData = await testUtils.registerAndGetData(userToDelete);
            const userIdToDelete = userData?.user.id;

            // Tenter de supprimer avec token admin
            const res = await testUtils.makeAuthenticatedRequest('delete', `/api/utilisateurs/${userIdToDelete}`, adminToken);

            testUtils.logResponse('Delete user', res);

            testUtils.expectSuccess(res);
        });

        /**
         * Test : Accès refusé pour utilisateur non-admin
         * Vérification : erreur 403 retournée
         */
        it('should return 403 for non-admin user trying to delete', async () => {
            const res = await testUtils.makeAuthenticatedRequest('delete', `/api/utilisateurs/${adminUserId}`, authToken);
            testUtils.expectError(res, 403);
        });

        /**
         * Test : Accès non autorisé sans token
         * Vérification : erreur 401 retournée
         */
        it('should return 401 without authorization token', async () => {
            const res = await testUtils.makeRequest('delete', `/api/utilisateurs/${testUserId}`);
            testUtils.expectError(res, 401);
        });
    });

    /**
     * Tests de liste des utilisateurs
     * Couvre : privilèges admin, pagination, autorisation
     */
    describe('GET /api/utilisateurs', () => {
        /**
         * Test : Liste réussie avec privilèges admin
         * Vérification : liste d'utilisateurs retournée
         */
        it('should list users with admin privileges', async () => {
            const res = await testUtils.makeAuthenticatedRequest('get', '/api/utilisateurs', adminToken);

            testUtils.logResponse('List users', res);

            testUtils.expectSuccess(res);
            expect(res.body.data).toHaveProperty('utilisateurs');
            expect(Array.isArray(res.body.data.utilisateurs)).toBe(true);
            expect(res.body.data.utilisateurs.length).toBeGreaterThan(0);
        });

        /**
         * Test : Accès refusé pour utilisateur non-admin
         * Vérification : erreur 403 retournée
         */
        it('should return 403 for non-admin user', async () => {
            const res = await testUtils.makeAuthenticatedRequest('get', '/api/utilisateurs', authToken);
            testUtils.expectError(res, 403);
        });
    });

    /**
     * Tests de changement de mot de passe
     * Couvre : validation, authentification, sécurité
     */
    describe('Password Change', () => {
        /**
         * Test : Changement réussi avec mot de passe actuel valide
         * Vérification : mot de passe mis à jour
         */
        it('should change password with valid current password', async () => {
            const passwordData = {
                currentPassword: testUser.motDePasse,
                newPassword: 'NewTestPass123!'
            };

            const res = await testUtils.makeAuthenticatedRequest('post', '/api/auth/change-password', authToken)
                .send(passwordData);

            testUtils.logResponse('Change password', res);

            testUtils.expectSuccess(res);
        });

        /**
         * Test : Échec avec mot de passe actuel invalide
         * Vérification : erreur 401 retournée
         */
        it('should return 401 with invalid current password', async () => {
            const passwordData = {
                currentPassword: 'WrongPassword123!',
                newPassword: 'NewTestPass123!'
            };

            const res = await testUtils.makeAuthenticatedRequest('post', '/api/auth/change-password', authToken)
                .send(passwordData);

            testUtils.expectError(res, 401);
        });
    });
});