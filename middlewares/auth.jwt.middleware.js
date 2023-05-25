const { Request, Response } = require("express")
const errorResponse = require("../utils/error.response")
const jwt = require("../utils/jwt.utils")


const authJwt = () => {


    /**
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return async (req, res, next) => {

        const bearerToken = req.headers.authorization
        
        if (!bearerToken || bearerToken == '') {
            res.sendStatus(401);
            return;
        }

        const token = bearerToken.split(" ")[1]

        try  {

            const payload = await jwt.decode(token);
    
            req.payload = payload

        } catch (error) {

            res.status(500).json(new errorResponse(error))
        }



        next();
    }
}

module.exports = authJwt