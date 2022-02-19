const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const { getOccupationsArray, setOccupationsArray } = require('./utils/occupation')
const { searchAccounts, addAccount } = require('./utils/account')
const { getLoggedInUsers, addLoggedInUsers } = require('./utils/loggedin')

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
    if (searchAccounts(acc) == true) {
      io.to(socket.id).emit('loginSuccessful', [socket.id, acc])
    } else {
      io.to(socket.id).emit('loginFail', false)
    }
  })

  socket.on('getId', socketid => {

    for (var i = 0; i < getLoggedInUsers().length; i++) {
      if (getLoggedInUsers()[i] == socketid) {
        
      }
    }


    addLoggedInUsers(socketid)




    io.sockets.emit('displayId', getLoggedInUsers())
    console.log(getLoggedInUsers())
  })

  socket.on('disconnect', function () {
      console.log("The user disconnected: " + socket.id)
  })
})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
