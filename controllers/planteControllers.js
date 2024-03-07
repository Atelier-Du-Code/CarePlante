import PlanteModele from '../models/planteModele.js'

export const getTest = (_, res) => {
    res.send('hello les hardcodeurs pouet pouet')
}

export const postTest = (req, res) => {
    res.send(req.body)
}

export const addPlante = async (req, res) => {
    const add = new PlanteModele(req.body);
    await add.save();
    res.json(add);      
}

//Récupérer toutes les plantes
export const getPlantes = async (req, res) => {
    const plantes = await PlanteModele.find({})
    res.json(plantes);
}

//Récupérer une plante
export const getPlante = async (req, res) => {
    const plante = await PlanteModele.find({_id: req.params.id})
    res.send(plante)
}


export const updatePlante = async (req, res) => {   
    const udatePlante = await PlanteModele.findByIdAndUpdate(req.params.id, req.body)
    await udatePlante.save()
    res.send(udatePlante)
}


export const deletePlante = async (req, res) => {   
    const plante = await PlanteModele.findByIdAndDelete(req.params.id)
    if(!plante){
        res.status(404).send('Aucune plante trouvée')
    }
    else
    {
        res.status(200).send()
    }
}