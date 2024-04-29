import mongoose from 'mongoose'

const PlanteSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    description:{
        type: String,
        required: false,
    },
    exposition: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exposition',
        required: false,
    }],
    environnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environnement',
        required: false,
    },

    temp_min: {
        type: Number, // Utilisation du type Number pour les entiers
        required: false, 
    },

    temp_max: {
        type: Number, // Utilisation du type Number pour les entiers
        required: false, 
    },
        
    frequence_arrosage: {
        type: String,
        required: true, 
        trim: true,
        lowercase: false,
    },
    parasite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: false,
    },
    astuce: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astuce',
        required: false,
    }],

    interieur_exterieur: {
        type: String,
        required: false,
    },

    photo: {
        type: String,
        required: false,
    },

})

const PlanteModele = mongoose.model('plantes', PlanteSchema )

export default PlanteModele