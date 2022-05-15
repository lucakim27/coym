const socket = io()

socket.on('getUsername', () => {
    socket.emit('passBackUsername', $("#userId").text())
})

socket.on('getFriendsRequestPending', (array) => {
    const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    for (var i = 0; i < array.length; i++) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i]  + `<button style='width: 50px; margin-left: 30px;' id='${array[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px;' onclick='declineFriendsRequest(this.id)'>X</button>`
    }
})

const acceptFriendsRequest = function(counterpart) {
    socket.emit('acceptFriendsRequest', counterpart, $("#userId").text())
}

const declineFriendsRequest = function(counterpart) {
    alert(`You just declined the friends request from '${counterpart}'.`)
}
