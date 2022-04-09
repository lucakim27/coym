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
        var p = document.createElement('p')
        if (onlineUsers[key] != 'anonymous') {
            p.innerHTML = `${onlineUsers[key]}`
            row.appendChild(p)
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
        var p = document.createElement('p')
        p.innerHTML = `${friendsList[key]}`
        row.appendChild(p)
    })
})
