export const createReplyTable = function (pool: any) {

    const replyTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'reply'
    `

    const createReplyQuery = `CREATE TABLE IF NOT EXISTS 
        reply (
            id INT AUTO_INCREMENT, 
            majorID INT NOT NULL, 
            userID INT NOT NULL, 
            commentID INT NOT NULL, 
            reply TEXT NOT NULL, 
            createdAt DATETIME NOT NULL,
            updatedAt DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (majorID) REFERENCES majors(id),
            FOREIGN KEY (userID) REFERENCES accounts(id),
            FOREIGN KEY (commentID) REFERENCES comments(id)
        )
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) throw err
        connection.query(replyTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createReplyQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
        connection.release()
    })

}

export const getReply = function (pool: any, res: any, req: any) {

    const selectReplyQuery = `SELECT a.username, c.comment, r.reply, m.name FROM reply r
        inner join accounts a on a.id = r.userID
        inner join majors m on m.id = r.majorID
        inner join comments c on c.id = r.commentID
        WHERE m.name = '${req.query.page}'
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) throw err
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: result 
            })
        })
        connection.release()
    })

}

export const postReply = function (pool: any, res: any, req: any) {

    const insertReplyQuery = `INSERT INTO 
        reply (
            majorID,
            userID,
            commentID,
            reply,
            createdAt
        ) VALUES (
            (SELECT id FROM majors WHERE name = '${req.body.page}'), 
            (SELECT id FROM accounts WHERE username = '${req.body.username}'), 
            (SELECT id FROM comments WHERE comment = '${req.body.comment}'), 
            '${req.body.reply}',
            '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
        )
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) throw err
        connection.query(insertReplyQuery, function (err: any, result: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: 'You have successfully replied.'
            })
        })
        connection.release()
    })

}