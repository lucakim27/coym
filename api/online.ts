const onlineUsers = {}
const friendsList = {}
const pendingFriendsRequest = {}

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
* @return {String}
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
* @return {String || 0}
*/
const getPendingFriendsRequest = function(counterpart) {
    for (const [key, value] of Object.entries(pendingFriendsRequest)) {
        if (key === counterpart) {
            return value
        }
    }
    return 0
}

const getAllPendingFriendsRequest = function() {
    return pendingFriendsRequest
}

/**
* Function that stores value in pendingFriendsRequest
* @param {String} socketId
* @return {String || 0}
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

const removePendingFriendsRequest = function(counterpart) {
    var container = []
    Object.keys(getAllPendingFriendsRequest()).forEach(key => {
      for (var i = 0; i < getAllPendingFriendsRequest()[key].length; i++) {
        if (getAllPendingFriendsRequest()[key][i] != counterpart) {
          container.push(counterpart)
        }
      }
      getAllPendingFriendsRequest()[key] = container
    })
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

const sentFriendsRequest = function(user) {
    var container = []
    Object.keys(getAllPendingFriendsRequest()).forEach(key => {
        for (var i = 0; i < getAllPendingFriendsRequest()[key].length; i++) {
          if (getAllPendingFriendsRequest()[key][i] === user) {
            container.push(key.toString())
          }
        }
    })
    return container
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
    removePendingFriendsRequest,
    getAllPendingFriendsRequest,
    sentFriendsRequest
}
