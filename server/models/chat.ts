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
            createdAt DATETIME NOT NULL,
            updatedAt DATETIME,
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

    const insertChatQuery = `INSERT INTO 
        chat (
            text, 
            chatUserID, 
            userID, 
            createdAt
        ) VALUES (
            '${text}', 
            (
                SELECT id FROM chatUser WHERE (
                    userID = (SELECT id FROM accounts WHERE username = '${username}') 
                    AND counterpartID = (SELECT id FROM accounts WHERE username = '${counterpart}')
                ) OR (
                    userID = (SELECT id FROM accounts WHERE username = '${counterpart}') 
                    AND counterpartID = (SELECT id FROM accounts WHERE username = '${username}')
                )
            ), 
            (SELECT id FROM accounts WHERE username = '${username}'), 
            '${toISOStringLocal(new Date())}'
        )
    `

    const insertChatUserQuery = `INSERT INTO 
        chatUser (
            userID, 
            counterpartID
        ) VALUES (
            (SELECT id FROM accounts WHERE username = '${username}'), 
            (SELECT id FROM accounts WHERE username = '${counterpart}')
        )
    `
    
    connection.connect(function (err: any) {
        if (err) throw err

        // its duplicating so not working down below
        connection.query(insertChatUserQuery, function (err: any, result: any) {
            if (err) throw err
        })

        // error here
        connection.query(insertChatQuery, function (err: any, result: any) {
            if (err) throw err
        })
    })

}

export const sendChatUser = function (connection: any, username: any, io: any) {

    const selectChatUserQuery = `SELECT * FROM chatUser 
        WHERE userID = (SELECT id FROM accounts WHERE username = '${username}') 
        OR counterpartID = (SELECT id FROM accounts WHERE username = '${username}')
    `

    setTimeout(async function () {
        // send to the socket.id only..
        io.sockets.emit('sendChatUser', JSON.stringify(await connection.promise().query(selectChatUserQuery)))
    }, 500)

}

export const sendChat = function (connection: any, username: any, counterpart: any, io: any) {

    const selectChatQuery = `SELECT u.*, c.* FROM chatUser u
        INNER JOIN chat c on u.id = c.chatUserID 
        WHERE (u.userID = (SELECT id FROM accounts WHERE username = '${username}') 
        AND u.counterpartID = (SELECT id FROM accounts WHERE username = '${counterpart}'))
        OR (u.userID = (SELECT id FROM accounts WHERE username = '${counterpart}') 
        AND u.counterpartID = (SELECT id FROM accounts WHERE username = '${username}'))
    `

    setTimeout(async function () {
        // send to the socket.id only..
        io.sockets.emit('sendChat', JSON.stringify(await connection.promise().query(selectChatQuery)))
    }, 500)

}