import express from 'express'
import { catchErrors } from '../helpers.js'
import {getAstuces, getAstuce, addAstuce, updateAstuce, deleteAstuce} from '../controllers/astuceController.js';

const router = express.Router()

//Récupérer tous les astuces
router.get('/', catchErrors(getAstuces))

//Récupérer une astuce
router.get('/astuce/:astuceId', catchErrors(getAstuce))

//Ajouter une astuce
router.post('/addAstuce', catchErrors(addAstuce))


//Modifier une astuce
router.put('/astuce/:astuceId', catchErrors(updateAstuce))

//Supprimer une astuce
router.delete('/astuce/:astuceId', catchErrors(deleteAstuce))

export default router;