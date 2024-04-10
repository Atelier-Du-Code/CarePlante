import { 
    getEnvironnements, 
    getEnvironnement, 
    addEnvironnement, 
    updateEnvironnement, 
    deleteEnvironnement 
} from '../environnementController.js';
import EnvironnementModele from '../../models/environnementModele.js';
  
jest.mock('../../models/environnementModele.js');
  
describe('environnementController', () => {
    let req, res;
  
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });
  
    describe('getEnvironnements', () => {
        it('Devrait renvoyer tous les environnements', async () => {
            const environnements = [{ nom: 'Environnement 1' }, { nom: 'Environnement 2' }];
            EnvironnementModele.find.mockResolvedValueOnce(environnements);
  
            await getEnvironnements(req, res);
  
            expect(EnvironnementModele.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(environnements);
        });

        it('Devrait renvoyer une erreur si la recherche échoue', async () => {
            const erreur = new Error('Erreur de recherche');
            EnvironnementModele.find.mockRejectedValueOnce(erreur);
  
            await getEnvironnements(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération des environnements"});
        });
    });
  
    describe('getEnvironnement', () => {
        it('Devrait renvoyer un environnement par ID', async () => {
            req.params = { environnementId: '123' };
            const environnement = { nom: 'Environnement 1' };
            EnvironnementModele.findOne.mockResolvedValueOnce(environnement);
  
            await getEnvironnement(req, res);
  
            expect(EnvironnementModele.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.send).toHaveBeenCalledWith(environnement);
        });

        it('Devrait renvoyer une erreur si la recherche échoue', async () => {
            req.params = { environnementId: '123' };
            const erreur = new Error('Erreur de recherche');
            EnvironnementModele.findOne.mockRejectedValueOnce(erreur);
  
            await getEnvironnement(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération de l'environnement" });
        });
    });

    describe('addEnvironnement', () => {
        it("Devrait créer un nouvel environnement avec succès", async () => {
            const req = { body: { nom: 'Nouvel Environnement' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler l'absence de l'environnement dans la base de données
            EnvironnementModele.findOne.mockResolvedValueOnce(null);
    
            await addEnvironnement(req, res);
    
            expect(EnvironnementModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvel Environnement' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Un nouvel environnement a été créé avec succès." });
        });
        
    
        it("Devrait renvoyer une erreur 404 si l'environnement existe déjà", async () => {
            const req = { body: { nom: 'Environnement existant' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler la présence de l'environnement dans la base de données
            EnvironnementModele.findOne.mockResolvedValueOnce({ nom: 'Environnement existant' });
    
            await addEnvironnement(req, res);
    
            expect(EnvironnementModele.findOne).toHaveBeenCalledWith({ nom: 'Environnement existant' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'environnement spécifié est déja existant." });
        });
    
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
            const req = { body: { nom: 'Nouvel Environnement' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const erreur = new Error('Erreur interne du serveur');
    
            // Mock de la méthode findOne pour simuler une erreur interne du serveur
            EnvironnementModele.findOne.mockRejectedValueOnce(erreur);
    
            await addEnvironnement(req, res);
    
            expect(EnvironnementModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvel Environnement' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de l'ajout du nouvel environnement." });
        });
    });
    

    describe('updateEnvironnement', () => {
        it('devrait mettre à jour un environnement existant', async () => {
            const environnementId = '123';
            const nom = 'Nouveau nom';
    
            const environnementExistant = {
                _id: environnementId,
                nom: 'Ancien nom',
                save: jest.fn()
            };
    
            EnvironnementModele.findById.mockResolvedValueOnce(environnementExistant);
    
            const req = { params: { environnementId }, body: { nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateEnvironnement(req, res);
    
            expect(EnvironnementModele.findById).toHaveBeenCalledWith(environnementId);
            expect(environnementExistant.nom).toBe(nom);
            expect(environnementExistant.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'environnement a été modifié avec succès." });
        });
    
        it("Devrait renvoyer une erreur si l'environnement spécifié n'existe pas", async () => {
            const environnementId = '123';
            const req = { params: { environnementId }, body: { nom: 'Nouveau nom' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            EnvironnementModele.findById.mockResolvedValueOnce(null);
    
            await updateEnvironnement(req, res);
    
            expect(EnvironnementModele.findById).toHaveBeenCalledWith(environnementId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'environnement spécifié n'existe pas." });
        });
    
        it("Devrait renvoyer une erreur en cas d'erreur interne du serveur", async () => {
            const environnementId = '123';
            const nom = 'Nouveau nom';
            const erreur = new Error('Erreur interne du serveur');
            jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionner console.error

            EnvironnementModele.findById.mockRejectedValueOnce(erreur);
    
            const req = { params: { environnementId }, body: { nom } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateEnvironnement(req, res);
    
            expect(EnvironnementModele.findById).toHaveBeenCalledWith(environnementId);
            expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite lors de la modification de l'environnement :", erreur);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la modification de l'environnement." });
        });
    });  

    describe('deleteEnvironnement', () => {

        it("Devrait supprimer l'environnement avec succès", async () => {
            // Données de test
            const environnementId = '3h0ld8n';
            const environnementASupprimer = { _id: environnementId, nom: 'Environnement à supprimer' };
        
            // Mock de la fonction findById pour retourner l'environnement à supprimer
            EnvironnementModele.findById.mockResolvedValueOnce(environnementASupprimer);
        
            // Requête mockée avec l'ID de l'environnement à supprimer
            const req = { params: { environnementId } };
        
            // Mock de la fonction findByIdAndDelete
            EnvironnementModele.findByIdAndDelete.mockResolvedValueOnce(environnementASupprimer);
        
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Appel de la fonction à tester
            await deleteEnvironnement(req, res);
        
            // Vérifications
            expect(EnvironnementModele.findById).toHaveBeenCalledWith(environnementId);
            expect(EnvironnementModele.findByIdAndDelete).toHaveBeenCalledWith(environnementId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'environnement a été supprimé avec succès." });
        });           
    
        // Test de non-existence de l'environnement
        it("Devrait renvoyer une erreur 404 si l'environnement spécifié n'existe pas", async () => {
            // Mock de la fonction findById pour retourner null (pas d'environnement trouvé)
            EnvironnementModele.findById.mockResolvedValueOnce(null);
    
            // Requête mockée avec un environnement inexistant
            const req = { params: { environnementId: 'id_inexistant' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteEnvironnement(req, res);
    
            // Vérification du statut 404 et du message approprié
            expect(EnvironnementModele.findById).toHaveBeenCalledWith('id_inexistant');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'environnement spécifié n'existe pas." });
        });
    
        // Test d'erreur lors de la suppression de l'environnement
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
    
            // Mock de la fonction findById pour générer une erreur
            EnvironnementModele.findById.mockRejectedValueOnce(new Error('Erreur de base de données'));
    
            // Requête mockée avec un ID générant une erreur
            const req = { params: { environnementId: 'id_erreur' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteEnvironnement(req, res);
    
            // Vérification du statut 500 et du message approprié
            expect(EnvironnementModele.findById).toHaveBeenCalledWith('id_erreur');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la suppression de l'environnement." });
        });
    })   
});


   
