// import path from 'path'
import http from 'http'
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable } from './models/major'
import { createAccountsTable, authSignUp, authSignIn } from './models/account'
import { createLikesTable } from './models/like'
import { createCountsTable } from './models/count'
import { createCommentsTable, getComment, postComment } from './models/comment'
import { createOnlineTable } from './models/online'

const router = express.Router()
const corsOptions ={
   origin:'*', 
   credentials:true,
   optionSuccessStatus:200,
}
// const { Server } = require("socket.io")
// const io = new Server(server)
const app = express()
const server = http.createServer(app)
const PORT = process.env.PORT || 3000

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

// io.on('connection', (socket: any) => {

//   socket.on('join', (username: any) => {
//     addOnlineUser(username, socket.id)
//     sendOnlineUsers(io)
//   })

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
  
//   socket.on('disconnect', function () {
//     removeOnlineUser(socket.id)
//     sendOnlineUsers(io)
//   })

// })

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`))