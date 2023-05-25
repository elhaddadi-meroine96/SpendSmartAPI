const {ObjectSChema} = require('yup') 
const errorResponse = require('../utils/error.response')


const bodyValidator = (yupValidator) => {

    return async (req, res, next) => {
    
        try {

            const validData = await yupValidator.noUnknown().validate(req.body, {abortEarly : false})
            req.body = validData
            next();
        } catch (error) {

            return res.status(400).json(new errorResponse(error.errors))
        }
    }

}

module.exports = bodyValidator