const onlineUsers = {}
const friendsList = {}
const pendingFriendsRequest  = {}

function getOnlineUsers() {
    return onlineUsers
}

function addOnlineUser(newUser, socketid) {
    if (newUser != 'anonymous') {
        onlineUsers[socketid] = newUser
    }
}

const findOnlineUserById = function(id) {
    var socketId = ''
    const keys = Object.keys(onlineUsers)
    keys.forEach((key, index) => {
        if (onlineUsers[key] == id) {
            socketId = key
        }
    })
    return socketId
}

function removeOnlineUser(socketid) {
    delete onlineUsers[socketid]
}

const getPendingFriendsRequest = function() {
    return pendingFriendsRequest
}

const getFriendsList = function() {
    return friendsList
}

const addPendingFriendsRequest = function(myname, username) {
    if (pendingFriendsRequest.hasOwnProperty(username) != true) {
        pendingFriendsRequest[username] = [myname]
    } else {
        pendingFriendsRequest[username].push(myname)
    }
}

const addFriendsList = function(myname, username) {
    if (friendsList.hasOwnProperty(myname) != true) {
        friendsList[myname] = [username]
    } else {
        friendsList[myname].pushs(username)
    }
}

module.exports = {
    getOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    getFriendsList,
    addFriendsList,
    addPendingFriendsRequest,
    getPendingFriendsRequest,
    findOnlineUserById
}
