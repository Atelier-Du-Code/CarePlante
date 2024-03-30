import express from 'express'
import { catchErrors } from '../helpers.js'

import { getExpositions,ajouterExpositionPlante,  modifierExpositionPlante, supprimerExpositionPlante } from '../controllers/expositionController.js'

const router = express.Router()

//Récupère l'exposition d'une plante
router.get('/:planteId', catchErrors(getExpositions))

//Ajouter une association plante/exposition
router.post('/:planteId/:expositionId', catchErrors(ajouterExpositionPlante))

//Modifier l'exposition pour une plante
router.put('/:planteId/:expositionId', catchErrors(modifierExpositionPlante))

//Supprimer l'exposition pour une plante
router.delete('/:planteId/:expositionId', catchErrors(supprimerExpositionPlante))

export default router;