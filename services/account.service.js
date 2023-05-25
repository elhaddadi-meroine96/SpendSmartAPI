// Requiert l'objet de transfert de données accountDTO
const accountDTO = require("../dto/account.dto");

// Requiert les modèles de la base de données
const db = require("../models");


// Crée un objet pour stocker toutes les fonctions de service de account
const accountService = {


    // Obtenir tous les accounts de la base de données
    getAll : async (limit, offset) => {
        const {rows, count} = await db.Account.findAndCountAll({
            limit : limit,
            offset : offset
        });

        return {
            accounts : rows.map(account => new accountDTO(account)),
            count : count
        }
    },

    // Obtenir un seul account par son ID
    getById : async (id) => {
        // Récupérer le account de la base de données
        const account = await db.account.findByPk(id);
        // Renvoie le account sous forme d'objet account DTO s'il existe, sinon renvoie null
        return account ? new accountDTO(account) : null;
    },
    // Créer un nouveau account dans la base de données
    create : async (accountToAdd) => {
        // Crée le account dans la base de données
        const account = await db.account.create(accountToAdd);
        // Renvoie le account sous forme d'objet account DTO s'il existe, sinon renvoie null
        return account ? new accountDTO(account) : null;
    },
    // Mettre à jour un account existant dans la base de données
    update : async (id, accountToUpdate) => {
        // Met à jour le account dans la base de données
        const updateRows = await db.account.update(accountToUpdate, {
            where : {id}
        });
        // Renvoie true si la mise à jour a réussi, sinon renvoie false
        return updateRows[0] === 1
    },
    // Supprimer un account existant dans la base de données
    delete : async (id) => {
        // Supprime le account de la base de données
        const deletedRows = await db.account.destroy({
            where : {id}
        })
        // Renvoie true si la suppression a réussi, sinon renvoie false
        return deletedRows === 1;
    },
    // Vérifie si un account existe déjà dans la base de données
    alreadyExist : async (newName) => {
        // Récupérer le account de la base de données
        const account = await db.account.findOne({where : {name : newName}})
        // Renvoie true si le account existe, sinon renvoie false
        return !!account
    }
}
// Exporte l'objet de service account
module.exports = accountService;