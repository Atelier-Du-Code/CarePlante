import ParasiteModele from '../models/parasiteModele.js';
import planteModele from '../models/planteModele.js';

//Récupérer tous les parasites
export const getParasites = async (_, res) => {
    const parasites = await ParasiteModele.find({})
    res.json(parasites);
}

//Récupérer un parasite
export const getParasite = async (req, res) => {

    const { parasiteId } = req.params; //Récupération dans l'url

    const parasite = await ParasiteModele.findOne({_id: parasiteId})
    res.send(parasite)
}

//Récupérer le parasite principal d'une plante
export const getParasitePlante = async (req, res) => {

    const { planteId} = req.params;

    try {
        // Rechercher la plante par son ID et peupler le champ parasite
        const plante = await PlanteModele.findById(planteId).populate('parasite');

        // Vérifier si la plante existe
        if (!plante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        // Récupérer le parasite associé à la plante
        const parasite = plante.parasite;

        // Renvoyer le parasite en tant que réponse
        return res.json(parasite);
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la récupération du parasite de la plante :", erreur);
        return res.status(500).json({ message: "Une erreur s'est produite lors de la récupération du parasite de la plante." });
    }

} 

export const ajouterParasiteAPlante = async (req, res) => {
    try {
        const { planteId, parasiteId } = req.params;

        // Vérifier si la plante existe
        const plante = await PlanteModele.findById(planteId);
        if (!plante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        // Vérifier si le parasite existe
        const parasite = await ParasiteModele.findById(parasiteId);
        if (!parasite) {
            return res.status(404).json({ message: "Le parasite spécifié n'existe pas." });
        }

        // Mettre à jour le champ parasite de la plante avec l'ID du parasite
        plante.parasite = parasiteId;

        // Enregistrer les modifications dans la base de données
        await plante.save();

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Le parasite a été ajouté à la plante avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout du parasite à la plante :", erreur);
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du parasite à la plante." });
    }
}