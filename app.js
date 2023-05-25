
// Configure dotenv et rend accessible le fichier '.env' 💪
require('dotenv').config();

// Recupere les variables d'environnement ⛵
const {PORT} = process.env;



// Import de express 
const express = require('express');
const pagination = require('./middlewares/pagination.middleware');

// Mise en place de la gestion d'erreur d'express 
require('express-async-errors')

// Execution du serveur express et recuperation de l'app
const app = express();

//Permet d'utiliser automatiquement du JSON pour le body
app.use(express.json());

//Recuperation de l'objet DB pour sequelize
const db = require('./models');

// Connection a notre base de donnée
db.sequelize.authenticate()
    .then(() => console.log('Ca a marché copain !'))
    .catch((err) => console.log('CPT : ' + err))
 
// Deconstruit et reconstruit la base de donnée
 //db.sequelize.sync({force : true})

//Update la base de donné sur base des modification sans drop les elements
// db.sequelize.sync({alter : {drop : false}})

//Import de notre dossier routes et de router dans 'index.js' 🍣
const router = require('./routes/index.router');


// Mise en place du middleware de routing qui redirige les requete avec '/api' vers notre router 🛣️
app.use('/api', router);




// app.use((err, req, res, next) => {

//     const message = err.errors ? err.errors[0].message : "Erreur imprévue"
    
//     res.status(422).send(new errorResponse(message, 422));
//   });

// Ecoute du serveur sur le port importé depuis l'environnement 🦻
app.listen(PORT, () => {
    console.log(`Server listen on  localhost:${PORT}`);
});