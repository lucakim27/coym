export const createCountsTable = function (connection: any) {

    const countsTableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'counts'
    `

    const createCountsTableQuery = `CREATE TABLE 
        counts (
            id INT AUTO_INCREMENT, 
            majorID INT NOT NULL UNIQUE, 
            comment INT, 
            view INT,
            createdAt DATETIME NOT NULL,
            updatedAt DATETIME,
            PRIMARY KEY (id),
            FOREIGN KEY (majorID) REFERENCES majors(id)
        ) 
    `

    connection.getConnection(function (err: any) {
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
            majorID, 
            view, 
            comment,
            createdAt
        ) VALUES(
            (SELECT id FROM majors WHERE name = '${req.body.page}'),
            0, 
            0,
            '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
        )
    `

    const updateCountsQuery = `UPDATE counts 
        SET ${req.body.type} = ${req.body.type} + 1 
        WHERE majorID = (SELECT id FROM majors WHERE name = '${req.body.page}')
    `

    connection.getConnection(function (err: any) {
        if (err) throw err
        connection.query(insertCountsQuery, function (err: any, result: any) {
            if (err) throw err
        })
        connection.query(updateCountsQuery, function (err: any, result: any) {
            if (err) throw err
        })
    })

}

export const getCount = function (connection: any, res: any, req: any) {

    const selectCountsQuery = `SELECT m.*, c.* FROM majors m
        inner join counts c on m.id = c.majorID
    `

    connection.getConnection(function (err: any) {
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