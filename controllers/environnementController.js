import EnvironnementModele from '../models/environnementModele.js'
import PlanteModele from '../models/planteModele.js';
import PlanteEnvironnementModele from '../models/plantes/planteEnvironnementModele.js'
import { MongooseError } from 'mongoose';

//Récupérer tous les environnements
export const getEnvironnements = async (_, res) => {
    try{

        const environnements = await EnvironnementModele.find({})
        res.json(environnements);

    }catch(erreur){

        res.status(500).json({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération des environnements" });
    }
    
}

//Récupérer un environnement
export const getEnvironnement = async (req, res) => {

    const { environnementId } = req.params; //Récupération dans l'url

    try{
        
    const environnement = await EnvironnementModele.findOne({_id: environnementId})
    res.send(environnement)
    }catch(erreur){
        
        res.status(500).json({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération de l'environnement" });
   
    }
}

//Ajouter un environnement
export const addEnvironnement = async (req, res) => {

    try {
        const { nom } = req.body; 
        
        //Vérifier si l'environnement existe
        const environnementExistant = await EnvironnementModele.findOne({ nom: nom });
        if (environnementExistant) {
            return res.status(404).json({ message: "L'environnement spécifié est déja existant." });
        }
        
        // Créer une nouvelle entrée environnement 
        const nouvelEnvironnement = new EnvironnementModele({
            nom: nom           
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouvelEnvironnement.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Un nouvel environnement a été créé avec succès." });

    } catch (erreur) {       
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du nouvel environnement." });
    }

}

//Modifier un environnement
export const updateEnvironnement = async (req, res) => {
    const { environnementId } = req.params;
    const { nom } = req.body;

    try {
        const environnementExistant = await EnvironnementModele.findById(environnementId);
        if (!environnementExistant) {
            return res.status(404).json({ message: "L'environnement spécifié n'existe pas." });
        }

        environnementExistant.nom = nom;
        await environnementExistant.save();

        return res.status(200).json({ message: "L'environnement a été modifié avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la modification de l'environnement :", erreur);
        let messageErreur = "Une erreur s'est produite lors de la modification de l'environnement.";
        if (erreur instanceof MongooseError.ValidationError) {
            messageErreur = "Les données fournies sont invalides.";
        }
        return res.status(500).json({ message: messageErreur });
    }
}


//Supprimer un environnement
export const deleteEnvironnement = async (req, res) => {
    const { environnementId } = req.params;

    try {
        // Vérifier si l'environnement existe
        const environnementExistant = await EnvironnementModele.findById(environnementId);
        if (!environnementExistant) {
            return res.status(404).json({ message: "L'environnement spécifié n'existe pas." });
        }

        // Supprimer l'environnement
        await EnvironnementModele.findByIdAndDelete(environnementId);

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "L'environnement a été supprimé avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression de l'environnement :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression de l'environnement." });
    }
}
