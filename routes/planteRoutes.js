import express from 'express'
import { getTest, postTest, addPlante, getPlantes, getPlante, updatePlante, deletePlante } from '../controllers/planteControllers.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/', (_ , res) => {
    res.send('hello pouet pouet')
} )

router.get('/test', getTest)
router.post('/test', postTest)

//Récupérer toutes les plantes
router.get('/api/plantes/plantes', catchErrors(getPlantes))

//Récupérer une plante
router.get('/api/plantes/plante/:id', catchErrors(getPlante))

//Ajouter une plante
router.post('/api/plantes/plante', catchErrors(addPlante))

//Mettre à jour d'une plante
router.patch('/api/plantes/plante/:id', catchErrors(updatePlante))

//Supprimer une plante
router.delete('/api/plantes/plante/:id', catchErrors(deletePlante))


export default router