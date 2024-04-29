import {
    getParasites,
    getParasite,
    addParasite,
    updateParasite,
    deleteParasite
} from '../parasiteController.js';

import ParasiteModele from '../../models/parasiteModele.js';


jest.mock('../../models/parasiteModele.js');

describe('parasiteController', () => {
    let req, res;

    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getParasites', () => {
        it('Devrait renvoyer tous les parasites', async () => {
            const parasites = [{ nom: 'Parasite 1', description: "description1", contre_attaque: "contre_attaque1" }, { nom: 'Parasite 2', description: "description2", contre_attaque: "contre_attaque2" }];
            ParasiteModele.find.mockResolvedValueOnce(parasites);
    
            await getParasites(req, res);
    
            expect(ParasiteModele.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(parasites);
        });
    
        it('Devrait renvoyer une erreur 500 si la recherche échoue', async () => {
            const erreur = new Error('Erreur de recherche');
            ParasiteModele.find.mockRejectedValueOnce(erreur);
    
            await getParasites(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ParasiteController - Une erreur s'est produite lors de la récupération des parasites"});
        });

        it('Devrait renvoyer une erreur 400 si il y a une erreur de syntaxe dans la requête', async () => {
            const erreur = new Error('Erreur de syntaxe');
            ParasiteModele.find.mockRejectedValueOnce(erreur);
    
            await getParasites(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ParasiteController - Une erreur s'est produite lors de la récupération des parasites"});
        });
    });

    describe('getParasite', () => {
        it('Devrait renvoyer un parasite par ID', async () => {
            req.params = { parasiteId: '123' };
            const parasite = { nom: 'Parasite 1' };
            ParasiteModele.findOne.mockResolvedValueOnce(parasite);
  
            await getParasite(req, res);
  
            expect(ParasiteModele.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.send).toHaveBeenCalledWith(parasite);
        });

        it('Devrait renvoyer une erreur si la recherche échoue', async () => {
            req.params = { parasiteId: '123' };
            const erreur = new Error('Erreur de recherche');
            ParasiteModele.findOne.mockRejectedValueOnce(erreur);
  
            await getParasite(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "ParasiteController - Une erreur s'est produite lors de la récupération du parasite" });
        });
    });

    describe('addParasite', () => {
        it("Devrait créer un nouveau parasite avec succès", async () => {
            const req = { body: { nom: 'Nouveau parasite' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler l'absence de Le parasite dans la base de données
            ParasiteModele.findOne.mockResolvedValueOnce(null);
    
            await addParasite(req, res);
    
            expect(ParasiteModele.findOne).toHaveBeenCalledWith({ nom: 'Nouveau parasite' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Un nouveau parasite a été créé avec succès." });
        });
    
        it("Devrait renvoyer une erreur 404 si le parasite existe déjà", async () => {
            const req = { body:{ nom: 'Nouveau parasite' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler la présence de Le parasite dans la base de données
            ParasiteModele.findOne.mockResolvedValueOnce({ nom: 'Nouveau parasite' });
    
            await addParasite(req, res);
    
            expect(ParasiteModele.findOne).toHaveBeenCalledWith({ nom: 'Nouveau parasite' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Le parasite spécifié est déja existant." });
        });
    
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
            const req = { body: { nom: 'Nouveau parasite' }};
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const erreur = new Error('Erreur interne du serveur');
    
            // Mock de la méthode findOne pour simuler une erreur interne du serveur
            ParasiteModele.findOne.mockRejectedValueOnce(erreur);
    
            await addParasite(req, res);
    
            expect(ParasiteModele.findOne).toHaveBeenCalledWith({ nom: 'Nouveau parasite' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de l'ajout du nouveau parasite." });
        });
    });

    describe('updateParasite', () => {
        it('devrait mettre à jour un parasite existant', async () => {
            const parasiteId = '123';
            const nouveau_nom = 'Nouveau nom';
        
            const parasiteExistant = {
                _id: parasiteId,
                nom: 'Ancien nom',
                save: jest.fn()
            };
        
            ParasiteModele.findById.mockResolvedValueOnce(parasiteExistant);

            const req = { params: { parasiteId }, body: { nom: nouveau_nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            await updateParasite(req, res);
        
            expect(ParasiteModele.findById).toHaveBeenCalledWith(parasiteId);
            expect(parasiteExistant.nom).toBe(nouveau_nom);
            expect(parasiteExistant.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Le parasite a été modifié avec succès." });
        });
        
    
        it("Devrait renvoyer une erreur si le parasite spécifié n'existe pas", async () => {
            const parasiteId = '123';
            const req = { params: { parasiteId }, body: { nom: 'Nouveau nom' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            ParasiteModele.findById.mockResolvedValueOnce(null);
    
            await updateParasite(req, res);
    
            expect(ParasiteModele.findById).toHaveBeenCalledWith(parasiteId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Le parasite spécifié n'existe pas." });
        });
    
        it("Devrait renvoyer une erreur en cas d'erreur interne du serveur", async () => {
            const parasiteId = '123';
            const nom = 'Nouveau nom';
            const erreur = new Error('Erreur interne du serveur');
            jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionner console.error

            ParasiteModele.findById.mockRejectedValueOnce(erreur);
    
            const req = { params: { parasiteId }, body: { nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateParasite(req, res);
    
            expect(ParasiteModele.findById).toHaveBeenCalledWith(parasiteId);
            expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite lors de la modification du parasite :", erreur);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la modification du parasite." });
        });
    });  

    describe('deleteParasite', () => {

        it("Devrait supprimer le parasite avec succès", async () => {
            // Données de test
            const parasiteId = '3h0ld8n';
            const parasiteASupprimer = { _id: parasiteId, nom: 'Parasite à supprimer' };
        
            // Mock de la fonction findById pour retourner le parasite à supprimer
            ParasiteModele.findById.mockResolvedValueOnce(parasiteASupprimer);
        
            // Requête mockée avec l'ID de le parasite à supprimer
            const req = { params: { parasiteId } };
        
            // Mock de la fonction findByIdAndDelete
            ParasiteModele.findByIdAndDelete.mockResolvedValueOnce(parasiteASupprimer);
        
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Appel de la fonction à tester
            await deleteParasite(req, res);
        
            // Vérifications
            expect(ParasiteModele.findById).toHaveBeenCalledWith(parasiteId);
            expect(ParasiteModele.findByIdAndDelete).toHaveBeenCalledWith(parasiteId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "Le parasite a été supprimé avec succès." });
        });           
    
        // Test de non-existence de le parasite
        it("Devrait renvoyer une erreur 404 si le parasite spécifié n'existe pas", async () => {
            // Mock de la fonction findById pour retourner null (pas de parasite trouvé)
            ParasiteModele.findById.mockResolvedValueOnce(null);
    
            // Requête mockée avec un parasite inexistant
            const req = { params: { parasiteId: 'id_inexistant' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteParasite(req, res);
    
            // Vérification du statut 404 et du message approprié
            expect(ParasiteModele.findById).toHaveBeenCalledWith('id_inexistant');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "Le parasite spécifié n'existe pas." });
        });
    
        // Test d'erreur lors de la suppression de le parasite
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
    
            // Mock de la fonction findById pour générer une erreur
            ParasiteModele.findById.mockRejectedValueOnce(new Error('Erreur de base de données'));
    
            // Requête mockée avec un ID générant une erreur
            const req = { params: { parasiteId: 'id_erreur' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteParasite(req, res);
    
            // Vérification du statut 500 et du message approprié
            expect(ParasiteModele.findById).toHaveBeenCalledWith('id_erreur');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la suppression du parasite." });
        });
    })   

});