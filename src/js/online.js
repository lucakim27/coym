const socket = io()
const table = document.getElementById("onlineUsersTable")

socket.emit('addOnlineUser', document.getElementById('userId').innerText)

socket.on('getOnlineUsers', (onlineUsers) => {
    table.innerHTML = ''
    if (JSON.stringify(onlineUsers) == '{}') {
        var row = table.insertRow(0)
        var cell = row.insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `There's no online user at the moment.`
        cell.appendChild(p)
    } else {
        const keys = Object.keys(onlineUsers)
        keys.forEach((key, index) => {
            var row = table.insertRow(index)
            var cell = row.insertCell(0)
            var p = document.createElement('p')
            p.innerHTML = `${key}: ${onlineUsers[key]}<hr>`
            cell.appendChild(p)
        })
    }
})

socket.on('getOnlineUsersNumber', (value) => {
    document.getElementById('anonymousUsersNumber').innerText = value[0]
    document.getElementById('loggedinUsersNumber').innerText = value[1]
})
