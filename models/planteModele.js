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
        required: true,
    }],
    environnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environnement',
        required: true,
    },

    temp_min: {
        type: Number, // Utilisation du type Number pour les entiers
        required: true, 
    },

    temp_max: {
        type: Number, // Utilisation du type Number pour les entiers
        required: true, 
    },
        
    frequence_arrosage: {
        type: String,
        required: true, 
        trim: true,
        lowercase: true,
    },
    parasite: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parasite',
        required: true,
    },
    astuce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astuce',
        required: true,
    },
    photo: {
        type: String,
        required: true,
    },

})

const PlanteModele = mongoose.model('plantes', PlanteSchema )

export default PlanteModele