import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coyo"
})

export const initializeCountsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coyo'
            AND table_name = 'counts';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE counts (id INT AUTO_INCREMENT, occupationName VARCHAR(255), number INT, PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

// export const countUpMostViewed = function(occupationName: any) {
//     if (theMostViewedOccupations[occupationName] == undefined) {
//         theMostViewedOccupations[occupationName] = 1
//     } else {
//         theMostViewedOccupations[occupationName] += 1
//     }
// }

// export const countUpMostCommented = function(occupationName: any) {
//     if (theMostCommentedOccupations[occupationName] == undefined) {
//         theMostCommentedOccupations[occupationName] = 1
//     } else {
//         theMostCommentedOccupations[occupationName] += 1
//     }
// }