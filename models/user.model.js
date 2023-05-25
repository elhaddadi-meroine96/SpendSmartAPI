const { Sequelize, ModelStatic, DataTypes } = require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
    const User = sequelize.define('User',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        email : {
            type : DataTypes.STRING,
            allowNull : false,
            unique : 'UK_User_Email'
        },
        password : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })

    return User;
}