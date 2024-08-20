const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authorize = require('../middlewares/authorize')


router.post('/addProduct',authorize.authenticateJWT,authorize.roleAuthorize(['seller']),productController.addProduct)
router.get('/getProduct/:id',productController.getProduct)

module.exports = router