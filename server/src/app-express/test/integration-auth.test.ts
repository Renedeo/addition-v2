import { afterAll, beforeAll, beforeEach, describe, it, expect } from '@jest/globals';
import { ExpressApp } from '../app';
import { TestUtils, TestUser } from './test.utils';

/**
 * Suite de tests d'intégration pour l'authentification
 * 
 * Tests couverts :
 * - Health check de l'API
 * - Inscription d'un nouvel utilisateur
 * - Connexion avec identifiants valides
 * - Gestion des erreurs d'authentification
 */
describe('API Auth Integration', () => {
    // Initialisation des instances de test
    const expressApp = new ExpressApp();
    const testUtils = new TestUtils(expressApp);
    
    // Données utilisateur pour les tests
    let testUser: TestUser;

    beforeAll(async () => {
        // Initialiser la connexion à la base de données
        await testUtils.initializeDatabase('tests d\'authentification');
    });

    beforeEach(async () => {
        // Nettoyer la base et créer un nouvel utilisateur de test
        await testUtils.cleanupTestUsers(['testuser_']);
        
        // Créer un utilisateur unique pour chaque test
        testUser = testUtils.createTestUser({
            nom: 'testuser_' + Date.now()
        });
        
        console.log('🧹 Base nettoyée et utilisateur de test préparé');
    });

    afterAll(async () => {
        // Nettoyer et fermer la connexion
        await testUtils.closeDatabase('tests d\'authentification');
    });

    /**
     * Test 1: Vérification du health check
     * Objectif: S'assurer que l'API répond correctement
     */
    it('should respond to health check', async () => {
        const res = await testUtils.makeRequest('get', '/health');
        testUtils.logResponse('Health check', res);
        
        expect(res.body).toHaveProperty('status', 'healthy');
    });

    /**
     * Test 2: Inscription d'un nouvel utilisateur
     * Objectif: Valider le processus d'inscription complet
     */
    it('should register a new user', async () => {
        console.log('Tentative d\'inscription avec:', testUser);

        const res = await testUtils.registerUser(testUser);
        testUtils.logResponse('Register', res);

        // Vérifications de l'inscription
        testUtils.expectSuccess(res, 201);
        expect(res.body.data).toHaveProperty('user');
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.data.user).toHaveProperty('nom', testUser.nom);
        expect(res.body.data.user).toHaveProperty('role', 'serveur');
    });

    /**
     * Test 3: Connexion avec identifiants valides
     * Objectif: Valider le processus de connexion après inscription
     */
    it('should login with valid credentials', async () => {
        // Étape 1: Créer un utilisateur
        const registerRes = await testUtils.registerUser(testUser);
        console.log('Pré-inscription pour login:', registerRes.status);

        // Étape 2: Tenter de se connecter
        const loginData = {
            nom: testUser.nom,
            motDePasse: testUser.motDePasse
        };

        console.log('Tentative de connexion avec:', loginData);
        const res = await testUtils.loginUser(loginData);
        testUtils.logResponse('Login', res);

        // Vérifications de la connexion
        testUtils.expectSuccess(res);
        expect(res.body.data).toHaveProperty('token');
        expect(res.body.data).toHaveProperty('user');
        expect(res.body.data.user).toHaveProperty('nom', testUser.nom);
    });
});