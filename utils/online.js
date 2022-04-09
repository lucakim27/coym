const onlineUsers = {}
const friendsList = {}

function getOnlineUsers() {
    return onlineUsers
}

function addOnlineUser(newUser, socketid) {
    if (newUser != 'anonymous') {
        onlineUsers[socketid] = newUser
    }
}

function removeOnlineUser(socketid) {
    delete onlineUsers[socketid]
}

function countUsers() {
    return Object.keys(onlineUsers).length
}

function getFriendsList() {
    return friendsList
}

function addFriend(userId, friendsId) {
    friendsList[userId] = friendsId
}

module.exports = {
    getOnlineUsers,
    addOnlineUser,
    countUsers,
    removeOnlineUser,
    getFriendsList,
    addFriend
}
