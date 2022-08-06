import { authSignUp, authSignIn, cookieValidation, getUserDetails, updateUserDetails, getAllUsers } from '../models/accountModel'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.post('/signUp', function (req: any, res: any) {
  authSignUp(connection, res, req)
})

router.get('/signIn', function (req: any, res: any) {
  authSignIn(connection, res, req)
})

router.get('/cookieValidation', function (req: any, res: any) {
  cookieValidation(connection, res, req)
})

router.get('/getUserDetails', function (req: any, res: any) {
  getUserDetails(connection, res, req)
})

router.post('/updateUserDetails', function (req: any, res: any) {
  updateUserDetails(connection, res, req)
})

router.get('/getAllUsers', function (req: any, res: any) {
  getAllUsers(connection, res, req)
})