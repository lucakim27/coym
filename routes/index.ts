var express = require('express')
var router = express.Router()
export default router

import mysql2 from 'mysql2'
import { check, validationResult } from 'express-validator'
import { searchAccounts, addAccount, checkAccountsById, checkAccountsByPassword } from '../models/account'

router.get('/', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/index.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Welcome'
    })
  } else {
    res.render(__dirname + '/../../views/index.ejs', {
      user: '',
      page: 'COYO - Welcome'
    })
  }
})

router.get('/home', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/home.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Home'
    })
  } else {
    res.render(__dirname + '/../../views/home.ejs', {
      user: '',
      page: 'COYO - Home'
    })
  }
})

router.get('/comment', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/comment.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Comment'
    })
  } else {
    res.render(__dirname + '/../../views/comment.ejs', {
      user: '',
      page: 'COYO - Comment'
    })
  }
})

router.get('/chat', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/chat.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Chat'
    })
  } else {
    res.render(__dirname + '/../../views/chat.ejs', {
      user: '',
      page: 'COYO - Chat'
    })
  }
})

router.get('/chart', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/chart.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Chart'
    })
  } else {
    res.render(__dirname + '/../../views/chart.ejs', {
      user: '',
      page: 'COYO - Chart'
    })
  }
})

router.get('/about', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/about.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - About'
    })
  } else {
    res.render(__dirname + '/../../views/about.ejs', {
      user: '',
      page: 'COYO - About'
    })
  }
})

router.get('/login', function (req: any, res: any, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/login.ejs', {
      page: 'COYO - Login'
    })
  }
})

router.get('/register', function (req: any, res: any, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/register.ejs', {
      page: 'COYO - Register'
    })
  }
})

router.get('/online', function (req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    res.render(__dirname + '/../../views/online.ejs', {
      user: req.cookies['current-user'].id,
      page: 'COYO - Online'
    })
  } else {
    res.render(__dirname + '/../../views/online.ejs', {
      user: '',
      page: 'COYO - Online'
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
    .custom((value: any, { req }: any) => (
      value === req.body.password)
    )
    .trim()
    .escape()

]

router.post('/auth', loginValidate, (req: any, res: any) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  }
  const con = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coyo"
  })

  con.connect(function (err: any) {
    if (err) throw err

    con.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
      if (err) throw err
      for (var i = 0; i < result.length; i++) {
        if (req.body.username === result[i].username && req.body.password === result[i].password) {
          console.log("Wrong username or password")
          res.redirect('/login')
          // res.send(`<script>alert("Wrong username or password"); window.location.href = "/login"; </script>`)
        } else {
          res.cookie('current-user', { id: req.body.username, pwd: req.body.password })
          res.redirect('/home')
        }
      }
    })

  })





})

router.post('/logout', function (req: any, res: { cookie: (arg0: string, arg1: undefined) => void; redirect: (arg0: string) => void }) {
  res.cookie('current-user', undefined)
  res.redirect('/home')
})

router.post('/registerAccount', registerValidate, function (req: any, res: any) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else if (checkAccountsById(req.body.username)) {
    return res.status(422).json({ errors: "Username is duplicated" })
  } else if (checkAccountsByPassword(req.body.password)) {
    return res.status(422).json({ errors: "Password is duplicated" })
  } else {

    const connection = mysql2.createConnection({
      host: "localhost",
      user: "root",
      database: "coyo"
    })

    connection.connect(function (err: any) {
      if (err) throw err

      connection.query(`CREATE TABLE IF NOT EXISTS accounts (username VARCHAR(255), password VARCHAR(255))`, function (err: any, result: any) {
        if (err) throw err
      })

      connection.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
        if (err) throw err

        if (result.length !== 0) {
          var existing = false

          for (var i = 0; i < result.length; i++) {
            if (req.body.username === result[i].username && req.body.password === result[i].password) {
              res.send(`<script>alert("Account already exists"); window.location.href = "/register"; </script>`)
              existing = true
              connection.end()
            }
          }

          if (!existing) {
            addAccount(req.body.username, req.body.password)
            res.redirect('/login')
            connection.end()
          }
        }
      })

    })

  }
})