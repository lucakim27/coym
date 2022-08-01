import { getLike, postLike } from '../models/like'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getLike', function (req: any, res: any) {
  getLike(connection, res, req)
})

router.post('/postLike', function (req: any, res: any) {
  postLike(connection, res, req)
})