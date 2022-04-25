// const socket = io()
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
