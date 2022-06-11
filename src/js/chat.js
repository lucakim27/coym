const chatUsersTable = document.getElementById('chatUsers')
const chatContentsTable = document.getElementById('chatContents')
const user = { 
    selected: ''
}

try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error);
}

const getSelectedChatUser = function() {
    return user.selected
}

const setSelectedChatUser = function(selectedChatUser) {
    user.selected = selectedChatUser
}

const getQueryVariable = function(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            } else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

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
        row.style.backgroundColor = 'white'
    }
    else {
        displayGetChatUsersTable(0, chatUsers)
    }
})

const displayGetChatUsersTable = function(i, chatUsers) {
    if (i < chatUsers.length) {
        var row = chatUsersTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = `<a onclick="chatUserClick('${String(chatUsers[i])}')" id='${String(chatUsers[i])}'>` + chatUsers[i] + '</a><br>'
        row.style.padding = '10px'
        displayGetChatUsersTable(i+1, chatUsers)
    }
}

const sendChat = function() {
    console.log( $('#chatContent').val())
    console.log(getCookie('current-user'))
    console.log(getSelectedChatUser())
    socket.emit('sendChatContents', $('#chatContent').val(), getCookie('current-user'), getSelectedChatUser())
    $('#chatContent').val('')
}

function chatUserClick(counterpart) {
    setSelectedChatUser(counterpart)
    socket.emit('getChatContents', counterpart, getCookie('current-user'))
}

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
        row.style.width = '130vh'
        displayChatContentsTable(i+1, chatContents)
    }
}

socket.on('declineSendChatContents', (val) => {
    if (val === 0) {
        toastr.error('You are not logged in...')
    } else if (val === 1) {
        toastr.error('You have not chosen anyone to chat with yet...')
    }
})
