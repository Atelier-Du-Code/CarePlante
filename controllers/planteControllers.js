import PlanteModele from '../models/planteModele.js'

export const getTest = (_, res) => {
    res.send('hello les hardcodeurs pouet pouet')
}

export const postTest = (req, res) => {
    res.send(req.body)
}

export const addPlante = async (req, res) => {
    const plante = new PlanteModele(req.body);
    await plante.save();
    res.send(plante);      
}

export const getPlantes = async (req, res) => {
    const plantes = await PlanteModele.find({})
    res.send(plantes)
}


export const getPlante = async (req, res) => {
    const plantes = await PlanteModele.find({_id: req.params.id})
    res.send(plantes)
}


export const updatePlante = async (req, res) => {   
    const plante = await PlanteModele.findByIdAndUpdate(req.params.id, req.body)
    await plante.save()
    res.send(plante)
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