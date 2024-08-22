const express = require('express')
const router = express.Router()
const orderController = require('../controllers/orderController')
const authorize = require('../middlewares/authorize')


router.post('/createOrder',authorize.authenticateJWT,authorize.roleAuthorize(['buyer']),orderController.createOrder)

router.get('/getOrder/:orderId',authorize.authenticateJWT,orderController.getOrder)

router.get('/getOrder',authorize.authenticateJWT,orderController.getAllOrders)

router.get('/getOrderForBuyer/:buyerId',authorize.authenticateJWT,orderController.getOrderForBuyer)

router.get('/getOrderForSeller/:sellerId',authorize.authenticateJWT,orderController.getOrderForSeller)

router.put('/updateOrder',authorize.authenticateJWT,orderController.updateOrder)

router.delete('/deleteOrder/:orderId',authorize.authenticateJWT,orderController.deleteOrder)

module.exports = router