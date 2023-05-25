const jsonwebtoken = require('jsonwebtoken')

const jwt = {
    generate : ({id, role}) => {

        return new Promise((resolve, reject) => {
            const {JWT_SECRET, JWT_ISSUER, JWT_AUDIENCE} = process.env;
            const payload = {id, role};
            const secret = JWT_SECRET;
            const options = {
                algorithm : "HS256",
                expiresIn : "365d",
                audience : JWT_AUDIENCE,
                issuer : JWT_ISSUER
            }

            jsonwebtoken.sign(payload, secret,options, (error, token) => {
                if (error) {
                    reject(error);
                }

                resolve(token);
            })

        });
        
    },

    decode : (token) => {

        return new Promise((resolve, reject) => {

            const options = {
                issuer : "ENIOREM",
                audience: "ENIOREM"
            }

            jsonwebtoken.decode(token, JWT_SECRET, options, (error, payload) => {
               
               
                if (error) {
                    reject(error);
                }

                resolve(payload)
            })
        })
    }
}

module.exports = jwt