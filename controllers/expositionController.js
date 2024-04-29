import ExpositionModele from "../models/expositionModele.js";
import Plante_exposition_Modele from "../models/plantes/planteExpositionModele.js"
import PlanteModele from "../models/planteModele.js";

import { MongooseError } from 'mongoose';


//Récupérer toutes les expositions
export const getExpositions = async (req, res) =>{

    try{

        const expositions = await ExpositionModele.find({})
        res.json(expositions);

    }catch(erreur){

        res.status(500).json({ message: "ExpositionController - Une erreur s'est produite lors de la récupération des expositions" });
    }
}


//Récupère une exposition
export const getExposition = async (req, res) =>{

    const { expositionId } = req.params; //Récupération dans l'url

    try{
        
    const exposition = await ExpositionModele.findOne({_id: expositionId})
    res.send(exposition)
    }catch(erreur){
        
        res.status(500).json({ message: "ExpositionController - Une erreur s'est produite lors de la récupération de l'exposition" });
   
    }
}


//Ajouter une exposition
export const addExposition = async (req, res) =>{

    try {
        const { nom } = req.body; 
        
        //Vérifier si l'exposition existe
        const expositionExistante = await ExpositionModele.findOne({ nom: nom });
        if (expositionExistante) {
            return res.status(404).json({ message: "L'exposition spécifiée est déja existante." });
        }
        
        // Créer une nouvelle entrée exposition 
        const nouvelExposition = new ExpositionModele({
            nom: nom           
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouvelExposition.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Une nouvelle exposition a été créée avec succès." });

    } catch (erreur) {       
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de la nouvelle exposition." });
    }
}


//Modifier une exposition
export const updateExposition = async (req, res) =>{

    const { expositionId } = req.params;
    const { nom } = req.body;

    try {
        const expositionExistante = await ExpositionModele.findById(expositionId);
        if (!expositionExistante) {
            return res.status(404).json({ message: "L'exposition spécifié n'existe pas." });
        }

        expositionExistante.nom = nom;
        await expositionExistante.save();

        return res.status(200).json({ message: "L'exposition a été modifiée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la modification de l'exposition :", erreur);
        let messageErreur = "Une erreur s'est produite lors de la modification de l'exposition.";
        if (erreur instanceof MongooseError.ValidationError) {
            messageErreur = "Les données fournies sont invalides.";
        }
        return res.status(500).json({ message: messageErreur });
    }
}


//Supprimer une exposition
export const deleteExposition = async (req, res) =>{

    const { expositionId } = req.params;

    try {
        // Vérifier si l'exposition existe
        const expositionExistante = await ExpositionModele.findById(expositionId);
        if (!expositionExistante) {
            return res.status(404).json({ message: "L'exposition spécifié n'existe pas." });
        }

        // Supprimer l'exposition
        await ExpositionModele.findByIdAndDelete(expositionId);

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'exposition a été supprimée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression de l'exposition :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'exposition." });
    }
}
