const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

var occupationArray = [
  ["software engineer", [], [], []],
  ["software developer", [], [], []],
  ["programmer", [], [], []]
]

app.use(express.static(path.join(__dirname, 'src')))

io.on('connection', (socket) => {
  console.log("New user joined " + socket.id)

  io.to(socket.id).emit('enter', occupationArray)
  
  socket.on('updateComment', (array) => {
    occupationArray = array
    io.sockets.emit('updatedComment', occupationArray)
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
