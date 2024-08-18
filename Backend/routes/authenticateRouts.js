const express = require('express')
const router = express.Router()
const authenticateController = require('../controllers/authenticateController')

router.post('/register',authenticateController.register)
router.post('/login',authenticateController.login)


module.exports = router