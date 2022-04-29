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

/**
* Function that returns socketId by username
* @param {String} username
* @return {String} socketId || 0
*/
const findOnlineUserByUsername = function(username) {
    for (const [key, value] of Object.entries(onlineUsers)) {
        if (value === username) {
            return key
        }
    }
    return 0
}

/**
* Function that returns username by socketId
* @param {String} socketId
* @return {String} username || 0
*/
const findOnlineUserById = function(socketId) {
    for (const [key, value] of Object.entries(onlineUsers)) {
        if (key === socketId) {
            return value
        }
    }
    return 0
}

function removeOnlineUser(socketid) {
    delete onlineUsers[socketid]
}

/**
* Function that returns value by socketId
* @param {String} socketId
* @return {String} value || 0
*/
const getPendingFriendsRequest = function(counterpart) {
    for (const [key, value] of Object.entries(pendingFriendsRequest)) {
        if (key === counterpart) {
            return value
        }
    }
    return 0
}

/**
* Function that stores value in pendingFriendsRequest
* @param {String} socketId
* @return {String} value || 0
*/
const addPendingFriendsRequest = function(counterpart, user) {
    if (!pendingFriendsRequest.hasOwnProperty(counterpart)) {
        pendingFriendsRequest[counterpart] = [user]
    } else {
        for (const [key, value] of Object.entries(pendingFriendsRequest)) {
            if (key === counterpart) {
                var array = value
                array.push(user)
                delete pendingFriendsRequest[key]
                pendingFriendsRequest[key] = array
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
    addPendingFriendsRequest,
    getPendingFriendsRequest,
    findOnlineUserByUsername,
}
