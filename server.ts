import path from 'path'
import http from 'http'
import mysql2 from 'mysql2'
import express from 'express'
import router from './routes/index'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createAccountsTable } from './models/account'
import { searchChat, storeChatContent } from './models/chat'
import { createOccupationsTable } from './models/occupation'
import { createCountsTable, addCounts } from './models/count'
import { createCommentsTable, addComment } from './models/comment'
import { getOnlineUsers, addOnlineUser, removeOnlineUser, findOnlineUserByUsername } from './models/online'
import { getPendingFriendsRequest, addPendingFriendsRequest, addFriendsList, getFriendsListByUsername, removePendingFriendsRequest, sentFriendsRequest } from './models/friend'

const app = express()
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 3000
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "coyo"
})

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/../views'))
app.set("view engine", "html")
app.use(express.static(path.join(__dirname, '/../controllers')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', router)

/* create 'coyo' database before you run */
createOccupationsTable()
createCommentsTable()
createCountsTable()
createAccountsTable()

io.on('connection', (socket: any) => {

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

  socket.on('updateComment', async (username: any, comment: any, page: any) => {
    addCounts(page, 'comment')
    addComment(page, username, comment)
    io.sockets.emit('updatedComment', JSON.stringify(await connection.promise().query(`SELECT * FROM comments`)))
  })

  socket.on('updateLike', (comment: any, username: any, page: any) => {
    // updateLike(comment, username, page)
    // io.sockets.emit('updatedLike', findLike(comment, page), comment)
  })

  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
  })

  socket.on('countUpMostViewed', (page: any) => {
    addCounts(page, 'view')
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}. Click here: http://localhost:3000`))