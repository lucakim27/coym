const chatUsersTable = document.getElementById('chatUsers')
socket.emit('addOnlineUser', getCookie('current-user'))

function getCookie(cname) {
    let id = ''
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i]
      while (c.charAt(0) == ' ') {
        c = c.substring(1)
      }
      if (c.indexOf(name) == 0) {
        for (var j = 9; j < c.substring(name.length, c.length).length; j++) {
            if (c.substring(name.length, c.length)[j] === '"') {
                break
            } else {
                id += c.substring(name.length, c.length)[j]
            }
        }
        return id
      }
    }
    return ""
}


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
