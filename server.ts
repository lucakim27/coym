import path from 'path'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import router from './routes/index';
import { getOccupationsArray, updateComment, updateLike, findOccupationComments, findComment } from './models/occupation'
import { countUpMostViewed, getMostViewed, countUpMostCommented, getMostCommented } from './models/count'
import { getOnlineUsers, addOnlineUser, removeOnlineUser, getPendingFriendsRequest, addPendingFriendsRequest, findOnlineUserByUsername, addFriendsList, getFriendsListByUsername, removePendingFriendsRequest, sentFriendsRequest } from './models/online'
import { searchChat, storeChatContent } from './models/chat'

const app = express()
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 3000

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/../views'))
app.set("view engine", "html")
app.use(express.static(path.join(__dirname, '/../controllers')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', router)

io.on('connection', (socket: any) => {
  io.to(socket.id).emit('userEnter', getOccupationsArray())
  io.to(socket.id).emit('getMostViewed', getMostViewed())
  io.to(socket.id).emit('getMostCommented', getMostCommented())
  io.to(socket.id).emit('getUsername')

  socket.on('emitPage', (page: any) => {
    io.to(socket.id).emit('getComments', findOccupationComments(page), page)
  })

  socket.on('addOnlineUser', (user: any) => {
    addOnlineUser(user, socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
    io.to(socket.id).emit('getOnlineUsers', getOnlineUsers())
    io.to(socket.id).emit('getFriendsList', getFriendsListByUsername(user))
    io.to(socket.id).emit('getChatUsers', getFriendsListByUsername(user))
  })

  socket.on('passBackUsername', (username: any) => {
    io.to(socket.id).emit('getFriendsRequestPending', getPendingFriendsRequest(username))
    io.to(socket.id).emit('getSentFriendsRequestPending', sentFriendsRequest(username))
  })

  socket.on('updateComment', (username: any, comment: any, page: any) => {
    var check = true
    var dateObj = new Date()
    var month = dateObj.getUTCMonth() + 1
    var day = dateObj.getUTCDate()
    var year = dateObj.getUTCFullYear()
    findOccupationComments(page).comments.forEach((element: any) => {
      if (element === comment) {
        check = false
        io.sockets.emit('duplicatedComment')
      }
    })
    if (check) {
      countUpMostCommented(page)
      updateComment(username, comment, page, `${year}-${month}-${day}`)
      io.sockets.emit('updatedComment', findComment(comment, page), page, 'Sucessfully updated comment')
    }
  })

  // need to make it responsive on the front end bit
  socket.on('updateLike', (row: any, username: any, page: any) => {
    // updateLike(row, username, page)
    // io.sockets.emit('updatedComment', findOccupationComments(page), page, 'Sucessfully updated like')
  })

  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
  })

  socket.on('countUpMostViewed', (occupationName: any) => {
    countUpMostViewed(occupationName)
  })

  socket.on('acceptFriendsRequest', (counterpart: any, user: any) => {
    addFriendsList(user, counterpart)
    addFriendsList(counterpart, user)
    io.to(findOnlineUserByUsername(counterpart)).emit('getFriendsList', getFriendsListByUsername(counterpart))
    io.to(findOnlineUserByUsername(user)).emit('getFriendsList', getFriendsListByUsername(user))
  })

  socket.on('getChatContents', (counterpart: any, user: any) => {
    io.to(findOnlineUserByUsername(user)).emit('displayChatContents', searchChat(user, counterpart))
  })

  socket.on('sendChatContents', (input: any, user: string, counterpart: string) => {
    if (user === '') {
      io.to(socket.id).emit('declineSendChatContents', 0)
    } else if (counterpart === '') {
      io.to(socket.id).emit('declineSendChatContents', 1)
    } else {
      storeChatContent(user, counterpart, input)
      io.to(findOnlineUserByUsername(counterpart)).emit('updateChatContents', searchChat(user, counterpart))
      io.to(findOnlineUserByUsername(user)).emit('updateChatContents', searchChat(user, counterpart))
    }
  })

  socket.on('friendsRequest', (counterpart: any, user: any) => {
    if (getFriendsListByUsername(counterpart) != undefined || getFriendsListByUsername(user) != undefined) {
      io.to(findOnlineUserByUsername(user)).emit('declineFriendsRequest', 0)
    } else if (getPendingFriendsRequest(counterpart) != 0 || getPendingFriendsRequest(user) != 0) {
      io.to(findOnlineUserByUsername(user)).emit('declineFriendsRequest', 1)
    } else {
      addPendingFriendsRequest(counterpart, user)
      if (findOnlineUserByUsername(counterpart) != '') {
        io.to(findOnlineUserByUsername(counterpart)).emit('updateFriendsRequest', getPendingFriendsRequest(counterpart))
        io.to(findOnlineUserByUsername(user)).emit('updateSentPendingFriendsRequest', sentFriendsRequest(user))
      }
    }
  })

  socket.on('removePendingFriendsRequest', (counterpart: any, user: any) => {
    removePendingFriendsRequest(counterpart)
    io.to(findOnlineUserByUsername(user)).emit('updatePendingFriendsRequest', getPendingFriendsRequest(user))
    io.to(findOnlineUserByUsername(counterpart)).emit('updateSentPendingFriendsRequest', sentFriendsRequest(counterpart))
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}. http://localhost:3000`))