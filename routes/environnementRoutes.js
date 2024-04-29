import express from 'express';
import { catchErrors } from '../helpers.js';
import { getEnvironnements, getEnvironnement, addEnvironnement, updateEnvironnement, deleteEnvironnement} from '../controllers/environnementController.js';

const router = express.Router();

//Récupérer tous les environnements
router.get('/', catchErrors(getEnvironnements))

//Récupérer un environnement
router.get('/environnement/:environnementId', catchErrors(getEnvironnement))

//Ajouter un environnement
router.post('/addEnvironnement', catchErrors(addEnvironnement))


//Modifier un envrionnement
router.put('/environnement/:environnementId', catchErrors(updateEnvironnement))

//Supprimer un environnement
router.delete('/environnement/:environnementId', catchErrors(deleteEnvironnement))

export default router;