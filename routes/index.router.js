const accountRouter = require('./account.router');
const userRouter = require('./user.router');


// import du systeme de routing d'express 
const router = require('express').Router();

// Ici est mis en place toutes les sous routes de l'api qui redirige vers le 
// router en question en fonction de la suite de l'url '/api/???'

router.use('/user', userRouter)
router.use('/account', accountRouter)

// Export du module que l'on importe dans app.js
module.exports = router;