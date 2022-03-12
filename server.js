const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { getOccupationsArray, setOccupationsArray } = require('./utils/occupation')
const { searchAccounts, addAccount } = require('./utils/account')
const { getLoggedInUsersIdBySocketId, addLoggedInUsers } = require('./utils/loggedIn')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'src')))

app.get('/comment', function (req, res) {
  res.sendFile(__dirname + '/src/comment.html')
})

app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/src/login.html')
})

app.get('/register', function (req, res) {
  res.sendFile(__dirname + '/src/register.html')
})

app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/src/about.html')
})

app.get('/chart', function (req, res) {
  res.sendFile(__dirname + '/src/chart.html')
})

io.on('connection', (socket) => {
  console.log("An user joined: " + socket.id)

  io.to(socket.id).emit('userEnter', getOccupationsArray())

  socket.on('updateComment', (array) => {
    setOccupationsArray(array)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

  socket.on('registerAccount', acc => {
    addAccount(acc)
  })

  socket.on('login', acc => {
    acc.push(socket.id)
    if (searchAccounts(acc) == true) {
      io.to(socket.id).emit('loginSuccessful', acc)
    } else {
      io.to(socket.id).emit('loginFail', false)
    }
  })

  socket.on('getId', socketid => {
    io.sockets.emit('displayId', getLoggedInUsersIdBySocketId(socketid))
  })

  socket.on('loggedIn', acc => {
    addLoggedInUsers(acc)
  })

  socket.on('disconnect', function () {
      console.log("The user disconnected: " + socket.id)
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
