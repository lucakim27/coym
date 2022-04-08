const socket = io()
const mostViewedOccuaptionsTable = document.getElementById("mostViewedOccuaptions")
const mostCommentedOccuaptionsTable = document.getElementById("mostCommentedOccuaptions")

socket.emit('addOnlineUser', $("#userId").text())

socket.on('getMostViewed', (value) => {
    mostViewedOccuaptionsTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header1 = mostViewedOccuaptionsTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header1.innerHTML = "<b>Most Viewed Pages</b><hr>"
    const keys = Object.keys(value)
    keys.forEach((key, index) => {
        var row = mostViewedOccuaptionsTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `${key}: ${value[key]}<hr>`
        row.appendChild(p)
    })
})

socket.on('getMostCommented', (value) => {
    mostCommentedOccuaptionsTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header2 = mostCommentedOccuaptionsTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header2.innerHTML = "<b>Most Commented Pages</b><hr>"
    const keys = Object.keys(value)
    keys.forEach((key, index) => {
        var row = mostCommentedOccuaptionsTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `${key}: ${value[key]}<hr>`
        row.appendChild(p)
    })
})
