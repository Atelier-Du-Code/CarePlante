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
            const parasites = [{ nom: 'Environnement 1', description: "description1", contre_attaque: "contre_attaque1" }, { nom: 'Environnement 2', description: "description2", contre_attaque: "contre_attaque2" }];
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
            expect(res.json).toHaveBeenCalledWith({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération du parasite" });
        });
    });

    describe('addParasite', () => {
        it("Devrait créer un nouveau parasite avec succès", async () => {
            const req = { body: { nom: 'Nouveau parasite' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler l'absence de l'environnement dans la base de données
            ParasiteModele.findOne.mockResolvedValueOnce(null);
    
            await addParasite(req, res);
    
            expect(ParasiteModele.findOne).toHaveBeenCalledWith({ nom: 'Nouveau parasite' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Un nouveau parasite a été créé avec succès." });
        });
    
        it("Devrait renvoyer une erreur 404 si le parasite existe déjà", async () => {
            const req = { body:{ nom: 'Nouveau parasite' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler la présence de l'environnement dans la base de données
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
});
