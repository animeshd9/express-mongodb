const express = require('express')
const userController = require('../controllers/user')

const Router = express.Router()

Router.get('/get-user/:userId',userController.getUser)

module.exports = Router