const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const nodemailer = require('nodemailer');
const { getOccupationsArray, setOccupationsArray } = require('./utils/occupation')
const { searchAccounts, addAccount } = require('./utils/account')
const { getLoggedInUsersIdBySocketId, addLoggedInUsers } = require('./utils/loggedIn')
const { countUpMostViewed, getMostViewed } = require('./utils/count')

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

app.get('/request', function (req, res) {
  res.sendFile(__dirname + '/src/request.html')
})

io.on('connection', (socket) => {
  console.log("An user joined: " + socket.id)

  io.to(socket.id).emit('userEnter', getOccupationsArray())

  io.to(socket.id).emit('getMostViewed', getMostViewed())

  socket.on('updateComment', (array) => {
    setOccupationsArray(array)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

  socket.on('registerAccount', acc => {
    addAccount(acc)
  })

  socket.on('login', acc => {
    acc.push(socket.id)
    if (searchAccounts(acc)) {
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

  socket.on('countUpMostViewed', occupationName => {
    countUpMostViewed(occupationName)
  })

  socket.on('sendRequest', value => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nikolaikim27@gmail.com',
        pass: 'zaq14789'
      }
    })
    
    var mailOptions = {
      from: 'nikolaikim27@gmail.com',
      to: 'nikolaikim27@gmail.com',
      subject: value[0],
      text: value[1]
    }
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        io.sockets.emit('requestSuccessful', null)
      }
    })
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
