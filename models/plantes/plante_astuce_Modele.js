const Plante_Astuce_Schema = new mongoose.Schema({
    plante: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Plante',
    },
    astuce: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Astuce',
    },
});

const PlanteAstuceModele = mongoose.model('PlanteAstuce', PlanteAstuceSchema);
