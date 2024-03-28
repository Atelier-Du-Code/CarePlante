import mongoose from 'mongoose';

const ExpositionSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    // Ajoutez d'autres champs selon les besoins
});

const ExpositionModele = mongoose.model('Exposition', ExpositionSchema);

export default ExpositionModele;
