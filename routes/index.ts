var express = require('express')
var router = express.Router()
export default router

import { check, validationResult } from 'express-validator'

import { searchAccounts, addAccount, checkAccountsById, checkAccountsByPassword } from '../api/account'

router.get('/', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/home', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/comment', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/chat', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/chart', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/about', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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

router.get('/login', function(req: { cookies: { [x: string]: { pwd: any, id: any } } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: string }): any; new(): any } }; render: (arg0: string, arg1: { page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/login.ejs', {
      page: 'COYO - Login'
    })
  }
})

router.get('/register', function(req: { cookies: { [x: string]: { pwd: any, id: any } } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: string }): any; new(): any } }; render: (arg0: string, arg1: { page: string }) => void }, next: any) {
  if (req.cookies['current-user'] != undefined && searchAccounts(req.cookies['current-user'].id, req.cookies['current-user'].pwd)) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/register.ejs', {
      page: 'COYO - Register'
    })
  }
})

router.get('/online', function(req: { cookies: { [x: string]: { id: any, pwd: any } } }, res: { render: (arg0: string, arg1: { user: any; page: string }) => void }, next: any) {
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
  .custom((value: any, {req}: any) => (
    value === req.body.password)
  )
  .trim()
  .escape()

]

router.post('/auth', loginValidate, (req: { body: { username: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: any }): any; new(): any } }; cookie: (arg0: string, arg1: { id: any; pwd: any }) => void; redirect: (arg0: string) => void }) => {
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

router.post('/logout', function(req: any, res: { cookie: (arg0: string, arg1: undefined) => void; redirect: (arg0: string) => void }) {
  res.cookie('current-user', undefined)
  res.redirect('/home')
})

router.post('/registerAccount', registerValidate, function (req: { body: { username: any; password: any } }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { errors: any }): any; new(): any } }; redirect: (arg0: string) => void }) {
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