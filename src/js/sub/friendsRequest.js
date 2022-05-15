const socket = io()

socket.on('getUsername', () => {
    socket.emit('passBackUsername', $("#userId").text())
})

socket.on('getFriendsRequestPending', (array) => {
    const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    for (var i = 0; i < array.length; i++) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i]  + "<button style='width: 50px; margin-left: 30px;' onclick='acceptFriendsRequest()'>O</button><button style='width: 50px; margin-left: 30px;' onclick='declineFriendsRequest()'>X</button>"
    }
})

const acceptFriendsRequest = function() {
    alert("RUN acceptFriendsRequest")
}

const declineFriendsRequest = function() {
    alert("RUN declineFriendsRequest")

}
