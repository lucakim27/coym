const chat = {}

const getChat = function() {
    return chat
}

const addChatContent = function(user, conuterpart, texter, text) {
    chat[texter] = [user, conuterpart, text]
}

module.exports = {
    getChat,
    addChatContent
}