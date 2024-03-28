const PlanteExpositionSchema = new mongoose.Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
    },
    exposition: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exposition',
    },
});

const PlanteExpositionModele = mongoose.model('PlanteExposition', PlanteExpositionSchema);
