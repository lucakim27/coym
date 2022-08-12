export const createLikesTable = function (pool: any) {

    const likesTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = "coym"
        AND table_name = "likes"
    `

    const createLikesQuery = `CREATE TABLE IF NOT EXISTS 
        likes (
            id INT AUTO_INCREMENT, 
            commentID INT NOT NULL, 
            majorID INT NOT NULL, 
            userID INT NOT NULL,
            PRIMARY KEY (id),
            FOREIGN KEY (commentID) REFERENCES comments(id),
            FOREIGN KEY (majorID) REFERENCES majors(id),
            FOREIGN KEY (userID) REFERENCES accounts(id)
        ) 
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(likesTableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createLikesQuery, function (err: any, result: any) {
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

export const postLike = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT a.username, m.name, c.comment FROM likes l
        inner join accounts a on a.id = l.userID
        inner join majors m on m.id = l.majorID
        inner join comments c on c.id = l.commentID
        WHERE m.name = ?
    `

    const paramsForSelectLikesQuery = [req.body.page]

    const deleteLikesColumnQuery = `DELETE FROM likes 
        WHERE commentID = (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?)) AND 
            majorID = (SELECT id FROM majors WHERE name = ?)
    `

    const paramsForDeleteLikesColumnQuery = [req.body.comment, req.body.page, req.body.page]

    const insertLikesQuery = `INSERT INTO 
        likes (
            commentID, 
            majorID, 
            userID
        ) VALUES (
            (SELECT id FROM comments WHERE comment = ? AND majorID = (SELECT id FROM majors WHERE name = ?)), 
            (SELECT id FROM majors WHERE name = ?), 
            (SELECT id FROM accounts WHERE username = ?)
        )
    `

    const paramsForInsertLikesQuery = [req.body.comment, req.body.page, req.body.page, req.body.username]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, paramsForSelectLikesQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment && req.body.username === result[i].username) {
                    existing = true
                    connection.query(deleteLikesColumnQuery, paramsForDeleteLikesColumnQuery, function (err: any, result: any) {
                        if (err) {
                            connection.release()
                            throw err
                        }
                        res.send({
                            status: true,
                            message: 'You have successfully disliked the comment.'
                        })
                    })
                }
            }
            if (!existing) {
                connection.query(insertLikesQuery, paramsForInsertLikesQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true,
                        message: 'You have successfully liked the comment.'
                    })
                })
            }
        })
        connection.release()
    })

}

export const getLike = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT a.username, m.name, c.comment FROM likes l
        inner join accounts a on a.id = l.userID
        inner join majors m on m.id = l.majorID
        inner join comments c on c.id = l.commentID
        WHERE m.name = ?
    `
    
    const paramsForSelectLikesQuery = [req.query.page]

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, paramsForSelectLikesQuery, function (err: any, result: any, fields: any) {
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

export const getLikeCount = function (pool: any, res: any, req: any) {

    const selectLikesQuery = `SELECT m.name FROM likes l
        inner join majors m on m.id = l.majorID
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectLikesQuery, function (err: any, result: any, fields: any) {
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
