import express from 'express'
import { catchErrors } from '../helpers.js'

import { getExpositions, getExposition, addExposition, updateExposition, deleteExposition } from '../controllers/expositionController.js'

const router = express.Router()

//Récupérer toutes les expositions
router.get('/', catchErrors(getExpositions))

//Récupère une exposition
router.get('/:expositionId', catchErrors(getExposition))

//Ajouter une exposition
router.post('/exposition', catchErrors(addExposition))

//Modifier une exposition
router.put('/:expositionId', catchErrors(updateExposition))

//Supprimer une exposition
router.delete('/:expositionId', catchErrors(deleteExposition))

export default router;