const loggedinUserTable = document.getElementById("loggedinUser")
const friendsListTable = document.getElementById("friendsList")

function getCookie(cname: string) {
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

try {
    if ($('#signIn').html() === 'Sign in') {
    } else {
        socket.emit('addOnlineUser', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

socket.on('getOnlineUsers', (onlineUsers: { [x: string]: any }) => {
    loggedinUserTable.innerHTML = '<tbody></tbody>'
    const keys = Object.keys(onlineUsers)
    var tableIndex = 0
    keys.forEach((key) => {
        if (onlineUsers[key] != '' && onlineUsers[key] != getCookie('current-user')) {
            var row = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(tableIndex).insertCell(0)
            var a = document.createElement('a')
            a.innerHTML = `${onlineUsers[key]}`
            a.setAttribute('data-toggle', 'modal')
            a.setAttribute('data-target', '#showOtherUserProfileModal')
            a.setAttribute('onclick', `putDetailsInOnlineUserModal('${onlineUsers[key]}')`)
            row.appendChild(a)
            tableIndex++
        }
    })
})

socket.on('getFriendsList', (friendsList: any) => {
    friendsListTable.innerHTML = '<tbody></tbody>'
    if (friendsList === null) return 0
    else {
        displayGetFriendsListTable(0, friendsList)
    }
})

socket.on('updateFriendsRequest', (PendingFriendsRequest: any) => {
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displayUpdateFriendsRequest(0, PendingFriendsRequest)
    toastr.success('Successfully added to your friends!')
})

socket.on('declineFriendsRequest', (val: number) => {
    if (val === 0) {
        toastr.warning('You are already friends with him/her..')
    } else if (val === 1) {
        toastr.error('You have already sent the friends request to him/her...')
    }
})

const putDetailsInOnlineUserModal = function(name: any) {
    $('.modal-title').html(name)
}

const requestFriends = function() {
    socket.emit('friendsRequest', $('.modal-title').html(), getCookie('current-user'))
}

const displayGetFriendsListTable = function(i: number, friendsList: string | any[]) {
    if (i < friendsList.length) {
        var row = friendsListTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        var a = document.createElement('a')
        a.innerHTML = friendsList[i]
        a.href = `/chat#${friendsList[i]}`
        row.appendChild(a)
        displayGetFriendsListTable(i+1, friendsList)
    }
}

const displayUpdateFriendsRequest = function(i: number, PendingFriendsRequest: string | any[]) {
    if (i < PendingFriendsRequest.length) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = PendingFriendsRequest[i]  + `<button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${PendingFriendsRequest[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${PendingFriendsRequest[i]}' onclick='declineFriendsRequest(this.id)'>X</button>`
        displayUpdateFriendsRequest(i+1, PendingFriendsRequest)
    }
}