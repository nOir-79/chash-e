const Order = require('../models/order')

//API ENDPOINT TO POST AND CREATE AN ORDER

exports.createOrder = async(req,res)=>{
    try{
        const {buyer,seller,items,shippingAddress,deliveryDate} = req.body

        let {status,orderDate} = req.body

        if(!(buyer && seller && items && shippingAddress && deliveryDate)){
            console.log('Mandatory information not given')
            return res.status(401).send('Provide all the necessary information')
        }
    
        if(!status)
            status = 'Pending'
        if(!orderDate)
            orderDate = Date.now()
    
        const order = new Order({
            buyer:buyer,
            seller:seller,
            items:items,
            shippingAddress:shippingAddress,
            status:status,
            orderDate:orderDate,
            deliveryDate:deliveryDate
        })
    
        const savedOrder = await order.save()

        return res.status(200).send(`Successfully placed order with id ${savedOrder._id}`)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
    
}


// API ENDPOINT TO GET A SINGLE ORDER

exports.getOrder = async(req,res)=>{
    try{
        const orderId = req.params.orderId
        if(!orderId){
            console.log('No orderID received')
            return res.status(402).send('Need an order ID')
        }

        const order = await Order.findById(orderId)

        if(!order){
            console.log('Order not found')
            return res.status(403).send(`No order is present with the order ID: ${orderId}`)
        }

        return res.status(200).send(order)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}

//API ENDPOINT TO GET ALL ORDERS

exports.getAllOrders = async(req,res)=>{
    try{
        const orders = await Order.find()

        return res.status(200).send(orders)
    }catch(error){
        console.error(error)
        return res.status(500).send('Internal Server Error')
    }
}


//API ENDPOINT TO UPDATE AN ORDER BY ID

exports.updateOrder = async(req,res)=>{
    try{
        const orderId = req.body.orderId
        const updateData = req.body.updateData
        const updatedOrder = await Order.findByIdAndUpdate(orderId,updateData,{new:true})

        if(!updatedOrder){
            console.log(`There is not order with id: ${orderId}`)
            return res.status(405).send(`There is no order with id: ${orderId}`)
        }

        return res.status(200).send(updatedOrder)
    }catch(error){
        console.error(error)
        res.status(500).send('Internal Server Error')
    }
}

//API ENDPOINT TO DELETE AN ORDER BY ID

exports.deleteOrder = async(req,res) =>{
    try{
        const orderId = req.params.orderId
        if(!orderId){
            console.log('Need an order id')
            res.status(404).send('You need to provide an order id')
        }

        const deletedOrder = await Order.findByIdAndDelete(orderId)

        if(!deletedOrder){
            console.log(`No order with id: ${orderId}`)
            res.status(406).send(`No order with id: ${orderId}`)

        }

        return res.status(200).send("Order Deleted")
    }catch(error){
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}


//API ENDPOINT FOR GETTING THE ORDERS OF A BUYER

exports.getOrderForBuyer = async(req,res) =>{
    try{
        const buyerId = req.params.buyerId
        if(!buyerId){
            console.log('Need a buyer id')
            res.status(404).send('You need to provide a buyer id')
        }

        const buyerOrders = await Order.find({buyer:buyerId})
        if(!buyerOrders){
            console.log(`No order with id: ${buyerId}`)
            res.status(407).send(`No order with id: ${buyerId}`)
        }

        return res.status(200).send(buyerOrders)
    }catch(error){
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}

//API ENDPOINT FOR GETTING ALL THE ORDERS RELATED TO A SELLER
exports.getOrderForSeller = async(req,res) =>{
    try{
        const sellerId = req.params.sellerId
        if(!sellerId){
            console.log('Need a seller id')
            res.status(404).send('You need to provide a seller id')
        }

        const sellerOrders = await Order.find({seller:sellerId})
        if(!sellerOrders){
            console.log(`No order with id: ${sellerId}`)
            res.status(408).send(`No order with id: ${sellerId}`)
        }

        return res.status(200).send(sellerOrders)
    }catch(error){
        console.error(error)
        return res.status(500).send("Internal server error")
    }
}
