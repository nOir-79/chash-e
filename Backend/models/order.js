const mongoose = require('mongoose')


const orderSchema = new mongoose.Schema({
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    seller:{
         type: mongoose.Schema.Types.ObjectId,
         ref:'User',
         required:true
    },
    items:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    status:{
        type: String,
        enum:['Pending','Processing','Shipped','Delivered','Cancelled'],
        default:'Pending'
    },
    shippingAddress: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        division: { type: String, required: true },
        zipCode: { type: String, required: true },
        country: { type: String, required: true }
    },
    orderDate: {
        type: Date,
        default: Date.now
    },
    deliveryDate: {
        type: Date
    },
    cancellationReason: {
        type: String
    }
})

module.exports = mongoose.model('Order',orderSchema)