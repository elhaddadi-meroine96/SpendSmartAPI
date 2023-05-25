const { Sequelize } = require("sequelize")

// Recuperation des variables d'environnement
const {DB_DATABASE, DB_SERVER, DB_USERNAME, DB_PASSWORD} = process.env


// Creation de l'objet sequelize et creation de la connection
const sequelize = new Sequelize(DB_DATABASE, DB_USERNAME, DB_PASSWORD, {
    host : DB_SERVER,
    dialect : 'mysql'
})

//Creation de l'objet DB Que nous allons manipuler
const db = {};

// Integration de notre objet sequelize a notre objet DB
db.sequelize = sequelize;

// Mise en place des modeles dans notre DB
db.User = require('./user.model')(sequelize)
db.Account = require('./account.model')(sequelize)
db.Transaction = require('./transaction.model')(sequelize)
db.Budget = require('./budget.model')(sequelize)
db.Category = require('./category.model')(sequelize)

//One to Many
db.User.hasMany(db.Account);
db.Account.belongsTo(db.User);

module.exports = db;
