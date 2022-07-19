import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createReplyTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'reply';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS reply (id INT AUTO_INCREMENT, page VARCHAR(255), username VARCHAR(255), comment VARCHAR(255), reply VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const getReply = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM reply where page = '${req.query.page}'`, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ status: true, message: result })
        })
    })
}

export const postReply = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`INSERT INTO reply (page, username, comment, reply) VALUES ('${req.body.page}', '${req.body.username}', '${req.body.comment}', '${req.body.reply}')`, function (err: any, result: any) {
            if (err) throw err
            res.send({ status: true, message: 'You have successfully replied.' })
        })
    })
}