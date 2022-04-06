const socket = io()
const countArray = {}
const table = document.getElementById("mostViewedOccuaptions")

socket.on('getMostViewed', (value) => {
    table.innerHTML = ''
    if (JSON.stringify(value) == '{}') {
        var row = table.insertRow(0)
        var cell = row.insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `There's no data at the moment.`
        cell.appendChild(p)
    } else {
        const keys = Object.keys(value)
        keys.forEach((key, index) => {
            var row = table.insertRow(index)
            var cell = row.insertCell(0)
            var p = document.createElement('p')
            p.innerHTML = `${key}: ${value[key]}<hr>`
            cell.appendChild(p)
        })
    }

    socket.emit('addOnlineUser', document.getElementById('userId').innerText)
    
})

if ($("#userId").text() == 'anonymous') {
    $("#logoutBtn").css('display', 'block')
    $("#logoutBtn").css('display', 'none')
} else {
    $("#logoutBtn").css('display', 'block')
    $("#loginBtn").css('display', 'none')
}