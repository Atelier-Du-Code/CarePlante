const PlanteEnvironnementSchema = new mongoose.Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
    },
    environnement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Environnement',
    },
});

const PlanteEnvironnementModele = mongoose.model('PlanteEnvironnement', PlanteEnvironnementSchema);
