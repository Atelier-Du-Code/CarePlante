import express from 'express';
import { catchErrors } from '../helpers.js';
import { getParasites, getParasite, addParasite, updateParasite, deleteParasite } from '../controllers/parasiteController.js';


const router = express.Router();

//Récupérer tous les parasites
router.get('/', catchErrors(getParasites))

//Récupérer un parasite
router.get('/parasite/:parasiteId', catchErrors(getParasite))


//Ajouter un environnement
router.post('/addParasite', catchErrors(addParasite))

//Modifier un envrionnement
router.put('/parasite/:parasiteId', catchErrors(updateParasite))

//Supprimer un environnement
router.delete('/parasite/:parasiteId', catchErrors(deleteParasite))

export default router;