let onlineUsers: any = {}

export const getOnlineUsers = function(): any {
    return onlineUsers
}

export const setOnlineUser = function(username: any, socketid: any) {
    onlineUsers[socketid] = username
}

export const addOnlineUser = function(username: string, socketid: string) {
    if (username != 'Login') {
        setOnlineUser(username, socketid)
    }
}

/**
* Returns socketid by username
* @param {String} username
* @return {String}
*/
export const findOnlineUserByUsername = function (username: any): string {
    for (const [key, value] of Object.entries(onlineUsers)) {
        if (value === username) {
            return key
        }
    }
    return ''
}

export function removeOnlineUser(socketid: any) {
    if (onlineUsers === undefined || onlineUsers === null) {
        return 0
    }
    delete onlineUsers[socketid]
}