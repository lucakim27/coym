const onlineUsers = {}

function getOnlineUsers() {
    return onlineUsers
}

function addOnlineUser(newUser, socketid) {
    onlineUsers[socketid] = newUser
}

function removeOnlineUser(socketid) {
    delete onlineUsers[socketid]
}

function countUsers() {

    var anonymous = 0
    var loggedin = 0

    const keys = Object.keys(onlineUsers)

    keys.forEach((key) => {
        if (onlineUsers[key] == 'anonymous') {
            anonymous++
        } else {
            loggedin++
        }
    })

    return [anonymous, loggedin]
}

module.exports = {
    getOnlineUsers,
    addOnlineUser,
    countUsers,
    removeOnlineUser
}
