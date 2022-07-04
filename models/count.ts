import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coyo"
})

export const createCountsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coyo'
            AND table_name = 'counts';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE counts (id INT AUTO_INCREMENT, page VARCHAR(255) UNIQUE KEY, type VARCHAR(255), count INT, PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addCounts = function(page: any, type: any) {
    connection.connect(function (err: any) {
        if (err) throw err
          connection.query(`INSERT INTO counts (page, type, count) VALUES('${page}', '${type}', 1) ON DUPLICATE KEY UPDATE count = count + 1;`, function (err: any, result: any) {
              if (err) throw err
          })
      })
}