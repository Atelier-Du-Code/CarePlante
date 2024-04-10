import express from 'express'
import { catchErrors } from '../helpers.js'
import { getEnvironnementPlante, ajouterEnvironnementPlante, modifierEnvironnementPlante, supprimerEnvironnementPlante } from '../controllers/planteEnvironnementController.js'

const router = express.Router()

//Récuperer l'environnement d'une plante
router.get('/environnement/:environnementId/plante/:planteId', catchErrors(getEnvironnementPlante))


//Ajouter un environnement à une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(ajouterEnvironnementPlante))


//Modifer l'environnement d'une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(modifierEnvironnementPlante))


//Supprimer l'environnement d'une plante
router.post('/environnement/:environnementId/plante/:planteId', catchErrors(supprimerEnvironnementPlante))

export default router;