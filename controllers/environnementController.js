import EnvironnementModele from '../models/environnementModele.js'
import PlanteModele from '../models/planteModele.js';
import plante_environnement_Modele from '../models/plantes/plante_environnement_Modele.js'

//Récupérer tous les environnements
export const getEnvironnements = async (_, res) => {
    const environnement = await EnvironnementModele.find({})
    res.json(environnement);
}

//Récupérer un environnement
export const getEnvironnement = async (req, res) => {

    const { environnementId } = req.params; //Récupération dans l'url

    const environnement = await EnvironnementModele.findOne({_id: environnementId})
    res.send(environnement)
}

//Récuperer l'environnement d'une plante
export const getExpositionsPlante = async (req, res) => {
    try {

        const { planteId, environnementId } = req.params; //Récupération dans l'url

        // Rechercher toutes les PlanteExposition correspondant à l'ID de la plante
        const resultats = await plante_environnement_Modele.find({ plante: planteId, environnement: environnementId })
            .populate('environnement'); // Remplir les références de type ObjectId avec les documents correspondants de la collection Exposition

        const environnement = resultats.map(resultat => resultat.environnement);

        res.json(environnement);
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la récupération des environnements d'une plante :", erreur);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des environnement de la plante." });
    }
}

//Ajouter un environnement à une plante
export const ajouterEnvironnementPlante = async (req, res) => {
    try {

        const { planteId, environnementId } = req.params; //Récupération dans l'url
        
        // Vérifier si la plante existe
        const planteExistante = await PlanteModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        //Vérifier si l'exposition existe
        const environnementExistant = await EnvironnementModele.findOne({ environnement: environnementId });
        if (!environnementExistant) {
            return res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
        }
        
        // Vérifier si l'associationde la plante et de l'exposition existent
        const planteEnvironnementExistant = await plante_environnement_Modele.findOne({ plante: planteId, environnement: environnementId });
        if (planteEnvironnementExistant) {
            return res.status(400).json({ message: "Cette plante est déjà associée à cet environnement." });
        }        

        // Créer une nouvelle entrée PlanteEnvironnement avec l'ID de la plante et de le nouvel environnement
        const nouveauPlanteEnvironnement = new Plante_exposition_Modele({
            plante: planteId,
            environnement: environnementId,
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouveauPlanteEnvironnement.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Un nouveau environnementPlante a été créée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout du nouvel environnementPlante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du nouvel environnementPlante." });
    }
}

//Modifer l'environnement d'une plante
export const modifierEnvironnementPlante = async (req, res) => {
    try {

        const { planteId, environnementId, newEnvironnementId } = req.params; //Récupération dans l'url
        
        // Vérifier si la plante existe
        const planteExistante = await PlanteModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        //Vérifier si l'exposition existe
        const environnementExistant = await EnvironnementModele.findOne({ environnement: environnementId });
        if (!environnementExistant) {
            return res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
        }
        
        // Vérifier si l'associationde la plante et de l'exposition existent
        const planteEnvironnementExistant = await plante_environnement_Modele.findOne({ plante: planteId, environnement: environnementId });
        if (planteEnvironnementExistant) {
            return res.status(400).json({ message: "Cette plante est déjà associée à cet environnement." });
        }        

        // Créer une nouvelle entrée PlanteEnvironnement avec l'ID de la plante et de le nouvel environnement
        const nouveauPlanteEnvironnement = new Plante_exposition_Modele({
            plante: planteId,
            environnement: environnementId,
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouveauPlanteEnvironnement.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Un nouveau environnementPlante a été créée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout du nouvel environnementPlante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du nouvel environnementPlante." });
    }
}
//Supprimer l'environnement d'une plante
