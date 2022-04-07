const socket = io()
const unloggedinUserTable = document.getElementById("unloggedinUser")
const loggedinUserTable = document.getElementById("loggedinUser")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getOnlineUsers', (onlineUsers) => {
    unloggedinUserTable.innerHTML = ''
    loggedinUserTable.innerHTML = ''
    const keys = Object.keys(onlineUsers)
    keys.forEach((key, index) => {
        var row1 = unloggedinUserTable.insertRow(index).insertCell(0)
        var row2 = loggedinUserTable.insertRow(index).insertCell(0)
        var p = document.createElement('p')
        if (onlineUsers[key] != 'anonymous') {
            p.innerHTML = `${onlineUsers[key]}<hr>`
            row2.appendChild(p)
        } else {
            p.innerHTML = `${key}<hr>`
            row1.appendChild(p)
        }
    })
})

socket.on('getOnlineUsersNumber', (value) => {
    $("#anonymousUsersNumber").text(value[0])
    $("#loggedinUsersNumber").text(value[1])
})
