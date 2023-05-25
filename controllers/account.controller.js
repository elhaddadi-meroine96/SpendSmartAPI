const {response, request} = require('express');
const accountService = require('../services/account.service');
const {successArrayResponse, successResponse} = require('../utils/success.response');

const accountController = {
    /**
     * Recupere tout les accounts
     * @param {request} req 
     * @param {response} res 
     */
    getAll : async (req, res) => {

        const {limit, offset} = req.pagination
        
        const {accounts, count} = await accountService.getAll(limit, offset)

        res.status(200).json(new successArrayResponse(accounts, count, req));

    },


    /**
     * Crée un nouveau account
     * @param {request} req 
     * @param {response} res 
     */
    create : async (req, res) => {
        
        const data = req.body;

        const alreadyExist = await accountService.alreadyExist(data.name)

        if (alreadyExist) {
            res.sendStatus(400)
            return;
        }

        const account = await accountService.create(data);

        if (!account) {
            res.sendStatus(400)
            return;
        }

        res.location('/account/' + account.id)

        res.status(201).json(new successResponse(account, 201))

    },

    /**
     * recupere un account par son id
     * @param {request} req 
     * @param {response} res 
     */
    getById : async (req, res) => {
        const account = await accountService.getById(req.params.id)

        if (!account) {
            res.sendStatus(404)
            return;
        }
            res.status(200).json(new successResponse(account))
        
        

    },

    /**
     * modifie une account par son id
     * @param {request} req 
     * @param {response} res 
     */
    update : async (req, res) => {

        const alreadyExist = await accountService.alreadyExist(req.body.name)

        if (alreadyExist) {
            res.sendStatus(400)
            return;
        }
        const isUpdate = await accountService.update(req.params.id, req.body);

        isUpdate ? res.sendStatus(204) : res.sendStatus(400)
        
    },

    /**
     * supprimer un account par son id
     * @param {request} req 
     * @param {response} res 
     */
    delete : async (req, res) => {
        const isDelete = await accountService.delete(req.params.id)

        if (!isDelete) {
            res.sendStatus(400)
        }
        else
        {
            res.sendStatus(204);
        }

        
    }
}

module.exports = accountController;