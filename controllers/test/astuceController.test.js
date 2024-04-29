import AstuceModele from "../../models/astuceModele";
import { 
    getAstuces, 
    getAstuce, 
    addAstuce, 
    updateAstuce, 
    deleteAstuce 
} from '../astuceController.js';


jest.mock('../../models/astuceModele.js');
  
describe('astuceController', () => {

    let req, res;
  
    beforeEach(() => {
        req = {};
        res = {
            json: jest.fn(),
            send: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    describe('getAstuces', () => {

        it('Devrait renvoyer toutes les astuces', async () => {
            const astuces = [{ nom: 'Astuce 1' }, { nom: 'Astuce 2' }];
            AstuceModele.find.mockResolvedValueOnce(astuces);
  
            await getAstuces(req, res);
  
            expect(AstuceModele.find).toHaveBeenCalled();
            expect(res.json).toHaveBeenCalledWith(astuces);
        })

        it('Devrait renvoyer une erreur 500 si la recherche échoue', async () => {
            const erreur = new Error('Erreur de recherche');
            AstuceModele.find.mockRejectedValueOnce(erreur);
  
            await getAstuces(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "AstuceController - Une erreur s'est produite lors de la récupération des astuces"});
        });

        it('Devrait renvoyer une erreur 400 si il y a une erreur de syntaxe dans la requête', async () => {
            const erreur = new Error('Erreur de syntaxe');
            AstuceModele.find.mockRejectedValueOnce(erreur);
    
            await getAstuces(req, res);
    
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "AstuceController - Une erreur s'est produite lors de la récupération des astuces"});
        });
    });

    describe('getAstuce', () => {
        it('Devrait renvoyer une astuce par ID', async () => {
            req.params = { astuceId: '123' };
            const astuce = { nom: 'Astuce 1' };
            AstuceModele.findOne.mockResolvedValueOnce(astuce);
  
            await getAstuce(req, res);
  
            expect(AstuceModele.findOne).toHaveBeenCalledWith({ _id: '123' });
            expect(res.json).toHaveBeenCalledWith(astuce);
        });

        it('Devrait renvoyer une erreur si la recherche échoue', async () => {
            req.params = { astuceId: '123' };
            const erreur = new Error('Erreur de recherche');
            AstuceModele.findOne.mockRejectedValueOnce(erreur);
  
            await getAstuce(req, res);
  
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "AstuceController - Une erreur s'est produite lors de la récupération de l'astuce" });
        });
    });

    describe('addAstuce', () => {
        it("Devrait créer une npuvelle astuce avec succès", async () => {
            const req = { body: { nom: 'Nouvelle astuce' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler l'absence de l'astuce dans la base de données
            AstuceModele.findOne.mockResolvedValueOnce(null);
    
            await addAstuce(req, res);
    
            expect(AstuceModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvelle astuce' });
            expect(res.status).toHaveBeenCalledWith(201);
            expect(res.json).toHaveBeenCalledWith({ message: "Une nouvelle astuce a été créée avec succès." });
        });
        
    
        it("Devrait renvoyer une erreur 404 si l'astuce existe déjà", async () => {
            const req = { body: { nom: 'Astuce existant' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Mock de la méthode findOne pour simuler la présence de l'astuce dans la base de données
            AstuceModele.findOne.mockResolvedValueOnce({ nom: 'Astuce existant' });
    
            await addAstuce(req, res);
    
            expect(AstuceModele.findOne).toHaveBeenCalledWith({ nom: 'Astuce existant' });
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'astuce spécifiée est déja existante." });
        });
    
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
            const req = { body: { nom: 'Nouvelle astuce' } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const erreur = new Error('Erreur interne du serveur');
    
            // Mock de la méthode findOne pour simuler une erreur interne du serveur
            AstuceModele.findOne.mockRejectedValueOnce(erreur);
    
            await addAstuce(req, res);
    
            expect(AstuceModele.findOne).toHaveBeenCalledWith({ nom: 'Nouvelle astuce' });
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de l'ajout de la nouvelle astuce." });
        });
    });

    
    describe('updateAstuce', () => {
        it('devrait mettre à jour une astuce existante', async () => {
            const astuceId = '123';
            const nom = 'Nouveau nom';
            const description = 'Nouvelle description';
    
            const astuceExistante = {
                _id: astuceId,
                nom: 'Ancien nom',
                description: "Ancienne description",
                save: jest.fn()
            };
    
            AstuceModele.findById.mockResolvedValueOnce(astuceExistante);
    
            const req = { params: { astuceId }, body: { nom, description } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateAstuce(req, res);
    
            expect(AstuceModele.findById).toHaveBeenCalledWith(astuceId);
            expect(astuceExistante.nom).toBe(nom);
            expect(astuceExistante.save).toHaveBeenCalled();
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'astuce a été modifiée avec succès." });
        });
    
        it("Devrait renvoyer une erreur si l'astuce spécifiée n'existe pas", async () => {
            const astuceId = '123';
            const req = { params: { astuceId }, body: { nom: 'Nouveau nom', description: "Nouvelle description" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            AstuceModele.findById.mockResolvedValueOnce(null);
    
            await updateAstuce(req, res);
    
            expect(AstuceModele.findById).toHaveBeenCalledWith(astuceId);
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'astuce spécifiée n'existe pas." });
        });
    
        it("Devrait renvoyer une erreur en cas d'erreur interne du serveur", async () => {
            const astuceId = '123';
            const nom = 'Nouveau nom';
            const description = "Nouvelle description";
            const erreur = new Error('Erreur interne du serveur');
            jest.spyOn(console, 'error').mockImplementation(() => {}); // Espionner console.error

            AstuceModele.findById.mockRejectedValueOnce(erreur);
    
            const req = { params: { astuceId }, body: { nom, description } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            await updateAstuce(req, res);
    
            expect(AstuceModele.findById).toHaveBeenCalledWith(astuceId);
            expect(console.error).toHaveBeenCalledWith("Une erreur s'est produite lors de la modification de l'astuce :", erreur);
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la modification de l'astuce." });
        });
    });  

    describe('deleteAstuce', () => {

        it("Devrait supprimer l'astuce avec succès", async () => {
            // Données de test
            const astuceId = '3h0ld8n';
            const astuceASupprimer = { _id: astuceId, nom: 'Astuce à supprimer' };
        
            // Mock de la fonction findById pour retourner l'astuce à supprimer
            AstuceModele.findById.mockResolvedValueOnce(astuceASupprimer);
        
            // Requête mockée avec l'ID de l'astuce à supprimer
            const req = { params: { astuceId }};
        
            // Mock de la fonction findByIdAndDelete
            AstuceModele.findByIdAndDelete.mockResolvedValueOnce(astuceASupprimer);
        
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        
            // Appel de la fonction à tester
            await deleteAstuce(req, res);
        
            // Vérifications
            expect(AstuceModele.findById).toHaveBeenCalledWith(astuceId);
            expect(AstuceModele.findByIdAndDelete).toHaveBeenCalledWith(astuceId);
            expect(res.status).toHaveBeenCalledWith(200);
            expect(res.json).toHaveBeenCalledWith({ message: "L'astuce a été supprimée avec succès." });
        });           
    
        // Test de non-existence de l'astuce
        it("Devrait renvoyer une erreur 404 si l'astuce spécifié n'existe pas", async () => {
           
            AstuceModele.findById.mockResolvedValueOnce(null);
    
            // Requête mockée avec une astuce inexistante
            const req = { params: { astuceId: 'id_inexistant' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteAstuce(req, res);
    
            // Vérification du statut 404 et du message approprié
            expect(AstuceModele.findById).toHaveBeenCalledWith('id_inexistant');
            expect(res.status).toHaveBeenCalledWith(404);
            expect(res.json).toHaveBeenCalledWith({ message: "L'astuce spécifiée n'existe pas." });
        });
    
        // Test d'erreur lors de la suppression de l'astuce
        it("Devrait renvoyer une erreur 500 en cas d'erreur interne du serveur", async () => {
    
            // Mock de la fonction findById pour générer une erreur
            AstuceModele.findById.mockRejectedValueOnce(new Error('Erreur de base de données'));
    
            // Requête mockée avec un ID générant une erreur
            const req = { params: { astuceId: 'id_erreur' } };
    
            // Mock de la fonction status et json pour vérifier la réponse
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    
            // Appel de la fonction à tester
            await deleteAstuce(req, res);
    
            // Vérification du statut 500 et du message approprié
            expect(AstuceModele.findById).toHaveBeenCalledWith('id_erreur');
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ message: "Une erreur s'est produite lors de la suppression de l'astuce." });
        });
    })   
})