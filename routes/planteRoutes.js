import express from 'express'
import { getTest, postTest, addPlante, getPlantes, getPlante, updatePlante, deletePlante } from '../controllers/planteControllers.js'
import { catchErrors } from '../helpers.js'

const router = express.Router()

router.get('/', (_ , res) => {
    res.send('hello pouet pouet')
} )

router.get('/test', getTest)
router.post('/test', postTest)

router.get('/plantes', catchErrors(getPlantes))
router.get('/plante/:id', catchErrors(getPlante))

router.post('/plante', catchErrors(addPlante))

router.patch('/plante/:id', catchErrors(updatePlante))


router.delete('/plante/:id', catchErrors(deletePlante))


export default router