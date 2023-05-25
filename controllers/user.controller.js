const { Request, Response } = require("express");
const userService = require("../services/user.service")
const { successArrayResponse, successResponse } = require("../utils/success.response");
const errorResponse = require("../utils/error.response");


const userController = {

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
    create : async (req, res) => {
        const data = req.body;

        if (!(data.name || data.email)) {
           res.sendStatus(400);
           return; 
        }

        const user = await userService.create(data);

        if (!user) {
            res.sendStatus(400);
            return; 
        }

        res.status(201).json(new successResponse(user, 201))
    },


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getAll : async (req, res) => {

        const {limit, offset} = req.pagination;

        const {users, count} = await userService.getAll(limit, offset)
        
        res.status(200).json(new successArrayResponse(users, count, req))
    },

    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     */
    getById : async (req, res) => {
        const {id} = req.params

        const user = await userService.getById(id);

        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(new successResponse(user))

    },

    getByEmail : async (req, res) => {
        const {email} = req.params

        const user = await userService.getByEmail(email);

        if (!user) {
            res.sendStatus(404);
            return;
        }

        res.status(200).json(new successResponse(user))

    },

    update : async (req, res) => {
        const {id} = req.params;
        const data = req.body;

        const user = userService.getById(id);

        if (!data.email || (data.email != user.email && await userService.alreadyExist(data.email))) {
            res.status(400).json(new errorResponse("L'email que vous essayez de modifier est deja utilisé."))
            return;
        }

        const isUpdated = await userService.update(id, data);

        res.sendStatus(isUpdated ? 204 : 400)

    },

    delete : async (req, res) => {
        const {id} = req.params;

        res.sendStatus(await userService.delete(id) ? 204 : 400)
    }

}

module.exports = userController