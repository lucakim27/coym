const socket = io()
const countArray = {}
const table = document.getElementById("mostViewedOccuaptions")

socket.on('getMostViewed', (value) => {
    
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
        socketid = getQueryVariable('socketid')
        socket.emit('getId', socketid)
    }

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
