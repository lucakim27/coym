import { getMajorList } from '../models/major'
import { connection } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getMajorList', function (req: any, res: any) {
  getMajorList(connection, res, req)
})