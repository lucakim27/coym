const loggedinUserTable = document.getElementById("loggedinUser")
const friendsListTable = document.getElementById("friendsList")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getOnlineUsers', (onlineUsers) => {
    loggedinUserTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = loggedinUserTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Online users</b>`
    const keys = Object.keys(onlineUsers)
    var tableIndex = 0
    keys.forEach((key) => {
        if (onlineUsers[key] != 'anonymous' && onlineUsers[key] != $("#userId").text()) {
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

socket.on('getFriendsList', friendsList => {
    friendsListTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = friendsListTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Your friends</b>`
    const keys = Object.keys(friendsList)
    keys.forEach((key, index) => {
        var row = friendsListTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var a = document.createElement('a')
        a.innerHTML = `${friendsList[key]}`
        row.appendChild(a)
    })
})

socket.on('updateFriendsRequest', (PendingFriendsRequest) => {
    console.log(JSON.stringify(PendingFriendsRequest))
})

const putDetailsInOnlineUserModal = function(name) {
    $('.modal-title').html(name)
}

const requestFriends = function() {
    socket.emit('friendsRequest', $('.modal-title').html(), $("#userId").text())
    alert("You just sent a friend request to '" + $('.modal-title').html() + "'")
}

const sendChats = function() {



    window.location = 'http://localhost:3000/chat'
}
