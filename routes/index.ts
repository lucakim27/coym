import mysql2 from 'mysql2'
import { check, validationResult } from 'express-validator'
import { authLogin, authRegistration } from '../models/account'
import { majorsList } from '../models/major'
var express = require('express')
var router = express.Router()
export default router
const connection = mysql2.createConnection({
  host: "localhost",
  user: "root",
  database: "coym"
})

router.get('/', function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/index.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Welcome'
  })
})

router.get('/home', function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/home.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Home',
    majorsList: majorsList
  })
})

router.get('/comment', async function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/comment.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Comment',
    comments: JSON.stringify(await connection.promise().query(`SELECT * FROM comments WHERE page = "${decodeURIComponent(req.originalUrl.split('=')[1])}"`)),
    likes: JSON.stringify(await connection.promise().query(`SELECT * FROM likes  WHERE page = "${decodeURIComponent(req.originalUrl.split('=')[1])}"`))
  })
})

router.get('/chat', function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/chat.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Chat'
  })
})

router.get('/chart', async function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/chart.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Chart',
    counts: JSON.stringify(await connection.promise().query(`SELECT * FROM counts`)),
  })
})

router.get('/online', async function (req: any, res: any, next: any) {
  res.render(__dirname + '/../../views/online.ejs', {
    user: (req.cookies['current-user'] === undefined) ? undefined : req.cookies['current-user'].id,
    title: 'Online',
    onlineUsers: JSON.stringify(await connection.promise().query(`SELECT * FROM online`))
  })
})

router.get('/login', function (req: any, res: any, next: any) {
  if (req.cookies['current-user'] != undefined) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/login.ejs', {
      title: 'Login'
    })
  }
})

router.get('/register', function (req: any, res: any, next: any) {
  if (req.cookies['current-user'] != undefined) {
    return res.status(422).json({ errors: "You're already logged in" })
  } else {
    res.render(__dirname + '/../../views/register.ejs', {
      title: 'Register'
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
  } else {
    authLogin(res, req)
  }
})

router.post('/logout', function (req: any, res: any) {
  res.clearCookie("current-user")
  res.redirect('/home')
})

router.post('/authRegistration', registerValidate, function (req: any, res: any) {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() })
  } else {
    authRegistration(res, req)
  }
})