const accounts = []

function addAccount(newAcc) {
    accounts.push(newAcc)
}

function searchAccounts(acc) {
    for (var i = 0; i < accounts.length; i++) {
        if (accounts[i][0] == acc[0] && accounts[i][1] == acc[1]) {
            return true
        }
    }
}

module.exports = {
    searchAccounts,
    addAccount
}
