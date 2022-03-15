const socket = io()
const occupationArray = []

socket.on('userEnter', (array) => {

    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
        socketid = getQueryVariable('socketid')
        socket.emit('getId', socketid)
    }

    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }

    for (var i = 0; i < occupationArray.length; i++) {

        var table = document.getElementById("mostViewedOccuaptions")
        var row = table.insertRow(i)
        var cell = row.insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = occupationArray[i][0]
        cell.appendChild(p)
        cell.appendChild(document.createElement('hr'))

        var table = document.getElementById("mostCommentedOccuaptions")
        var row = table.insertRow(i)
        var cell = row.insertCell(0)
        var p = document.createElement('p')
        p.innerHTML = occupationArray[i][0]
        cell.appendChild(p)
        cell.appendChild(document.createElement('hr'))

    }
})

function directPages(page) {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000/' + page
    } else {
        document.location.href = `http://localhost:3000/${page}?socketid=${getQueryVariable('socketid')}`
    }
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    var vars = query.split('&')
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=')
        if (decodeURIComponent(pair[0]) == variable) {
            if (decodeURIComponent(pair[1]).includes('+') == false) {
                return decodeURIComponent(pair[1])
            }
            else {
                return decodeURIComponent(pair[1].replaceAll('+', ' '))
            }
        }
    }
}

socket.on('displayId', id => {
    document.getElementById('userAccountId').innerHTML = "Your id: " + id
    document.getElementById('userId').innerHTML = "<img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px; margin-left: 315px; margin-top: -2px; padding: 3px;'>"
})
