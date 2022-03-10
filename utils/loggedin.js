const loggedInUsers = []

function getLoggedInUsersIdBySocketId(socketid) {
    for (var i = 0; i < loggedInUsers.length; i++) {
        if (loggedInUsers[i][2] == socketid) {
            return loggedInUsers[i][0]
        }
    }
}

function addLoggedInUsers(newUser) {
    loggedInUsers.push(newUser)
}

module.exports = {
    getLoggedInUsersIdBySocketId,
    addLoggedInUsers
}
