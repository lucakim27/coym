import mysql2 from 'mysql2'

export const addAccount = function (username: any, password: any) {
    const connection = mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "coyo"
    })
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`CREATE DATABASE IF NOT EXISTS coyo;`, function (err: any, result: any) {
            if (err) throw err
        })
        connection.query(`CREATE TABLE IF NOT EXISTS accounts (username VARCHAR(255), password VARCHAR(255))`, function (err: any, result: any) {
            if (err) throw err
        })
        connection.query(`INSERT INTO accounts (username, password) VALUES ('${username}', '${password}')`, function (err: any, result: any) {
            if (err) throw err
        })
    })
}

export const authRegistration = function (res: any, req: any) {
    const connection = mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "coyo"
    })
    connection.connect(function (err: any) {
        if (err) throw err
        connection.query(`CREATE TABLE IF NOT EXISTS accounts (username VARCHAR(255), password VARCHAR(255))`, function (err: any, result: any) {
            if (err) throw err
        })
        connection.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
            if (err) throw err
            if (result.length !== 0) {
                var existing = false
                for (var i = 0; i < result.length; i++) {
                    if (req.body.username === result[i].username || req.body.password === result[i].password) {
                        res.send(`<script>alert("Account already exists"); window.location.href = "/register"; </script>`)
                        existing = true
                    }
                }
                if (!existing) {
                    addAccount(req.body.username, req.body.password)
                    res.redirect('/login')
                }
            } else {
                addAccount(req.body.username, req.body.password)
                res.redirect('/login')
            }
        })
    })
}

export const authLogin = function (res: any, req: any) {
    const con = mysql2.createConnection({
        host: "localhost",
        user: "root",
        database: "coyo"
    })
    con.connect(function (err: any) {
        if (err) throw err
        con.query("SELECT * FROM accounts", function (err: any, result: any, fields: any) {
            if (err) throw err
            var existing = false
            for (var i = 0; i < result.length; i++) {
                if (req.body.username === result[i].username && req.body.password === result[i].password) {
                    res.cookie('current-user', { id: req.body.username, pwd: req.body.password })
                    res.redirect('/home')
                    existing = true
                }
            }
            if (!existing) {
                res.send(`<script>alert("Wrong username or password"); window.location.href = "/login"; </script>`)
            }
        })
    })
}