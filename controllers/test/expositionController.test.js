
import { getExpositions, getExposition, addExposition, updateExposition, deleteExposition } from '../expositionController.js'

import ExpositionModele from '../../models/expositionModele.js';
  
jest.mock('../../models/expositionModele.js');
  
describe('expositionController', () => {
    let req, res;
  
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });
  
    describe('getExpositions', () => {
        it('Devrait renvoyer toutes les expositions', async () => {
            const expositions = [{ nom: 'Exposition 1' }, { nom: 'Exposition 2' }];
            ExpositionModele.find.mockResolvedValueOnce(expositions);
  
            await getExpositions(req, res);
  
            expect(ExpositionModele.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(expositions);
        });

        it('Devrait renvoyer une erreur 500 si la recherche échoue', async () => {
            const erreur = new Error('Erreur de recherche');
            ExpositionModele.find.mockRejectedValueOnce(erreur);
  
            await getExpositions(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ExpositionController - Une erreur s'est produite lors de la récupération des expositions"});
        });

        it('Devrait renvoyer une erreur 400 si il y a une erreur de syntaxe dans la requête', async () => {
            const erreur = new Error('Erreur de syntaxe');
            ExpositionModele.find.mockRejectedValueOnce(erreur);
    
            await getExpositions(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ExpositionController - Une erreur s'est produite lors de la récupération des expositions"});
        });
    });
  
    describe('getExposition', () => {
        it('Devrait renvoyer une exposition par ID', async () => {
            req.params = { expositionId: '123' };
            const exposition = { nom: 'Exposition 1' };
            ExpositionModele.findOne.mockResolvedValueOnce(exposition);
  
            await getExposition(req, res);
  
            expect(ExpositionModele.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.send).toHaveBeenCalledWith(exposition);
        });

        it('Devrait renvoyer une erreur si la recherche échoue', async () => {
            req.params = { expositionId: '123' };
            const erreur = new Error('Erreur de recherche');
            ExpositionModele.findOne.mockRejectedValueOnce(erreur);
  
            await getExposition(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ExpositionController - Une erreur s'est produite lors de la récupération de l'exposition" });
        });
    });

    describe('addExposition', () => {
        it("Devrait créer une nouvelle exposition avec succès", async () => {
            const req = { body: { nom: 'Nouvelle exposition' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler l'absence de l'exposition dans la base de données
            ExpositionModele.findOne.mockResolvedValueOnce(null);
    
            await addExposition(req, res);
    
            expect(ExpositionModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvelle exposition' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Une nouvelle exposition a été créée avec succès." });
        });
        
    
        it("Devrait renvoyer une erreur 404 si l'exposition existe déjà", async () => {
            const req = { body: { nom: 'Exposition existant' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler la présence de l'exposition dans la base de données
            ExpositionModele.findOne.mockResolvedValueOnce({ nom: 'Exposition existant' });
    
            await addExposition(req, res);
    
            expect(ExpositionModele.findOne).toHaveBeenCalledWith({ nom: 'Exposition existant' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'exposition spécifiée est déja existante." });
        });
    
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
            const req = { body: { nom: 'Nouvelle exposition' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const erreur = new Error('Erreur interne du serveur');
    
            // Mock de la méthode findOne pour simuler une erreur interne du serveur
            ExpositionModele.findOne.mockRejectedValueOnce(erreur);
    
            await addExposition(req, res);
    
            expect(ExpositionModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvelle exposition' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de l'ajout de la nouvelle exposition." });
        });
    });
    

    describe('updateExposition', () => {
        it('devrait mettre à jour une exposition existante', async () => {
            const expositionId = '123';
            const nom = 'Nouveau nom';
    
            const expositionExistante = {
                _id: expositionId,
                nom: 'Ancien nom',
                save: jest.fn()
            };
    
            ExpositionModele.findById.mockResolvedValueOnce(expositionExistante);
    
            const req = { params: { expositionId }, body: { nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateExposition(req, res);
    
            expect(ExpositionModele.findById).toHaveBeenCalledWith(expositionId);
            expect(expositionExistante.nom).toBe(nom);
            expect(expositionExistante.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'exposition a été modifiée avec succès." });
        });
    
        it("Devrait renvoyer une erreur si l'exposition spécifié n'existe pas", async () => {
            const expositionId = '123';
            const req = { params: { expositionId }, body: { nom: 'Nouveau nom' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            ExpositionModele.findById.mockResolvedValueOnce(null);
    
            await updateExposition(req, res);
    
            expect(ExpositionModele.findById).toHaveBeenCalledWith(expositionId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'exposition spécifié n'existe pas." });
        });
    
        it("Devrait renvoyer une erreur en cas d'erreur interne du serveur", async () => {
            const expositionId = '123';
            const nom = 'Nouveau nom';
            const erreur = new Error('Erreur interne du serveur');
            jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionner console.error

            ExpositionModele.findById.mockRejectedValueOnce(erreur);
    
            const req = { params: { expositionId }, body: { nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateExposition(req, res);
    
            expect(ExpositionModele.findById).toHaveBeenCalledWith(expositionId);
            expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite lors de la modification de l'exposition :", erreur);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la modification de l'exposition." });
        });
    });  

    describe('deleteExposition', () => {

        it("Devrait supprimer l'exposition avec succès", async () => {
            // Données de test
            const expositionId = '3h0ld8n';
            const expositionASupprimer = { _id: expositionId, nom: 'Exposition à supprimer' };
        
            // Mock de la fonction findById pour retourner l'exposition à supprimer
            ExpositionModele.findById.mockResolvedValueOnce(expositionASupprimer);
        
            // Requête mockée avec l'ID de l'exposition à supprimer
            const req = { params: { expositionId } };
        
            // Mock de la fonction findByIdAndDelete
            ExpositionModele.findByIdAndDelete.mockResolvedValueOnce(expositionASupprimer);
        
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Appel de la fonction à tester
            await deleteExposition(req, res);
        
            // Vérifications
            expect(ExpositionModele.findById).toHaveBeenCalledWith(expositionId);
            expect(ExpositionModele.findByIdAndDelete).toHaveBeenCalledWith(expositionId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'exposition a été supprimée avec succès." });
        });           
    
        // Test de non-existence de l'exposition
        it("Devrait renvoyer une erreur 404 si l'exposition spécifié n'existe pas", async () => {

            ExpositionModele.findById.mockResolvedValueOnce(null);
    
            // Requête mockée avec une exposition inexistante
            const req = { params: { expositionId: 'id_inexistant' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteExposition(req, res);
    
            // Vérification du statut 404 et du message approprié
            expect(ExpositionModele.findById).toHaveBeenCalledWith('id_inexistant');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'exposition spécifié n'existe pas." });
        });
    
        // Test d'erreur lors de la suppression de l'exposition
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
    
            // Mock de la fonction findById pour générer une erreur
            ExpositionModele.findById.mockRejectedValueOnce(new Error('Erreur de base de données'));
    
            // Requête mockée avec un ID générant une erreur
            const req = { params: { expositionId: 'id_erreur' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteExposition(req, res);
    
            // Vérification du statut 500 et du message approprié
            expect(ExpositionModele.findById).toHaveBeenCalledWith('id_erreur');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la suppression de l'exposition." });
        });
    })   
});


   
