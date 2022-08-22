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
        if (err) {
            connection.release()
            throw err
        }
        connection.query(replyTableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createReplyQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                })
            }
        })
        connection.release()
    })

}

export const getReply = function (pool: any, res: any, req: any) {

    const selectReplyQuery = `SELECT a.id, a.username, c.comment, r.reply, m.name, r.createdAt FROM reply r
        inner join accounts a on a.id = r.userID
        inner join majors m on m.id = r.majorID
        inner join comments c on c.id = r.commentID
        WHERE m.name = ?
    `

    const paramsForSelectReplyQuery = [req.query.page]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, paramsForSelectReplyQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({ 
                status: true, 
                message: result 
            })
        })
        connection.release()
    })

}

export const getReplyCount = function (pool: any, res: any, req: any) {

    const selectReplyQuery = `SELECT m.name FROM reply r
        inner join majors m on m.id = r.majorID
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                message: result
            })
        })
        connection.release()
    })

}

export const getTotalReplyCount = function (pool: any, res: any, req: any) {

    const selectReplyQuery = `SELECT COUNT(*) FROM reply`

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectReplyQuery, function (err: any, result: any, fields: any) {
            if (err) {
                connection.release()
                throw err
            }
            res.send({
                status: true,
                message: result
            })
        })
        connection.release()
    })

}

export const postReply = function (pool: any, res: any, req: any) {

    const selectRepliesTableQuery = `SELECT * FROM reply 
        WHERE majorID = (SELECT id FROM majors WHERE name = ?) AND
        commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?)) AND
        reply = ?
    `

    const paramsForSelectRepliesTableQuery = [req.body.page, req.body.comment, req.body.page, req.body.reply]

    const insertReplyQuery = `INSERT INTO 
        reply (
            majorID,
            userID,
            commentID,
            reply,
            createdAt
        ) VALUES (
            (SELECT id FROM majors WHERE name = ?), 
            (SELECT id FROM accounts WHERE username = ?), 
            (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?)), 
            ?,
            ?
        )
    `

    const paramsForInsertReplyQuery = [req.body.page, req.body.username, req.body.comment, req.body.page, req.body.reply, new Date().toISOString().slice(0, 19).replace('T', ' ')]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectRepliesTableQuery, paramsForSelectRepliesTableQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(insertReplyQuery, paramsForInsertReplyQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({ 
                        status: true, 
                        message: 'You have successfully replied.'
                    })
                })
                connection.release()
            } else {
                res.send({ 
                    status: false, 
                    message: 'The reply is duplicated on the comment.'
                })
            }
        })
        connection.release()
    })

}

export const editReply = function (pool: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT reply FROM reply 
        WHERE reply = ? AND 
            majorID = (SELECT id FROM majors WHERE name = ?) AND
            commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?))
    `

    const replyParam = [req.body.reply, req.body.page, req.body.comment, req.body.page]

    const updateCommentsQuery = `UPDATE reply
        SET reply = ?,
            updatedAt = ?
        WHERE userID = (SELECT id FROM accounts WHERE username = ?) AND 
            majorID = (SELECT id FROM majors WHERE name = ?) AND
            commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?)) AND
            reply = ?
    `

    const paramsForUpdateCommentsQuery = [req.body.reply, new Date().toISOString().slice(0, 19).replace('T', ' '), req.body.username, req.body.page, req.body.comment, req.body.page, req.body.previousReply]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, replyParam, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(updateCommentsQuery, paramsForUpdateCommentsQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true
                    })
                })
                connection.release()
            } else {
                res.send({
                    status: false
                })
                connection.release()
            }
        })
        connection.release()
    })

}

export const deleteReply = function (pool: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT reply FROM reply 
        WHERE reply = ? AND 
            userID = (SELECT id FROM accounts WHERE username = ?) AND 
            majorID = (SELECT id FROM majors WHERE name = ?) AND
            commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?))
    `

    const deleteCommentQuery = `DELETE FROM reply
        WHERE reply = ? AND 
            userID = (SELECT id FROM accounts WHERE username = ?) AND 
            majorID = (SELECT id FROM majors WHERE name = ?) AND
            commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?))
    `
    
    const replyParam = [req.body.reply, req.body.username, req.body.page, req.body.comment, req.body.page]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, replyParam, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (result.length === 1) {
                connection.query(deleteCommentQuery, replyParam, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true
                    })
                })
            }
        })
        connection.release()
    })

}