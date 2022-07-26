const toISOStringLocal = function (d: any) {
    function z(n: any) {
        return (n < 10 ? '0' : '') + n
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
}

export const createChatUserTable = function (connection: any) {

    const chatUserTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'chatUser'
    `

    const createChatUserTableQuery = `CREATE TABLE chatUser 
        (
            id INT AUTO_INCREMENT,
            userID INT NOT NULL,
            counterpartID INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (userID) REFERENCES accounts(id),
            FOREIGN KEY (counterpartID) REFERENCES accounts(id)
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(chatUserTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createChatUserTableQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const createChatTable = function (connection: any) {

    const chatTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'chat'
    `

    const createChatTableQuery = `CREATE TABLE chat 
        (
            id INT AUTO_INCREMENT,
            text TEXT NOT NULL,
            chatUserID INT NOT NULL,
            userID INT NOT NULL,
            date DATE NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (chatUserID) REFERENCES chatUser(id),
            FOREIGN KEY (userID) REFERENCES accounts(id)
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(chatTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createChatTableQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const addChatUserAndChat = function (connection: any, username: any, counterpart: any, text: any) {

    const selectChatUserQuery = "SELECT * FROM chatUser"

    const selectIdFromChatUserQuery = function (username: any, counterpart: any) {
        return `SELECT id 
            FROM chatUser 
            WHERE username = '${username}' AND 
            counterpart = '${counterpart}'
        `
    }

    const insertChatQuery = function (result: any) {
        return `INSERT INTO 
            chat (
                id, 
                text, 
                username, 
                date
            ) VALUES (
                '${result[0].id}', 
                '${text}', 
                '${username}', 
                '${toISOStringLocal(new Date())}'
            )
        `
    }

    const insertChatUserQuery = `INSERT INTO 
        chatUser (
            username, 
            counterpart
        ) VALUES (
            '${username}', 
            '${counterpart}'
        )
    `
    
    const selectIdFromChatUserAdvanced = `SELECT id 
        FROM chatUser 
        WHERE username = '${username}' AND counterpart = '${counterpart}' 
        OR username = '${username}' AND counterpart = '${counterpart}'
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectChatUserQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.length !== 0) {
                var existing = false
                for (var i = 0; i < result.length; i++) {
                    if (username === result[i].username && counterpart === result[i].counterpart) {
                        existing = true
                        connection.query(selectIdFromChatUserQuery(username, counterpart), function (err: any, result: any) {
                            if (err) throw err
                            connection.query(insertChatQuery(result), function (err: any, result: any) {
                                if (err) throw err
                            })
                        })
                    } else if (counterpart === result[i].username && username === result[i].counterpart) {
                        existing = true
                        connection.query(selectIdFromChatUserQuery(counterpart, username), function (err: any, result: any) {
                            if (err) throw err
                            connection.query(insertChatQuery(result), function (err: any, result: any) {
                                if (err) throw err
                            })
                        })
                    }
                }
                if (!existing) {
                    connection.query(insertChatUserQuery, function (err: any, result: any) {
                        if (err) throw err
                    })
                    connection.query(selectIdFromChatUserAdvanced, function (err: any, result: any) {
                        if (err) throw err
                        connection.query(insertChatQuery(result), function (err: any, result: any) {
                            if (err) throw err
                        })
                    })
                }
            } else {
                connection.query(insertChatUserQuery, function (err: any, result: any) {
                    if (err) throw err
                })
                connection.query(selectIdFromChatUserAdvanced, function (err: any, result: any) {
                    if (err) throw err
                    connection.query(insertChatQuery(result), function (err: any, result: any) {
                        if (err) throw err
                    })
                })
            }
        })
    })
    
}

export const sendChatUser = function (connection: any, username: any, io: any) {

    const selectChatUserQuery = `SELECT * 
        FROM chatUser 
        WHERE username = '${username}' 
        OR counterpart = '${username}'
    `

    setTimeout(async function () {
        // send to the socket.id only..
        io.sockets.emit('sendChatUser', JSON.stringify(await connection.promise().query(selectChatUserQuery)))
    }, 500)

}

export const sendChat = function (connection: any, username: any, counterpart: any, io: any) {

    const selectChatUserQuery = `SELECT * 
        FROM chatUser 
        WHERE (
            username = '${username}' AND counterpart = '${counterpart}'
        ) 
        OR (
            username = '${counterpart}' AND counterpart = '${username}'
        )
    `

    const selectChatQuery = function (result: any) {
        return `SELECT * 
            FROM chat 
            WHERE id = ${result[0].id}
        `
    }

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectChatUserQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            setTimeout(async function () {
                // send to the socket.id only..
                io.sockets.emit('sendChat', JSON.stringify(await connection.promise().query(selectChatQuery(result))))
            }, 500)
        })
    })

}