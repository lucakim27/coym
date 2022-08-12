import { getComment, postComment, getCommentCount, editComment, deleteComment } from '../models/commentModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getComment', function (req: any, res: any) {
  getComment(pool, res, req)
})

router.post('/postComment', function (req: any, res: any) {
  postComment(pool, res, req)
})

router.get('/getCommentCount', function (req: any, res: any) {
  getCommentCount(pool, res, req)
})

router.post('/editComment', function (req: any, res: any) {
  editComment(pool, res, req)
})

router.post('/deleteComment', function (req: any, res: any) {
  deleteComment(pool, res, req)
})