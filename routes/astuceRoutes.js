import express from 'express'
import { catchErrors } from '../helpers.js'

import { getAstuces, ajouterAstuceAPlante, modifierAstuceDePlante, supprimerAstuceDePlante } from '../controllers/astuceController.js'

const router = express.Router()

//Récupère toutes les astuces d'une plantes
router.get('/plante/:planteId', catchErrors(getAstuces))

//Ajouter une astuce pour une plante
router.post('/plante/:planteId', catchErrors(ajouterAstuceAPlante))

//Modifier une astuce pour une plante
router.put('/plante/:planteId', catchErrors(modifierAstuceDePlante))

//Supprimer une astuce pour une plante
router.delete('/plante/:planteId/astuce/:astuceId', catchErrors(supprimerAstuceDePlante))

export default router;