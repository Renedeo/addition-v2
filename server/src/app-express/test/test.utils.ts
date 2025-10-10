import request from 'supertest';
import { Application } from 'express';
import { RoleUtilisateur } from '@prisma/client';
import { ExpressApp } from '../app';

/**
 * Interface pour les données utilisateur de test
 */
export interface TestUser {
    id?: number;
    nom: string;
    motDePasse: string;
    role: RoleUtilisateur | string;
    etablissementId: number;
}

/**
 * Interface pour les identifiants de connexion
 */
export interface LoginCredentials {
    nom: string;
    motDePasse: string;
}

/**
 * Classe utilitaire pour les tests d'intégration
 * Centralise toutes les fonctions communes aux tests
 */
export class TestUtils {
    private app: Application;
    private expressApp: ExpressApp;

    constructor(expressApp: ExpressApp) {
        this.expressApp = expressApp;
        this.app = expressApp.app;
    }

    /**
     * Crée une requête HTTP avec les headers appropriés
     * @param method - Méthode HTTP (get, post, put, delete)
     * @param url - URL de l'endpoint
     * @returns Requête configurée avec supertest
     */
    makeRequest(method: 'get' | 'post' | 'put' | 'delete', url: string) {
        return request(this.app)[method](url).set('Content-Type', 'application/json; charset=utf-8');
    }

    /**
     * Crée une requête authentifiée avec token Bearer
     * @param method - Méthode HTTP
     * @param url - URL de l'endpoint
     * @param token - Token d'authentification
     * @returns Requête configurée avec authentication
     */
    makeAuthenticatedRequest(method: 'get' | 'post' | 'put' | 'delete', url: string, token: string) {
        return this.makeRequest(method, url).set('Authorization', `Bearer ${token}`);
    }

    /**
     * Inscrit un nouvel utilisateur
     * @param userData - Données de l'utilisateur à créer
     * @returns Réponse de l'API d'inscription
     */
    async registerUser(userData: TestUser) {
        return await this.makeRequest('post', '/api/auth/register').send(userData);
    }

    /**
     * Connecte un utilisateur avec ses identifiants
     * @param credentials - Nom d'utilisateur et mot de passe
     * @returns Réponse de l'API de connexion
     */
    async loginUser(credentials: LoginCredentials) {
        return await this.makeRequest('post', '/api/auth/login').send(credentials);
    }

    /**
     * Inscrit un utilisateur et retourne ses données (token, id, etc.)
     * @param userData - Données de l'utilisateur
     * @returns Données utilisateur créé ou null en cas d'erreur
     */
    async registerAndGetData(userData: TestUser) {
        const res = await this.registerUser(userData);
        return res.status === 201 ? res.body.data : null;
    }

    /**
     * Connecte un utilisateur et retourne son token
     * @param credentials - Identifiants de connexion
     * @returns Token d'authentification ou null
     */
    async loginAndGetToken(credentials: LoginCredentials) {
        const res = await this.loginUser(credentials);
        return res.status === 200 ? res.body.data.token : null;
    }

    /**
     * Nettoie tous les utilisateurs de test de la base de données
     * @param prefixes - Préfixes des noms d'utilisateurs à supprimer
     */
    async cleanupTestUsers(prefixes: string[] = [
        'testuser_',
        'crud_user_',
        'admin_user_',
        'delete_me_',
        'updated_user_'
    ]) {
        const services = this.expressApp.getServices();
        if (services.prisma) {
            await services.prisma.utilisateur.deleteMany({
                where: {
                    OR: prefixes.map(prefix => ({ nom: { startsWith: prefix } }))
                }
            });
        }
    }

    /**
     * Initialise la connexion à la base de données pour les tests
     * @param testName - Nom du test pour les logs
     */
    async initializeDatabase(testName: string) {
        const services = this.expressApp.getServices();
        if (services.prisma) {
            try {
                await services.prisma.$connect();
                console.log(`✅ Base de données connectée pour ${testName}`);
            } catch (error) {
                console.error(`❌ Erreur de connexion à la base pour ${testName}:`, error);
                throw error;
            }
        }
    }

    /**
     * Ferme la connexion à la base de données après les tests
     * @param testName - Nom du test pour les logs
     */
    async closeDatabase(testName: string) {
        const services = this.expressApp.getServices();
        if (services.prisma) {
            try {
                await this.cleanupTestUsers();
                await services.prisma.$disconnect();
                console.log(`🔌 Connexion fermée après ${testName}`);
            } catch (error) {
                console.log(`⚠️ Erreur lors de la fermeture pour ${testName}:`, error);
            }
        }
    }

    /**
     * Crée un utilisateur de test avec des données par défaut
     * @param overrides - Propriétés à personnaliser
     * @returns Objet utilisateur de test
     */
    createTestUser(overrides: Partial<TestUser> = {}): TestUser {
        const timestamp = Date.now();
        return {
            nom: `testuser_${timestamp}`,
            motDePasse: 'TestPass123!',
            role: 'serveur' as RoleUtilisateur,
            etablissementId: 4,
            ...overrides
        };
    }

    /**
     * Crée un utilisateur admin de test
     * @param overrides - Propriétés à personnaliser
     * @returns Objet utilisateur admin de test
     */
    createAdminUser(overrides: Partial<TestUser> = {}): TestUser {
        return this.createTestUser({
            nom: `admin_user_${Date.now()}`,
            motDePasse: 'AdminPass123!',
            role: 'admin' as RoleUtilisateur,
            ...overrides
        });
    }

    /**
     * Vérifie qu'une réponse API est un succès
     * @param response - Réponse de l'API
     * @param expectedStatus - Code de statut attendu (défaut: 200)
     */
    expectSuccess(response: any, expectedStatus: number = 200) {
        expect(response.statusCode).toBe(expectedStatus);
        expect(response.body).toHaveProperty('success', true);
    }

    /**
     * Vérifie qu'une réponse API est une erreur
     * @param response - Réponse de l'API
     * @param expectedStatus - Code de statut d'erreur attendu
     */
    expectError(response: any, expectedStatus: number) {
        expect(response.statusCode).toBe(expectedStatus);
    }

    /**
     * Log les détails d'une réponse pour le debugging
     * @param operation - Nom de l'opération
     * @param response - Réponse de l'API
     */
    logResponse(operation: string, response: any) {
        console.log(`${operation} response:`, response.status, response.body);
        if (response.status >= 400) {
            console.error(`❌ Erreur lors de ${operation}:`, response.body);
        }
    }
}