const { Sequelize, ModelStatic, DataTypes } = require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
    const Account = sequelize.define('Account',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        balance : {
            type : DataTypes.STRING,
            allowNull : false
        }
       
    })

    return Account;
}