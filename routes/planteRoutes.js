import express from 'express'
import { catchErrors } from '../helpers.js'
import { addPlante, getPlantes, getPlante, updatePlante, deletePlante } from '../controllers/planteControllers.js'


const router = express.Router()

//Récupérer toutes les plantes
router.get('/', catchErrors(getPlantes))

//Récupérer une plante
router.get('/plante/:id', catchErrors(getPlante))

//Ajouter une plante
router.post('/plante', catchErrors(addPlante))

//Mettre à jour d'une plante
router.patch('/plante/:id', catchErrors(updatePlante))

//Supprimer une plante
router.delete('/plante/:id', catchErrors(deletePlante))


export default router;