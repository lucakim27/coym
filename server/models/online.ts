export const createOnlineTable = function (connection: any) {

    const onlineTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'online'
    `

    const createOnlineTable = `CREATE TABLE IF NOT EXISTS 
        online (
            id INT AUTO_INCREMENT, 
            socketId VARCHAR(255), 
            username VARCHAR(255), 
            PRIMARY KEY (id)
        ) 
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(onlineTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createOnlineTable, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const addOnlineUser = function (connection: any, username: any, socketId: any) {

    const selectOnlineQuery = `SELECT * 
        FROM online
    `

    const insertOnlineQuery = `INSERT INTO 
        online (
            socketId, 
            username
        ) VALUES (
            '${socketId}', 
            '${username}'
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectOnlineQuery, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && socketId === result[i].socketId) {
                    existing = true
                }
            }
            if (!existing) {
                connection.query(insertOnlineQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const sendOnlineUsers = async function (connection: any, io: any) {

    const selectOnlineQuery = `SELECT * 
        FROM online
    `

    setTimeout(async function () {
        io.sockets.emit('updateOnlineUsers', JSON.stringify(await connection.promise().query(selectOnlineQuery)))
    }, 500)
}

export const removeOnlineUser = function (connection: any, socketId: any) {

    const deleteOnlineColumnQuery = `DELETE FROM online 
        WHERE socketId = '${socketId}'
    `

    connection.connect(function (err: any) {
    if (err) throw err
        connection.query(deleteOnlineColumnQuery, function (err: any, result2: any) {
            if (err) throw err
        })
    })
}