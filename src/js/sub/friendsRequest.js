const socket = io()

socket.on('getUsername', () => {
    socket.emit('passBackUsername', $("#userId").text())
})

socket.on('getFriendsRequestPending', (array) => {
    const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")
    pendingFriendsRequestTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = pendingFriendsRequestTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Pending Friends Request</b>`
    for (var i = 0; i < array.length; i++) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i]
    }
})
