
const chat = {}

/**
 * Function that returns a chat history between user and counterpart
 * @param {String} user
 * @param {String} counterpart
 * @return {array} array of the chat log for user and counterpart
 */
const getChat = function(user, counterpart) {
    var array = []
    array.push(chat[user])
    array.push(chat[counterpart])
    return array
}

const getAllChats = function() {
    return chat
}

function toISOStringLocal(d) {
    function z(n){
        return (n<10?'0':'') + n
    }
    return d.getFullYear() + '-' + z(d.getMonth()+1) + '-' +
    z(d.getDate()) + 'T' + z(d.getHours()) + ':' +
           z(d.getMinutes()) + ':' + z(d.getSeconds())       
}

const addChatContent = function(user, counterpart, text) {
    var bool = true
    if (chat[user] === undefined || chat[user] === 'undefined') {
        chat[user] = [[counterpart, [text], [toISOStringLocal(new Date())]]]
    } else  {
        chat[user].forEach(key => {
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

module.exports = {
    getChat,
    addChatContent,
    getAllChats
}