import { getMajorList } from '../models/majorModel'
import { pool } from '../configs/db'
import express from 'express'
export const router = express.Router()
export default router

router.get('/getMajorList', function (req: any, res: any) {
  getMajorList(pool, res, req)
})