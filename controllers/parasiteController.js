import ParasiteModele from '../models/parasiteModele.js';
import { MongooseError } from 'mongoose';

//Récupérer tous les parasites
export const getParasites = async (_, res) => {   

    try{
        const parasites = await ParasiteModele.find({})
        res.json(parasites);

    }catch(erreur){

        res.status(500).json({ message: "ParasiteController - Une erreur s'est produite lors de la récupération des parasites" });
    }
}

//Récupérer un parasite
export const getParasite = async (req, res) => {  

    const { parasiteId } = req.params; //Récupération dans l'url

    try{
        
    const parasite = await ParasiteModele.findOne({_id: parasiteId})
    res.send(parasite)
    }catch(erreur){
        
        res.status(500).json({ message: "ParasiteController - Une erreur s'est produite lors de la récupération du parasite" });
   
    }
}

//Ajouter un parasite
export const addParasite = async (req, res) => {

    try {
        const { nom, description, contre_attaque} = req.body; 
        
        //Vérifier si le parasite existe
        const parasiteExistant = await ParasiteModele.findOne({ nom: nom });
        if (parasiteExistant) {
            return res.status(404).json({ message: "Le parasite spécifié est déja existant." });
        }
        
        // Créer une nouvelle entrée parasite 
        const nouveauParasite = new ParasiteModele({
            nom: nom,
            description: description,
            contre_attaque: contre_attaque
        });

        // Enregistrer la nouvelle entrée dans la base de données
        await nouveauParasite.save();

        // Renvoyer une réponse de succès
        res.status(201).json({ message: "Un nouveau parasite a été créé avec succès." });

    } catch (erreur) {       
        res.status(500).json({ message: "Une erreur s'est produite lors de l'ajout du nouveau parasite." });
    }
}

//Modifier un parasite
export const updateParasite = async (req, res) =>{
    const { parasiteId } = req.params;
    const { nom } = req.body;

    try {
        const parasiteExistant = await ParasiteModele.findById(parasiteId);
        if (!parasiteExistant) {
            return res.status(404).json({ message: "Le parasite spécifié n'existe pas." });
        }

        parasiteExistant.nom = nom;
        await parasiteExistant.save();

        return res.status(200).json({ message: "Le parasite a été modifié avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la modification du parasite :", erreur);
        let messageErreur = "Une erreur s'est produite lors de la modification du parasite.";
        if (erreur instanceof MongooseError.ValidationError) {
            messageErreur = "Les données fournies sont invalides.";
        }
        return res.status(500).json({ message: messageErreur });
    }
}

//Supprimer un parasite
export const deleteParasite = async (req, res) =>{

    const { parasiteId } = req.params;

    try {
        // Vérifier si le parasite existe
        const parasiteExistant = await ParasiteModele.findById(parasiteId);
        if (!parasiteExistant) {
            return res.status(404).json({ message: "Le parasite spécifié n'existe pas." });
        }

        // Supprimer le parasite
        await ParasiteModele.findByIdAndDelete(parasiteId);

        // Renvoyer une réponse de succès
        res.status(200).json({ message: "Le parasite a été supprimé avec succès." });
    } catch (erreur) {
        console.error("Une erreur s'est produite lors de la suppression du parasite :", erreur);
        // Envoyer une réponse d'erreur
        res.status(500).json({ message: "Une erreur s'est produite lors de la suppression du parasite." });
    }
}