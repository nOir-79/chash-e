const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer,{
    cors:{
        origin: "http://localhost:5173"
    }
})

io.on("connection",(socket)=>{
   socket.on('joinRoom',(room)=>{
        socket.join(room)
   })

   socket.on('sendMessage',(room,message)=>{
        io.to(room).emit('message',message)
   })
})

httpServer.listen(3000)