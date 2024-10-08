const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    images:[{
        type: String,
    }],
    location:{
        type:String,
    },
    quantity:{
        type: Number,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    details:{
        type:String
    },
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    category:[{
        type:String,
    }],
    availability:{
        type: Boolean
    }
})
module.exports = mongoose.model('Product',productSchema)