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
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/index.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/index.ejs', {
        user: ''
    })
  }
})

router.get('/home', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/home.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/home.ejs', {
        user: ''
    })
  }
})

router.get('/comment', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/comment.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/comment.ejs', {
        user: ''
    })
  }
})

router.get('/chat', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/chat.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/chat.ejs', {
        user: ''
    })
  }
})

router.get('/chart', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/chart.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/chart.ejs', {
        user: ''
    })
  }
})

router.get('/about', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/about.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/about.ejs', {
        user: ''
    })
  }
})

router.get('/login', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../views/login.ejs')
  }
})

router.get('/register', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../views/register.ejs')
  }
})

router.get('/online', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/online.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/online.ejs', {
        user: ''
    })
  }
})

router.get('/request', function(req, res, next) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../views/request.ejs', {
        user: req.cookies['current-user'].id
    })
  } else {
    res.render(__dirname + '/../views/request.ejs', {
        user: ''
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
  } else if (!searchAccounts(req.body.username, req.body.password)) {
      return res.status(422).json({ errors: "Your id or pw is incorrect" })
  } else {
      res.cookie('current-user', { id: req.body.username, pwd: req.body.password })
      res.redirect('/home')
  }
})

router.post('/logout', function(req, res) {
  res.cookie('current-user', undefined)
  res.redirect('/home')
})

router.post('/registerAccount', registerValidate, function (req, res) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() })
  } else if (checkAccountsById(req.body.username)) {
      return res.status(422).json({ errors: "Username is duplicated" })
  } else if(checkAccountsByPassword(req.body.password)) {
      return res.status(422).json({ errors: "Password is duplicated" })
  } else {
      addAccount([req.body.username, req.body.password])
      res.redirect('/login')
  }
})

module.exports = router
