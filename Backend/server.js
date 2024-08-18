require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const mongoURI = process.env.MONGO_URI
mongoose.connect(mongoURI)
const authenticateRouter = require('./routes/authenticateRouts')
app.use(express.json())

app.use('/authenticate',authenticateRouter)

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on port ${process.env.PORT}`)
})