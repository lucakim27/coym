const chatUsersTable = document.getElementById('chatUsers')
const chatContentsTable = document.getElementById('chatContents')
socket.emit('addOnlineUser', getCookie('current-user'))
var urlParams = new URLSearchParams(window.location.hash.replace("#","?")).toString()

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
        row.innerHTML = "<a> ................... </a>"
        row.style.backgroundColor = 'white'
    }
    else {
        displayGetChatUsersTable(0, chatUsers)
    }
})

const displayGetChatUsersTable = function(i, chatUsers) {
    if (i < chatUsers.length) {
        var row = chatUsersTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = `<a href='#${chatUsers[i]}' style='padding: 10px;'>` + chatUsers[i] + '</a><br>'
        row.style.backgroundColor = 'rgb(235, 235, 235)'
        row.style.borderRadius = "5px"
        displayGetChatUsersTable(i+1, chatUsers)
    }
}


const sendChat = function() {
    alert(`${$('#chatContent').val()} ${getCookie('current-user')} ${urlParams.substring(0, urlParams.length - 1)}`)
    socket.emit('sendChatContents', $('#chatContent').val(), getCookie('current-user'), urlParams.substring(0, urlParams.length - 1))
}

window.addEventListener('hashchange', function() {
    socket.emit('getChatContents', window.location.hash, getCookie('current-user'))
})

socket.on('displayChatContents', (array) => {
    chatContentsTable.innerHTML = '<tbody></tbody>'
    displayChatContentsTable(0, array)
})

socket.on('updateChatContents', (array) => {
    chatContentsTable.innerHTML = '<tbody></tbody>'
    displayChatContentsTable(0, array)
})

const displayChatContentsTable = function(i, chatContents) {
    // display chat contents in the time order 
    if (i < chatContents.length) {
        var row = chatContentsTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML += chatContents[i] + "<hr>"
        displayChatContentsTable(i+1, chatContents)
    }
}

socket.on('declineSendChatContents', () => {
    alert("You're declined to send a chat becasue you haven't chosen anyone to chat yet.")
})