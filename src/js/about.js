const socket = io()
var socketid = ''

socket.on('displayId', id => {
    for (var i = 0; i < id.length; i++) {
        if (socketid == id[i]) {
            document.getElementById('userId').innerHTML = "<img src='../img/accountIMG.jpeg' style='width: 50px; height: 50px; margin-left: 315px; margin-top: -2px; padding: 3px;'>"
        }
    }
})

function clickProfile() {
    if (document.getElementById('myForm').style.display == 'block') {
        document.getElementById('myForm').style.display = 'none';
    } else {
        document.getElementById('myForm').style.display = 'block';
    }
}

function checkIfLoggedIn() {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
        socketid = getQueryVariable('socketid')
        socket.emit('getId', socketid)
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

function directToHome() {
    if (getQueryVariable('socketid') == '' || getQueryVariable('socketid') == undefined) {
        document.location.href = 'http://localhost:3000'
    }
    else {
        document.location.href = `http://localhost:3000/?socketid=${getQueryVariable('socketid')}` 
    }
}

checkIfLoggedIn()