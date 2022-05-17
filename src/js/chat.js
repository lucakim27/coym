const chatUsersTable = document.getElementById('chatUsers')
socket.emit('addOnlineUser', $("#userId").text())

// chatUsers
socket.on('getChatUsers', (chatUsers) => {
    chatUsersTable.innerHTML = '<tbody></tbody>'
    if (chatUsers === null) return 0
    else {
        displayGetChatUsersTable(0, chatUsers)
    }
})

const displayGetChatUsersTable = function(i, chatUsers) {
    if (i < chatUsers.length) {
        var row = chatUsersTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = chatUsers[i] + '<hr>'
        row.style.backgroundColor = 'white';
        displayGetChatUsersTable(i+1, chatUsers)
    }
}

// texts
