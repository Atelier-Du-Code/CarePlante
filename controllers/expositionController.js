//getExposition, modifierExpositionPlante, supprimerExpositionPlante
import ExpositionModele from "../models/expositionModele";
import Plante_exposition_Modele from "../models/plantes/plante_exposition_Modele.js"
import PlanteModele from "../models/planteModele";

//Récupération de l'exposition d'une plante
export const getExpositions = async (req, res) => {
    try {

        const { planteId } = req.params; //Récupération dans l'url

        // Rechercher toutes les PlanteExposition correspondant à l'ID de la plante
        const resultats = await Plante_exposition_Modele.find({ plante: planteId })
            .populate('exposition'); // Remplir les références de type ObjectId avec les documents correspondants de la collection Exposition

        const astuces = resultats.map(resultat => resultat.exposition);

        res.json(astuces);
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la récupération des expositions d'une plante :", erreur);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des astuces de la plante." });
    }
}

//Ajout d'une exposition à une plante 
export const ajouterExpositionPlante = async (req, res) => {
    try {

        const { planteId, expositionId } = req.params; //Récupération dans l'url
        
        // Vérifier si la plante existe
        const planteExistante = await PlanteModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        //Vérifier si l'exposition existe
        const expositionExistante = await ExpositionModele.findOne({ exposition: expositionId });
        if (!expositionExistante) {
            return res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
        }

        
        // Vérifier si l'associationde la plante et de l'exposition existent
        const planteExpositionExistante = await Plante_exposition_Modele.findOne({ plante: planteId, exposition: expositionId });
        if (planteExpositionExistante) {
            return res.status(400).json({ message: "Cette plante est déjà associée à cette exposition." });
        }        

        // Créer une nouvelle entrée PlanteExposition avec l'ID de la plante et de la nouvelle exposition
        const nouvellePlanteExposition = new Plante_exposition_Modele({
            plante: planteId,
            exposition: expositionId,
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouvellePlanteExposition.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Une nouvelle expositionPlante a été créée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout de la nouvelle expositionPlante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de la nouvelle expositionPlante." });
    }
}


//Modifier une exposition à une plante
export const modifierExpositionPlante = async (req, res) => {
    try {
        
        const { planteId, expositionId} = req.params; //Récupération dans l'url
       
        // Vérifier si la plante existe
        const planteExistante = await PlanteModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        //Vérifier si l'exposition existe
        const expositionExistante = await ExpositionModele.findOne({ exposition: expositionId });
        if (!expositionExistante) {
            return res.status(404).json({ message: "L'exposition spécifiée n'existe pas." });
        }
        
        // Vérifier si l'association de la plante et de l'exposition existent
        const planteExpositionExistante = await Plante_exposition_Modele.findOne({ plante: planteId, exposition: expositionId });
        if (planteExpositionExistante) {

          // Mettre à jour l'association plante-exposition
            planteExpositionExistante.plante = planteId;
            planteExpositionExistante.exposition = expositionId;

            // Enregistrer les modifications dans la base de données
            await planteExpositionExistante.save();

        } 
        else{
            return res.status(400).json({ message: "Cette association n'existe pas." });
        }  

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'exposition de la plante a été modifiée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la modification de l'exposition de la plante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la modification de l'astuce de la plante." });
    }
}

export const supprimerExpositionPlante = async (req, res) => {
    try {
        const { planteId, expositionId } = req.params; // Récupération dans l'URL

        // Recherche de l'association plante-exposition
        const planteExpositionExistante = await Plante_exposition_Modele.findOne({ plante: planteId, exposition: expositionId });
        if (!planteExpositionExistante) {
            return res.status(404).json({ message: "L'association plante-exposition spécifiée n'existe pas." });
        }

        // Suppression de l'association plante-exposition
        await Plante_exposition_Modele.deleteOne({ plante: planteId, exposition: expositionId });

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'association entre la plante et l'exposition a été supprimée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression de l'association plante-exposition :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'association plante-exposition." });
    }
}
