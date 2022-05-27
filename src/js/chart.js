const mostViewedOccuaptionsTable = document.getElementById("mostViewedOccuaptions")
const mostCommentedOccuaptionsTable = document.getElementById("mostCommentedOccuaptions")

function getCookie(cname) {
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

socket.emit('addOnlineUser', getCookie('current-user'))

socket.on('getMostViewed', (value) => {
    mostViewedOccuaptionsTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header1 = mostViewedOccuaptionsTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header1.innerHTML = "<b>Most Viewed Pages</b>"
    const keys = Object.keys(value)
    keys.forEach((key, index) => {
        var row = mostViewedOccuaptionsTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `${key}: ${value[key]}`
        row.appendChild(p)
    })
})

socket.on('getMostCommented', (value) => {
    mostCommentedOccuaptionsTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header2 = mostCommentedOccuaptionsTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header2.innerHTML = "<b>Most Commented Pages</b>"
    const keys = Object.keys(value)
    keys.forEach((key, index) => {
        var row = mostCommentedOccuaptionsTable.getElementsByTagName('tbody')[0].insertRow(index).insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = `${key}: ${value[key]}`
        row.appendChild(p)
    })
})
