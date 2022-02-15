const socket = io()
const occupationArray = []
var socketid = ''
document.getElementById('userInput').addEventListener('change', updateValue);

socket.on('userEnter', (array) => {
    for (var i = 0; i < array.length; i++) {
        occupationArray.push(array[i])
    }
    listOutOccupations()
    if (getQueryVariable('socketid') === '') {
        document.getElementById('userId').style.display = 'none'
    }
    else {
        document.getElementById('loginBtn').style.display = 'none'
        socketid = getQueryVariable('socketid')
        socket.emit('getId', socketid)
    }
})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

socket.on('displayId', id => {
    for (var i = 0; i < id.length; i++) {
        if (socketid == id[i]) {
            document.getElementById('userId').innerHTML = socketid
        }
    }
})

function listOutOccupations() {
    for (var i = 0; i < occupationArray.length; i++) {
        document.getElementById('divScroll').innerHTML += "<a onclick='directPage(this.innerText)'>" + occupationArray[i][0] + "</a><hr>"
    }
}

function directPage(occupationName) {
    document.location.href = 'http://localhost:3000/comment?occupation=' + occupationName
}

function clickLoginBtn() {
    document.location.href = 'http://localhost:3000/login'
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1)
    return query
}


function updateValue(e) {
  document.getElementById('divScroll').innerHTML = ""
  for (var i = 0; i < occupationArray.length; i++) {
      if (occupationArray[i][0].toLowerCase().includes(e.target.value.toLowerCase()) == true) {
          document.getElementById('divScroll').innerHTML += "<a onclick='directPage(this.innerText)'>" + occupationArray[i][0] + "</a><hr>"
      }
  }
}