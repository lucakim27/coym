const chatUsersTable = document.getElementById('chatUsers')
socket.emit('addOnlineUser', $("#userId").text())

// chatUsers
socket.on('getChatUsers', (chatUsers) => {
    chatUsersTable.innerHTML = '<tbody></tbody>'
    if (chatUsers === null) {
        var row = chatUsersTable.getElementsByTagName('tbody')[0].insertRow(0).insertCell(0)
        row.innerHTML = "<a>No chat users available.</a>"
        row.style.backgroundColor = 'white'

    }
    else {
        displayGetChatUsersTable(0, chatUsers)
    }
})

const displayGetChatUsersTable = function(i, chatUsers) {
    if (i < chatUsers.length) {
        var row = chatUsersTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = `<a href='#${chatUsers[i]}'>` +chatUsers[i] + '</a><hr>'
        row.style.backgroundColor = 'white'
        displayGetChatUsersTable(i+1, chatUsers)
    }
}

window.addEventListener('hashchange', function() { 
    socket.emit('getChatContents', window.location.hash)
})


// texts
