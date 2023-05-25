const argon2 = require("argon2");
const db = require("../models");
const userDTO = require("../dto/user.dto");
const userService = require("./user.service");


const authService = {

    register : async (userToAdd) => {
        const pwdHash = await argon2.hash(userToAdd.password)

        userToAdd.password = pwdHash;

        const user = await db.User.create(userToAdd);

        return user ? new userDTO(user) : null
    },

    login : async (email, password) => {

        const user = await db.User.findOne({
            where : {
                email : email
            }
        });

        if (!user) {
            return null;
        }

        const isValidPassword = await argon2.verify(user.password, password)

        return isValidPassword ? new userDTO(user) : null
    }

}

module.exports = authService