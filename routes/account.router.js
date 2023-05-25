const accountController = require('../controllers/account.controller');
const pagination = require('../middlewares/pagination.middleware');

const accountRouter = require('express').Router();

// Ici nous checkons les routes et leur verb HTTP pour determiner vers quel methodes
// nous allons etre redirigé dans nos controllers
// ex : /api/account/1 en GET renvoi vers accountController.GetById(id)
accountRouter.route('/')
    .get(pagination(), accountController.getAll)
    .post(accountController.create)

accountRouter.route('/:id')
    .get(accountController.getById)
    .put(accountController.update)
    .delete(accountController.delete)

module.exports = accountRouter;