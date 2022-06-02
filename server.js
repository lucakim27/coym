const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
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
  addFriendsList,
  getFriendsListByUsername,
  removePendingFriendsRequest
} = require('./utils/online')

const { 
  getChat,
  addChatContent,
  getAllChats
} = require('./utils/chat')

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
  io.to(socket.id).emit('getUsername')
  
  socket.on('addOnlineUser', (user) => {
    addOnlineUser(user, socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
    io.to(socket.id).emit('getOnlineUsers', getOnlineUsers())
    io.to(socket.id).emit('getFriendsList', getFriendsListByUsername(user))
    io.to(socket.id).emit('getChatUsers', getFriendsListByUsername(user))
  })
  
  socket.on('passBackUsername', (username) => {
    io.to(socket.id).emit('getFriendsRequestPending', getPendingFriendsRequest(username))
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

  socket.on('acceptFriendsRequest', (counterpart, user) => {
    addFriendsList(user, counterpart)
    addFriendsList(counterpart, user)
    io.to(findOnlineUserByUsername(counterpart)).emit('getFriendsList', getFriendsListByUsername(counterpart))
    io.to(findOnlineUserByUsername(user)).emit('getFriendsList', getFriendsListByUsername(user))
  })

  socket.on('getChatContents', (counterpart, user) => {
    // work on here next time
    console.log(counterpart)
    console.log(user)
    console.log(getAllChats())
    console.log(getChat(user, counterpart))
    io.to(findOnlineUserByUsername(counterpart)).emit('displayChatContents', getChat(user, counterpart))
    io.to(findOnlineUserByUsername(user)).emit('displayChatContents', getChat(user, counterpart))
  })

  socket.on('sendChatContents', (input, user, counterpart) => {
    if (counterpart === '') {
      io.to(findOnlineUserByUsername(user)).emit('declineSendChatContents')
    } else {
      addChatContent(user, counterpart, input)
      io.to(findOnlineUserByUsername(counterpart)).emit('updateChatContents', getChat(user, counterpart))
      io.to(findOnlineUserByUsername(user)).emit('updateChatContents', getChat(user, counterpart))
    }
  })

  socket.on('friendsRequest', (counterpart, user) => {
    if (getFriendsListByUsername(counterpart) != undefined || getFriendsListByUsername(user) != undefined) {
      io.to(findOnlineUserByUsername(user)).emit('declineFriendsRequest', 0)
    } else if (getPendingFriendsRequest(counterpart) != 0 || getPendingFriendsRequest(user) != 0)  {
      io.to(findOnlineUserByUsername(user)).emit('declineFriendsRequest', 1)
    } else {
      addPendingFriendsRequest(counterpart, user)
      if (findOnlineUserByUsername(counterpart) != '') {
        io.to(findOnlineUserByUsername(counterpart)).emit('updateFriendsRequest', getPendingFriendsRequest(counterpart))
      }
    }
  })

  socket.on('removePendingFriendsRequest', (counterpart, user) => {
    /*
    user was 'y03278111', counterpart was 'y03278123'
      removePendingFriendsRequest
      0
      [ 'y03278123' ]
      0
      []
    */
    console.log('removePendingFriendsRequest')
    console.log(getPendingFriendsRequest(counterpart))
    console.log(getPendingFriendsRequest(user))
    // why is the parameter counterpart?
    removePendingFriendsRequest(counterpart)
    console.log(getPendingFriendsRequest(counterpart))
    io.to(findOnlineUserByUsername(user)).emit('updatePendingFriendsRequest', getPendingFriendsRequest(user))
    console.log(getPendingFriendsRequest(user))
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
