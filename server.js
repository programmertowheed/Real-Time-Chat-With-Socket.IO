const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


io.on('connection', (socket) => {
    console.log('Connected')

    io.emit('noOfConnections', io.engine.clientsCount)


    socket.on('disconnect', () => {
        console.log('disconnected')
        io.emit('noOfConnections', io.engine.clientsCount)
    })



    socket.on('chat-message', (msg) => {
        socket.broadcast.emit('chat-message', msg)
    })
    socket.on('joined', (name) => {
        socket.broadcast.emit('joined', name)
    })
    socket.on('leaved', (name) => {
        socket.broadcast.emit('leaved', name)
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data)
    })
    socket.on('stoptyping', () => {
        socket.broadcast.emit('stoptyping')
    })


})

server.listen(3000, () => {
  console.log('Server is listening on port: 3000');
});