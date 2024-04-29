import AstuceModele from "../models/astuceModele.js";
import PlanteAstuceModele from '../models/plantes/planteAstuceModele.js';
import { MongooseError } from 'mongoose';

//Récuperer toutes les astuces
export const getAstuces = async (_, res) => {
    try{

        const astuces = await AstuceModele.find({})
        res.json(astuces);

    }catch(erreur){

        res.status(500).json({ message: "AstuceController - Une erreur s'est produite lors de la récupération des astuces" });
    }
    
}
//Récuperer une astuce
export const getAstuce = async (req, res) => {

    const { astuceId } = req.params;

    try{
        
    const astuce = await AstuceModele.findOne({_id: astuceId})
    res.json(astuce)
    }catch(erreur){
        
        res.status(500).json({ message: "AstuceController - Une erreur s'est produite lors de la récupération de l'astuce" });
   
    }
}
//Ajouter une astuce
export const addAstuce = async (req, res) => {

    try {
        const { nom, description } = req.body; 
        
        //Vérifier si l'astuce existe
        const astuceExistante = await AstuceModele.findOne({ nom: nom });
        if (astuceExistante) {
            return res.status(404).json({ message: "L'astuce spécifiée est déja existante." });
        }
        
        // Créer une nouvelle entrée astuce
        const nouvelleAstuce = new AstuceModele({
            nom: nom,
            description: description      
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouvelleAstuce.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Une nouvelle astuce a été créée avec succès." });

    } catch (erreur) {       
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout de la nouvelle astuce." });
    }

}

//Modifier une astuce
export const updateAstuce = async (req, res) => {
    const { astuceId } = req.params;
    const { nom, description } = req.body;

    try {
        const astuceExistante = await AstuceModele.findById(astuceId);
        if (!astuceExistante) {
            return res.status(404).json({ message: "L'astuce spécifiée n'existe pas." });
        }

        astuceExistante.nom = nom;
        astuceExistante.description = description;
        await astuceExistante.save();

        return res.status(200).json({ message: "L'astuce a été modifiée avec succès." });
    } catch (erreur) {

        console.error("Une erreur s'est produite lors de la modification de l'astuce :", erreur);
        let messageErreur = "Une erreur s'est produite lors de la modification de l'astuce.";
        if (erreur instanceof MongooseError.ValidationError) {
            messageErreur = "Les données fournies sont invalides.";
        }
        return res.status(500).json({ message: messageErreur });
    }
}


//Supprimer une astuce
export const deleteAstuce = async (req, res) => {
    const { astuceId } = req.params;

    try {
        // Vérifier si l'environnement existe
        const astuceExistante = await AstuceModele.findById(astuceId);
        if (!astuceExistante) {
            return res.status(404).json({ message: "L'astuce spécifiée n'existe pas." });
        }

        // Supprimer l'environnement
        await AstuceModele.findByIdAndDelete(astuceId);

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'astuce a été supprimée avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression de l'astuce :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'astuce." });
    }
}

