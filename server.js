const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const routes = require('./routes/index')

const { 
  getOccupationsArray,
  updateComment,
  updateLike
} = require('./utils/occupation')

const {
  countUpMostViewed,
  getMostViewed,
  countUpMostCommented,
  getMostCommented
} = require('./utils/count')

const {
  getOnlineUsers,
  addOnlineUser,
  removeOnlineUser,
  getPendingFriendsRequest,
  addPendingFriendsRequest,
  findOnlineUserByUsername,
  findOnlineUserById,
  addFriendsList,
  getFriendsListByUsername
} = require('./utils/online')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, 'views'))
app.set("view engine", "html")
app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', routes)

app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {status:err.status, message:err.message})
})

io.on('connection', (socket) => {
  io.to(socket.id).emit('userEnter', getOccupationsArray())
  io.to(socket.id).emit('getMostViewed', getMostViewed())
  io.to(socket.id).emit('getMostCommented', getMostCommented())
  io.to(socket.id).emit('getOnlineUsers', getOnlineUsers())
  io.to(socket.id).emit('getFriendsList', getFriendsListByUsername(findOnlineUserById(socket.id)))
  io.to(socket.id).emit('getUsername')

  socket.on('passBackUsername', (username) => {
    io.to(socket.id).emit('getFriendsRequestPending', getPendingFriendsRequest(username))
  })

  socket.on('addOnlineUser', (user) => {
    addOnlineUser(user, socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
  })

  socket.on('updateComment', (username, comment, page) => {
    updateComment(username, comment, page)
    countUpMostCommented(page)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

  socket.on('updateLike', (index, row, username, page) => {
    updateLike(index, row, username, page)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })
  
  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
  })

  socket.on('countUpMostViewed', occupationName => {
    countUpMostViewed(occupationName)
  })

  socket.on('friendsRequest', (counterpart, user) => {
    addPendingFriendsRequest(counterpart, user)
    if (findOnlineUserByUsername(counterpart) != '') {
      io.to(findOnlineUserByUsername(counterpart)).emit('updateFriendsRequest', getPendingFriendsRequest(counterpart))
    }
  })

  socket.on('acceptFriendsRequest', (counterpart, user) => {
    addFriendsList(user, counterpart)
    addFriendsList(counterpart, user)
    io.to(findOnlineUserByUsername(counterpart)).emit('getFriendsList', getFriendsListByUsername(counterpart))
    io.to(findOnlineUserByUsername(user)).emit('getFriendsList', getFriendsListByUsername(user))
  })

  socket.on('sendRequest', value => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    })
    
    var mailOptions = {
      from: '',
      to: '',
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
