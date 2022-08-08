import { getLike, postLike } from '../models/likeModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getLike', function (req: any, res: any) {
  getLike(pool, res, req)
})

router.post('/postLike', function (req: any, res: any) {
  postLike(pool, res, req)
})