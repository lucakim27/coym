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
                password
            ) VALUES (
                '${username}', 
                '${password}'
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