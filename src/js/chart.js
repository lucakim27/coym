const socket = io()
const countArray = {}
const table = document.getElementById("mostViewedOccuaptions")

socket.on('getMostViewed', (value) => {
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

})
