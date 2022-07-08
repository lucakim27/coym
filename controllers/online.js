const loggedinUserTable = document.getElementById("loggedinUser")
const onlineUsers = JSON.parse(document.getElementById('onlineUsers').innerHTML)[0]

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('join', getCookie('current-user'))
    }
} catch (error) {
    console.error(error)
}

const displayOnlineUsers = function (i, array) {
    if (i < array.length) {
        var row = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        var a = document.createElement('a')
        a.innerHTML = array[i].username
        row.appendChild(a)
        displayOnlineUsers(i+1, array)
    }
}

displayOnlineUsers(0, onlineUsers)

socket.on('updateOnlineUsers', (array) => {
    $("tbody").children().remove()
    displayOnlineUsers(0, JSON.parse(array)[0])
})