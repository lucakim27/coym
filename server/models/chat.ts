import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createChatUserTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'chatUser';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE chatUser (id INT AUTO_INCREMENT, username VARCHAR(255), counterpart VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const createChatTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'chat';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE chat (id INT, text TEXT) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addChatUser = function (username: any, counterpart: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`INSERT INTO chatUser (username, counterpart) VALUES ('${username}', '${counterpart}')`, function (err: any, result: any) {
            if (err) throw err
        })
    })
}

export const sendChatUser = function (io: any) {
    setTimeout(async function () {
        io.sockets.emit('sendChatUser', JSON.stringify(await connection.promise().query(`SELECT * FROM chatUser;`)))
    }, 500)
}