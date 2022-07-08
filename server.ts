import path from 'path'
import http from 'http'
import express from 'express'
import router from './routes/index'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createMajorsTable } from './models/major'
import { createAccountsTable } from './models/account'
import { createLikesTable, addLike, sendLikes } from './models/like'
import { createCountsTable, addCounts, sendCounts } from './models/count'
import { createCommentsTable, addComment, sendComment } from './models/comment'
import { createOnlineTable, addOnlineUser, sendOnlineUsers, removeOnlineUser } from './models/online'

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

server.listen(PORT, () => console.log(`Server running on port ${PORT}. Click here: http://localhost:3000`))