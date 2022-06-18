import path from 'path';
import http from 'http';
import express from 'express';
// import { Server } from "socket.io";
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

import route from './routes/index';

import { getOccupationsArray, updateComment, updateLike, findOccupationComments } from './api/occupation';

import { countUpMostViewed, getMostViewed, countUpMostCommented, getMostCommented } from './api/count';

import { getOnlineUsers, addOnlineUser, removeOnlineUser, getPendingFriendsRequest, addPendingFriendsRequest, findOnlineUserByUsername, addFriendsList, getFriendsListByUsername, removePendingFriendsRequest, sentFriendsRequest } from './api/online';

import { getChat, addChatContent, getAllChats } from './api/chat';
const app = express()
const server = http.createServer(app)
import { createServer } from "http";
import { Server, Socket } from "socket.io";

const httpServer = createServer();
const io = new Server(httpServer, {
  // ...
});
const PORT = process.env.PORT || 3000

app.engine('html', require('ejs').renderFile)
app.set('views', path.join(__dirname, '/../views'))
app.set("view engine", "html")
app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', route)
app.use(function (req: any, res: any, next: (arg0: Error) => void) {
  var err = new Error('Not Found')
  // err.status = 404
  next(err)
})

app.use(function (err: { status: any; message: any; }, req: any, res: { status: (arg0: any) => void; render: (arg0: string, arg1: { status: any; message: any; }) => void; }, next: any) {
  res.status(err.status || 500)
  res.render('error', { status: err.status, message: err.message })
})

io.on('connection', (socket: any) => {
  io.to(socket.id).emit('userEnter', getOccupationsArray())
  io.to(socket.id).emit('getMostViewed', getMostViewed())
  io.to(socket.id).emit('getMostCommented', getMostCommented())
  io.to(socket.id).emit('getUsername')

  socket.on('emitPage', (page: any) => {
    io.to(socket.id).emit('getComments', findOccupationComments(page))
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
      io.sockets.emit('updatedComment', findOccupationComments(page), 0)
    }
  })

  socket.on('updateLike', (row: any, username: any, page: any) => {
    updateLike(row, username, page)
    io.sockets.emit('updatedComment', findOccupationComments(page), 1)
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
    console.log('getChatContents')
    console.log(counterpart)
    console.log(user)
    console.log(getAllChats())
    console.log(getChat(user, counterpart))
    console.log(findOnlineUserByUsername(user))
    // why would you send to the counterpart?
    // io.to(findOnlineUserByUsername(counterpart)).emit('displayChatContents', getChat(user, counterpart))
    io.to(findOnlineUserByUsername(user)).emit('displayChatContents', getChat(user, counterpart))
    // why i cant emit to the client side?
  })

  socket.on('sendChatContents', (input: any, user: string, counterpart: string) => {
    if (user === '') {
      io.to(socket.id).emit('declineSendChatContents', 0)
    } else if (counterpart === '') {
      io.to(socket.id).emit('declineSendChatContents', 1)
    } else {
      addChatContent(user, counterpart, input)
      io.to(findOnlineUserByUsername(counterpart)).emit('updateChatContents', getChat(user, counterpart))
      io.to(findOnlineUserByUsername(user)).emit('updateChatContents', getChat(user, counterpart))
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

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))