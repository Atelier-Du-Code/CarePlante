import mongoose from 'mongoose';

const ParasiteSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    contre_attaque: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    // Ajoutez d'autres champs selon les besoins
});

const ParasiteModele = mongoose.model('Parasite', ParasiteSchema);

export default ParasiteModele;
