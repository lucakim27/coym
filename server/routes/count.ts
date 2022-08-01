import { getCount, postCount } from '../models/count'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getCount', function (req: any, res: any) {
  getCount(connection, res, req)
})

router.post('/postCount', function (req: any, res: any) {
  postCount(connection, res, req)
})