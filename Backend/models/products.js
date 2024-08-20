const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
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
    }
})

module.exports = mongoose.model('Products',productSchema)