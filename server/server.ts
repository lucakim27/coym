// import path from 'path'
import http from 'http'
import cors from "cors"
import mysql2 from 'mysql2'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable, getMajorList } from './models/major'
import { createAccountsTable, authSignUp, authSignIn } from './models/account'
import { createLikesTable, getLike, postLike } from './models/like'
import { createCountsTable, getCount, postCount } from './models/count'
import { createCommentsTable, getComment, postComment } from './models/comment'
import { createOnlineTable, addOnlineUser, sendOnlineUsers, removeOnlineUser } from './models/online'
import { createReplyTable, getReply, postReply } from './models/reply'
import { addChatUserAndChat, createChatTable, createChatUserTable, sendChatUser, sendChat } from './models/chat'

const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "coym"
})
const router = express.Router()
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200
}
const app = express()
const expressServer = http.createServer(app)
const PORT = process.env.PORT || 3000
const socketIoServer = app.listen(3001, function () {
  console.log('Socket.io Server running on port 3001')
})
const io = require('socket.io')(socketIoServer)

io.on('connection', function (socket: any) {

  socket.on('join', (username: any) => {
    addOnlineUser(connection, username, socket.id)
    sendOnlineUsers(connection, io)
  })

  socket.on('disconnect', function () {
    removeOnlineUser(connection, socket.id)
    sendOnlineUsers(connection, io)
  })

  socket.on('chatPageJoin', function (username: any, counterpart: any) {
    sendChat(connection, username, counterpart, io)
    sendChatUser(connection, username, io)
  })

  socket.on('sendMessage', function (username: any, counterpart: any, text: any) {
    addChatUserAndChat(connection, username, counterpart, text)
  })
  
})

app.use(express.json())
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({
   extended: false 
}))
app.use(cookieParser())
app.use('/', router)

/* 
create 'coym' database before you run
below lines are for creating tables for each models
*/
createMajorsTable(connection)
createCommentsTable(connection)
createCountsTable(connection)
createAccountsTable(connection)
createLikesTable(connection)
createOnlineTable(connection)
createReplyTable(connection)
createChatTable(connection)
createChatUserTable(connection)


router.post('/signUp', function (req: any, res: any) {
  authSignUp(connection, res, req)
})

router.get('/signIn', function (req: any, res: any) {
  authSignIn(connection, res, req)
})

router.get('/getComment', function (req: any, res: any) {
  getComment(connection, res, req)
})

router.post('/postComment', function (req: any, res: any) {
  postComment(connection, res, req)
})

router.get('/getLike', function (req: any, res: any) {
  getLike(connection, res, req)
})

router.post('/postLike', function (req: any, res: any) {
  postLike(connection, res, req)
})

router.get('/getCount', function (req: any, res: any) {
  getCount(connection, res, req)
})

router.post('/postCount', function (req: any, res: any) {
  postCount(connection, res, req)
})

router.get('/getReply', function (req: any, res: any) {
  getReply(connection, res, req)
})

router.post('/postReply', function (req: any, res: any) {
  postReply(connection, res, req)
})

router.get('/getMajorList', function (req: any, res: any) {
  console.log("YOOO")
  getMajorList(connection, res, req)
})

expressServer.listen(PORT, () => console.log(`Express Server running on port ${PORT}.`))