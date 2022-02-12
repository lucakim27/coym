const loggedInUsers = []

function getLoggedInUsers() {
    return loggedInUsers
}

function addLoggedInUsers(newUser) {
    loggedInUsers.push(newUser)
}

module.exports = {
    getLoggedInUsers,
    addLoggedInUsers
}
