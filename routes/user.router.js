const userController = require('../controllers/user.controller');
const pagination = require('../middlewares/pagination.middleware');


const userRouter = require('express').Router();


//getall - getid - getemail - update - delete


userRouter.route('/')
    .get(pagination(), userController.getAll)
    .post(userController.create)

userRouter.route('/:id([0-9]+)')
    .get(userController.getById)
    .patch(userController.update)
    .delete(userController.delete)

userRouter.route('/:email')
    .get(userController.getByEmail)


    module.exports = userRouter 