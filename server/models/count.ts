import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createCountsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'counts';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE counts (id INT AUTO_INCREMENT, page VARCHAR(255) UNIQUE KEY, comment INT, view INT, PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const postCount = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`INSERT IGNORE INTO counts (page, view, comment) VALUES('${req.body.page}', 0, 0);`, function (err: any, result: any) {
            if (err) throw err
        })
    })
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`UPDATE counts SET ${req.body.type} = ${req.body.type} + 1 WHERE page = '${req.body.page}';`, function (err: any, result: any) {
            if (err) throw err
        })
    })
}

export const getCount = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM counts`, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ status: true, message: result })
        })
    })
}