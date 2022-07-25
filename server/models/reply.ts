export const createReplyTable = function (connection: any) {

    const replyTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'reply'
    `

    const createReplyQuery = `CREATE TABLE IF NOT EXISTS 
        reply (
            id INT AUTO_INCREMENT, 
            page VARCHAR(255), 
            username VARCHAR(255), 
            comment VARCHAR(255), 
            reply VARCHAR(255), 
            PRIMARY KEY (id)
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(replyTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createReplyQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const getReply = function (connection: any, res: any, req: any) {

    const selectReplyQuery = `SELECT * 
        FROM reply 
        where page = '${req.query.page}'
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: result 
            })
        })
    })
}

export const postReply = function (connection: any, res: any, req: any) {

    const insertReplyQuery = `INSERT INTO 
        reply (
            page, 
            username, 
            comment, 
            reply
        ) VALUES (
            '${req.body.page}', 
            '${req.body.username}', 
            '${req.body.comment}', 
            '${req.body.reply}'
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(insertReplyQuery, function (err: any, result: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: 'You have successfully replied.'
            })
        })
    })
}