const express = require('express')
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors =require('cors')
const app= express();
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(cors())


io.on("connection", (socket) => {
      console.log('a user connected'+socket.id);
      socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
          });
        socket.on('disconnect', () => {
              console.log('user disconnected');
            });
      });


      app.get("/",(req,res)=>{
        res.sendFile(__dirname+'/index.html')
      })
        httpServer.listen(5000,(err)=>{
            if(err){
                console.log(err)
            }else{
                console.log("connected to server")
            }
        })