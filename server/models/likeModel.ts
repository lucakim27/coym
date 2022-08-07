export const createLikesTable = function (connection: any) {

    const likesTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'likes'
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

    connection.getConnection(function (err: any) {
        if (err) throw err
        connection.query(likesTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createLikesQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const postLike = function (connection: any, res: any, req: any) {

    const selectLikesQuery = `SELECT a.username, m.name, c.comment FROM likes l
        inner join accounts a on a.id = l.userID
        inner join majors m on m.id = l.majorID
        inner join comments c on c.id = l.commentID
        WHERE m.name = '${req.body.page}'
    `

    const deleteLikesColumnQuery = `DELETE FROM likes 
        WHERE commentID = (SELECT id FROM comments WHERE comment = '${req.body.comment}')
    `

    const insertLikesQuery = `INSERT INTO 
        likes (
            commentID, 
            majorID, 
            userID
        ) VALUES (
            (SELECT id FROM comments WHERE comment = '${req.body.comment}'), 
            (SELECT id FROM majors WHERE name = '${req.body.page}'), 
            (SELECT id FROM accounts WHERE username = '${req.body.username}')
        )
    `

    // how do i check if the like is duplicated?
    connection.getConnection(function (err: any) {
        if (err) throw err
        connection.query(selectLikesQuery, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment && req.body.username === result[i].username) {
                    existing = true
                    connection.query(deleteLikesColumnQuery, function (err: any, result: any) {
                        if (err) throw err
                        res.send({ 
                            status: true, 
                            message: 'You have successfully disliked the comment.' 
                        })
                    })
                }
            }
            if (!existing) {
                connection.query(insertLikesQuery, function (err: any, result: any) {
                    if (err) throw err
                    res.send({ 
                        status: true, 
                        message: 'You have successfully liked the comment.' 
                    })
                })
            }
        })
    })

}

export const getLike = function(connection: any, res: any, req: any) {

    const selectLikesQuery =  `SELECT a.username, m.name, c.comment FROM likes l
        inner join accounts a on a.id = l.userID
        inner join majors m on m.id = l.majorID
        inner join comments c on c.id = l.commentID
        WHERE m.name = '${req.query.page}'
    `

    connection.getConnection(function (err: any) {
        if (err) throw err
        connection.query(selectLikesQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: result 
            })
        })
    })
}