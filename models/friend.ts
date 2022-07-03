let friendsList: any = {}
let pendingFriendsRequest: any = {}

/**
* Function that returns value by socketId
* @param {String} counterpart
* @return {String || 0}
*/
export const getPendingFriendsRequest = function (counterpart: any): any {
    for (const [key, value] of Object.entries(pendingFriendsRequest)) {
        if (key === counterpart) {
            return value
        }
    }
    return 0
}

export const getAllPendingFriendsRequest = function (): any {
    return pendingFriendsRequest
}

/**
* Function that stores value in pendingFriendsRequest
* @param {String} socketId
* @return {String || 0}
*/
export const addPendingFriendsRequest = function (counterpart: any, user: any) {
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

export const removePendingFriendsRequest = function (counterpart: any) {
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

export const getFriendsListByUsername = function (user: any): any {
    return friendsList[user]
}

export const addFriendsList = function (user: any, counterpart: any) {
    if (!friendsList.hasOwnProperty(user)) {
        friendsList[user] = [counterpart]
    } else {
        friendsList[user].push(counterpart)
    }
}

export const sentFriendsRequest = function (user: any): any {
    var container: string[] = []
    if (pendingFriendsRequest === undefined || pendingFriendsRequest === null) {
        return 0
    }
    Object.keys(pendingFriendsRequest).forEach(key => {
        for (var i = 0; i < pendingFriendsRequest.length; i++) {
            if (pendingFriendsRequest[key][i] === user) {
                container.push(key.toString())
            }
        }
    })
    return container
}