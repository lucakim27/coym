import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createOnlineTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'online';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS online (id INT AUTO_INCREMENT, socketId VARCHAR(255), username VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addOnlineUser = function (username: any, socketId: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM online`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && socketId === result[i].socketId) {
                    existing = true
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO online (socketId, username) VALUES ('${socketId}', '${username}')`, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const sendOnlineUsers = async function (io: any) {
    setTimeout(async function () {
        io.sockets.emit('updateOnlineUsers', JSON.stringify(await connection.promise().query(`SELECT * FROM online;`)))
    }, 500)
}

export const removeOnlineUser = function (socketId: any) {
    connection.connect(function (err: any) {
    if (err) throw err
        connection.query(`DELETE FROM online WHERE socketId = '${socketId}';`, function (err: any, result2: any) {
            if (err) throw err
        })
    })
}