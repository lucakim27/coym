import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coyo"
})

const toISOStringLocal = function (d: any) {
    function z(n: any) {
        return (n < 10 ? '0' : '') + n;
    }
    return d.getFullYear() + '-' + z(d.getMonth() + 1) + '-' +
        z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
        z(d.getMinutes()) + ':' + z(d.getSeconds());
}

export const createCommentsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coyo'
            AND table_name = 'comments';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS comments (id INT AUTO_INCREMENT, comment VARCHAR(255), page VARCHAR(255), username VARCHAR(255), date DATE, PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addComment = function (page: any, username: any, comment: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`INSERT INTO comments (comment, page, username, date) VALUES ('${comment}', '${page}', '${username}', ${toISOStringLocal(new Date())})`, function (err: any, result: any) {
            if (err) throw err
        })
    })
}