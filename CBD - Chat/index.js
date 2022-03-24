const express = require("express");
const http = require("http")
const app = express();
const server = http.createServer(app)
const bodyParser =  require('body-parser')
const { Server } = require('socket.io')
const  io = new Server( server, {
    cors: {
        origin: '*',
    }
} )
const cors = require('cors')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))
app.use(cors())

io.on('connection', (socket ) => {
    let token = socket.handshake.query.isAdmin;
    console.log(token)
    console.log('a user connected');
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
    socket.on('message_send', (data)=> {
        console.log(data)
        console.log(`Message fraom ${data.userName} :  ${data.message}`)
        io.emit('message_send', `Message from ${data.userName} :  ${data.message}`);
    })
})

server.listen( 4030, function() {
    console.log('Server starting')
})