import express from 'express';
import { catchErrors } from '../helpers.js';
import { getEnvironnements, getEnvironnement, getEnvironnementPlante, ajouterEnvironnementPlante, modifierEnvironnementPlante, supprimerEnvironnementPlante } from '../controllers/environnementController.js';

const router = express.Router();


//Récupérer tous les environnements
router.get('/', catchErrors(getEnvironnements))

//Récupérer un environnement
router.get('/environnement/:environnementId', catchErrors(getEnvironnement))

//Récuperer l'environnement d'une plante
router.get('/environnement/:environnementId/plante/:planteId', catchErrors(getEnvironnementPlante))

//Ajouter un environnement à une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(ajouterEnvironnementPlante))


//Modifer l'environnement d'une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(modifierEnvironnementPlante))


//Supprimer l'environnement d'une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(supprimerEnvironnementPlante))

export default router;