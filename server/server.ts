// import path from 'path'
import http from 'http'
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable } from './models/major'
import { createAccountsTable, authSignUp, authSignIn } from './models/account'
import { createLikesTable, getLike, postLike } from './models/like'
import { createCountsTable, getCount, postCount } from './models/count'
import { createCommentsTable, getComment, postComment } from './models/comment'
import { createOnlineTable, addOnlineUser, sendOnlineUsers, removeOnlineUser } from './models/online'
import { createReplyTable, getReply, postReply } from './models/reply'

const router = express.Router()
const corsOptions = {
  origin: '*',
  credentials: true,
  optionSuccessStatus: 200,
}
const app = express()
const expressServer = http.createServer(app)
const PORT = process.env.PORT || 3000
const socketIoServer = app.listen(3001, function () {
  console.log('Socket.io Server running on port 3001')
})
const io = require('socket.io')(socketIoServer)

io.on('connection', function (socket: any) {

  console.log('User joins: ' + socket.id)

  socket.on('SEND_MESSAGE', function (data: any) {
    io.emit('MESSAGE', data)
  })

  socket.on('join', (username: any) => {
    addOnlineUser(username, socket.id)
    sendOnlineUsers(io)
  })

  socket.on('disconnect', function () {
    console.log("User disconnects: " + socket.id)
    removeOnlineUser(socket.id)
    sendOnlineUsers(io)
  })
  
  //   socket.on('updateComment', (username: any, comment: any, page: any) => {
  //     addComment(page, username, comment)
  //     addCounts(page, 'comment')
  //     sendComment(io)
  //   })
  
  //   socket.on('updateLike', (comment: any, username: any, page: any) => {
  //     addLike(comment, page, username)
  //     sendLikes(io)
  //   })
  
  //   socket.on('updateCount', (page: any) => {
  //     addCounts(page, 'view')
  //     sendCounts(io)
  //   })

})

app.use(express.json());
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/', router)

/* 
create 'coym' database before you run
below lines are for creating tables for each models
*/
createMajorsTable()
createCommentsTable()
createCountsTable()
createAccountsTable()
createLikesTable()
createOnlineTable()
createReplyTable()

router.post('/signUp', function (req: any, res: any) {
  authSignUp(res, req)
})

router.get('/signIn', function (req: any, res: any) {
  authSignIn(res, req)
})

router.get('/getComment', function (req: any, res: any) {
  getComment(res, req)
})

router.post('/postComment', function (req: any, res: any) {
  postComment(res, req)
})

router.get('/getLike', function (req: any, res: any) {
  getLike(res, req)
})

router.post('/postLike', function (req: any, res: any) {
  postLike(res, req)
})

router.get('/getCount', function (req: any, res: any) {
  getCount(res, req)
})

router.post('/postCount', function (req: any, res: any) {
  postCount(res, req)
})

router.get('/getReply', function (req: any, res: any) {
  getReply(res, req)
})

router.post('/postReply', function (req: any, res: any) {
  postReply(res, req)
})

expressServer.listen(PORT, () => console.log(`Express Server running on port ${PORT}.`))