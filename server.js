import express from 'express'
import routes from './routes/planteRoutes.js'
import mongoose from 'mongoose'

//Récupération des variables d'environnement
import dotenv from 'dotenv'
dotenv.config()



const PORT = process.env.PORT || 4000

const app = express()

app.use(express.json())
app.use(routes)
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
    })

app.listen(PORT, () => {
    console.log(`Le serveur est lancé sur le port : ${PORT}`)
})