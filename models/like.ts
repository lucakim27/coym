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

export const addLike = function (comment: any, page: any, username: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM likes`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && comment === result[i].comment) {
                    existing = true
                    connection.query(`DELETE FROM likes WHERE comment = '${comment}' AND username = '${username}';`, function (err: any, result: any) {
                        if (err) throw err
                    })
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO likes (comment, page, username) VALUES ('${comment}', '${page}', '${username}')`, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const sendLikes = function (io: any) {
    setTimeout(async function () {
        io.sockets.emit('updatedLikes', JSON.stringify(await connection.promise().query(`SELECT * FROM likes;`)))
    }, 500)
}