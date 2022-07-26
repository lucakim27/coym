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

    connection.connect(function (err: any) {
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

    const selectLikesQuery = `SELECT * 
        FROM likes 
        WHERE page = '${req.body.page}'
    `

    const deleteLikesColumnQuery = `DELETE FROM likes 
        WHERE comment = '${req.body.comment}'    
    `

    const insertLikesQuery = `INSERT INTO 
        likes (
            comment, 
            page, 
            username
        ) VALUES (
            '${req.body.comment}', 
            '${req.body.page}', 
            '${req.body.username}'
        )
    `

    connection.connect(function (err: any) {
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

    const selectLikesQuery = `SELECT * FROM likes 
        WHERE majorID = (SELECT id FROM majors WHERE name = '${req.query.page}')
    `

    connection.connect(function (err: any) {
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