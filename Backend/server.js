require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

//DATABASE CONNECTION 

const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)

//ROUTERS
const authenticateRouter = require('./routes/authenticateRouts')
const productRouter = require('./routes/productRoutes')
const orderRouter = require('./routes/orderRoutes')

//MIDDLEWARES
app.use(express.json())

app.use('/authenticate',authenticateRouter)
app.use('/product',productRouter)
app.use('/order',orderRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})