export const createCommentsTable = function (pool: any) {

    const commentsTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = "coym"
        AND table_name = "comments"
    `

    const createCommentsTableQuery = `CREATE TABLE IF NOT EXISTS 
        comments (
            id INT AUTO_INCREMENT, 
            comment VARCHAR(255), 
            majorID INT, 
            userID INT, 
            createdAt DATETIME NOT NULL,
            updatedAt DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (majorID) REFERENCES majors(id),
            FOREIGN KEY (userID) REFERENCES accounts(id)
        ) 
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(commentsTableDuplicationQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            if (!result.length) {
                connection.query(createCommentsTableQuery, function (err: any, result: any) {
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

export const getComment = function (pool: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT a.username, c.comment, c.createdAt, m.name FROM comments c
        inner join accounts a on a.id = c.userID
        inner join majors m on m.id = c.majorID
        WHERE m.name = "${req.query.page}"
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, function (err: any, result: any, fields: any) {
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

export const postComment = function (pool: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT * FROM comments 
        WHERE majorID = (SELECT id FROM majors WHERE name = "${req.body.page}")
    `

    const insertCommentsTableQuery = `INSERT INTO 
        comments (
            comment, 
            majorID, 
            userID, 
            createdAt
        ) VALUES (
            "${req.body.comment}", 
            (SELECT id FROM majors WHERE name = "${req.body.page}"), 
            (SELECT id FROM accounts WHERE username = "${req.body.username}"), 
            "${new Date().toISOString().slice(0, 19).replace('T', ' ')}"
        )
    `

    pool.getConnection(function (err: any, connection: any) {
        if (err) {
            connection.release()
            throw err
        }
        connection.query(selectCommentsTableQuery, function (err: any, result: any) {
            if (err) {
                connection.release()
                throw err
            }
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.comment === result[i].comment) {
                    existing = true
                    res.send({
                        status: false
                    })
                }
            }
            if (!existing) {
                connection.query(insertCommentsTableQuery, function (err: any, result: any) {
                    if (err) {
                        connection.release()
                        throw err
                    }
                    res.send({
                        status: true,
                        page: req.body.page
                    })
                })
            }
        })
        connection.release()
    })

}