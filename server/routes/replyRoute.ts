import { getReply, postReply, getReplyCount, editReply, deleteReply } from '../models/replyModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getReply', function (req: any, res: any) {
  getReply(pool, res, req)
})

router.post('/postReply', function (req: any, res: any) {
  postReply(pool, res, req)
})

router.get('/getReplyCount', function (req: any, res: any) {
  getReplyCount(pool, res, req)
})

router.post('/deleteReply', function (req: any, res: any) {
  deleteReply(pool, res, req)
})

router.post('/editReply', function (req: any, res: any) {
  editReply(pool, res, req)
})