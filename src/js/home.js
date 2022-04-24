const socket = io()
const occupationArray = []
var occupationTable = document.getElementById("occupationTable")

socket.on('userEnter', (array) => {
    pushOccupationArray(array, 0)
    listOccupations(0)
    socket.emit('addOnlineUser', $("#userId").text())
})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

const pushOccupationArray = function(array, i) {
    if (i < array.length) {
        occupationArray.push(array[i])
        pushOccupationArray(array, i+1)
    }
}

const listOccupations = function(i) {
    if (i < occupationArray.length) {
        var row = occupationTable.insertRow(i)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a  href='http://localhost:3000/comment?occupation=${occupationArray[i][0]}' 
                onclick="countForCharts('${occupationArray[i][0]}')"
            >${occupationArray[i][0]}
            </a><hr>`
        )
        listOccupations(i+1)
    }
}

const countForCharts = function (occupationName) {
    socket.emit('countUpMostViewed', occupationName)
}

socket.on('getFriendsRequestPending', (array) => {
    const pendingFriendsRequestTable = document.getElementById("pendingFriendsRequest")
    pendingFriendsRequestTable.innerHTML = '<thead></thead><tbody></tbody>'
    var header = pendingFriendsRequestTable.getElementsByTagName('thead')[0].insertRow(0).insertCell(0)
    header.innerHTML = `<b>Pending Friends Request</b>`
    const keys = Object.keys(array)
    var tableIndex = 0
    keys.forEach((key, index) => {
        var row = pendingFriendsRequestTable.getElementsByTagName('tbody')[0].insertRow(tableIndex).insertCell(0)
        var div = document.createElement('div')
        var p = document.createElement('p')
        var button1 = document.createElement('button')
        var button2 = document.createElement('button')
        p.innerHTML = `${array[key]}`
        button1.innerHTML = 'O'
        button1.style.width = '50px'
        button1.style.height = '50px'
        button1.style.marginLeft = '20px'
        button2.innerHTML = 'X'
        button2.style.width = '50px'
        button2.style.height = '50px'
        button2.style.marginLeft = '20px'
        div.style.display = 'flex'
        div.style.marginLeft = '150px'
        div.appendChild(p)
        div.appendChild(button1)
        div.appendChild(button2)
        row.appendChild(div)
        tableIndex++
    })
})
