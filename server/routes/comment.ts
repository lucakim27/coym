import { getComment, postComment } from '../models/comment'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getComment', function (req: any, res: any) {
  getComment(connection, res, req)
})

router.post('/postComment', function (req: any, res: any) {
  postComment(connection, res, req)
})