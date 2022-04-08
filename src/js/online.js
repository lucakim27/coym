const socket = io()
const unloggedinUserTable = document.getElementById("unloggedinUser")
const loggedinUserTable = document.getElementById("loggedinUser")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getOnlineUsers', (onlineUsers) => {
    unloggedinUserTable.innerHTML = '<thead></thead><tbody></tbody>'
    loggedinUserTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header1 = unloggedinUserTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    var header2 = loggedinUserTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header1.innerHTML = "<b>unlogged in user</b><hr>"
    header2.innerHTML = "<b>logged in user</b><hr>"
    const keys = Object.keys(onlineUsers)
    keys.forEach((key, index) => {
        var row1 = unloggedinUserTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var row2 = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
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
