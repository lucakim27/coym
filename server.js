const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { 
  check,
  validationResult
} = require('express-validator')

const { 
  getOccupationsArray,
  updateComment,
  updateLike
} = require('./utils/occupation')

const {
  searchAccounts,
  addAccount,
  checkAccountsById,
  checkAccountsByPassword
} = require('./utils/account')

const {
  countUpMostViewed,
  getMostViewed,
  countUpMostCommented,
  getMostCommented
} = require('./utils/count')

const {
  getOnlineUsers,
  addOnlineUser,
  countUsers,
  removeOnlineUser,
  getFriendsList,
  addFriend
} = require('./utils/online')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', function (req, res) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/index.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/index.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/home', (req, res) => {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/home.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/home.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/online', (req, res) => {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/online.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/online.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/chat', (req, res) => {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/chat.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/chat.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/comment', function (req, res) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/comment.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/comment.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/login', function (req, res) {
  res.render(__dirname + '/src/login.ejs')
})

var loginValidate = [

  check('username')
  .isLength({ min: 8 })
  .withMessage('Username Must Be at Least 8 Characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .trim()
  .escape(),

  check('password')
  .isLength({ min: 8 })
  .withMessage('Password Must Be at Least 8 Characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .trim()
  .escape()

]

var registerValidate = [

  check('username')
  .isLength({ min: 8 })
  .withMessage('Username Must Be at Least 8 Characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .trim()
  .escape(),

  check('password')
  .isLength({ min: 8 })
  .withMessage('Password Must Be at Least 8 Characters')
  .matches('[0-9]')
  .withMessage('Password Must Contain a Number')
  .trim()
  .escape(),

  check('repassword', 'Passwords do not match')
  .custom((value, {req}) => (
    value === req.body.password)
  )
  .trim()
  .escape()

]

app.post('/auth', loginValidate, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  	return res.status(422).json({ errors: errors.array() })
  } else if (searchAccounts([req.body.username, req.body.password]) == false) {
    return res.status(422).json({ errors: "Your id or pw is incorrect" })
  } else {
    res.cookie('current-user', req.body.username)
    res.redirect('/home')
  }
})

app.post('/logout', function(req, res) {
  res.cookie('current-user', 'loggedout')
  res.redirect('/home')
})

app.get('/register', function (req, res) {
  res.render(__dirname + '/src/register.ejs')
})

app.post('/registerAccount', registerValidate, function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else if (checkAccountsById(req.body.username) == true) {
    return res.status(422).json({ errors: "Username is duplicated" })
  } else if(checkAccountsByPassword(req.body.password) == true) {
    return res.status(422).json({ errors: "Password is duplicated" })
  } else {
    addAccount([req.body.username, req.body.password])
    res.redirect('/login')
  }
})

app.get('/about', function (req, res) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/about.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/about.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/chart', function (req, res) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/chart.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/chart.ejs', {
      user: "anonymous"
    })
  }
})

app.get('/request', function (req, res) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/src/request.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/request.ejs', {
      user: "anonymous"
    })
  }
})

io.on('connection', (socket) => {
  io.to(socket.id).emit('userEnter', getOccupationsArray())
  io.to(socket.id).emit('getMostViewed', getMostViewed())
  io.to(socket.id).emit('getMostCommented', getMostCommented())
  io.to(socket.id).emit('getOnlineUsers', getOnlineUsers(), countUsers())
  io.to(socket.id).emit('getFriendsList', getFriendsList())

  socket.on('addOnlineUser', (user) => {
    addOnlineUser(user, socket.id)
    io.emit('getOnlineUsers', getOnlineUsers(), countUsers())
  })

  socket.on('updateComment', (username, comment, page) => {
    updateComment(username, comment, page)
    countUpMostCommented(page)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

  socket.on('updateLike', (comment, username, page) => {
    updateLike(comment, username, page)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })
  
  socket.on('disconnect', function () {
    removeOnlineUser(socket.id)
    io.emit('getOnlineUsers', getOnlineUsers())
    io.emit('getOnlineUsersNumber', countUsers())
  })

  socket.on('countUpMostViewed', occupationName => {
    countUpMostViewed(occupationName)
  })

  socket.on('sendRequest', value => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: '',
        pass: ''
      }
    })
    
    var mailOptions = {
      from: '',
      to: '',
      subject: value[0],
      text: value[1]
    }
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
        io.sockets.emit('requestSuccessful', null)
      }
    })
  })

})

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
