const accounts = []

function searchAccounts() {
    return accounts
}

function addAccount(newAcc) {
    accounts.push(newAcc)
}

module.exports = {
    searchAccounts,
    addAccount
}
