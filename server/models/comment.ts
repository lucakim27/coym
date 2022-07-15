import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

const toISOStringLocal = function (d: any) {
    function z(n: any) {
        return (n < 10 ? '0' : '') + n;
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
}

export const createCommentsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'comments';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT, comment VARCHAR(255), page VARCHAR(255), username VARCHAR(255), date DATE, PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addComment = function (page: any, username: any, comment: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM comments`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (comment === result[i].comment && result[i].page === page) {
                    existing = true
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO comments (comment, page, username, date) VALUES ('${comment}', '${page}', '${username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const sendComment = function (io: any) {
    setTimeout(async function () {
        io.sockets.emit('updatedComment', JSON.stringify(await connection.promise().query(`SELECT * FROM comments;`)))
    }, 500)
}

export const getComment = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM comments WHERE page = '${req.query.page}'`, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ status: true, message: result })
        })
    })
}

export const postComment = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM comments WHERE page = '${req.body.page}'`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment) {
                    existing = true
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO comments (comment, page, username, date) VALUES ('${req.body.comment}', '${req.body.page}', '${req.body.username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                    if (err) throw err
                    res.send({ status: true })
                })
            }
        })
    })
}