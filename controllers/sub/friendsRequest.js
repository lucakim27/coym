const socket = io();
const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")
const sentFriendsRequestTable = document.getElementById("sentFriendsRequest")

function getCookie(cname) {
    let id = ''
    let name = cname + "="
    let decodedCookie = decodeURIComponent(document.cookie)
    let ca = decodedCookie.split(';')
    for (let i = 0; i < ca.length; i++) {
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

socket.emit('passBackUsername', getCookie('current-user'))

socket.on('getFriendsRequestPending', (array) => {
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displayPendingFriendsRequestTable(0, array)
})

socket.on('updatePendingFriendsRequest', (array) => {
    pendingFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displayPendingFriendsRequestTable(0, array)
})

socket.on('getSentFriendsRequestPending', (array) => {
    sentFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displaySentPendingFriendsRequestTable(0, array)
})

socket.on('updateSentPendingFriendsRequest', (array) => {
    sentFriendsRequestTable.innerHTML = '<tbody></tbody>'
    displaySentPendingFriendsRequestTable(0, array)
})

const acceptFriendsRequest = function (counterpart) {
    socket.emit('acceptFriendsRequest', counterpart, getCookie('current-user'))
    socket.emit('removePendingFriendsRequest', counterpart, getCookie('current-user'))
}

const declineFriendsRequest = function (counterpart) {
    socket.emit('removePendingFriendsRequest', counterpart, getCookie('current-user'))
}

const displayPendingFriendsRequestTable = function (i, array) {
    if (i < array.length) {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i] + `<button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${array[i]}' onclick='acceptFriendsRequest(this.id)'>O</button><button style='width: 50px; margin-left: 30px; border-radius: 30px;' id='${array[i]}' onclick='declineFriendsRequest(this.id)'>X</button>`
        displayPendingFriendsRequestTable(i + 1, array)
    }
}

const displaySentPendingFriendsRequestTable = function (i, array) {
    if (i < array.length) {
        var row = sentFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(i).insertCell(0)
        row.innerHTML = array[i]
        displayPendingFriendsRequestTable(i + 1, array)
    }
}