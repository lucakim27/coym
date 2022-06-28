let chat: any = {}

/**
 * Returns a chat content that is associated with an user and the counterpart
 * @param {String} user
 * @param {String} counterpart
 * @return {Array}
 */
 export const searchChat = function(user: any, counterpart: any): Array<any> {
    var array = []
    if (chat[user] != undefined) {
        array.push(chat[user])
    }
    if (chat[counterpart] != undefined) {
        array.push(chat[counterpart])
    }
    return array
}

/**
 * Returns a chat object
 * @return {Object}
 */
export const getAllChats = function(): any {
    return chat
}

/**
 * Returns a ISO format date (Must be above 'storeChatContent' function)
 * @param {Date} d
 * @return {String}
 */
const toISOStringLocal = function(d: Date): string {
    function z(n: number){
        return (n<10?'0':'') + n
    }
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
    z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
           z(d.getMinutes()) + ':' + z(d.getSeconds())       
}

/**
 * Stores a chat content by username and counterpart
 * @param {String} user
 * @param {String} counterpart
 * @param {String} chatContent
 */
export const storeChatContent = function(user: any, counterpart: any, chatContent: any) {
    var bool = true
    if (chat[user] === undefined || chat[user] === 'undefined') {
        chat[user] = [[counterpart, [chatContent], [toISOStringLocal(new Date())]]]
    } else  {
        chat[user].forEach((key: any[]) => {
            if (key[0] === counterpart) {
                bool = false
                chat[user][0][1].push(chatContent)
                chat[user][0][2].push(toISOStringLocal(new Date()))
            }
        })
        if (bool) {
            chat[user][0].push([counterpart, [chatContent], [toISOStringLocal(new Date())]])
        }
    }
}