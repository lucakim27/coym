import { getReply, postReply } from '../models/reply'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getReply', function (req: any, res: any) {
  getReply(connection, res, req)
})

router.post('/postReply', function (req: any, res: any) {
  postReply(connection, res, req)
})