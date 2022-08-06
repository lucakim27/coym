export const createAccountsTable = function (connection: any) {

    const tableDuplicationQuery = `SELECT table_name
        FROM information_schema.tables
        WHERE table_schema = 'coym'
        AND table_name = 'accounts';
    `

    const createAccountsTableQuery = `CREATE TABLE 
        accounts (
            id INT AUTO_INCREMENT,
            username VARCHAR(255) NOT NULL, 
            password VARCHAR(255) NOT NULL, 
            gender VARCHAR(255),
            country VARCHAR(255),
            major VARCHAR(255),
            school VARCHAR(255),
            createdAt DATETIME NOT NULL,
            updatedAt DATETIME,
            PRIMARY KEY (id)
        )
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(tableDuplicationQuery, function (err: any, result: any) {
            if (err) throw err
            if (!result.length) {
                connection.query(createAccountsTableQuery, function (err: any, result: any) {
                    if (err) throw err
                })
            }
        })
    })
}

export const addAccount = function (connection: any, username: any, password: any) {

    const insertAccountsQuery = function (username: any, password: any) {
        return `INSERT INTO
            accounts (
                username, 
                password,
                createdAt
            ) VALUES (
                '${username}', 
                '${password}',
                '${new Date().toISOString().slice(0, 19).replace('T', ' ')}'
            )
        `
    }

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(insertAccountsQuery(username, password), function (err: any, result: any) {
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

export const authSignUp = function (connection: any, res: any, req: any) {

    const selectAccountsQuery = "SELECT * FROM accounts"

    if (validateSignUp(req.body.username, req.body.password, req.body.passwordConfirm)) {
        res.send({
            status: false,
            message: 'It is either too short or doesnt match.'
        })
    } else {
        connection.connect(function (err: any) {
            if (err) throw err
            connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
                if (err) throw err
                if (result.length !== 0) {
                    var existing = false
                    for (var i = 0; i < result.length; i++) {
                        if (req.body.username === result[i].username || req.body.password === result[i].password) {
                            res.send({
                                status: false,
                                message: 'It already exists.'
                            })
                            existing = true
                        }
                    }
                    if (!existing) {
                        addAccount(connection, req.body.username, req.body.password)
                        res.send({
                            status: true,
                            message: 'Successfully signed up.'
                        })
                    }
                } else {
                    addAccount(connection, req.body.username, req.body.password)
                    res.send({
                        status: true,
                        message: 'Successfully signed up.'
                    })
                }
            })
        })
    }
}

export const authSignIn = function (connection: any, res: any, req: any) {

    const selectAccountsQuery = "SELECT * FROM accounts"

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.query.username === result[i].username && req.query.password === result[i].password) {
                    res.send({
                        status: true,
                        message: 'Successfully signed in.'
                    })
                    existing = true
                }
            }
            if (!existing) {
                res.send({
                    status: false,
                    message: 'You failed to sign in.'
                })
            }
        })
    })

}

export const cookieValidation = function (connection: any, res: any, req: any) {

    const selectAccountsQuery = "SELECT * FROM accounts"

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.query.username === result[i].username && req.query.password === result[i].password) {
                    res.send({
                        status: true,
                        username: req.query.username
                    })
                    existing = true
                }
            }
            if (!existing) {
                res.send({
                    status: false
                })
            }
        })
    })

}

export const getUserDetails = function (connection: any, res: any, req: any) {

    const selectAccountsQuery = `SELECT * FROM accounts 
        WHERE username = '${req.query.username}'
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(selectAccountsQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({
                status: true,
                userDetails: { 
                    username: result[0].username,
                    gender: result[0].gender,
                    country: result[0].country,
                    major: result[0].major,
                    school: result[0].school
                }
            })
        })
    })

}

export const updateUserDetails = function (connection: any, res: any, req: any) {

    const updateAllDetailsQuery = `UPDATE accounts
        SET username = "${req.body.username}",
            gender = "${req.body.gender}",
            school = "${req.body.school}",
            country = "${req.body.country}",
            major = "${req.body.major}",
            updatedAt = "${new Date().toISOString().slice(0, 19).replace('T', ' ')}"
        WHERE username = "${req.body.username}" AND password = "${req.body.password}"
    `

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(updateAllDetailsQuery, function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.changedRows === 0) {
                res.send({
                    status: false,
                    message: "Either username or password is not matching."
                })
            } else {
                res.send({
                    status: true,
                    message: "You have successfully updated the details."
                })
            }
        })
    })

}

export const getAllUsers = function (connection: any, res: any, req: any) {

    const getAllUsers = `SELECT * FROM accounts`

    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(getAllUsers, function (err: any, result: any, fields: any) {
            if (err) throw err
            res.send({
                status: true,
                data: result
            })
        })
    })

}