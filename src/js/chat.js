const socket = io()
const chatUsersTable = document.getElementById('chatUsers')
socket.emit('addOnlineUser', $("#userId").text())

// chatUsers
socket.on('getChatUsers', (chatUsers) => {
    chatUsersTable.innerHTML = ''
    const keys = Object.keys(chatUsers)
    keys.forEach((key, index) => {
        var row = chatUsersTable.insertRow(index).insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `${chatUsers[key]}<hr>`
        row.appendChild(p)
    })
})

// texts
