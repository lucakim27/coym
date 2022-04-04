const socket = io()
const occupationArray = []
var socketid = ''
var occupationTable = document.getElementById("occupationTable")
var index = 0

socket.on('userEnter', (array) => {
    pushOccupationArray(array)
    listOccupations()
    if ($("#userId").text() == 'anonymous') {
        $("#logoutBtn").css('display', 'block')
        $("#logoutBtn").css('display', 'none')
    } else {
        $("#logoutBtn").css('display', 'block')
        $("#loginBtn").css('display', 'none')
    }
    socket.emit('addOnlineUser', $("#userId").text())
})

socket.on('updatedComment', (array) => {
    occupationArray = array
})

const pushOccupationArray = function(array) {
    if (index < array.length) {
        occupationArray.push(array[index])
        index++
        pushOccupationArray(array)
    } else {
        index = 0
    }
}

const listOccupations = function() {
    if (index < occupationArray.length) {
        var row = occupationTable.insertRow(index)
        var cell = row.insertCell(0)
        cell.insertAdjacentHTML('beforeend', `
            <a 
                href='http://localhost:3000/comment?occupation=${occupationArray[index][0]}' 
                onclick="countForCharts('${occupationArray[index][0]}')"
            >${occupationArray[index][0]}
            </a><hr>`
        )
        index++
        listOccupations()
    } else {
        index = 0
    }
}

// var rowNum = 0
// const searchOccupations = function() {
//     alert('index: ' + index)
//     alert('rowNum: ' + rowNum)
//     occupationTable.innerHTML = ''
//     if (index < occupationArray.length) {
//         alert(occupationArray[index][0].toLowerCase().includes(document.getElementById('userInput').value.toLowerCase()))
//         if (occupationArray[index][0].toLowerCase().includes(document.getElementById('userInput').value.toLowerCase()) == true) {
//             var row = occupationTable.insertRow(rowNum)
//             var cell = row.insertCell(0)
//             var a = document.createElement('a')
//             a.href = `http://localhost:3000/comment?occupation=${occupationArray[index][0]}`
//             a.innerHTML = occupationArray[index][0]
//             cell.appendChild(a)
//             cell.appendChild(document.createElement('hr'))
//             rowNum++
//         }
//         index++
//         searchOccupations()
//     } else {
//         index = 0
//     }
// }

const countForCharts = function (occupationName) {
    socket.emit('countUpMostViewed', occupationName)
}
