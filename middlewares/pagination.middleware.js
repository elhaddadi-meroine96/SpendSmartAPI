const {Request, Response, NextFunction} = require('express')

const pagination = (options) => {


    const maxLimit = options?.maxLimit ?? 50;
    const defaultLimit = options?.defaultLimit ?? 25;


    /**
     * 
     * @param {Request} req
     * @param {Response} res
     * @param {NextFunction} next
     */
    return (req, res, next) => {

        const reqOffset = parseInt(req.query.offset); // NaN
        const reqLimit = parseInt(req.query.limit);

        const offset = (isNaN(reqOffset) || reqOffset < 0) ? 0 : reqOffset
        const limit = (isNaN(reqLimit) || reqLimit <= 0) ? defaultLimit : Math.min(reqLimit, maxLimit)


        req.pagination = {offset, limit}

        next();
    }

}

module.exports = pagination;