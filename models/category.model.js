const { Sequelize, ModelStatic, DataTypes } = require("sequelize");


/**
 * 
 * @param {Sequelize} sequelize 
 * @returns {ModelStatic<any>}
 */
module.exports = (sequelize) => {
    const Category = sequelize.define('Category',{
        name : {
            type : DataTypes.STRING,
            allowNull : false
        }
    })

    return Category;
}