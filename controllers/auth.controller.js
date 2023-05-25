const authService = require("../services/auth.service");
const userService = require("../services/user.service");
const errorResponse = require("../utils/error.response");
const jwt = require("../utils/jwt.utils");
const { successResponse } = require("../utils/success.response");


const authController = {

    register : async (req, res) => {
        const data = req.body

        if (await userService.alreadyExist(data.email)) {
            res.status(400).json(new errorResponse("L'email est deja utilisée."))
            return;
        }

        const user = await authService.register(data);

        if (!user) {
            res.status(400).json(new errorResponse("Erreur imprevue."))
            return;
        }

        const token = await jwt.generate(user);

        res.status(201).json(new successResponse({user, token}, 201))
    },

    login : async (req, res) => {
        const {email , password} = req.body;

        const user = await authService.login(email, password);

        if (!user) {

            res.status(400).json(new errorResponse("Email ou mot de passe invalide."))
            return
        }

        const token = await jwt.generate(user);
        
        res.status(200).json(new successResponse(user, token))
    }

}

module.exports = authController