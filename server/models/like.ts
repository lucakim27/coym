import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createLikesTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'likes';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS likes (id INT AUTO_INCREMENT, comment VARCHAR(255), page VARCHAR(255), username VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const postLike = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM likes WHERE page = '${req.body.page}'`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment && req.body.username === result[i].username) {
                    existing = true
                    connection.query(`DELETE FROM likes WHERE comment = '${req.body.comment}';`, function (err: any, result: any) {
                        if (err) throw err
                        res.send({ status: true, message: 'You have successfully disliked the comment.' })
                    })
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO likes (comment, page, username) VALUES ('${req.body.comment}', '${req.body.page}', '${req.body.username}')`, function (err: any, result: any) {
                    if (err) throw err
                    res.send({ status: true, message: 'You have successfully liked the comment.' })
                })
            }
        })
    })
}

export const getLike = function(res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM likes WHERE page = '${req.query.page}'`, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ status: true, message: result })
        })
    })
}