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

const addPendingFriendsRequest = function(myname, username) {
    if (!pendingFriendsRequest.hasOwnProperty(username)) {
        pendingFriendsRequest[username] = [myname]
    } else {
        for (const [key, value] of Object.entries(pendingFriendsRequest)) {
            if (!value.includes(myname)) {
                pendingFriendsRequest[username].push(myname)
                return 0
            }
        }
    }
}

const getFriendsList = function() {
    return friendsList
}

const addFriendsList = function(myname, username) {
    if (!friendsList.hasOwnProperty(myname)) {
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
    findOnlineUserById,
}
