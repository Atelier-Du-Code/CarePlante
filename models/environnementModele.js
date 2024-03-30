import mongoose from 'mongoose';

const EnvironnementSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    // Ajoutez d'autres champs selon les besoins
});

const EnvironnementModele = mongoose.model('Environnement', EnvironnementSchema);

export default EnvironnementModele;
