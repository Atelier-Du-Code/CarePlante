import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import planteRoutes from './routes/planteRoutes.js';
import planteEnvironnementRoutes from './routes/planteEnvironnementRoutes.js';
import environnementRoutes from './routes/environnementRoutes.js'
import astuceRoutes from './routes/astuceRoutes.js';
import expositionRoutes from './routes/expositionRoutes.js';

//Récupération des variables d'environnement
import dotenv from 'dotenv'
dotenv.config()



const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json())


//Middleware pour les routes API
app.use('/api/plantes', planteRoutes);
app.use('/api/environnements', environnementRoutes);
app.use('/api/astuces', astuceRoutes);
app.use('/api/planteEnvironnement', planteEnvironnementRoutes);
app.use('/api/exposition', expositionRoutes);

mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    })

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})