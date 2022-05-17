const onlineUsers = {}
const friendsList = {}
const pendingFriendsRequest  = {}

function getOnlineUsers() {
    return onlineUsers
}

function addOnlineUser(newUser, socketid) {
    if (newUser != 'Login') {
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
    // find where has a duplication issue

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

const getFriendsListByUsername = function(user) {
    return friendsList[user]
}

const addFriendsList = function(user, counterpart) {
    if (!friendsList.hasOwnProperty(user)) {
        friendsList[user] = [counterpart]
    } else {
        friendsList[user].push(counterpart)
    }
}

module.exports = {
    getOnlineUsers,
    addOnlineUser,
    removeOnlineUser,
    addPendingFriendsRequest,
    getPendingFriendsRequest,
    findOnlineUserByUsername,
    addFriendsList,
    getFriendsListByUsername,
}
