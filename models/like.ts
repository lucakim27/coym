import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coyo"
})

export const createLikesTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coyo'
            AND table_name = 'likes';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE IF NOT EXISTS likes (id INT AUTO_INCREMENT, comment VARCHAR(255), page VARCHAR(255), username VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addLike = function (comment: any, page: any, username: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT * FROM likes`, function (err: any, result: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (username === result[i].username && comment === result[i].comment) {
                    existing = true
                    connection.query(`DELETE FROM likes WHERE comment = '${comment}' AND username = '${username}';`, function (err: any, result: any) {
                        if (err) throw err
                    })
                }
            }
            if (!existing) {
                connection.query(`INSERT INTO likes (comment, page, username) VALUES ('${comment}', '${page}', '${username}')`, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

// export const updateLike = function (comment: any, username: any, page: any) {
//     occupations.forEach((array: any[][]) => {
//         if (array[0] === page) {
//             for (var i = 0; i < array[1].length; i++) {
//                 if (array[1][i] === comment) {
//                     if (array[2][i].includes(username)) {
//                         for (var j = 0; j < array[2][i].length; j++) {
//                             if (array[2][i][j] === username) {
//                                 array[2][i].splice(j, 1)
//                             }
//                         }
//                     } else {
//                         array[2][i].push(username)
//                     }
//                 }
//             }
//         }
//     })
// }

// export const findLike = function (comment: any, page: any) {
//     for (var i = 0; i < occupations.length; i++) {
//         if (occupations[i][0] === page) {
//             for (var j = 0; j < occupations[i][1].length; j++) {
//                 if (comment === occupations[i][1][j]) {
//                     return occupations[i][2][j].length
//                 }
//             }
//         }
//     }
// }