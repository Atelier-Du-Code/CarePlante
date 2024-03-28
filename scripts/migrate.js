// import mongoose from 'mongoose';
// import PlanteModele from '../models/planteModele.js'; // Mettez à jour avec le chemin correct

// mongoose.connect('mongodb+srv://manon:sZYJoP8La2ADomBv@careplante.ykmb8vv.mongodb.net/?retryWrites=true&w=majority&appName=careplante', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Connexion à MongoDB réussie'))
//   .catch((err) => console.error('Erreur lors de la connexion à MongoDB', err));

// const ajouterDonneesAuxPlantes = async () => {
//   const plantes = await PlanteModele.find(); // Récupérer toutes les plantes

//   for (let plante of plantes) {
//     plante.environnement = 'environnement par defaut'; // Mettez à jour selon votre valeur par défaut ou logique spécifique
//     plante.parasite = 'parasite par défaut';
//     await plante.save();
//   }

//   console.log('Migration terminée');
// };

// ajouterDonneesAuxPlantes().then(() => mongoose.disconnect());
