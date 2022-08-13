import { authSignUp, authSignIn, cookieValidation, getUserDetails, updateUserDetails, getAllUsers, getUserCommentDetails, getUserReplyDetails, getUserLikeDetails } from '../models/accountModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.post('/signUp', function (req: any, res: any) {
  authSignUp(pool, res, req)
})

router.get('/signIn', function (req: any, res: any) {
  authSignIn(pool, res, req)
})

router.get('/cookieValidation', function (req: any, res: any) {
  cookieValidation(pool, res, req)
})

router.get('/getUserDetails', function (req: any, res: any) {
  getUserDetails(pool, res, req)
})

router.post('/updateUserDetails', function (req: any, res: any) {
  updateUserDetails(pool, res, req)
})

router.get('/getAllUsers', function (req: any, res: any) {
  getAllUsers(pool, res, req)
})

router.get('/getUserCommentDetails', function (req: any, res: any) {
  getUserCommentDetails(pool, res, req)
})

router.get('/getUserReplyDetails', function (req: any, res: any) {
  getUserReplyDetails(pool, res, req)
})

router.get('/getUserLikeDetails', function (req: any, res: any) {
  getUserLikeDetails(pool, res, req)
})