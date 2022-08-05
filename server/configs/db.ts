import mysql2 from 'mysql2'
import 'dotenv/config'

export const connection = mysql2.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME
})