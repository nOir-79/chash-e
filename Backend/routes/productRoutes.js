const express = require('express')
const router = express.Router()
const productController = require('../controllers/productController')
const authorize = require('../middlewares/authorize')


router.post('/addProduct',authorize.authenticateJWT,authorize.roleAuthorize(['seller']),productController.addProduct)
router.get('/getProduct/:id',authorize.authenticateJWT,productController.getProduct)

router.get('/getProduct',authorize.authenticateJWT,productController.getAllProducts)

router.get('/getProductForSeller/:sellerId',authorize.authenticateJWT,productController.getProductForSeller)

router.put('/updateProduct',authorize.authenticateJWT,productController.updateProduct)

router.delete('/deleteProduct/:productId',authorize.authenticateJWT,productController.deleteProduct)

module.exports = router