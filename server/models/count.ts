export const createCountsTable = function (connection: any) {

    const countsTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'counts'
    `

    const createCountsTableQuery = `CREATE TABLE 
        counts (
            id INT AUTO_INCREMENT, 
            page VARCHAR(255) UNIQUE KEY, 
            comment INT, 
            view INT, 
            PRIMARY KEY (id)
        ) 
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(countsTableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createCountsTableQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })

}

export const postCount = function (connection: any, res: any, req: any) {

    const insertCountsQuery = `INSERT IGNORE INTO 
        counts (
            page, 
            view, 
            comment
        ) VALUES(
            '${req.body.page}', 
            0, 
            0
        )
    `

    const updateCountsQuery = `UPDATE counts 
        SET ${req.body.type} = ${req.body.type} + 1 
        WHERE page = '${req.body.page}'
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(insertCountsQuery, function (err: any, result: any) {
            if (err) throw err
        })
    })

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(updateCountsQuery, function (err: any, result: any) {
            if (err) throw err
        })
    })

}

export const getCount = function (connection: any, res: any, req: any) {

    const selectCountsQuery = `SELECT * 
        FROM counts
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectCountsQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({ 
                status: true, 
                message: result 
            })
        })
    })

}