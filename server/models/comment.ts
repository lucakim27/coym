const toISOStringLocal = function (d: any) {
    function z(n: any) {
        return (n < 10 ? '0' : '') + n;
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' + z(d.getDate())
}

export const createCommentsTable = function (connection: any) {

    const commentsTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'comments'
    `

    const createCommentsTableQuery = `CREATE TABLE IF NOT EXISTS 
        comments (
            id INT AUTO_INCREMENT, 
            comment VARCHAR(255), 
            page VARCHAR(255), 
            username VARCHAR(255), 
            date DATE, 
            PRIMARY KEY (id)
        ) 
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(commentsTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createCommentsTableQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const getComment = function (connection: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT * 
        FROM comments 
        WHERE page = '${req.query.page}'
    `
    
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectCommentsTableQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: result 
            })
        })
    })
}

export const postComment = function (connection: any, res: any, req: any) {

    const selectCommentsTableQuery = `SELECT * 
        FROM comments 
        WHERE page = '${req.body.page}'
    `

    const insertCommentsTableQuery = `INSERT INTO 
        comments (
            comment, 
            page, 
            username, 
            date
        ) VALUES (
            '${req.body.comment}', 
            '${req.body.page}', 
            '${req.body.username}', 
            '${toISOStringLocal(new Date())}'
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectCommentsTableQuery, function (err: any, result: any) {
            if (err) throw err
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
                    if (err) throw err
                    res.send({ 
                        status: true, 
                        page: req.body.page 
                    })
                })
            }
        })
    })
}