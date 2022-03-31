const accounts = []

function addAccount(newAcc) {
    accounts.push(newAcc)
    return accounts
}

function searchAccounts(acc) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == acc[0] && accounts[i][1] == acc[1]) {
            return true
        }
    }
}

function checkAccountsById(id) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == id) {
            return true
        }
    }
    return false
}

function checkAccountsByPassword(Password) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][1] == Password) {
            return true
        }
    }
    return false
}

module.exports = {
    searchAccounts,
    addAccount,
    checkAccountsById,
    checkAccountsByPassword
}
