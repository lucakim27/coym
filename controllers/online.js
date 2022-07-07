const loggedinUserTable = document.getElementById("loggedinUser")
const friendsListTable = document.getElementById("friendsList")
const onlineUsers = JSON.parse(document.getElementById('onlineUsers').innerHTML)[0]

try {
    if ($('#signIn').html() !== 'Sign in') {
        socket.emit('addOnlineUser', getCookie('current-user'))
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

socket.on('updateNewOnlineUser', (array) => {
    var row = loggedinUserTable.getElementsByTagName('tbody')[0].insertRow(loggedinUserTable.rows.length - 1).insertCell(0)
    var a = document.createElement('a')
    a.innerHTML = JSON.parse(array)[0][0].username
    row.appendChild(a)
})

socket.on('updatedOnlineUsers', (array) => {

    console.log(JSON.parse(array)[0])
    console.log(loggedinUserTable.rows)

    var container = []

    for (var i = 0; i < JSON.parse(array)[0].length; i++) {
        container.push(JSON.parse(array)[0][i].username)
    }

    for (var i = 0; i < loggedinUserTable.rows.length; i++) {
        for (var j = 0; j < container.length; j++) {
            
        }
    }

})

// socket.on('getFriendsList', (friendsList) => {
//     friendsListTable.innerHTML = '<tbody></tbody>'
//     if (friendsList === null) return 0
//     else {
//         displayGetFriendsListTable(0, friendsList)
//     }
// })

// socket.on('updateFriendsRequest', (PendingFriendsRequest) => {
//     pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
//     displayUpdateFriendsRequest(0, PendingFriendsRequest)
//     toastr.success('Successfully added to your friends!')
// })

// socket.on('declineFriendsRequest', (val) => {
//     if (val === 0) {
//         toastr.warning('You are already friends with him/her..')
//     } else if (val === 1) {
//         toastr.error('You have already sent the friends request to him/her...')
//     }
// })

// const putDetailsInOnlineUserModal = function (name) {
//     $('.modal-title').html(name)
// }

// const requestFriends = function () {
//     socket.emit('friendsRequest', $('.modal-title').html(), getCookie('current-user'))
// }


// const displayGetFriendsListTable = function (i, friendsList) {
//     if (i < friendsList.length) {
//         var row = friendsListTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
//         var a = document.createElement('a')
//         a.innerHTML = friendsList[i]
//         a.href = `/chat#${friendsList[i]}`
//         row.appendChild(a)
//         displayGetFriendsListTable(i + 1, friendsList)
//     }
// }

// const displayUpdateFriendsRequest = function (i, PendingFriendsRequest) {
//     if (i < PendingFriendsRequest.length) {
//         var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
//         row.innerHTML = PendingFriendsRequest[i] + `<button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${PendingFriendsRequest[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${PendingFriendsRequest[i]}' onclick='declineFriendsRequest(this.id)'>X</button>`
//         displayUpdateFriendsRequest(i + 1, PendingFriendsRequest)
//     }
// }