import path from 'path'
import http from 'http'
import cors from "cors"
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable } from './models/major'
import { createAccountsTable, authRegistration } from './models/account'
import { createLikesTable, addLike, sendLikes } from './models/like'
import { createCountsTable, addCounts, sendCounts } from './models/count'
import { createCommentsTable, addComment, sendComment } from './models/comment'
import { createOnlineTable, addOnlineUser, sendOnlineUsers, removeOnlineUser } from './models/online'

const router = express.Router()
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const app = express()
const { Server } = require("socket.io")
const server = http.createServer(app)
const io = new Server(server)
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use(cors(corsOptions))
app.use(express.static(path.join(__dirname, '/../controllers')))
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
  authRegistration(res, req)
})


io.on('connection', (socket: any) => {

  socket.on('join', (username: any) => {
    addOnlineUser(username, socket.id)
    sendOnlineUsers(io)
  })

  socket.on('updateComment', (username: any, comment: any, page: any) => {
    addComment(page, username, comment)
    addCounts(page, 'comment')
    sendComment(io)
  })

  socket.on('updateLike', (comment: any, username: any, page: any) => {
    addLike(comment, page, username)
    sendLikes(io)
  })
  
  socket.on('updateCount', (page: any) => {
    addCounts(page, 'view')
    sendCounts(io)
  })
  
  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    sendOnlineUsers(io)
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}.`))