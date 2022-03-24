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

const userNamespace = io.of("/users");
const adminNamespace = io.of("/admin");


userNamespace.on('connection', (socket ) => {
    console.log('user connected')
    socket.join('clientService1')
    socket.on('disconnect', () =>{
        console.log('user disconnected');
    })
    socket.on('message_send', (data)=> {
        console.log(`Message from ${data.userName} :  ${data.message}`)
        
        adminNamespace.in('clientService1').emit('message_sended', data);
    })
})

adminNamespace.on('connection', (socket ) => {
    socket.join('clientService1')
    socket.on('disconnect', () =>{
        console.log('admin disconnected');
    })
    socket.on('message_send', (data)=> {
        console.log(`Message from ${data.userName}:  ${data.message}`)
        userNamespace.in('clientService1').emit('message_sended', data);
    })
})

server.listen( 4030, function() {
    console.log('Server starting')
})