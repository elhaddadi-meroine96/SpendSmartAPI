const userDTO = require("../dto/user.dto");
const db = require("../models")



const userService = {

    create : async (userToAdd) => {

        const user = await db.User.create(userToAdd);

        return user ? new userDTO(user) : null;

    },

    getAll : async (limit, offset) => {
        const {rows, count} = await db.User.findAndCountAll({
            limit : limit, offset : offset
        });

        return {
            users : rows.map(u => new userDTO(u)),
            count
        }

    },

    getById : async (id) => {

        const user = await db.User.findByPk(id);

        return user ? new userDTO(user) : null;

    },

    getByEmail : async (email) => {

        const user = await db.User.findOne({
            where : {email : email}
        });

        return user ? new userDTO(user) : null;

    },

    update : async (id, userToUpdate) => {

        
        const updatedRows = await db.User.update(userToUpdate, {
            where : {id : id}
        })

        return updatedRows[0] === 1
    },

    delete : async (id) => {

        const deletedRows = await db.User.destroy({
            where : {id : id}
        })

        return deletedRows === 1

    },

    alreadyExist : async (email) => {
        const user = await db.User.findOne({
            where : {email : email}
        });
        
        return !!user
    }

}

module.exports = userService