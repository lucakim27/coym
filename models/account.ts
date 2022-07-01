import mysql2 from 'mysql2'

let accounts: any[] = []

const host = "localhost"
const user = "root"
const database = "coyo"

export const addAccount = function(username: any, password: any) {
    const connection = mysql2.createConnection({
        host: host,
        user: user,
        database: database
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

export function searchAccounts(id: any, pwd: any) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == id && accounts[i][1] == pwd) {
            return true
        }
    }
    return false
}

export function checkAccountsById(id: any) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == id) {
            return true
        }
    }
    return false
}

export function checkAccountsByPassword(Password: any) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == Password) {
            return true
        }
    }
    return false
}