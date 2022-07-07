import path from 'path'
import http from 'http'
import mysql2 from 'mysql2'
import express from 'express'
import router from './routes/index'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import { createLikesTable, addLike } from './models/like'
import { createAccountsTable } from './models/account'
import { createOccupationsTable } from './models/occupation'
import { createCountsTable, addCounts } from './models/count'
import { createCommentsTable, addComment, emitComment } from './models/comment'
import { createOnlineTable, addOnlineUser, updateNewOnlineUser, removeOnlineUser } from './models/online'

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

/* 
  create 'coyo' database before you run
  below lines are for creating tables for each models
*/
createOccupationsTable()
createCommentsTable()
createCountsTable()
createAccountsTable()
createLikesTable()
createOnlineTable()

io.on('connection', (socket: any) => {

  socket.on('addOnlineUser', (username: any) => {
    addOnlineUser(username, socket.id)
    updateNewOnlineUser(socket.id, io)
  })

  socket.on('updateComment', (username: any, comment: any, page: any) => {
    addCounts(page, 'comment')
    addComment(page, username, comment)
    emitComment(page, username, comment, io) // duplication issue when commenting same on the page but once refresh its gone.
  })

  socket.on('updateLike', (comment: any, username: any, page: any) => {
    addLike(comment, page, username)
    setTimeout(async function() {
      io.sockets.emit('updatedLikes', JSON.stringify(await connection.promise().query(`SELECT * FROM likes`)))
    }, 500)
  })
  
  socket.on('countUpMostViewed', async (page: any) => {
    addCounts(page, 'view')
    io.sockets.emit('updatedCounts', JSON.stringify(await connection.promise().query(`SELECT * FROM counts`))) // Didnt work on it yet
  })
  
  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    setTimeout(async function() {
      io.sockets.emit('updatedOnlineUsers', JSON.stringify(await connection.promise().query(`SELECT * FROM online`)))
    }, 500)
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}. Click here: http://localhost:3000`))