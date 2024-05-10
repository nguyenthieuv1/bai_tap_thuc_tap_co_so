const express = require('express')
const route = express.Router()
const loginController = require('../app/controllers/loginController')
route.get('/',loginController.showLoginForm)
route.post('/',loginController.checkLogin)

route.get('/logout',loginController.logout)
module.exports = route