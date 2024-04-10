import ParasiteModele from '../models/parasiteModele.js';

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
        
        res.status(500).json({ message: "EnvironnementController - Une erreur s'est produite lors de la récupération du parasite" });
   
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
export const updateParasite = async (req, res) =>{}

//Supprimer un parasite
export const deleteParasite = async (req, res) =>{}