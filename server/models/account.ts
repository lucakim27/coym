import mysql2 from 'mysql2'

const connection = mysql2.createConnection({
    host: "localhost",
    user: "root",
    database: "coym"
})

export const createAccountsTable = function () {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`SELECT table_name
            FROM information_schema.tables
            WHERE table_schema = 'coym'
            AND table_name = 'accounts';`, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(`CREATE TABLE accounts (id INT AUTO_INCREMENT, username VARCHAR(255), password VARCHAR(255), PRIMARY KEY (id)) `, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addAccount = function (username: any, password: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`INSERT INTO accounts (username, password) VALUES ('${username}', '${password}')`, function (err: any, result: any) {
            if (err) throw err
        })
    })
}

const validateSignUp = function (username: any, password: any, passwordConfirm: any) {
    if (username.length < 6 || password.length < 6 || password !== passwordConfirm) {
        return 1
    } else {
        return 0
    }
}

export const authSignUp = function (res: any, req: any) {
    if (validateSignUp(req.body.username, req.body.password, req.body.passwordConfirm)) {
        res.send({status: false, message: 'It is either too short or doesnt match.'})
    } else {
        connection.connect(function (err: any) {
            if (err) throw err
            connection.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
                if (err) throw err
                if (result.length !== 0) {
                    var existing = false
                    for (var i = 0; i < result.length; i++) {
                        if (req.body.username === result[i].username || req.body.password === result[i].password) {
                            res.send({status: false, message: 'It already exits.'})
                            existing = true
                        }
                    }
                    if (!existing) {
                        addAccount(req.body.username, req.body.password)
                        res.send({status: true, message: 'Successfully signed up.'})
                    }
                } else {
                    addAccount(req.body.username, req.body.password)
                    res.send({status: true, message: 'Successfully signed up.'})
                }
            })
        })
    }
}

export const authSignIn = function (res: any, req: any) {
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.query.username === result[i].username && req.query.password === result[i].password) {
                    res.send({status: true, message: 'Successfully signed in.'})
                    existing = true
                }
            }
            if (!existing) {
                res.send({status: false, message: 'You failed to sign in.'})
            }
        })
    })
}