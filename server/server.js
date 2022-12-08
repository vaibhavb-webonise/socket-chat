import express from 'express'
import http from 'http'
import cors from 'cors'
import { Server } from 'socket.io'

const app = express();
app.use(cors());


const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: ' http//localhost:3002',//this is where basically our react app is running
        // method: ["GET", "POST"],
    }
})

io.on('connection', (socket) => {
    console.log('socket ', socket.id);

    socket.on('join__room', (data) => {
        socket.join(data)
        console.log('join room event ',data);
    })


    socket.on('send__message', data => {
        socket.to(data.room).emit('receive__message', data)
    })

    socket.on('disconnect', () => {
        console.log('user disconnected ....', socket.id);
    })
})



server.listen(3001, () => {
    console.log("server is running");
})
