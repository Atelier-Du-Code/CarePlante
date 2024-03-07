import express from 'express'
import cors from 'cors';
import routes from './routes/planteRoutes.js'
import mongoose from 'mongoose'

import planteRoutes from './routes/planteRoutes.js';

//Récupération des variables d'environnement
import dotenv from 'dotenv'
dotenv.config()



const PORT = process.env.PORT || 4000

const app = express()

app.use(cors({
    origin: 'http://localhost:3000'
  }));

app.use(express.json())
app.use(routes)

//Middleware pour les routes API
app.use('/api/plantes', planteRoutes);


mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    })

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})