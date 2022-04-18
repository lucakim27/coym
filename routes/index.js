var express = require('express')
var router = express.Router()

const { 
    check,
    validationResult
} = require('express-validator')

const {
    searchAccounts,
    addAccount,
    checkAccountsById,
    checkAccountsByPassword
} = require('../utils/account')

router.get('/', function(req, res, next) {
  if (
      req.cookies['current-user'] &&
      req.cookies['current-user'] != 'loggedout'
  ) {
      res.render(__dirname + '/../views/index.ejs', {
          user: req.cookies['current-user']
  })
  } else {
      res.render(__dirname + '/../views/index.ejs', {
          user: "anonymous"
      })
  }
})

router.get('/home', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/home.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/home.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/comment', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/comment.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/comment.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/chat', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/chat.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/chat.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/chart', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/chart.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/chart.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/about', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/about.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/about.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/login', function(req, res, next) {
  res.render(__dirname + '/../views/login.ejs')
})

router.get('/online', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/online.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/online.ejs', {
      user: "anonymous"
    })
  }
})

router.get('/register', function(req, res, next) {
  res.render(__dirname + '/../views/register.ejs')
})

router.get('/request', function(req, res, next) {
  if (
    req.cookies['current-user'] &&
    req.cookies['current-user'] != 'loggedout'
  ) {
    res.render(__dirname + '/../views/request.ejs', {
      user: req.cookies['current-user']
    })
  } else {
    res.render(__dirname + '/../views/request.ejs', {
      user: "anonymous"
    })
  }
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

router.post('/auth', loginValidate, (req, res) => {
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

router.post('/logout', function(req, res) {
  res.cookie('current-user', 'loggedout')
  res.redirect('/home')
})

router.post('/registerAccount', registerValidate, function (req, res) {
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

module.exports = router
