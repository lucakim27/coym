const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app);
const io = socketio(server)


const occupationArray = [
  ["software engineer", [], [], []],
  ["software developer", [], [], []],
  ["programmer", [], [], []]
]

app.use(express.static(path.join(__dirname, 'src')))

io.on('connection', (socket) => {
  console.log('An user connected');

  io.to(socket.id).emit('enter', occupationArray)

})

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
