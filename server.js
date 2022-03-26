const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const nodemailer = require('nodemailer')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const { getOccupationsArray, setOccupationsArray } = require('./utils/occupation')
const { searchAccounts, addAccount } = require('./utils/account')
const { getLoggedInUsersIdBySocketId, addLoggedInUsers } = require('./utils/loggedIn')
const { countUpMostViewed, getMostViewed } = require('./utils/count')
const { check, validationResult } = require('express-validator')

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const PORT = process.env.PORT || 3000

app.use(express.static(path.join(__dirname, 'src')))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('/', function (req, res) {
  res.render(__dirname + '/src/index.ejs')
})

app.get('/home', (req, res) => {
  if (req.cookies['current-user']) {
    res.render(__dirname + '/src/home.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/home.ejs')
  }
})

app.get('/comment', function (req, res) {
  if (req.cookies['current-user']) {
    res.render(__dirname + '/src/comment.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/comment.ejs', {
      user: "You're not logged in"
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

app.post('/auth', loginValidate, (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
  	return res.status(422).json({ errors: errors.array() })
  }
  else {
    console.log(req.body.username, req.body.password)
    res.cookie('current-user', req.body.username)
    res.redirect('/home')
  }
})

app.get('/register', function (req, res) {
  console.log(req.cookies['current-user'])
  res.render(__dirname + '/src/register.ejs')
})

app.get('/about', function (req, res) {
  if (req.cookies['current-user']) {
    res.render(__dirname + '/src/about.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/about.ejs', {
      user: "You're not logged in"
    })
  }
})

app.get('/chart', function (req, res) {
  if (req.cookies['current-user']) {
    res.render(__dirname + '/src/chart.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/chart.ejs', {
      user: "You're not logged in"
    })
  }
})

app.get('/request', function (req, res) {
  if (req.cookies['current-user']) {
    res.render(__dirname + '/src/request.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/src/request.ejs', {
      user: "You're not logged in"
    })
  }
})

io.on('connection', (socket) => {
  console.log("An user joined: " + socket.id)

  io.to(socket.id).emit('userEnter', getOccupationsArray())

  io.to(socket.id).emit('getMostViewed', getMostViewed())

  socket.on('updateComment', (array) => {
    setOccupationsArray(array)
    io.sockets.emit('updatedComment', getOccupationsArray())
  })

  socket.on('registerAccount', acc => {
    addAccount(acc)
  })

  socket.on('login', acc => {
    acc.push(socket.id)
    if (searchAccounts(acc)) {
      io.to(socket.id).emit('loginSuccessful', acc)
    } else {
      io.to(socket.id).emit('loginFail', false)
    }
  })

  socket.on('getId', socketid => {
    io.to(socket.id).emit('displayId', getLoggedInUsersIdBySocketId(socketid))
    console.log(getLoggedInUsersIdBySocketId(socketid))
  })

  socket.on('loggedIn', acc => {
    addLoggedInUsers(acc)
  })

  socket.on('disconnect', function () {
      console.log("The user disconnected: " + socket.id)
  })

  socket.on('countUpMostViewed', occupationName => {
    countUpMostViewed(occupationName)
  })

  socket.on('sendRequest', value => {
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'nikolaikim27@gmail.com',
        pass: 'zaq14789'
      }
    })
    
    var mailOptions = {
      from: 'nikolaikim27@gmail.com',
      to: 'nikolaikim27@gmail.com',
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
