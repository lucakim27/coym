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
                connection.query(`CREATE TABLE chat (id INT, text TEXT, username VARCHAR(255), date DATE) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addChatUserAndChat = function (username: any, counterpart: any, text: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query("SELECT * FROM chatUser", function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.length !== 0) {
                var existing = false
                for (var i = 0; i < result.length; i++) {
                    if (username === result[i].username && counterpart === result[i].counterpart) {
                        existing = true
                        connection.query(`SELECT id FROM chatUser WHERE username = '${username}' AND counterpart = '${counterpart}';`, function (err: any, result: any) {
                            if (err) throw err
                            connection.query(`INSERT INTO chat (id, text, username, date) VALUES ('${result[0].id}', '${text}', '${username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                                if (err) throw err
                            })
                        })
                    } else if (counterpart === result[i].username && username === result[i].counterpart) {
                        existing = true
                        connection.query(`SELECT id FROM chatUser WHERE username = '${counterpart}' AND counterpart = '${username}';`, function (err: any, result: any) {
                            if (err) throw err
                            connection.query(`INSERT INTO chat (id, text, username, date) VALUES ('${result[0].id}', '${text}', '${username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                                if (err) throw err
                            })
                        })
                    }
                }
                if (!existing) {
                    connection.query(`INSERT INTO chatUser (username, counterpart) VALUES ('${username}', '${counterpart}')`, function (err: any, result: any) {
                        if (err) throw err
                    })
                    connection.query(`SELECT id FROM chatUser WHERE username = '${username}' AND counterpart = '${counterpart}' OR username = '${username}' AND counterpart = '${counterpart}'`, function (err: any, result: any) {
                        if (err) throw err
                        connection.query(`INSERT INTO chat (id, text, username, date) VALUES ('${result[0].id}', '${text}', '${username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                            if (err) throw err
                        })
                    })
                }
            } else {
                connection.query(`INSERT INTO chatUser (username, counterpart) VALUES ('${username}', '${counterpart}')`, function (err: any, result: any) {
                    if (err) throw err
                })
                connection.query(`SELECT id FROM chatUser WHERE username = '${username}' AND counterpart = '${counterpart}' OR username = '${username}' AND counterpart = '${counterpart}'`, function (err: any, result: any) {
                    if (err) throw err
                    connection.query(`INSERT INTO chat (id, text, username, date) VALUES ('${result[0].id}', '${text}', '${username}', '${toISOStringLocal(new Date())}')`, function (err: any, result: any) {
                        if (err) throw err
                    })
                })
            }
        })
    })
}

export const sendChatUser = function (username: any, io: any) {
    setTimeout(async function () {
        // send to the socket.id only..
        io.sockets.emit('sendChatUser', JSON.stringify(await connection.promise().query(`SELECT * FROM chatUser WHERE username = '${username}' OR counterpart = '${username}';`)))
    }, 500)
}

export const sendChat = function (username: any, counterpart: any, io: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM chatUser WHERE (username = '${username}' AND counterpart = '${counterpart}') OR (username = '${counterpart}' AND counterpart = '${username}');`, function (err: any, result: any, fields: any) {
            if (err) throw err
            setTimeout(async function () {
                // send to the socket.id only..
                io.sockets.emit('sendChat', JSON.stringify(await connection.promise().query(`SELECT * FROM chat WHERE id = ${result[0].id};`)))
            }, 500)
        })
    })
}