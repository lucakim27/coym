import { getCount, postCount } from '../models/countModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getCount', function (req: any, res: any) {
  getCount(pool, res, req)
})

router.post('/postCount', function (req: any, res: any) {
  postCount(pool, res, req)
})