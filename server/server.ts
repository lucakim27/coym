// import path from 'path'
import http from 'http'
import cors from "cors"
import mysql2 from 'mysql2'
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable, getMajorList } from './models/major'
import { createAccountsTable, authSignUp, authSignIn, cookieValidation } from './models/account'
import { createLikesTable, getLike, postLike } from './models/like'
import { createCountsTable, getCount, postCount } from './models/count'
import { createCommentsTable, getComment, postComment } from './models/comment'
import { createOnlineTable, addOnlineUser, sendOnlineUsers, removeOnlineUser, dropOnlineTable } from './models/online'
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


// SELECT u.*, s.*
// FROM users u
//     inner join statuses s on u.status_id = s.id
// WHERE u.status_id = 2

// create 'coym' database before you run
createMajorsTable(connection)
createAccountsTable(connection)
createCountsTable(connection) // belongs to the majors table
createCommentsTable(connection) // belongs to the majors & accounts tables
createLikesTable(connection) // belongs to the comments & accounts tables
// dropOnlineTable(connection)
createOnlineTable(connection) // belongs to the accounts table
createReplyTable(connection) // belongs to the majors, accounts & comments tables
createChatUserTable(connection) // belongs to the accounts table
createChatTable(connection) // belongs to the accounts & chatUser tables


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
  getMajorList(connection, res, req)
})

router.get('/cookieValidation', function (req: any, res: any) {
  cookieValidation(connection, res, req)
})


expressServer.listen(PORT, () => console.log(`Express Server running on port ${PORT}.`))