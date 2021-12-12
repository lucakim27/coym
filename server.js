const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { all } = require('express/lib/application')

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
  console.log('An user connected')

  io.to(socket.id).emit('enter', occupationArray)
  
  socket.on('updateComment', (array) => {
    this.occupationArray = this.array
    io.emit('updatedComment')
  })
})


server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
