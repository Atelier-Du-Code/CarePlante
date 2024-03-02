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
    photo: {
        type: String,
        required: true,
    }
})

const PlanteModele = mongoose.model('plantes', PlanteSchema )

export default PlanteModele