var hash = ''
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
    socket.emit('getChatContents', window.location.hash, getCookie('current-user'))
    hash = window.location.hash
    hash = hash.substring(1, hash.length)
})

const sendChat = function() {
    alert($('#chatContent').val(), " ", window.location.hash, " ", getCookie('current-user'))
    socket.emit('sendChatContents', $('#chatContent').val(), getCookie('current-user'), hash)
}

socket.on('displayChatContents', (array) => {
    alert("displayChatContents")
    alert(array)
})

socket.on('updateChatContents', (array) => {
    alert("updateChatContents")
    alert(array)
})

socket.on('declineSendChatContents', () => {
    alert("You're declined to send a chat becasue you haven't chosen anyone to chat yet.")
})