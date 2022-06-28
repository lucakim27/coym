// Array is better in this case since we need a search function for accounts
let accounts: any[] = []

export function addAccount(newAcc: any) {
    accounts.push(newAcc)
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