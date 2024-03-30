import mongoose from 'mongoose';

const AstuceSchema = new mongoose.Schema({
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
    // Ajoutez d'autres champs selon les besoins
});

const AstuceModele = mongoose.model('Astuce', AstuceSchema);

export default AstuceModele;
