const accounts = []

function addAccount(newAcc) {
    accounts.push(newAcc)
}

function searchAccounts(id, pwd) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == id && accounts[i][1] == pwd) {
            return true
        }
    }
    return false
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
