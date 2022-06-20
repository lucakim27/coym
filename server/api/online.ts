export const onlineUsers = {}
export const friendsList = {}
export const pendingFriendsRequest = {}

export function getOnlineUsers(onlineUsers?: any): any {
    return onlineUsers
}

export function setOnlineUser(username: string, socketid: any, onlineUsers?: any) {
    onlineUsers[socketid] = username
}

export function addOnlineUser(username: string, socketid: string, onlineUsers?: any) {
    if (username != 'Login') {
        setOnlineUser(username, socketid)
    }
}

/**
* Function that returns socketId by username
* @param {String} username
* @return {String}
*/
export const findOnlineUserByUsername = function(username: any, onlineUsers?: any) {
    for (const [key, value] of Object.entries(onlineUsers)) {
        if (value === username) {
            return key
        }
    }
    return ''
}

export function removeOnlineUser(socketid: string | number, onlineUsers?: any) {
    delete onlineUsers[socketid]
}

/**
* Function that returns value by socketId
* @param {String} socketId
* @return {String || 0}
*/
export const getPendingFriendsRequest = function(counterpart: string) {
    for (const [key, value] of Object.entries(pendingFriendsRequest)) {
        if (key === counterpart) {
            return value
        }
    }
    return 0
}

export const getAllPendingFriendsRequest = function() {
    return pendingFriendsRequest
}

/**
* Function that stores value in pendingFriendsRequest
* @param {String} socketId
* @return {String || 0}
*/
export const addPendingFriendsRequest = function(counterpart: PropertyKey, user: any, pendingFriendsRequest?: any) {
    if (!pendingFriendsRequest.hasOwnProperty(counterpart)) {
        pendingFriendsRequest[counterpart] = [user]
    } else {
        for (const [key, value] of Object.entries(pendingFriendsRequest)) {
            if (key === counterpart) {
                var array: any = value
                array.push(user)
                delete pendingFriendsRequest[key]
                pendingFriendsRequest[key] = array
                return 0
            }
        }
    }
}

export const removePendingFriendsRequest = function(counterpart: any, pendingFriendsRequest?: any) {
    var container: any[] = []
    Object.keys(pendingFriendsRequest).forEach(key => {
      for (var i = 0; i < pendingFriendsRequest[key].length; i++) {
        if (pendingFriendsRequest[key][i] != counterpart) {
          container.push(counterpart)
        }
      }
      pendingFriendsRequest[key] = container
    })
}

export const getFriendsListByUsername = function(user: string | number, friendsList?: any) {
    return friendsList[user]
}

export const addFriendsList = function(user: PropertyKey, counterpart: any, friendsList?: any) {
    if (!friendsList.hasOwnProperty(user)) {
        friendsList[user] = [counterpart]
    } else {
        friendsList[user].push(counterpart)
    }
}

export const sentFriendsRequest = function(user: any, pendingFriendsRequest?: any) {
    var container: string[] = []
    Object.keys(pendingFriendsRequest).forEach(key => {
        for (var i = 0; i < pendingFriendsRequest.length; i++) {
          if (pendingFriendsRequest[key][i] === user) {
            container.push(key.toString())
          }
        }
    })
    return container
}