const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { getOccupationsArray, setOccupationsArray } = require('./utils/occupation')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

// var accArray = [
//   ["admin@gmail.com", "12345"]
// ]

app.use(express.static(path.join(__dirname, 'src')))

app.get('/comment', function (req, res) {
  res.sendFile(__dirname + '/src/comment.html')
})

io.on('connection', (socket) => {
  console.log("New user joined " + socket.id)

  io.to(socket.id).emit('userEnter', getOccupationsArray())

  socket.on('updateComment', (array) => {
    setOccupationsArray(array)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
