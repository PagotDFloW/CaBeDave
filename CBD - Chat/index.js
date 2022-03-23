const express = require("express");
const http = require("http")
const app = express();
const server = http.createServer(app)
const { Server } = require('socket.io')
const  io = new Server( server, {
    cors: {
        origin: '*',
    }
} )
const cors = require('cors')
app.use(cors())