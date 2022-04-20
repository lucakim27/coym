const socket = io()
const loggedinUserTable = document.getElementById("loggedinUser")
const friendsListTable = document.getElementById("friendsList")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getOnlineUsers', (onlineUsers, count) => {
    loggedinUserTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = loggedinUserTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Online users (${count})</b>`
    const keys = Object.keys(onlineUsers)
    keys.forEach((key, index) => {
        var row = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var a = document.createElement('a')
        if (onlineUsers[key] != 'anonymous') {
            a.innerHTML = `${onlineUsers[key]}`
            a.setAttribute('data-toggle', 'modal')
            a.setAttribute('data-target', '#showOtherUserProfileModal')
            a.setAttribute('onclick', `putDetailsInUserModal('${onlineUsers[key]}')`)
            row.appendChild(a)
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

const putDetailsInUserModal = function(name) {
    $('.modal-title').html(name)
}