import AstuceModele from "../models/astuceModele.js";
import PlanteAstuceModele from '../models/plantes/plante_astuce_Modele.js';


//Récupération des astuces d'une plante
export const getAstuces = async (req, res) => {
    try {

        const { planteId } = req.params; //Récupération dans l'url

        // Rechercher toutes les PlanteAstuce correspondant à l'ID de la plante
        const resultats = await PlanteAstuceModele.find({ plante: planteId })
            .populate('astuce'); // Remplir les références de type ObjectId avec les documents correspondants de la collection Astuce

        const astuces = resultats.map(resultat => resultat.astuce);

        res.json(astuces);
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la récupération des astuces de la plante :", erreur);
        res.status(500).json({ message: "Une erreur s'est produite lors de la récupération des astuces de la plante." });
    }
}

//Ajout d'une nouvelle astuce
export const ajouterAstuceAPlante = async (req, res) => {
    try {

        const { planteId } = req.params; //Récupération dans l'url
        const { nom, description } = req.body; //Récupération dans le body

        // Vérifier si la plante existe
        const planteExistante = await PlanteAstuceModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        // Créer une nouvelle astuce
        const nouvelleAstuceCreee = await AstuceModele.create({
            nom: nom,
            description: description
        });

        // Créer une nouvelle entrée PlanteAstuce avec l'ID de la plante et de la nouvelle astuce
        const nouvellePlanteAstuce = new PlanteAstuceModele({
            plante: planteId,
            astuce: nouvelleAstuceCreee._id
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouvellePlanteAstuce.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Une nouvelle astuce a été créée et ajoutée à la plante avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de l'ajout de l'astuce à la plante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de l'astuce à la plante." });
    }
}

//Modifier l'astuce d'une plante 
export const modifierAstuceDePlante = async (req, res) => {
    try {
        
        const { planteId } = req.params; //Récupération dans l'url
        const { astuceId, nouveauNom, nouvelleDescription } = req.body; //Récupération dans le body

        // Vérifier si la plante existe
        const planteExistante = await PlanteAstuceModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        // Vérifier si l'astuce existe
        const astuceExistante = await AstuceModele.findById(astuceId);
        if (!astuceExistante) {
            return res.status(404).json({ message: "L'astuce spécifiée n'existe pas." });
        }

        // Mettre à jour les propriétés de l'astuce
        astuceExistante.nom = nouveauNom;
        astuceExistante.description = nouvelleDescription;

        // Enregistrer les modifications dans la base de données
        await astuceExistante.save();

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'astuce de la plante a été modifiée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la modification de l'astuce de la plante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la modification de l'astuce de la plante." });
    }
}

//Supprimer une astuce d'une plante
export const supprimerAstuceDePlante = async (req, res) => {
    try {
        const { planteId, astuceId } = req.params; //Récupération dans l'url

        // Vérifier si la plante existe
        const planteExistante = await PlanteAstuceModele.findOne({ plante: planteId });
        if (!planteExistante) {
            return res.status(404).json({ message: "La plante spécifiée n'existe pas." });
        }

        // Supprimer l'entrée PlanteAstuce associée à l'astuce spécifiée
        await PlanteAstuceModele.deleteOne({ plante: planteId, astuce: astuceId });

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'astuce de la plante a été supprimée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression de l'astuce de la plante :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'astuce de la plante." });
    }
}
