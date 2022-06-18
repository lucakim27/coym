export const chat = {}

/**
 * Function that returns a chat history between user and counterpart
 * @param {String} user
 * @param {String} counterpart
 * @return {array}
 */
 export const getChat = function(user: any, counterpart: any | number, chat?: any): Array<any> {
    var array = []
    if (chat[user] != undefined) {
        array.push(chat[user])
    }
    if (chat[counterpart] != undefined) {
        array.push(chat[counterpart])
    }
    return array
}

export const getAllChats = function() {
    return chat
}

export function toISOStringLocal(d: Date) {
    function z(n: number){
        return (n<10?'0':'') + n
    }
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
    z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
           z(d.getMinutes()) + ':' + z(d.getSeconds())       
}

export const addChatContent = function(user: any, counterpart: any, text: any, chat?: any) {
    var bool = true
    if (chat[user] === undefined || chat[user] === 'undefined') {
        chat[user] = [[counterpart, [text], [toISOStringLocal(new Date())]]]
    } else  {
        chat[user].forEach((key: any[]) => {
            if (key[0] === counterpart) {
                bool = false
                chat[user][0][1].push(text)
                chat[user][0][2].push(toISOStringLocal(new Date()))
            }
        })
        if (bool) {
            chat[user][0].push([counterpart, [text], [toISOStringLocal(new Date())]])
        }
    }
}